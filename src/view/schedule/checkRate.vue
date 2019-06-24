<template>
    <div class="xv_box changeRate">
        <!--修改进度弹出框-->
        <el-dialog title="修改进度" width="850px" :visible.sync="dialogVisible" :before-close="closeDetail">
            <div class="total_rate">
                整体进度（参考）：&nbsp;&nbsp;草稿&nbsp;—>&nbsp;处长/分管处领导审批&nbsp;—>&nbsp;综合办签发&nbsp;—>&nbsp;传阅&nbsp;—>&nbsp;分管处领导审核&nbsp;—>&nbsp;允许办结—>&nbsp;办结
            </div>
            <div class="change_title">文件名称：&nbsp;&nbsp;{{changeForm.title}}</div>
            <div class="now_rate">当前进度：&nbsp;&nbsp;{{changeForm.nowRate}}</div>
            <div class="chooseRate">修改进度：&nbsp;&nbsp;</div>
            <el-select v-model="changeForm.value" placeholder="请选择">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                ></el-option>
            </el-select>
            <span slot="footer" class="dialog-footer">
        <el-button @click="closeDetail">取 消</el-button>
        <el-button type="primary" @click="changeRate_sure">确 定</el-button>
      </span>
        </el-dialog>
        <!--确认办结弹出框-->
        <el-dialog title="是否确认办结" width="600px" :visible.sync="dialogVisible_finished"
                   :before-close="closeDetail_finished">
            <div class="change_title">文件名称：&nbsp;&nbsp;{{finishedTitle}}</div>
            <span slot="footer" class="dialog-footer">
        <el-button @click="closeDetail_finished">取 消</el-button>
        <el-button type="primary" @click="finished_sure">确 定</el-button>
      </span>
        </el-dialog>

        <little-header style="margin-left:40px;font-size: 20px" v-show="isNormal" :name="everyHeader.title"
                       :src="everyHeader.src"></little-header>
        <div class="header" v-show="isNormal">查看进度</div>
        <div class="content" v-show="isNormal">
            <div class="changeButton">
                <div
                        class="button"
                        v-for="item in buttons"
                        :key="item.id"
                        @click="changeButton(item.id)"
                >{{item.name}}
                </div>
            </div>
            <el-table :data="tableData" border>
                <el-table-column label="文件名称" align="center" prop="title"></el-table-column>
                <el-table-column label="拟稿单位" align="center" prop="depart_name"></el-table-column>
                <el-table-column label="当前状态" align="center" prop="status"></el-table-column>
                <el-table-column label="创建时间" align="center" prop="add_time"></el-table-column>
                <el-table-column label="操作" align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button @click="showChart(scope.row)" type="text" size="small">查看流程</el-button>
                        <!--<el-button @click="showDetail(scope.row)" type="text" size="small">查看详情</el-button>-->
                        <el-button @click="changeRate(scope.row)" type="text" size="small">修改进度</el-button>
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
                        kind="修改进度"
                        :time="detail.time">
        </article-detail>

        <flow-send v-if="isChart_send"
                   @backToDetail="chartBack"
                   :titleName="chartTitle"
                   :lists="echartLists">
        </flow-send>

        <flow-receive v-if="isChart_receive"
                      @backToDetail="chartBack"
                      :titleName="chartTitle"
                      :lists="echartLists">
        </flow-receive>
    </div>
</template>

<script>
    import littleHeader from "../../comonents/everyPage_header.vue";
    import articleDetail from "./article_details.vue";
    import flowSend from "./flowTree_send.vue";
    import flowReceive from "./flowTree_receive.vue";


    export default {
        components: {littleHeader, articleDetail, flowSend, flowReceive},
        data() {
            return {
                everyHeader: {
                    title: ">>查看进度",
                    src: require("../../../statics/images/4.png")
                },
                buttons: [
                    {
                        id: 0,
                        name: "发文"
                    },
                    {
                        id: 1,
                        name: "收文"
                    },
                    {
                        id: 2,
                        name: "总表"
                    },
                ],
                isNormal: true,
                tableData: [], //表格展示数据
                page: {
                    //分页
                    pageSize: 7, //每页显示的信息数目
                    total: 0, //总共的信息数目
                    currentPage: 1 //当前页数
                },

                dialogVisible: false, //修改进度弹出框
                options: [
                    {
                        value: "0",
                        label: "草稿"
                    },
                    {
                        value: "1",
                        label: "处长/分管处领导审批"
                    },
                    // {
                    //     value: "-2",
                    //     label: "一审不通过"
                    // },
                    {
                        value: "2",
                        label: "综合办签发"
                    },
                    {
                        value: "3",
                        label: "传阅"
                    },
                    {
                        value: "4",
                        label: "分管处领导审核"
                    },
                    // {
                    //     value: "6",
                    //     label: "允许办结"
                    // },
                    // {
                    //     value: "7",
                    //     label: "已办结"
                    // },
                ],
                changeForm: {
                    id: '',
                    type: '',
                    title: '',
                    nowRate: '',
                    rate: '',
                    status: '',
                    pre_status: '',
                },
                number: 0,

                finishedId: '',
                finishedTitle: '',
                finishedStatus: '',
                dialogVisible_finished: false,//确认办结确认框

                isDetail: false,//是否展示文章详情
                detailId: '',//获取收文或者发文的详细内容
                detailType: '',//文章类型，是收文还是发文
                detail: {
                    title: '',
                    content: '',
                    day: '',
                    time: '',
                },

                isChart_send: false,
                isChart_receive: false,//是否展示流程图
                chartTitle: '',//收发文标题
                echartLists: [],//流程图信息的数组

            };
        },
        methods: {
            handleCurrentChange() {
                //分页
                this.getRate(this.number, this.page.currentPage, this.page.pageSize);
            },
            changeButton(number) {
                //点击不同的按钮：总表，发文，收文
                this.page.currentPage = 1;
                this.number = number;
                let length = this.buttons.length;
                for (let i = 0; i < length; i++) {
                    if (i === number) {
                        document
                            .getElementsByClassName("button")
                            [i].setAttribute("class", "button button_on");
                    } else {
                        document
                            .getElementsByClassName("button")
                            [i].setAttribute("class", "button");
                    }
                }
                this.getRate(number, this.page.currentPage, this.page.pageSize);
            },
            getRate(num, page, size) {
                //获取文单进度数据
                let site = '';
                switch (num) {
                    case 0://发文
                        site = "/api/v1/common/sends/";
                        break;
                    case 1://收文
                        site = "/api/v1/common/receives/";
                        break;
                    case 2://总表
                        site = "/api/v1/common/";
                        break;
                }
                this.$get(`${site}`, {
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

            //关于修改进度
            changeRate(row) {
                //修改进度
                if (row.status === `已办结`) {
                    this.$message(`当前文件已办结，不可修改状态`);
                    return;
                }
                this.changeForm.title = row.title;
                this.changeForm.nowRate = row.status;
                this.changeForm.type = row.type;
                this.changeForm.id = row.id;
                this.changeForm.pre_status = row.pre_status;
                if (this.changeForm.pre_status > 4 || Math.abs(this.changeForm.pre_status) > 4) {
                    this.$message(`当前文件状态不可回退`);
                    return
                }
                this.dialogVisible = true;
            },
            changeRate_sure() {
                //确认修改进度

                if (this.changeForm.value === '') {
                    this.$message(`请选择回退状态`);
                    return
                }
                if (this.changeForm.pre_status >= 0) {
                    if (this.changeForm.pre_status < this.changeForm.value) {
                        this.$message(`该文件不可回退到该状态`);
                        return
                    }
                } else {
                    if (Math.abs(this.changeForm.pre_status) - 1 < this.changeForm.value) {
                        this.$message(`该文件不可回退到该状态`);
                        return
                    }
                }
                this.$post(`/api/v1/common/${this.changeForm.id}/back/`, this.$qs.stringify({
                    "type": this.changeForm.type,
                    "new_status": this.changeForm.value
                })).then((res) => {
                    if (res.data.code && res.data.code === '-1') {
                        this.$fail(`${res.data.msg}`);
                    } else {
                        this.changeButton(this.number);
                        this.closeDetail();
                        this.$success("修改进度成功");
                    }
                }).catch((err) => {
                    this.$fail(`注意进度只可回退`);
                })
            },
            closeDetail() {
                //关闭修改进度弹出框
                this.changeForm = {
                    id: '',
                    type: '',
                    title: '',
                    nowRate: '',
                    rate: '',
                    status: '',
                    pre_status: '',
                };
                this.dialogVisible = false;
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
                    if (row.status === '允许办结') {
                        this.finishedStatus = row.type;
                        this.finishedId = row.id;
                        this.finishedTitle = row.title;
                        this.dialogVisible_finished = true;
                    } else {
                        this.$message(`当前状态不可办结`)
                    }
                } else if (row.type === 'receive') {
                    //收文限制办结
                    if (row.status === '综合办签发' || row.status === '分管处领导审核' || row.status === '允许办结') {
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
                        this.changeButton(this.number);
                        this.closeDetail_finished();
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

            //关于查看详情
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
                        // .replace(/<\/br>/g, '\r\n').replace(/&nbsp;/g, ' ');
                        this.detail.day = res.data.add_time.substring(0, 10);
                        this.detail.time = res.data.add_time.substring(11, 19);
                        this.isDetail = true;
                        this.isNormal = false;
                    }).catch((err) => {
                    this.$fail(`获取文章内容失败`)
                })
            },
            detailBack() {
                this.isDetail = false;
                this.isNormal = true;
                this.detail = {
                    title: '',
                    content: '',
                    time: '',
                    day: '',
                };
            },

            //关于查看流程图
            showChart(row) {
                this.chartTitle = row.title;
                console.log(`up:${this.chartTitle}`);
                this.$get(`/api/v1/flow_graph/${row.id}/flow_graph/`, {
                    "type": row.type,
                }).then((res) => {
                    this.echartLists = res.data;
                    if (row.type === 'send') {
                        this.chartTitle = `发文：${row.title}`;
                    } else {
                        this.chartTitle = `收文：${row.title}`;
                    }
                    this.isNormal = false;
                    this.isChart_receive = true;
                }).catch((err) => {
                    this.$fail(`获取流程图信息失败`)
                })
            },
            chartBack() {
                this.isChart_receive = false;
                this.isChart_send = false;
                this.isNormal = true;
                this.chartTitle = '';
                this.echartLists = [];
            },
        },
        mounted() {
            this.changeButton(this.number);
        },
        watch: {
            tableData: function () {
                let len = this.tableData.length;
                for (let i = 0; i < len; i++) {
                    this.tableData[i].add_time = this.tableData[i].add_time.replace('T', " ").substring(0, 19);
                }
            }
        }
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
        overflow: auto;

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

            .total_rate {
                font-size: 15px;
                font-weight: 600;
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
            margin-left: $paddingWidth;
            height: $headerHeight;
            line-height: $headerHeight;
            letter-spacing: $headerLetterSpacing;
            font-size: $headerFontSize;
        }

        .content {
            border: 1px solid white;
            margin: 15px 0 0 calc(#{$paddingWidth} - 10px);
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


