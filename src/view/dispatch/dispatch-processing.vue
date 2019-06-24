<template>
    <div class="changeRate" style="width: 90%;margin: 0 auto">
        <!--确认办结弹出框-->
        <el-dialog title="是否确认办结" width="600px" :visible.sync="dialogVisible_finished"
                   :before-close="closeDetail_finished">
            <div class="change_title">文件名称：&nbsp;&nbsp;{{finishedTitle}}</div>
            <span slot="footer" class="dialog-footer">
        <el-button @click="closeDetail_finished">取 消</el-button>
        <el-button type="primary" @click="finished_sure">确 定</el-button>
      </span>
        </el-dialog>
        <div class="content" v-show="!isDetail">
            <el-table :data="tableData" border>
                <el-table-column label="文件名称" align="center" prop="title"></el-table-column>
                <el-table-column label="拟稿单位" align="center" prop="depart_name"></el-table-column>
                <el-table-column label="当前状态" align="center" prop="status_value"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button @click="showDetail(scope.row)" type="text" size="small">查看详情</el-button>
                        <el-button @click="finished(scope.row)" type="text" size="small">办结</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page.sync="page.currentPage"
                    :page-size="page.pageSize"
                    layout="prev, pager, next, jumper"
                    :total="page.total"
            ></el-pagination>
        </div>

        <article-detail v-show="isDetail"
                        @backToDetail="detailBack"
                        :content="detail.content"
                        :title="detail.title"
                        :day="detail.day"
                        kind="在办"
                        :time="detail.time">
        </article-detail>
    </div>
</template>

<script>
    import articleDetail from "../schedule/article_details.vue";

    export default {
        components: {articleDetail},
        data() {
            return {
                tableData: [], //表格展示数据
                page: {
                    //分页
                    pageSize: 6, //每页显示的信息数目
                    total: 0, //总共的信息数目
                    currentPage: 1 //当前页数
                },

                isDetail: false,//是否展示文章详情
                detailId: '',//获取收文或者发文的详细内容
                detailType: '',//文章类型，是收文还是发文
                detail: {
                    title: '',
                    content: '',
                    day: '',
                    time: '',
                },

                finishedId: '',
                finishedTitle: '',
                finishedStatus: '',
                dialogVisible_finished: false,//确认办结确认框
            };
        },
        methods: {
            handleCurrentChange() {
                //分页
                this.getDate(this.page.currentPage, this.page.pageSize);
            },
            getDate(page, size) {
                let url = `/api/v1/send/on_work/`;
                this.$get(url, {
                    "page": page,
                    "page_size": size,
                })
                    .then((res => {
                        this.page.total = res.data.count;
                        this.tableData = res.data.results;
                    }))
                    .catch(err => {
                        this.$fail("获取文单进度失败")
                    });
            },
            showDetail(row) {
                //展示文章详情
                this.detailId = row.id;
                this.detailType = row.type;
                this.getDetail();
            },
            getDetail() {
                //查看文章详情
                let router = ``;
                if (this.detailType === 'send') {
                    router = `/api/v1/send/${this.detailId}/`
                } else if (this.detailType === 'receive') {
                    router = `/api/v1/receive/${this.detailId}/`
                }
                this.$get(`${router}`)
                    .then((res) => {
                        this.detail.title = res.data.title;
                        this.detail.content = res.data.desc_content;
                        // this.detail.content = res.data.desc_content.replace(/<\/br>/g, '\r\n').replace(/&nbsp;/g, ' ');
                        this.detail.day = res.data.add_time.substring(0, 4)+'年'+res.data.add_time.substring(5, 7)+'月'+res.data.add_time.substring(8, 10)+'日';
                        this.detail.time = res.data.add_time.substring(11, 19);
                        this.isDetail = true;
                    }).catch((err) => {
                    this.$fail(`获取文章内容失败`)
                })
            },
            detailBack() {
                this.isDetail = false;
                this.detail = {
                    title: '',
                    content: '',
                    time: '',
                    day: '',
                };
            },

            //关于办结
            finished(row) {
                //办结
                if (row.status === `已办结`) {
                    this.$message(`当前文件已办结`);
                    return;
                }
                if (row.type === 'send') {
                    //发文限制办结
                    if (row.status_value === '允许办结') {
                        this.finishedStatus = row.type;
                        this.finishedId = row.id;
                        this.finishedTitle = row.title;
                        this.dialogVisible_finished = true;
                    } else {
                        this.$message(`当前状态不可办结`)
                    }
                } else if (row.type === 'receive') {
                    //收文限制办结
                    if (row.status_value === '综合办签发' || row.status_value === '分管处领导审核' || row.status_value === '允许办结') {
                        this.finishedStatus = row.type;
                        this.finishedId = row.id;
                        this.finishedTitle = row.title;
                        this.dialogVisible_finished = true;
                    } else {
                        this.$message(`当前状态不可办结`)
                    }

                }

            },
            finished_sure() {
                //确认办结
                this.$put(`/api/v1/${this.finishedStatus}/${this.finishedId}/end/`)
                    .then((res) => {
                        this.closeDetail_finished();
                        this.getDate(this.page.currentPage, this.page.pageSize);
                        this.$success("办结成功");
                    }).catch((err) => {
                    this.$fail("办结失败");
                })
            },
            closeDetail_finished() {
                //关闭确认办结弹出框
                this.finishedStatus = '';
                this.finishedId = '';
                this.finishedTitle = '';
                this.dialogVisible_finished = false;
            },
        },
        mounted() {
            this.getDate(this.page.currentPage, this.page.pageSize);
        },
    };
</script>

<style lang="scss" scoped TYPE="text/scss">
    $everyHeaderHeight: 90px; //引入的公共header组件的高度
    $paddingWidth: 40px; //整体padding-left和padding-right的长度

    $headerHeight: 40px; //header的高度
    $headerFontSize: 25px; //header的字体大小
    $headerLetterSpacing: 2px; //header的字间距

    $buttonBorderColor: #259b24; //按钮边框的颜色
    $buttonBackColor: rgb(37, 155, 36); //按钮中字体的颜色
    $buttonOnBackColor: #1aad19; //按钮点击之后的背景颜色
    $buttonOnColor: white; //按钮点击之后的字体颜色
    $buttonHeight: 40px; //按钮的高度
    $buttonWidth: 90px; //按钮的宽度

    .changeRate {
        padding: 0 $paddingWidth;
        height: 100%;
        background-color: white;
        .el-dialog {
            .total_rate,
            .change_title,
            .now_rate,
            .chooseRate {
                height: 40px;
                line-height: 40px;
            }
            .chooseRate {
                float: left;
            }
            &:after {
                display: block;
                clear: both;
                height: 0;
                overflow: hidden;
                visibility: hidden;
                content: "";
            }
        }
        .header {
            height: $headerHeight;
            line-height: $headerHeight;
            letter-spacing: $headerLetterSpacing;
            font-size: $headerFontSize;
        }
        .content {
            /*border: 1px solid black;*/
            margin: 0px 0 0 -10px;
            height: calc(100% - #{$everyHeaderHeight} - #{$headerHeight} - 35px);
            background-color: white;
            .changeButton {
                margin: 20px 0 0 15px;
                .button {
                    cursor: pointer;
                    border: 1px solid $buttonBorderColor;
                    border-radius: 5px;
                    color: $buttonBackColor;
                    letter-spacing: $headerLetterSpacing;
                    text-indent: $headerLetterSpacing;
                    height: $buttonHeight;
                    width: $buttonWidth;
                    float: left;
                    line-height: $buttonHeight;
                    text-align: center;
                }
                .button_on {
                    background-color: $buttonOnBackColor;
                    color: $buttonOnColor;
                }
                .button:nth-child(2),
                .button:nth-child(3) {
                    margin-left: 30px;
                }
                &:after {
                    display: block;
                    clear: both;
                    height: 0;
                    overflow: hidden;
                    visibility: hidden;
                    content: "";
                }
            }
            .el-table {
                margin-top: 25px;
            }
            .el-pagination {
                text-align: center;
                margin-top: 20px;
            }
        }
    }
</style>



















