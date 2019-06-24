<template>
    <div class="xv_box completed">
        <little-header style="margin-left:40px" v-show="isNormal" :name="everyHeader.title"
                       :src="everyHeader.src"></little-header>
        <div class="header bigHeader" v-show="isNormal">已办结</div>
        <div class="content" v-show="isNormal">
            <div class="changeButton">
                <div class="button" v-for="item in buttons" :key="item.id" @click="changeButton(item.id)">
                    {{item.name}}
                </div>
            </div>
            <el-table :data="tableData" border>
                <el-table-column label="文件名称" align="center" prop="title"></el-table-column>
                <el-table-column label="紧急程度" align="center" prop="emergency"></el-table-column>
                <el-table-column label="状态" align="center" prop="status"></el-table-column>
                <el-table-column label="时间" align="center" prop="add_time"></el-table-column>
                <el-table-column label="拟稿单位" align="center" prop="depart_name"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button @click="changeTrace(scope.row)" type="text" size="small">修改痕迹</el-button>
                        <el-button @click="showPaper(scope.row)" type="text" size="small">查看文单</el-button>
                        <!--<el-button @click="showDetail(scope.row)" type="text" size="small">查看详情</el-button>-->
                        <el-button @click="onPrint(scope.row)" type="text" size="small">打印</el-button>
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

        <!--查看文章详情-->
        <article-detail v-show="isDetail"
                        @backToDetail="detailBack"
                        :content="detail.content"
                        :title="detail.title"
                        :day="detail.day"
                        kind="已办结"
                        :time="detail.time">
        </article-detail>

        <!--查看文单详情-->
        <print-paper v-if="isPaper"
                     :data="paper_data"
                     :pass_and_read="paper_pass"
                     @backToDetail="printPaperBack">
        </print-paper>

        <!--查看修改痕迹-->
        <change-trace v-if="isChange"
                      :one_one="one_one"
                      :one_two="one_two"
                      :dealer="dealer"
                      @backToDetail="changeBack">
        </change-trace>
    </div>
</template>

<script>
    import littleHeader from "../../comonents/everyPage_header.vue";
    import articleDetail from "../schedule/article_details.vue";
    import printPaper from './printPaper.vue';
    import changeTrace from './changeTrace.vue';

    export default {
        components: {littleHeader, articleDetail, printPaper, changeTrace},
        data() {
            return {
                everyHeader: {
                    title: '>>已办结',
                    src: require('../../../statics/images/4.png'),
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
                tableData: [],//表格展示数据
                page: {
                    //分页
                    pageSize: 7, //每页显示的信息数目
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

                number: 0,//三个按钮切换，当前按钮的ID

                isPaper: false,//文单详情是否展示
                paper_data: [],//文单基本信息
                paper_pass: [],//文单传阅意见

                isChange: false,//修改痕迹是否展示
                one_one: {
                    value: '',
                    name: '',
                    time: '',
                },
                one_two: {
                    value: '',
                    name: '',
                    time: '',
                },
                dealer: {
                    value: '',
                    name: '',
                    time: '',
                },
            }
        },
        methods: {
            handleCurrentChange() {
                //分页
                this.getCompleted(this.number, this.page.currentPage, this.page.pageSize);
            },
            changeButton(number) {
                //点击不同的按钮：总表，发文，收文
                this.page.currentPage = 1;
                let length = this.buttons.length;
                this.number = number;
                for (let i = 0; i < length; i++) {
                    if (i === number) {
                        document.getElementsByClassName("button")[i].setAttribute("class", "button button_on");
                    } else {
                        document.getElementsByClassName("button")[i].setAttribute("class", "button");
                    }
                }
                this.getCompleted(number, this.page.currentPage, this.page.pageSize);
            },
            getCompleted(num, page, size) {
                //已办结
                let site = '';
                switch (num) {
                    case 0://发文
                        site = "/api/v1/common/send_finished/";
                        break;
                    case 1://收文
                        site = "/api/v1/common/receive_finished/";
                        break;
                    case 2://总表
                        site = "/api/v1/common/finished/";
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
                        this.$fail("获取已办结数据失败")
                    });
            },

            //关于打印文章内容
            onPrint(event) {
                if (event.type === 'send') {
                    this.printSend(event);
                } else if (event.type = 'receive') {
                    this.printReceive(event);
                }
            },
            printSend(event) {
                let date = new Date(event.add_time);
                let time = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
                const myWindow = window.open('', '标题');
                let headHtml = document.head.innerHTML;
                headHtml = headHtml.replace('screen', 'screen, print');
                myWindow.document.write('<html>');
                myWindow.document.write(headHtml);
                myWindow.document.write('<body >');
                myWindow.document.write(`<section><div class="print-h1"><span class="print-head">电子科技大学计划财务处</span><div class="print-h3">${event.text_number}</div></div>`);
                myWindow.document.write(`<div class="print-div"><div class="print-div-head">${event.title}</div><p class="print-div-pre">${event.desc_content.replace(/ /g, "&nbsp;")}</p>`);
                myWindow.document.write(`<div class="print-foot"><div class="print-organ">计划财务处</div><div class="print-date">${time}</div></section>`);
                myWindow.document.write('<script>setTimeout(function() {window.print();window.close()}, 500)</');
                myWindow.document.write('script>');
                myWindow.document.write('</body></html>');
            },
            printReceive(event) {
                let date = new Date(event.add_time);
                let time = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
                const myWindow = window.open('', '标题');

                // 获取head标签内的html
                let headHtml = document.head.innerHTML;

                // 头中的screen换成打印样式print
                headHtml = headHtml.replace('screen', 'screen, print');

                //重新写入文档流-->
                // console.log(event.department,event.add_time)
                myWindow.document.write('<html>');
                myWindow.document.write(headHtml);
                myWindow.document.write('<body >');
                myWindow.document.write(`<section><div class="print-h1"><span class="print-head">电子科技大学计划财务处</span><div class="print-h3">${event.text_number}</div></div>`);
                myWindow.document.write(`<div class="print-div"><div class="print-div-head">${event.title}</div><p class="print-div-pre">${event.desc_content.replace(/<\/br>/g, '\r\n').replace(/&nbsp;/g, ' ')}</p>`);
                myWindow.document.write(`<div class="print-foot"><div class="print-organ">计划财务处</div><div class="print-date">${time}</div></section>`);
                myWindow.document.write('<script>setTimeout(function() {window.print();window.close()}, 500)</');
                myWindow.document.write('script>');
                myWindow.document.write('</body></html>');
            },

            //关于查看文章详情
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

            //关于展示文单内容
            showPaper(row) {
                this.$get(`/api/v1/${row.type}/${row.id}/read_${row.type}/`)
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
                this.isNormal = true;
                this.isPaper = false;
            },

            //关于修改痕迹
            changeTrace(row) {
                this.$get(`/api/v1/${row.type}/${row.id}/`)
                    .then((res) => {
                        if (res.data.compare.leaders) {
                            let len = res.data.compare.leaders.length;
                            if (len === 1) {
                                this.one_one.value = res.data.compare.leaders[0].diff.replace(/&amp;nbsp;/g, ' ');
                                this.one_one.name = res.data.compare.leaders[0].user;
                                this.one_one.time = res.data.compare.leaders[0].time;
                            } else if (len === 2) {
                                this.one_one.value = res.data.compare.leaders[0].diff.replace(/&amp;nbsp;/g, ' ');
                                this.one_one.name = res.data.compare.leaders[0].user;
                                this.one_one.time = res.data.compare.leaders[0].time;

                                this.one_two.value = res.data.compare.leaders[1].diff.replace(/&amp;nbsp;/g, ' ');
                                this.one_two.name = res.data.compare.leaders[1].user;
                                this.one_two.time = res.data.compare.leaders[1].time;
                            }
                        }
                        if (res.data.compare.dealer) {
                            this.dealer.value = res.data.compare.dealer.diff.replace(/&amp;nbsp;/g, ' ');
                            this.dealer.name = res.data.compare.dealer.user;
                            this.dealer.time = res.data.compare.dealer.time;

                        }
                        this.isNormal = false;
                        this.isChange = true;
                    }).catch((err) => {

                })
            },
            changeBack() {
                this.isNormal = true;
                this.isChange = false;
                this.one_one = {
                    value: '',
                    name: '',
                    time: '',
                };
                this.one_two = {
                    value: '',
                    name: '',
                    time: '',
                };
                this.dealer = {
                    value: '',
                    name: '',
                    time: '',
                };
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
    }
</script>

<style lang="scss" TYPE="text/scss">
    $everyHeaderHeight: 90px; //引入的公共header组件的高度
    $paddingWidth: 40px; //整体padding-left和padding-right的长度

    $headerHeight: 40px; //header的高度
    $headerFontSize: 25px; //header的字体大小
    $headerLetterSpacing: 2px; //header的字间距

    $buttonBorderColor: #259B24; //按钮边框的颜色
    $buttonBackColor: rgb(37, 155, 36); //按钮中字体的颜色
    $buttonOnBackColor: #1AAD19; //按钮点击之后的背景颜色
    $buttonOnColor: white; //按钮点击之后的字体颜色
    $buttonHeight: 40px; //按钮的高度
    $buttonWidth: 90px; //按钮的宽度

    .completed {
        overflow: auto;
        .header {
            height: $headerHeight;
            line-height: $headerHeight;
            letter-spacing: $headerLetterSpacing;
            font-size: $headerFontSize;
        }
        .bigHeader {
            margin-left: 40px;
        }
        .content {
            border: 1px solid white;
            margin: 15px 0 0 30px;
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
                .button:nth-child(2), .button:nth-child(3) {
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
                margin-top: 20px
            }
        }
    }

    @page {
        size: A4 portrait;
        margin: 2.3cm 1.4cm; /* 国家标准公文页边距 GB/T 9704-2012 */
    }

    section {
        page-break-before: always;
    }

    @font-face {
        font-family: fangzheng;
        src: url('../../../statics/font/fz.ttf');
    }

    @font-face {
        font-family: fx;
        src: url('../../../statics/font/fzx.ttf');
    }
    .print-h1 {
        font-family: fangzheng;
        @media print {
            //padding-top: 1.5cm;
            margin: 0 auto;
            //width: 90% ;
            text-align: center;
            //position: relative;

        }
        .print-head {
            font-family: fangzheng;
            @media Print {
                display: inline-block;
                line-height: 1;
                color: #ff0000;
                font-size: 42pt;
                font-weight: bolder;
                //position: absolute;
                white-space: nowrap;
                width: auto;
                //border: 1px solid;
                letter-spacing: 6pt;
                margin-bottom: 10.5pt;
                transform: scaleX(0.7) scaleY(1);
            }
        }
        .print-h3 {
            @media Print {
                line-height: 2.5;
                width: 85%;
                font-family: SimSun;
                padding-top: 10pt;
                margin: 0 auto 0 auto;
                font-size: 15pt;
                text-align: center;
                border-bottom: 1.5px solid rgba(229, 28, 35, 1);
            }
        }
    }

    .print-div {
        @media Print {
            width: 88%;
            margin: 0 auto;
        }
        .print-div-head {
            font-family: fx;
            @media Print {
                //border: 1px solid;
                line-height: 3;
                padding-top: 5pt;
                //font-family: fx;
                width: 100%;
                font-size: 18pt;
                text-align: center;
                font-weight: 400;
            }
        }
        .print-div-pre {
            //border: 1px solid;
            display: block;
            @media Print {
                //text-indent: 16pt;
                letter-spacing: 0.8pt;
                line-height: 2;
                vertical-align: text-top;
                font-size: 16pt;
                font-family: 仿宋;
                word-wrap: break-word;
                word-break: break-all;
                width: 100%;
                white-space: pre-wrap;

            }
        }
    }

    .print-foot {
        @media Print {
            line-height: 2;
            //width: 75%;
            margin: 23pt auto 0 auto;
        }
        .print-organ {
            @media Print {
                display: block;
                font-family: 仿宋;
                line-height: 2;
                width: 30%;
                font-size: 16pt;
                text-align: center;
                float: right;
                margin-left: 70%;
                font-weight: 600;
                letter-spacing: 1pt;
            }
        }
        .print-date {
            @media Print {
                font-family: 仿宋;
                line-height: 2;
                font-size: 16pt;
                letter-spacing: 0;
                width: 30%;
                float: right;
                font-weight: 600;
                text-align: center;
            }
        }
    }


</style>


