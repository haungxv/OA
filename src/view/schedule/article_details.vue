<template>
    <div class="xv_onlineChange">
        <el-button class="xv_back_button" @click="backToDetail">返回{{kind}}</el-button>
        <div class="xv_bigTitle">电子科技大学计划财务处</div>
        <div class="xv_change_line"></div>
        <div class="xv_change_header">{{title}}</div>
        <div class="xv_change_content" v-html="content">{{content}}</div>
        <div class="xv_right_bottom">
            <div class="xv_bottom_header">计划财务处</div>
            <div class="xv_bottom_day">{{day}}</div>
<!--            <div class="xv_bottom_time">{{time}}</div>-->
        </div>
    </div>
</template>

<script>
    export default {
        name: "onlineChange",
        props: ['content', 'title', 'day', 'time', 'kind'],
        data() {
            return {}
        },
        methods: {
            backToDetail() {
                this.$emit('backToDetail');
            },
        },
        mounted() {

        }
    }
</script>

<style lang="scss">
    @font-face {
        font-family: fangzheng;
        src: url('../../../statics/font/fz.ttf');
    }

    @font-face {
        font-family: fangzhengxiao;
        src: url('../../../statics/font/fzx.ttf');
    }
    .xv_onlineChange {
        overflow: auto;
        background-color: white;
        height: 100%;
        .xv_bigTitle {
            line-height: 2;
            color: rgba(229, 28, 35, 1);
            font-size: 42pt;
            font-weight: 800;
            letter-spacing: 4pt;
            margin-bottom: 10.5pt;
            transform: scaleX(0.7);

            font-family: 'fangzheng';

            text-align: center;
            /*border-bottom: 3px solid rgba(229, 28, 35, 1);*/
        }
        .xv_change_line {
            border-bottom: 3px solid rgba(229, 28, 35, 1);
            width: 90%;
            margin: 0 auto;
        }
        .xv_change_header {
            font-family: 'fangzhengxiao';
            line-height: 2.5;
            width: 100%;
            font-size: 18pt;
            text-align: center;
            font-weight: 400;
        }
        .xv_change_content {
            /*border: 1px solid black;*/
            letter-spacing: 1.4pt;
            line-height: 1.5;
            font-size: 16pt;
            font-family: 仿宋;
            word-wrap: break-word;
            word-break: break-all;
            margin-left:5%;
            width: 90%;
            white-space: pre-line;
        }
        .xv_right_bottom {
            /*border: 1px solid black;*/
            line-height: 1.5;
            width: 85%;
            margin: 0 auto;
            .xv_bottom_header,
            .xv_bottom_day,
            .xv_bottom_time {
                font-family: FangSong;
                line-height: 1.5;
                width: 30%;
                font-size: 16pt;
                text-align: center;
                float: right;
                margin-left: 70%;
            }
            &:after {
                content: '';
                clear: both;
                display: block;
            }
        }

    }

</style>