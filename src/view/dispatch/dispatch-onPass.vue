<template>
    <div style="width: 90%;margin: 0 auto" class="whole">
        <div class="dispatch-propose-onPass" v-show=!this.$store.state.ReadDispatchMark>
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
                        class="button-cell-pass"
                        align="center"
                        style="width: 25%">
                    <template slot-scope="scope">
                        <el-button @click="onRead(scope.row)" type="text"
                                   v-if=isIn
                                   class="dispatch-propose-onPass-button">查看
                        </el-button>
                        <el-button @click="endPass(scope.row)" type="text"
                                   class="dispatch-propose-onPass-button"
                                   v-if=isShow>结束传阅
                        </el-button>
                        <el-button @click="openPass(scope.row)" type="text"
                                   v-if=isShow
                                   class="dispatch-propose-onPass-button">查看传阅
                        </el-button>
                        <el-button @click="openKill(scope.row)" type="text"
                                   v-if=isShow
                                   class="propose-kill-button">终止
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog
                    title="传阅情况"
                    :visible.sync="dialogVisible"
                    width="70%"
                    :before-close="handleClose"
                    center>
                <div style="border-bottom: 1px dashed;padding: 10px 0; display: block;margin-bottom: 20px;text-align: left;line-height: 1.5"
                     v-for="(pass,index) in passStatus"
                     :key="index">
                    <img src="../../../statics/images/eye.png" style="display: block;height: 20px;float: left"
                         v-if="pass.is_read">
                    <img src="../../../statics/images/noeye.png" style="display: block;height: 20px;float: left"
                         v-if="!pass.is_read">
                    <b>【{{(pass.people).department_name}}】: </b>{{pass.comment_content}}
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">关闭此页</el-button>
                </span>
            </el-dialog>
            <el-dialog
                    title="确认终止"
                    :visible.sync="dialog"
                    width="50%"
                    :before-close="handleClose"
                    center>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialog = false" class="phone-done-button">关闭此页</el-button>
                <el-button @click="kill" class="phone-done-button" type="primary">确认终止</el-button>
                </span>
            </el-dialog>
            <el-dialog
                    title="请选择以下操作"
                    :visible.sync="dialogEnd"
                    width="60%"
                    :before-close="handleClose"
                    center>
                 <span slot="footer" class="dialog-footer">
                    <el-button @click="secondSend" class="phone-done-button">领导二审</el-button>
                    <el-button @click="endSend" type="primary" class="phone-done-button">直接办结</el-button>
                 </span>
            </el-dialog>
            <div class="block">
                <el-pagination
                        @current-change="handleCurrentChange"
                        class="dispatch-propose-dueout-page"
                        background
                        layout="prev, pager, next"
                        :total="tableDataLengthDone">
                </el-pagination>
            </div>
        </div>
        <div class="dispatch-propose-onPass" v-show=this.$store.state.ReadDispatchMark>
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
                    <div class="button_draft" @click="onSubmit" style="margin-left: 35%">提交意见</div>
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
                isShow: this.$store.state.role == 2,
                isIn: this.$store.state.role == 3,
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
                    // edit: false,
                    // default_open: 'edit',
                    editable: false,
                    preview: true,
                    // fullscreen: false, // 全屏s编辑
                    // readmodel: false, // 沉浸式阅读
                    /* 1.3.5 */
                    undo: true, // 上一步
                    trash: true, // 清空
                    // save: true, // 保存（触发events中的save事件）
                    /* 1.4.2 */
                    navigation: false // 导航目录
                },
                textarea: '',
                id: '',
                S_id: '',
                killId: '',
                dialogVisible: false,
                dialog: false,
                dialogEnd: false,
                passStatus: [],
                page: 1,
                list: []
            }
        },
        methods: {
            handleCurrentChange(e) {
                this.page = e;
                this.$store.commit('changePageDataRead', e);
            },
            onRead(event) {
                this.$store.commit('changeReadDispatchMark');
                this.context = event.desc_content.replace(/<\/br>/g, '\r\n').replace(/&nbsp;/g, ' ');
                this.id = event.id;
                this.list = event.download_list;
                this.textarea = '';
            },
            onSubmit() {
                let url = `/api/v1/pass_and_read/${this.id}/comment/`;
                let formData = new FormData();
                formData.append('content', this.textarea);
                // .replace(/ /g, "&nbsp;");
                formData.append('is_send', true);
                let self = this;
                this.$post(url, formData).then(function (e) {
                    //提交完成的回调
                    self.$message({
                        message: '已提交传阅意见',
                        type: 'success',
                        center: true,
                        customClass: 'tip',
                        duration: 1500
                    });
                    self.$store.commit('changeReadDispatchMark')
                }).catch((e) => {
                    self.$message({
                        message: '提交失败',
                        type: 'error',
                        center: true,
                        customClass: 'tip',
                        duration: 1500
                    });
                    self.$store.commit('changeReadDispatchMark')
                })
            },
            goBack() {
                this.$store.commit('changeReadDispatchMark');
            },
            //打开传阅情况
            openPass(e) {
                let self = this;
                let url = `/api/v1/send_sign/${e.id}/`
                this.$get(url).then(function (e) {
                    self.passStatus = e.data.signed_people;
                    self.dialogVisible = true
                }).catch((e) => {
                    self.dialogVisible = true
                });
                this.id = e.id;
            },
            //结束传阅
            endPass(e) {
                this.S_id = e.id;
                this.dialogEnd = true;
            },
            secondSend() {
                this.dialogEnd = false;
                let url = `/api/v1/send_sign/${this.S_id}/end/`;
                let self = this;
                this.$put(url).then(function () {
                    let urls = `/api/v1/send_sign/${self.S_id}/second_check/`;
                    self.$put(urls).then(function () {
                        self.handleCurrentChange(self.page)
                        self.$message({
                            message: '已提交领导二审',
                            type: 'success',
                            center: true,
                            customClass: 'tip',
                            duration: 1500
                        })
                        self.S_id = ''
                    }).catch((e) => {
                        self.handleCurrentChange(self.page)
                        self.$message({
                            message: '结束失败',
                            type: 'error',
                            center: true,
                            customClass: 'tip',
                            duration: 1500
                        })
                        self.S_id = ''
                    });
                }).catch((e) => {
                    self.handleCurrentChange(self.page)
                    self.$message({
                        message: '结束失败',
                        type: 'error',
                        center: true,
                        customClass: 'tip',
                        duration: 1500
                    })
                });
            },
            endSend() {
                this.dialogEnd = false;
                let url = `/api/v1/send_sign/${this.S_id}/end/`;
                let self = this;
                this.$put(url).then(function () {
                    let urls = `/api/v1/send/${self.S_id}/end/`;
                    self.$put(urls).then(function () {
                        self.handleCurrentChange(self.page)
                        self.$message({
                            message: '已办结',
                            type: 'success',
                            center: true,
                            customClass: 'tip',
                            duration: 1500
                        })
                        self.S_id = ''
                    }).catch((e) => {
                        self.handleCurrentChange(self.page)
                        self.$message({
                            message: '结束失败',
                            type: 'error',
                            center: true,
                            customClass: 'tip',
                            duration: 1500
                        })
                        self.S_id = ''
                    });
                }).catch((e) => {
                    self.handleCurrentChange(self.page)
                    self.$message({
                        message: '结束失败',
                        type: 'error',
                        center: true,
                        customClass: 'tip',
                        duration: 1500
                    })
                    this.S_id = ''
                });
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
        },
        computed: {
            //当前页面显示的文单信息
            pageDataDone() {
                let now = this.$store.state.pageDataRead;
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
            },
            //获取总共的发文单长度
            tableDataLengthDone() {
                return this.$store.state.dispatchDataRead.count;
            }
        },
        mounted() {
            //获取初始文单信息，展示初始页面
            this.$store.commit('getDataRead');
            document.getElementsByClassName("fa-mavon-columns")[0].click();
            this.$nextTick(() => {
                this.toolbars.subfield = false;
            })
        }
    }
</script>

<style lang="less" TYPE="text/less">
    .dispatch-propose-onPass {
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

    .dispatch-propose-onPass-button {
        padding: 0 2px;
        height: 31px;
        line-height: 31px;
        font-size: 13px;
        border-radius: 5px 5px 5px 5px;
        text-align: center;
        border: 1px solid rgba(26, 173, 25, 1);
        color: rgba(26, 173, 25, 1);
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
        .dispatch-propose-onPass {
            padding: 0 1px;
        }

        .dispatch-propose-onPass-button {
            height: 30px;
            width: 90%;
            display: block;
            border-radius: 0;
            margin: 0 auto 2px auto !important;
            border: 1px solid #dcdfe6;
            color: #606266;
            &:focus {
                background-color: white;
                color: #606266;
            }
        }

        .button-cell-pass {
            padding: 0;
        }

        .phone-done-button {
            height: 40px;
            padding: 4px;
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