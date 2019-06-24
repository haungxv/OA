<template>
    <div class="xv_box personWork">
        <div class="top">
            <div class="button" v-for="item in top_icon" :key="item.id" :id="'d'+item.id">
                <img :src="item.image" @click="changeRouter(item.id)">
                <div class="name" @click="changeRouter(item.id)">{{item.name}}</div>
            </div>
            <div class="incoming">
                <span class="name">待处理</span>
                <span class="type">收文</span>
                <span class="number">{{top_number.incoming}}</span>
            </div>
            <div class="line"></div>
            <div class="outgoing">
                <span class="name">待处理</span>
                <span class="type">发文</span>
                <span class="number">{{top_number.outgoing}}</span>
            </div>
        </div>
        <div class="left hidden-sm-and-down">
            <div class="left_top">
                <little-header
                        :name="little_header[0].name"
                        :site="little_header[0].site"
                        :id="little_header[0].id"
                ></little-header>
                <div class="leftTop_table">
                    <div class="header">
                        <span v-for="item in left_top.title" :key="item.id">{{item.name}}</span>
                    </div>
                    <div class="content" v-for="(file,index) in left_top.content" :key="index">
                        <span v-for="item in file" :key="item.id"
                              @click="sendClick(item.article_id,item.article_status)"
                              class="send_click">{{item.name}}</span>
                    </div>
                </div>
            </div>
            <div class="left_down">
                <little-header
                        :name="little_header[2].name"
                        :site="little_header[2].site"
                        :id="little_header[2].id"
                ></little-header>
                <div class="leftDown_table">
                    <div class="header">
                        <span v-for="item in left_down.title" :key="item.id">{{item.name}}</span>
                    </div>
                    <div class="content" v-for="(file,index) in left_down.content" :key="index">
                        <span v-for="item in file" :key="item.id"
                              @click="receiveClick(item.article_id,item.article_status)" class="receive_click">{{item.name}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="right hidden-sm-and-down">
            <div class="right_top">
                <little-header
                        :name="little_header[1].name"
                        :site="little_header[1].site"
                        :id="little_header[1].id"
                ></little-header>
                <div class="rightTop_table">
                    <div class="header">
                        <span v-for="item in right_top.title" :key="item.id">{{item.name}}</span>
                    </div>
                    <div class="content" v-for="(file,index) in right_top.content" :key="index">
                        <span v-for="item in file" :key="item.id" @click="toRate" class="to_rate">{{item.name}}</span>
                    </div>
                </div>
            </div>
            <div class="right_down">
                <little-header
                        :name="little_header[3].name"
                        :site="little_header[3].site"
                        :id="little_header[3].id"
                ></little-header>
                <div class="rightDown_table">
                    <div class="header">
                        <span v-for="item in right_down.title" :key="item.id">{{item.name}}</span>
                    </div>
                    <div class="content" v-for="(file,index) in right_down.content" :key="index">
                        <span v-for="item in file" :key="item.id" @click="toDone" class="to_done">{{item.name}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import littleHeader from "../../comonents/personWork_header.vue";

    export default {
        components: {littleHeader},
        data() {
            return {
                //顶部涉及的数据
                top_icon: [
                    {
                        id: 1,
                        name: "发文入口",
                        image: require("../../../statics/images/icon4.png")
                    },
                    {
                        id: 2,
                        name: "查看进度",
                        image: require("../../../statics/images/icon3.png")
                    },
                    {
                        id: 3,
                        name: "收文入口",
                        image: require("../../../statics/images/icon2.png")
                    },
                    {
                        id: 4,
                        name: "已办结",
                        image: require("../../../statics/images/icon1.png"),
                    }
                ],
                top_number: {
                    incoming: 0, //未处理收文数量
                    outgoing:
                        0 //未处理发文数量
                },

                //左侧和右侧涉及的总数据
                little_header: [
                    {
                        id: 1,
                        name: "发文工作台",
                        site: require("../../../statics/images/3.png")
                    },
                    {
                        id: 2,
                        name: "文单进度",
                        site: require("../../../statics/images/2.png")
                    },
                    {
                        id: 3,
                        name: "收文工作台",
                        site: require("../../../statics/images/6.png")
                    },
                    {
                        id: 4,
                        name: "已办结",
                        site: require("../../../statics/images/5.png")
                    }
                ],
                content_number: {
                    left_top: 0, //左侧上部的自适应content数量
                    left_down: 0, //左侧下部的自适应content数量
                    right_top: 0, //右侧上部的自适应content数量
                    right_down: 0 //右侧下部的自适应content数量
                },

                //左侧上部涉及的数据
                left_top: {
                    title: [
                        {
                            id: 1,
                            name: "文件名称"
                        },
                        {
                            id: 2,
                            name: "紧急程度"
                        },
                        {
                            id: 3,
                            name: "状态"
                        },
                        {
                            id: 4,
                            name: "时间"
                        },
                        {
                            id: 5,
                            name: "拟稿单位"
                        }
                    ],
                    content: [],
                },

                //左侧下部涉及的数据
                left_down: {
                    title: [
                        {
                            id: 1,
                            name: "文件名称"
                        },
                        {
                            id: 2,
                            name: "紧急程度"
                        },
                        {
                            id: 3,
                            name: "状态"
                        },
                        {
                            id: 4,
                            name: "时间"
                        },
                        {
                            id: 5,
                            name: "来文单位"
                        }
                    ],
                    content: [],
                },

                //右侧上部涉及的数据
                right_top: {
                    title: [
                        {
                            id: 1,
                            name: "文件名称"
                        },
                        {
                            id: 2,
                            name: "当前状态"
                        }
                    ],
                    content: [],
                },

                //右侧下部涉及的数据
                right_down: {
                    title: [
                        {
                            id: 1,
                            name: "文件名称"
                        },
                        {
                            id: 2,
                            name: "时间"
                        },
                        {
                            id: 3,
                            name: "拟稿单位"
                        }
                    ],
                    content: [],
                }
            };
        },
        methods: {
            changeRouter(id) {
                //点击图片之后路由跳转
                let router = "";
                let self = this;
                switch (id) {
                    case 1:
                        //发文管理
                        router = "/dispatch/index";
                        self.$store.commit('activeAside', 2);
                        break;
                    case 2:
                        //文单进度
                        router = "/check";
                        self.$store.commit('activeAside', 4);
                        break;
                    case 3:
                        //收文管理
                        router = "/receive/index";
                        self.$store.commit('activeAside', 3);
                        break;
                    case 4:
                        //已完结
                        router = "/done";
                        //提交侧边栏第4个为激活状态
                        self.$store.commit('activeAside', 5);
                        break;
                }
                this.$router.push(`/home${router}`);
            },
            getContentNumber(name) {
                //计算自适应的内容条数
                let leftTop_height = document.getElementsByClassName(name)[0]
                    .offsetHeight;
                let number = parseInt(leftTop_height / 35 - 1);
                return number;
            },
            getNumber() {
                //获取待处理收文，待处理发文数据
                this.$get('/api/v1/common/stats/')
                    .then((res) => {
                        this.top_number.incoming = res.data.receive;
                        this.top_number.outgoing = res.data.send;
                    })
                    .catch((err) => {
                        this.$fail(`获取待处理收发文数量失败`)
                    })
            },
            getOutGoing() {
                //获取发文工作台
                this.$get("/api/v1/common/sends/", {
                    "page": 1,
                    "page_size": this.content_number.left_top,
                })
                    .then((res => {
                        let data = res.data.results;
                        let len = data.length;
                        let arrTotal = [];
                        for (let i = 0; i < len; i++) {

                            let arr = [
                                {
                                    id: 1,
                                    name: data[i].title,
                                    article_id: data[i].id,
                                    article_status: data[i].status,
                                },
                                {
                                    id: 2,
                                    name: data[i].emergency,
                                    article_id: data[i].id,
                                    article_status: data[i].status,
                                },
                                {
                                    id: 3,
                                    name: data[i].status,
                                    article_id: data[i].id,
                                    article_status: data[i].status,
                                },
                                {
                                    id: 4,
                                    name: data[i].add_time.replace('T', " ").substring(0, 10),
                                    article_id: data[i].id,
                                    article_status: data[i].status,
                                },
                                {
                                    id: 5,
                                    name: data[i].depart_name,
                                    article_id: data[i].id,
                                    article_status: data[i].status,
                                }
                            ];
                            arrTotal.push(arr);
                        }
                        this.left_top.content = arrTotal;
                    }))
                    .catch(err => {
                        this.$fail("获取发文数据失败")
                    });
            },
            getInComing() {
                //获取收文工作台
                this.$get("/api/v1/common/receives/", {
                    "page": 1,
                    "page_size": this.content_number.left_down,
                })
                    .then((res => {
                        let data = res.data.results;
                        let len = data.length;
                        let arrTotal = [];
                        for (let i = 0; i < len; i++) {
                            let arr = [
                                {
                                    id: 1,
                                    name: data[i].title,
                                    article_id: data[i].id,
                                    article_status: data[i].status,
                                },
                                {
                                    id: 2,
                                    name: data[i].emergency,
                                    article_id: data[i].id,
                                    article_status: data[i].status,
                                },
                                {
                                    id: 3,
                                    name: data[i].status,
                                    article_id: data[i].id,
                                    article_status: data[i].status,
                                },
                                {
                                    id: 4,
                                    name: data[i].add_time.replace('T', ' ').substring(0, 10),
                                    article_id: data[i].id,
                                    article_status: data[i].status,
                                },
                                {
                                    id: 5,
                                    name: data[i].depart_name,
                                    article_id: data[i].id,
                                    article_status: data[i].status,
                                }
                            ];
                            arrTotal.push(arr);
                        }
                        this.left_down.content = arrTotal;
                    }))
                    .catch(err => {
                        this.$fail("获取收文数据失败")
                    });
            },
            getRate() {
                //获取右侧上部的数据——文单进度
                this.$get("/api/v1/common/", {
                    "page": 1,
                    "page_size": this.content_number.right_top,
                })
                    .then((res => {
                        let data = res.data.results;
                        let len = data.length;
                        let arrTotal = [];
                        for (let i = 0; i < len; i++) {
                            let arr = [
                                {
                                    id: 1,
                                    name: data[i].title,
                                },
                                {
                                    id: 2,
                                    name: data[i].status,
                                },
                            ];
                            arrTotal.push(arr);
                        }
                        this.right_top.content = arrTotal;
                    }))
                    .catch(err => {
                        this.$fail("获取文单进度失败")
                    });
            },
            getCompleted() {
                //获取右侧下部数据——已办结
                this.$get("/api/v1/common/finished/", {
                    "page": 1,
                    "page_size": this.content_number.right_down,
                })
                    .then((res => {
                        let data = res.data.results;
                        let len = data.length;
                        let arrTotal = [];
                        for (let i = 0; i < len; i++) {
                            let arr = [
                                {
                                    id: 1,
                                    name: data[i].title,
                                },
                                {
                                    id: 2,
                                    name: data[i].add_time.replace('T', ' ').substring(0, 10),
                                },
                                {
                                    id: 3,
                                    name: data[i].depart_name,
                                },
                            ];
                            arrTotal.push(arr);
                        }
                        this.right_down.content = arrTotal;
                    }))
                    .catch(err => {
                        this.$fail("获取已办结数据失败")
                    });
            },

            sendClick(id, status) {
                let router = '/home/dispatch';
                let number = 2;

                if (this.$store.state.role == 0) {
                    //处理处长的跳转
                    if (status === '处长/分管处领导审批') {
                        this.$router.push(`${router}/approval`);
                        this.$store.commit('activeAside', number);
                    } else {
                        this.$router.push(`${router}/index`);
                        this.$store.commit('activeAside', number);
                    }
                }
                else if (this.$store.state.role == 1) {
                    //处理副处长的跳转
                    if (status === '处长/分管处领导审批') {
                        this.$router.push(`${router}/approval`);
                        this.$store.commit('activeAside', number);
                    } else if (status === '分管处领导审核') {
                        this.$router.push(`${router}/secondapproval`);
                        this.$store.commit('activeAside', number);
                    } else {
                        this.$router.push(`${router}/index`);
                        this.$store.commit('activeAside', number);
                    }

                }
                else if (this.$store.state.role == 2) {
                    //处理综合办的跳转
                    this.$router.push(`${router}/index`);
                    this.$store.commit('activeAside', number);
                }
                else if (this.$store.state.role == 3) {
                    //处理各机构的跳转
                    if (status === '传阅') {
                        this.$router.push(`${router}/read`);
                        this.$store.commit('activeAside', number);
                    }else if (status === '已办结') {
                        this.$router.push(`${router}/done`);
                        this.$store.commit('activeAside', number);
                    } else {
                        this.$router.push(`${router}/index`);
                        this.$store.commit('activeAside', number);
                    }
                }
            },
            receiveClick(id, status) {

                let router = '/home/receive';
                let number = 3;

                if (this.$store.state.role == 0) {
                    //处理处长的跳转
                    if (status === '处长/分管处领导审批') {
                        this.$router.push(`${router}/approval`);
                        this.$store.commit('activeAside', number);
                    } else {
                        this.$router.push(`${router}/index`);
                        this.$store.commit('activeAside', number);
                    }
                }
                else if (this.$store.state.role == 1) {
                    //处理副处长的跳转
                    if (status === '处长/分管处领导审批') {
                        this.$router.push(`${router}/approval`);
                        this.$store.commit('activeAside', number);
                    } else if (status === '分管处领导审核') {
                        this.$router.push(`${router}/secondapproval`);
                        this.$store.commit('activeAside', number);
                    } else {
                        this.$router.push(`${router}/index`);
                        this.$store.commit('activeAside', number);
                    }

                }
                else if (this.$store.state.role == 2) {
                    //处理综合办的跳转
                    this.$router.push(`${router}/index`);
                    this.$store.commit('activeAside', number);
                }
                else if (this.$store.state.role == 3) {
                    //处理各机构的跳转
                    if (status === '传阅') {
                        this.$router.push(`${router}/read`);
                        this.$store.commit('activeAside', number);
                    }else if (status === '已办结') {
                        this.$router.push(`${router}/done`);
                        this.$store.commit('activeAside', number);
                    }  else {
                        this.$router.push(`${router}/index`);
                        this.$store.commit('activeAside', number);
                    }
                }
            },
            toRate() {
                this.$router.push(`/home/check`);
                this.$store.commit('activeAside', 4);
            },
            toDone() {
                this.$router.push(`/home/done`);
                this.$store.commit('activeAside', 5);
            },
        },
        mounted() {
            this.content_number.left_top = this.getContentNumber("leftTop_table");
            this.content_number.left_down = this.getContentNumber("leftDown_table");
            this.content_number.right_top = this.getContentNumber("rightTop_table");
            this.content_number.right_down = this.getContentNumber("rightDown_table");
            this.$nextTick(() => {
                this.getNumber();
                this.getOutGoing();
                this.getInComing();
                this.getRate();
                this.getCompleted();
            });
        }
    };
</script>

<style lang="scss" scoped TYPE="text/scss">
    $backgroundColor: rgb(240, 242, 245); //背景颜色

    $contentHeight: 35px; //四个模块表格的行高
    $textFontSize: 14px; //四个模块表格的字体大小
    $borderBottomColor: #ebeef5; //四个模块表格的表格底线颜色

    $topHeight: 160px; //最上部的高度
    $topButtonWidth: 18.5%; //最上部每个大按钮的总宽度
    $topButtonNameHeight: 40px;

    $leftWidth: 64%; //下部布局左侧整体的宽度
    $rightTopHeight: 60%; //下部布局 右侧内部 上部分的高度

    .personWork {
        .top {
            height: $topHeight;
            @media screen and (max-width: 768px) {
                margin: 0 auto 0 auto;
                width: auto;
                padding-top: 100px;
                height: auto;
                float: none;
                clear: both;
            }

            .button {
                @media screen and (max-width: 768px) {
                    float: left;
                    width: 50%;
                    margin: 0 auto;
                }
                float: left;
                height: $topHeight;
                width: $topButtonWidth;
                min-width: $topHeight;

                img {
                    display: block;
                    margin: 20px auto 0;
                    width: calc(#{$topHeight} - #{$topButtonNameHeight} - 20px);
                    height: calc(#{$topHeight} - #{$topButtonNameHeight} - 20px);
                    cursor: pointer;
                }

                .name {
                    margin: 0 auto;
                    text-align: center;
                    height: $topButtonNameHeight;
                    line-height: $topButtonNameHeight;
                    cursor: pointer;
                }
            }

            .incoming,
            .outgoing {
                @media screen and (max-width: 768px) {
                    display: block;
                    width: calc(50% - 0.5px);
                    margin: 0;
                    padding: 0;
                    /*border: 1px solid;*/
                    float: left;
                    .name, .type, .number {
                        width: 80%;
                        margin: 0 auto;
                        text-align: center;
                    }
                }
                float: left;
                position: relative;
                height: $topHeight;
                width: calc((100% - #{$topButtonWidth * 4} - 1px) / 2);

                .name,
                .type,
                .number {
                    position: absolute;
                    display: inline-block;
                }

                .name {
                    height: 30px;
                    line-height: 30px;
                    top: 40px;
                }

                .type {
                    height: 40px;
                    line-height: 40px;
                    top: 70px;
                }

                .number {
                    top: 110px;
                    font-size: 38px;
                    font-weight: 600;
                }
            }

            .incoming {
                .name {
                    right: 30px;
                }

                .type {
                    right: 37px;
                }

                .number {
                    right: 30px;
                }
            }

            .outgoing {
                .name {
                    left: 30px;
                }

                .type {
                    left: 37px;
                }

                .number {
                    left: 30px;
                }
            }

            .line {
                float: left;
                border-left: 1px solid #bbbbbb;
                width: 1px;
                height: calc(#{$topHeight} - 60px);
                margin-top: 35px;
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

        .left {
            @media screen and (max-width: 768px) {
                .left {
                    display: none;
                }
            }
            float: left;
            width: $leftWidth;
            height: calc(100% - #{$topHeight});

            .left_top,
            .left_down {
                height: calc((100% - 50px) / 2);
                width: 95%;
                margin-bottom: 20px;
                margin-left: 2.5%;
                background-color: white;
            }

            .left_top,
            .left_down {
                margin-top: 10px;

                .send_click, .receive_click {
                    cursor: pointer;
                }

                .leftTop_table, .leftDown_table {
                    height: calc(100% - 40px);
                    width: 95%;
                    margin-left: 2.5%;
                    overflow: hidden;

                    .header,
                    .content {
                        height: $contentHeight;
                        width: 100%;

                        span {
                            display: inline-block;
                            padding-left: 5px;
                            float: left;
                            font-size: $textFontSize;
                            border-bottom: 1px solid $borderBottomColor;
                            height: $contentHeight;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }

                        span:nth-child(1) {
                            width: 30%;
                        }

                        span:nth-child(2) {
                            width: 15%;
                        }

                        span:nth-child(3) {
                            width: 15%;
                        }

                        span:nth-child(4) {
                            width: 20%;
                        }

                        span:nth-child(5) {
                            width: 20%;
                        }
                    }

                    .header {
                        span {
                            line-height: calc(#{$contentHeight} + 5px);
                            color: #909399;
                        }
                    }

                    .content {
                        span {
                            line-height: $contentHeight;
                            color: #606266;
                        }
                    }
                }
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

        .right {
            border: 1px solid $backgroundColor;
            margin-left: $leftWidth;
            height: calc(100% - #{$topHeight});

            .right_top,
            .right_down {
                width: 97.5%;
                margin-bottom: 20px;
                background-color: white;
            }

            .rightTop_table,
            .rightDown_table {
                height: calc(100% - 40px);
                width: 95%;
                margin-left: 2.5%;
                overflow: hidden;

                .header,
                .content {
                    height: $contentHeight;
                    width: 100%;

                    span {
                        display: inline-block;
                        padding-left: 5px;
                        float: left;
                        font-size: $textFontSize;
                        border-bottom: 1px solid $borderBottomColor;
                        height: $contentHeight;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }

                .header {
                    span {
                        line-height: calc(#{$contentHeight} + 5px);
                        color: #909399;
                    }
                }

                .content {
                    span {
                        line-height: $contentHeight;
                        color: #606266;
                    }
                }
            }

            .right_top {
                height: calc((100% - 50px) / 2);
                margin-top: 10px;

                .to_rate {
                    cursor: pointer;
                }

                .rightTop_table {
                    .header,
                    .content {
                        span:nth-child(1) {
                            width: 60%;
                        }

                        span:nth-child(2) {
                            width: 40%;
                        }
                    }
                }
            }

            .right_down {
                height: calc((100% - 50px) / 2);

                .to_done {
                    cursor: pointer;
                }

                .rightDown_table {
                    .header,
                    .content {
                        span:nth-child(1) {
                            width: 33.33%;
                        }

                        span:nth-child(2) {
                            width: 33.33%;
                        }

                        span:nth-child(3) {
                            width: 33.33%;
                        }
                    }
                }
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

        &:after {
            display: block;
            clear: both;
            height: 0;
            overflow: hidden;
            visibility: hidden;
            content: "";
        }
    }

    @media screen and (max-width: 768px) {
        div#d4, div#d2 {
            display: none !important;
        }
    }
</style>


