<template>
    <div style="width: 90%;margin: 0 auto">
        <div class="receive-propose-approval" v-show=!this.$store.state.UnReceiveMark>
            <el-table
                    :data="pageDataDone"
                    style="width: 100%;margin-top: 10px;height: 100%">
                <el-table-column
                        prop="title"
                        label="标题"
                        style="width: 20%;height: 50px"
                >
                </el-table-column>
                <el-table-column
                        prop="emergency"
                        label="紧急程度"
                        style="width: 20%">
                </el-table-column>
                <el-table-column
                        prop="department"
                        label="来文单位"
                        style="width: 20%">
                </el-table-column>
                <el-table-column
                        prop="add_time"
                        label="来文日期"
                        style="width: 20%">
                </el-table-column>
                <el-table-column
                        prop="term"
                        label="截止日期"
                        style="width: 20%">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        class="button-cell-approval"
                        align="center"
                        style="width: 20%">
                    <template slot-scope="scope">
                        <el-button @click="onApproval(scope.row)" type="text"
                                   class="receive-propose-approval-button">审批
                        </el-button>
                        <el-button @click="openKill(scope.row)" type="text"
                                   class="propose-kill-button">终止
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination
                        @current-change="handleCurrentChange"
                        class="receive-propose-dueout-page"
                        background
                        layout="prev, pager, next"
                        :total="tableDataLengthDone">
                </el-pagination>
            </div>
            <el-dialog
                    title="确认终止"
                    :visible.sync="dialog"
                    width="50%"
                    :before-close="handleClose"
                    center>
                  <span slot="footer" class="dialog-footer">
                      <el-button @click="dialog = false" class="phone-send-button">关闭此页</el-button>
                      <el-button @click="kill" style="margin:0 auto" class="phone-send-button" type="primary">确认终止</el-button>
                  </span>
            </el-dialog>
        </div>
        <div class="receive-propose-approval" v-show=this.$store.state.UnReceiveMark v-if="isNormal">
            <div class="box onlineChange">
                <mavon-editor v-model="context" :toolbars="toolbars" class="markdown" style="margin-top: 40px"/>
                <div class="box_downLoad">
                    <h4 style="display: block;font-size: 16px;">附件下载:</h4>
                    <a v-for="(li,index) in list" :href="li.upload" download
                       class="downLoad">{{index+1}}.{{li.name}}</a>
                </div>
                <div class="advice">
                    <el-button @click="showPaper('receive')" class="check_paper">查看文单</el-button>

                    <el-input
                            class="advice-text"
                            type="textarea"
                            placeholder="请输入意见"
                            v-model="textarea">
                    </el-input>
                    <div class="button_draft" @click="adviceSubmit" style="padding:0 5px;width:100px">提交</div>
                    <!--<div class="button_draft" @click="doneLoad" style="width: auto;padding:  0 30px">下载</div>-->
                    <div class="button_draft" @click="sendHeader" style="padding:  0 5px" v-if=isShow>
                        发送至处长
                    </div>
                    <div class="button_draft" @click="sendFail" style="padding:  0 5px">审核不通过</div>
                    <div class="button_submit" @click="goBack">返回</div>
                </div>
            </div>
        </div>

        <!--查看文单详情-->
        <print-paper v-if="isPaper"
                     :data="paper_data"
                     :pass_and_read="paper_pass"
                     @backToDetail="printPaperBack">
        </print-paper>
    </div>
</template>

<script>
    import {mavonEditor} from 'mavon-editor'
    import printPaper from '../done/printPaper.vue';



    export default {
        components: {mavonEditor,printPaper},
        data() {
            return {
                isShow: this.$store.state.role == 1,
                context: '',//文章内容
                toolbars: {
                    value: '',//初始值
                    bold: true, // 粗体
                    italic: true, // 斜体
                    header: false, // 标题
                    underline: true, // 下划线
                    mark: true, // 标记
                    superscript: true, // 上角标
                    quote: true, // 引用
                    ol: true, // 有序列表
                    link: true, // 链接
                    imagelink: true, // 图片链接
                    help: false, // 帮助
                    code: false, // code
                    subfield: true, // 是否需要分栏
                    edit: false,
                    default_open: 'edit',
                    editable: true,
                    fullscreen: false, // 全屏s编辑
                    readmodel: false, // 沉浸式阅读
                    /* 1.3.5 */
                    undo: true, // 上一步
                    trash: true, // 清空
                    // save: true, // 保存（触发events中的save事件）
                    /* 1.4.2 */
                    navigation: false // 导航目录
                },
                textarea: '',
                id: '',
                page: 1,
                killId: '',
                dialog: false,
                list: [],

                isNormal:true,
                isPaper: false,//文单详情是否展示
                paper_data: [],//文单基本信息
                paper_pass: [],//文单传阅意见
            }
        },
        methods: {
            handleCurrentChange(e) {
                this.page = 1;
                this.$store.commit('changeRePageDataUn', e);
            },
            onApproval(event) {
                this.$store.commit('changeUnReceiveMark');
                this.context = event.desc_content.replace(/&nbsp;/g, ' ');
                this.id = event.id;
                this.list = event.download_list;
                this.textarea = '';
            },
            adviceSubmit() {
                let url = `/api/v1/first_check/comment/`;
                let formData = new FormData();
                formData.append('pass_to_header', false);
                formData.append('comment', this.textarea);
                formData.append('new_content', this.context.replace(/ /g, "&nbsp;"));
                formData.append('is_send', false);
                formData.append('essay_id', this.id);
                //是否不通过审批
                formData.append('end', false);
                let self = this;
                this.$post(url, formData).then(function (e) {
                    self.handleCurrentChange(self.page)
                    //提交完成的回调
                    self.$message({
                        message: '已发送意见',
                        type: 'success',
                        center: true,
                        customClass: 'tip',
                        duration: 1500
                    });
                    self.$store.commit('changeUnReceiveMark')
                }).catch((e) => {
                    self.handleCurrentChange(self.page)
                    self.$message({
                        message: '提交失败',
                        type: 'error',
                        center: true,
                        customClass: 'tip',
                        duration: 1500
                    });
                    self.$store.commit('changeUnReceiveMark')
                })
            },
            sendHeader() {
                let url = `/api/v1/first_check/comment/`;
                let formData = new FormData();
                formData.append('pass_to_header', true);
                formData.append('comment', this.textarea);
                formData.append('new_content', this.context.replace(/ /g, "&nbsp;"));
                formData.append('is_send', false);
                formData.append('essay_id', this.id);
                //是否不通过审批
                formData.append('end', false);
                let self = this;
                this.$post(url, formData).then(function (e) {
                    self.handleCurrentChange(self.page)
                    //提交完成的回调
                    self.$message({
                        message: '已发送意见',
                        type: 'success',
                        center: true,
                        customClass: 'tip',
                        duration: 1500
                    });
                    self.$store.commit('changeUnReceiveMark')
                }).catch((e) => {
                    self.handleCurrentChange(self.page)
                    self.$message({
                        message: '提交失败',
                        type: 'error',
                        center: true,
                        customClass: 'tip',
                        duration: 1500
                    });
                    self.$store.commit('changeUnReceiveMark')
                })
            },
            sendFail() {
                let url = `/api/v1/first_check/comment/`;
                let formData = new FormData();
                formData.append('pass_to_header', false);
                formData.append('comment', this.textarea);
                formData.append('new_content', this.context.replace(/ /g, "&nbsp;"));
                formData.append('is_send', false);
                formData.append('essay_id', this.id);
                //是否不通过审批
                formData.append('end', true);
                let self = this;
                this.$post(url, formData).then(function (e) {
                    self.handleCurrentChange(self.page)
                    //提交完成的回调
                    self.$message({
                        message: '不通过成功',
                        type: 'success',
                        center: true,
                        customClass: 'tip',
                        duration: 1500
                    });
                    self.$store.commit('changeUnReceiveMark')
                }).catch((e) => {
                    self.handleCurrentChange(self.page)
                    self.$message({
                        message: '提交失败',
                        type: 'error',
                        center: true,
                        customClass: 'tip',
                        duration: 1500
                    });
                    self.$store.commit('changeUnReceiveMark')
                })
            },
            goBack() {
                this.$store.commit('changeUnReceiveMark')
            },
            handleClose(done) {
                done();
            },
            openKill(e) {
                this.killId = e.id;
                this.dialog = true;
            },
            kill() {
                let self = this;
                this.dialog = false;
                let url = `/api/v1/receive/${this.killId}/kill/`;
                this.$post(url).then(
                    function () {
                        self.handleCurrentChange(self.page)
                        self.$message({
                            message: '已终止',
                            type: 'success',
                            center: true,
                            customClass: 'tip',
                            duration: 1500
                        })
                    }).catch((e) => {
                    self.handleCurrentChange(self.page)
                    self.$message({
                        message: '终止失败',
                        type: 'error',
                        center: true,
                        customClass: 'tip',
                        duration: 1500
                    })
                })
            },
            showPaper(type) {
                this.$get(`/api/v1/${type}/${this.id}/read_${type}/`)
                    .then((res) => {
                        let date = new Date(res.data.add_time);
                        let time = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
                        let data = [
                            {
                                id: 1,
                                name: '发文字号：',
                                value: res.data.text_number,
                            },
                            {
                                id: 2,
                                name: '印发份数：',
                                value: res.data.print_sum,
                            },
                            {
                                id: 3,
                                name: '文件标题：',
                                value: res.data.title,
                            },
                            {
                                id: 4,
                                name: '主送/发至：',
                                value: `无`,
                            },
                            {
                                id: 5,
                                name: '抄送：',
                                value: `无`,
                            },
                            {
                                id: 6,
                                name: '公开属性：',
                                value: res.data.public ? '公开' : '不公开',
                            },
                            {
                                id: 7,
                                name: '拟稿人：',
                                value: `无`,
                            },
                            {
                                id: 8,
                                name: '紧急程度：',
                                value: res.data.emergency,
                            },
                            {
                                id: 9,
                                name: '创建时间：',
                                value: time,
                                // value: res.data.add_time.replace('T', ' ').substring(0, 19),
                            },
                            {
                                id: 10,
                                name: '审批领导：',
                                value: '无',
                            },
                            {
                                id: 11,
                                name: '审核领导：',
                                value: '无',
                            },
                            {
                                id: 12,
                                name: '领导批示：',
                                value: '无',
                            },
                            {
                                id: 13,
                                name: '综合办拟办：',
                                value: '无',
                            },
                        ];
                        //主送/送至
                        if (res.data.destination) {
                            data[3].value = `${res.data.destination}`;
                        }
                        //抄送
                        if (res.data.cc) {
                            data[4].value = `${res.data.cc}`;
                        }
                        //拟稿人
                        if (res.data.people) {
                            data[6].value = `${res.data.department}${res.data.people.name}${res.data.people.title}`
                        }
                        //一审领导和一审意见
                        if (res.data.first_check) {
                            if (res.data.first_check.first) {
                                if (res.data.first_check.first.user.name) {
                                    data[9].value = `${res.data.first_check.first.user.department_name}${res.data.first_check.first.user.name}${res.data.first_check.first.user.title}`
                                }
                                if (res.data.first_check.first.comment) {
                                    data[11].value = `${res.data.first_check.first.user.name}批示内容：${res.data.first_check.first.comment}<br/>时间：${res.data.first_check.first.comment_time.replace('T', ' ').substring(0, 19)}`
                                }
                            }
                            if (res.data.first_check.second) {
                                if (res.data.first_check.second.user.name) {
                                    data[9].value += `&nbsp;&nbsp;&nbsp;${res.data.first_check.second.user.department_name}${res.data.first_check.second.user.name}${res.data.first_check.second.user.title}`
                                }
                                if (res.data.first_check.second.comment) {
                                    data[11].value += `<br/>${res.data.first_check.second.user.name}批示内容：${res.data.first_check.second.comment}<br/>时间：${res.data.first_check.second.comment_time.replace('T', ' ').substring(0, 19)}`
                                }
                            }
                        }
                        //二审领导和二审意见
                        if (res.data.second_check) {
                            if (res.data.second_check.person.name) {
                                data[10].value = `${res.data.second_check.person.department_name}${res.data.second_check.person.name}${res.data.second_check.person.title}`
                            }
                        }
                        //综合办意见
                        if (res.data.dealer && res.data.dealer.user.name) {
                            data[12].value = `签发人：${res.data.dealer.user.name}<br/>内容：${res.data.dealer.comment}<br/>时间：${res.data.dealer.comment_time.replace('T', ' ').substring(0, 19)}`
                        }

                        let pass_and_read = [];//传阅评语内容
                        if (res.data.pass_and_read) {
                            let len = res.data.pass_and_read.length;
                            for (let i = 0; i < len; i++) {
                                if (res.data.pass_and_read[i].is_read) {
                                    pass_and_read.push({
                                        id: i + 1,
                                        name: '传阅意见：',
                                        value: `${res.data.pass_and_read[i].people.department}：${res.data.pass_and_read[i].people.name}${res.data.pass_and_read[i].people.title}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;时间：${res.data.pass_and_read[i].comment_time.replace('T', ' ').substring(0, 19)}<br/>意见内容：${res.data.pass_and_read[i].comment_content}`,
                                    })
                                }
                            }
                        }

                        this.paper_data = data;
                        this.paper_pass = pass_and_read;

                        this.$nextTick(() => {
                            this.isNormal = false;
                            this.isPaper = true;
                        });
                    })
            },
            printPaperBack() {
                //查看文单返回
                this.isNormal = true;
                this.isPaper = false;
            },
            // doneLoad() {
            //     let doneForm=document.createElement('form');
            //     doneForm.method="POST";
            //     doneForm.style.display = "none";
            //     doneForm.action= "/download";//URL
            //     let input = document.createElement("input");
            //     input.value = this.id;
            //     doneForm.appendChild(input);
            //     document.body.appendChild(doneForm);//将表单放置在web中
            //     doneForm.submit();//表单提交
            // }
        },
        computed: {
            //当前页面显示的文单信息
            pageDataDone() {
                let now = this.$store.state.receivePageDataUn;
                let self = this;
                if (now) {
                    now.map(function (a) {
                        a.re_term = a.term;
                        a.re_time = a.add_time;
                        let date = new Date(a.add_time);
                        let dateterm = new Date(a.term);
                        let emergency = a.emergency;
                        let times = `${dateterm.getFullYear()}年${dateterm.getMonth() + 1}月${dateterm.getDate()}日`;
                        let time = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
                        a.term = times;
                        a.add_time = time;
                        switch (emergency) {
                            case 0:
                                a.emergency = '无';
                                break;
                            case 1:
                                a.emergency = '普通';
                                break;
                            case 2:
                                a.emergency = '紧急';
                                break;
                            case  3:
                                a.emergency = '特急';
                                break;
                        }
                        return a;
                    });
                }
                return now;
            },
            //获取总共的发文单长度
            tableDataLengthDone() {
                return this.$store.state.receiveDataUn.count;
            }
        },
        mounted() {
            //获取初始文单信息，展示初始页面
            this.$store.commit('getReDataUn');
            //markDown样式调整
            document.getElementsByClassName("fa-mavon-columns")[0].click();
            this.$nextTick(() => {
                this.toolbars.subfield = false;
            })
        }
    }
</script>

<style lang="less" TYPE="text/less">
    .receive-propose-approval {
        width: 100%;
        margin: 0 auto;
        .el-table .warning-row {
            background: oldlace;
        }

        .el-table .success-row {
            background: #f0f9eb;
        }

        .block {
            margin: 20px auto 0 auto;
            padding: 0 auto;
            text-align: center;
        }

        .receive-dueout-link {
            z-index: 99;
            height: auto;
        }
    }

    .tip {
        height: 250px;
        width: 250px;
        font-weight: normal;
        top: calc(50% - 50px);

        background: rgba(17, 17, 17, 0.7);
        p {
            color: white !important;
            font-size: 30px;
        }
        i {
            font-size: 30px;
            color: white !important;
        }
    }

    .receive-propose-approval-button {
        height: 31px;
        line-height: 31px;
        border-radius: 5px 5px 5px 5px;
        text-align: center;
        border: 1px solid rgba(26, 173, 25, 1);
        color: rgba(26, 173, 25, 1);
        padding: 0 5px;
        transition: all 0.5s;
        margin: 0 auto;
        &:hover {
            background-color: rgba(26, 173, 25, 1) !important;
            color: white !important;
        }
        &:focus {
            background-color: rgba(26, 173, 25, 1);
            color: white;
        }
    }

    @media screen and (max-width: 768px) {
        .receive-propose-approval {
            padding: 0 1px;
        }

        .receive-propose-approval-button {
            text-align: center;
            height: 30px;
            width: 90%;
            display: block;
            border-radius: 0;
            margin: 0 auto 2px auto !important;
            border: 1px solid #dcdfe6;
            padding: 0;
            color: #606266;
        }

        .button-cell-approval {
            padding: 0;
        }

        .phone-send-button {
            height: 40px;
            padding: 10px;
            border: 1px solid #dcdfe6;
            color: #606266;
        }
        .tip {
            height: 100px;
            width: 100px;
            font-weight: normal;
            top: calc(50% - 50px);

            background: rgba(17, 17, 17, 0.7);
            p {
                color: white !important;
                font-size: 20px;
            }
            i {
                font-size: 20px;
                color: white !important;
            }
        }
    }

    .check_paper{
        margin-bottom:10px;
    }

</style>