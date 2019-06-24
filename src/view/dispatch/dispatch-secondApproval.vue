<template>
    <div class="whole" style="width: 90%;margin: 0 auto">
        <div class="dispatch-propose-secondApproval" v-show=!this.$store.state.ReDispatchMark>
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
                        align="center"
                        label="操作"
                        class="button-cell-approval"
                        style="width: 20%">
                    <template slot-scope="scope">
                        <el-button @click="onAllowDone(scope.row)" type="text"
                                   class="dispatch-propose-secondApproval-button">允许办结
                        </el-button>
                        <el-button @click="onRead(scope.row)" type="text"
                                   class="dispatch-propose-secondApproval-button">查看
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
                    title="确认终止"
                    :visible.sync="dialog"
                    width="50%"
                    :before-close="handleClose"
                    center>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialog = false" class="phone-send-button">关闭此页</el-button>
                    <el-button @click="kill" style="margin:0 auto" type="primary"
                               class="phone-send-button">确认终止</el-button>
                 </span>
            </el-dialog>
        </div>
        <div class="dispatch-propose-secondApproval" v-show=this.$store.state.ReDispatchMark>
            <div class="box onlineChange">
                <mavon-editor v-model="context" :toolbars="toolbars" class="markdown" style="margin-top: 40px"/>
                <div class="advice" style="margin-top: 200px">
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
                page: 1,
                killId: '',
                dialog: false,
            }
        },
        methods: {
            handleCurrentChange(e) {
                this.page = e;
                this.$store.commit('changePageDataRe', e);
            },
            onAllowDone(event) {
                let url = `/api/v1/second_check/${event.id}/send/`;
                let self = this;
                this.$get(url).then(function () {
                    self.handleCurrentChange(self.page)
                    self.$message({
                        message: '已允许办结',
                        type: 'success',
                        center: true,
                        customClass: 'tip',
                        duration: 1500
                    })
                }).catch(function () {
                    self.handleCurrentChange(self.page)
                    self.$message({
                        message: '失败',
                        type: 'error',
                        center: true,
                        customClass: 'tip',
                        duration: 1500
                    })
                })
            },
            onRead(event) {
                this.context = event.desc_content.replace(/&nbsp;/g, ' ');
                this.$store.commit('changeReDispatchMark');
            },
            goBack() {
                this.$store.commit('changeReDispatchMark');
                this.context = '';
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
                let now = this.$store.state.pageDataRe;
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
                return this.$store.state.dispatchDataRe.count;
            }
        },
        mounted() {
            document.getElementsByClassName("fa-mavon-columns")[0].click();
            this.$nextTick(() => {
                this.toolbars.subfield = false;
            })
            //获取初始文单信息，展示初始页面
            this.$store.commit('getDataRe');
        }
    }
</script>

<style lang="less" TYPE="text/less">
    .dispatch-propose-secondApproval {
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

    .dispatch-propose-secondApproval-button {
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
        .dispatch-propose-secondApproval {
            padding: 0 1px;
        }

        .dispatch-propose-secondApproval-button {
            text-align: center;
            height: 30px;
            width: 90%;
            display: block;
            border-radius: 0;
            padding: 0 !important;
            margin: 0 auto 2px auto !important;
            border: 1px solid #dcdfe6;
            color: #606266;
        }

        .dispatch-propose-secondApproval-button:first-child {
            width: 95%;
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