<template>
    <div class="header">
        <img :src="site" class="left_img">
        <span class="title">{{name}}</span>
        <span class="more" @click="more">更多</span>
        <img src="../../statics/images/1.png" class="right_img" @click="more">
    </div>
</template>

<script>
    export default {
        props: ["name", "site", "id"],
        data() {
            return {};
        },
        methods: {
            more() {
                //点击更多之后路由跳转
                let router = "";
                let self = this;
                switch (this.id) {
                    case 1:
                        //发文管理
                        router = "/dispatch/index";
                        self.$store.commit('activeAside', 2);
                        break;
                    case 3:
                        //收文管理
                        router = "/receive/index";
                        self.$store.commit('activeAside', 3);
                        break;
                    case 2:
                        //文单进度
                        router = "/check";
                        self.$store.commit('activeAside', 4);
                        break;
                    case 4:
                        //已完结
                        router = "/done";
                        //提交侧边栏第4个为激活状态
                        self.$store.commit('activeAside', 5);
                        break;
                }
                this.$router.push(`/home${router}`);
            }
        },
        mounted() {
        }
    };
</script>

<style lang="scss" scoped TYPE="text/scss">
    $borderBottomColor: #bbbbbb;
    $moreTextColor: #337cbb;
    $headerHeight: 40px;
    $textHeight: 25px;
    $textFontSize: 14px;

    .header {
        border-bottom: 1px solid $borderBottomColor;
        width: 95%;
        margin-left: 2.5%;
        height: $headerHeight;
        .left_img,
        .right_img {
            height: calc(#{$headerHeight} - 19px);
            width: calc(#{$headerHeight} - 19px);
            margin: 14px 10px 0 0;
        }
        .title,
        .more {
            height: $textHeight;
            line-height: $textHeight;
            margin-top: 15px;
            font-size: $textFontSize;
        }
        .title{
            color:black;
        }
        .left_img {
            display: inline-block;
            float: left;
            margin-left: 5px;
            margin-top: 17px;
            width: 17px;
            height: 17px;
        }
        .title {
            float: left;
        }
        .right_img {
            margin-top: 19px;
            width: 18px;
            height: 15px;
            float: right;
            cursor: pointer;
        }
        .more {
            float: right;
            margin-right: 10px;
            color: $moreTextColor;
            cursor: pointer;
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
</style>


