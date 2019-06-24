<template>
    <div style="width: 90%;margin: 0 auto" class="whole">
        <div class="dispatch-propose-sign" v-show=!this.$store.state.SignDispatchMark>
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
                        prop="people_name"
                        label="拟稿人"
                        style="width: 20%">
                </el-table-column>
                <el-table-column
                        prop="add_time"
                        label="日期"
                        style="width: 20%">
                </el-table-column>
                <el-table-column
                        prop="department"
                        label="拟稿机构"
                        style="width: 20%">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        class="button-cell"
                        align="center"
                        style="width: 20%">
                    <template slot-scope="scope">
                        <el-button type="text" @click="onChange(scope.row)"
                                   class="dispatch-propose-sign-button">套红
                        </el-button>
                        <el-button @click="onPass(scope.row)" type="text"
                                   class="dispatch-propose-sign-button">传阅
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
                        class="dispatch-propose-dueout-page"
                        background
                        layout="prev, pager, next"
                        :total="tableDataLengthDone">
                </el-pagination>
            </div>
            <el-dialog
                    title="选择发送目标"
                    :visible.sync="dialogVisibles"
                    width="50%"
                    :before-close="handleClose"
                    center>
                <div>
                    <el-checkbox-group v-model="depart">
                        <el-checkbox v-for="(department,index) in departments" :label='department.id'
                                     :key="index">
                            {{department.department}}
                        </el-checkbox>
                    </el-checkbox-group>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisibles = false" class="phone-send-button">取消</el-button>
                    <el-button type="primary" @click="onSign" class="phone-send-button">发送</el-button>
                </span>
            </el-dialog>
            <el-dialog
                    title="确认终止"
                    class="phone-done"
                    :visible.sync="dialog"
                    width="50%"
                    :before-close="handleClose"
                    center>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialog = false" class="phone-done-button">关闭此页</el-button>
                    <el-button @click="kill" class="phone-done-button" type="primary">确认终止</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="dispatch-propose-sign" v-show=this.$store.state.SignDispatchMark>
            <div class="box onlineChange">
                <mavon-editor v-model="context" :toolbars="toolbars" class="markdown" style="margin-top: 40px"/>
                <div class="box_downLoad">
                    <h4 style="display: block;font-size: 16px;">附件下载:</h4>
                    <a v-for="(li,index) in list" :href="li.upload" download
                       class="downLoad">{{index+1}}.{{li.name}}</a>
                </div>
                <div class="advice">
                    <el-select class="select-advice" v-model="text_number" placeholder="请选择发文字号(套红)"
                               style="margin-bottom: 10px;">
                        <el-option class="select-advice-option" v-for="(obj,index) in numbers" :label=obj.text_number
                                   :value=obj.text_number
                                   :key="index"></el-option>
                    </el-select>
                    <el-input
                            class="advice-text"
                            type="textarea"
                            placeholder="请输入意见"
                            v-model="textarea">
                    </el-input>
                    <div class="button_draft" @click="onSubmit" style="margin-left: 35%">提交修改</div>
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
                text_number: '',
                id: '',
                dialogVisibles: false,
                departments: this.$store.state.departmentName,
                depart: [],
                page: 1,
                killId: '',
                dialog: false,
                list: []
            }
        },
        methods:
            {
                handleCurrentChange(e) {
                    this.page = e
                    this.$store.commit('changePageDataSign', e);
                },
                //进行文单修改
                onChange(event) {
                    this.$store.commit('changeSignDispatchMark');
                    this.$store.commit('getNumbers');
                    this.context = event.desc_content.replace(/<\/br>/g, '\r\n').replace(/&nbsp;/g, ' ');
                    this.list = event.download_list;
                    this.id = event.id;
                },
                //传阅
                onPass(e) {
                    this.dialogVisibles = true;
                    this.id = e.id;
                }
                ,
                onSign() {
                    this.dialogVisibles = false;
                    let data = this.depart
                    let id = this.id
                    let url = `/api/v1/send_sign/`
                    let self = this
                    let formData = new FormData()
                    formData.append('send_id', id)
                    for (let i = 0; i < data.length; i++) {
                        formData.append('signed_people', data[i])
                    }
                    this.$post(url, formData).then(function (e) {
                        self.handleCurrentChange(self.page)
                        self.$message({
                            message: '传阅已经发起',
                            type: 'success',
                            center: true,
                            customClass: 'tip',
                            duration: 1500
                        })
                        self.depart = []
                    }).catch(function (e) {
                        self.handleCurrentChange(self.page)
                        console.log(e)
                        self.$message({
                            message: '不能重复签发传阅',
                            type: 'error',
                            center: true,
                            customClass: 'tip',
                            duration: 1500
                        })
                        self.depart = []
                    })
                },
                onSubmit() {
                    //提交修改
                    let url = `/api/v1/send_sign/${this.id}/edit/`;
                    let formData = new FormData();
                    formData.append('new_content', this.context.replace(/ /g, "&nbsp;"));
                    formData.append('comment', this.textarea);
                    formData.append('text_number', this.text_number);
                    let self = this;
                    this.$post(url, formData).then(function (e) {
                        self.handleCurrentChange(self.page)
                        self.text_number='';
                        //提交完成的回调
                        self.$message({
                            message: '已提交修改及意见',
                            type: 'success',
                            center: true,
                            customClass: 'tip',
                            duration: 1500
                        });
                        self.id = '';
                        self.context = '';
                        self.textarea = '';
                        self.$store.commit('changeSignDispatchMark')
                    }).catch((e) => {
                        self.handleCurrentChange(self.page)
                        self.text_number='';
                        self.$message({
                            message: '提交失败',
                            type: 'error',
                            center: true,
                            customClass: 'tip',
                            duration: 1500
                        });
                        self.id = '';
                        self.context = '';
                        self.textarea = '';
                        self.$store.commit('changeSignDispatchMark')
                    })
                },
                goBack() {
                    this.$store.commit('changeSignDispatchMark');
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
                    let url = `/api/v1/send/${this.killId}/kill/`;
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
            }
        ,
        computed: {
            //当前页面显示的文单信息
            pageDataDone() {
                let now = this.$store.state.pageDataSign;
                let self = this;
                if (now) {
                    now.map(function (a) {
                        let date = new Date(a.add_time);
                        let emergency = a.emergency;
                        let time = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
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
            }
            ,
            numbers() {
                return this.$store.state.numbers;
            }
            ,
            //获取总共的发文单长度
            tableDataLengthDone() {
                return this.$store.state.dispatchDataSign.count;
            }
        }
        ,
        mounted() {
            //获取初始文单信息，展示初始页面
            this.$store.commit('getNumbers')
            this.$store.commit('getDataSign');
            document.getElementsByClassName("fa-mavon-columns")[0].click();
            this.$nextTick(() => {
                this.toolbars.subfield = false;
            })
        }
    }
</script>

<style lang="less" TYPE="text/less">
    .dispatch-propose-sign {
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

        .dispatch-dueout-link {
            z-index: 99;
            height: auto;
        }
    }

    .dispatch-propose-sign-button {
        height: 31px;
        line-height: 31px;
        border-radius: 5px 5px 5px 5px;
        text-align: center;
        border: 1px solid rgba(26, 173, 25, 1);
        color: rgba(26, 173, 25, 1);
        padding: 0 10px;
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
        .dispatch-propose-sign {
            padding: 0 1px;
        }

        .dispatch-propose-sign-button {
            height: 30px;
            width: 90%;
            display: block;
            border-radius: 0;
            margin: 0 auto 2px auto !important;
            border: 1px solid #dcdfe6;
            color: #606266;
        }

        .button-cell {
            padding: 0;
        }

        .phone-done-button {
            height: 40px;
            padding: 4px;
            border: 1px solid #dcdfe6;
            color: #606266;
        }

        .phone-send-button {
            height: 40px;
            padding: 10px;
            border: 1px solid #dcdfe6;
            color: #606266;
        }
    }
</style>