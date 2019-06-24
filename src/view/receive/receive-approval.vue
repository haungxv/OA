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
        <div class="receive-propose-approval" v-show=this.$store.state.UnReceiveMark>
            <div class="box onlineChange">
                <mavon-editor v-model="context" :toolbars="toolbars" class="markdown" style="margin-top: 40px"/>
                <div class="box_downLoad">
                    <h4 style="display: block;font-size: 16px;">附件下载:</h4>
                    <a v-for="(li,index) in list" :href="li.upload" download
                       class="downLoad">{{index+1}}.{{li.name}}</a>
                </div>
                <div class="advice">
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
    </div>
</template>

<script>
    import {mavonEditor} from 'mavon-editor'


    export default {
        components: {mavonEditor},
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
                list: []
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
                formData.append('new_content', this.context).replace(/ /g, "&nbsp;");
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
            }
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

</style>