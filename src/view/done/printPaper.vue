<template>
    <div class="printPaper">
        <el-button @click="print" class="print">点击打印</el-button>
        <el-button @click="back" class="back">返回</el-button>

        <div class="title">电子科技大学计划财务处文单</div>
        <!--发文字号、印发份数-->
        <div class="row row_1">
            <span class="one"><span class="little_title">{{data[0].name}}</span><span class="little_content">{{data[0].value}}</span></span>
            <span class="two"><span class="little_title">{{data[1].name}}</span><span class="little_content">{{data[1].value}}</span></span>
        </div>
        <!--文件标题-->
        <div class="row row_2"><span class="little_title">{{data[2].name}}</span><span class="little_content">{{data[2].value}}</span>
        </div>
        <!--主送/发至-->
        <div class="row row_3"><span class="little_title">{{data[3].name}}</span><span class="little_content">{{data[3].value}}</span>
        </div>
        <!--抄送-->
        <!--<div class="row row_4"><span class="little_title">{{data[4].name}}</span><span class="little_content">{{data[4].value}}</span>-->
        <!--</div>-->
        <!--公开属性、拟稿人-->
        <div class="row row_5">
            <span class="one"><span class="little_title">{{data[5].name}}</span><span class="little_content">{{data[5].value}}</span></span>
            <span class="two"><span class="little_title">{{data[6].name}}</span><span class="little_content">{{data[6].value}}</span></span>
        </div>
        <!--紧急程度、创建时间-->
        <div class="row row_6">
            <span class="one"><span class="little_title">{{data[7].name}}</span><span class="little_content">{{data[7].value}}</span></span>
            <span class="two"><span class="little_title">{{data[8].name}}</span><span class="little_content">{{data[8].value}}</span></span>
        </div>
        <!--一审领导、二审领导-->
        <div class="row row_7"><span class="little_title">{{data[9].name}}</span><span class="little_content" v-html="data[9].value">{{data[9].value}}</span>
        </div>
        <div class="row row_8"><span class="little_title">{{data[10].name}}</span><span class="little_content" v-html="data[10].value">{{data[10].value}}</span>
        </div>
        <!--一审评语-->
        <div class="row row_9"><span class="little_title">{{data[11].name}}</span><span class="little_content" v-html="data[11].value">{{data[11].value}}</span>
        </div>
        <!--综合办签发意见-->
        <div class="row row_10"><span class="little_title">{{data[12].name}}</span><span class="little_content" v-html="data[12].value">{{data[12].value}}</span>
        </div>
        <!--传阅内容-->
        <div class="row" v-for="item in pass_and_read" :key="item.id">
            <span class="little_title">{{item.name}}</span>
            <span class="little_content" v-html="item.value">{{item.value}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['data', 'pass_and_read'],
        data() {
            return {
                // data: [
                //     {
                //         id: 1,
                //         name: '发文字号：',
                //         value: '发文字号',
                //     },
                //     {
                //         id: 2,
                //         name: '印发份数：',
                //         value: '印发份数',
                //     },
                //     {
                //         id: 3,
                //         name: '文件标题：',
                //         value: '哈岁的商的开发你看哈岁的负荷时间开发商的开发时间开发商的开发你看哈岁的负荷计算打发时间开发商的开发你看商的开发你看',
                //     },
                //     {
                //         id: 4,
                //         name: '主送/发至：',
                //         value: '主送/发至',
                //     },
                //     {
                //         id: 5,
                //         name: '抄送：',
                //         value: '抄送',
                //     },
                //     {
                //         id: 6,
                //         name: '公开属性：',
                //         value: '公开属性',
                //     },
                //     {
                //         id: 7,
                //         name: '拟稿人：',
                //         value: '拟稿人',
                //     },
                //     {
                //         id: 8,
                //         name: '紧急程度：',
                //         value: '紧急程度',
                //     },
                //     {
                //         id: 9,
                //         name: '创建时间：',
                //         value: '某科室意见',
                //     },
                //     {
                //         id: 10,
                //         name: '一审领导：',
                //         value: '一审',
                //     },
                //     {
                //         id: 11,
                //         name: '二审领导：',
                //         value: '二审',
                //     },
                //     {
                //         id: 12,
                //         name: '一审评语：',
                //         value: '二审',
                //     },
                //     {
                //         id: 13,
                //         name: '二审评语：',
                //         value: '二审',
                //     },
                //     {
                //         id: 14,
                //         name: '综合办签发意见：',
                //         value: '二审',
                //     },
                // ],//基本内容
                // pass_and_read: [
                //     {
                //         id: 1,
                //         name: '传阅意见：',
                //         value: '部门一：XXX部长&nbsp;&nbsp;&nbsp;&nbsp;时间：2019-06-09<br/>评语内容：XXXXX',
                //     },
                //     {
                //         id: 2,
                //         name: '传阅意见：',
                //         value: '部门一：XXX部长&nbsp;&nbsp;&nbsp;&nbsp;时间：2019-06-09<br/>评语内容：XXXXX',
                //
                //     },
                //     {
                //         id: 3,
                //         name: '传阅意见：',
                //         value: '部门一：XXX部长&nbsp;&nbsp;&nbsp;&nbsp;时间：2019-06-09<br/>评语内容：XXXXX',
                //     },
                //
                // ],//传阅评语内容
            }
        },
        methods: {
            print() {

                document.getElementsByClassName("print")[0].style.display = 'none';
                document.getElementsByClassName("back")[0].style.display = 'none';
                let newstr = document.getElementsByClassName("printPaper")[0].innerHTML;
                let oldstr = document.body.innerHTML;
                document.body.innerHTML = newstr;
                window.print();
                // document.getElementsByClassName("print")[0].style.display = 'block';
                // document.getElementsByClassName("back")[0].style.display = 'block';
                document.body.innerHTML = oldstr;
                //页面打印预览之后，点击事件会失效，暂时的解决办法
                window.location.reload();
            },
            back() {
                this.$emit('backToDetail');
            }
        },
        mounted() {

        }
    }
</script>

<style>
    .printPaper {
        height: 100%;
        /*border: 1px solid black;*/
        background-color: white;
        overflow: auto;
    }

    .title {
        color: #D50101;
        font-weight: 500;
        font-size: 30px;
        letter-spacing: 1px;
        text-align: center;
        height: 150px;
        line-height: 150px;
    }

    .row {
        border-bottom: 1px dotted #D50101;
        padding: 0 0 0 0;
        width: 90%;
        margin-left: 5%;
        min-height: 35px;
        line-height: 35px;
    }

    .row:after {
        display: block;
        clear: both;
        content: '';
        height: 0;
        visibility: hidden;
        overflow: hidden;
    }

    .little_title {
        color: #D50101;
        float: left;
        display: inline-block;
        text-align: right;
        width: 150px;
        /*border:1px solid black;*/
    }

    .little_content {
        display: inline-block;
        float: left;
        max-width: calc(100% - 150px);
    }

    .one, .two {
        display: inline-block;
        width: 50%;
        float: left;
        box-sizing: border-box;
    }

    .printPaper .print {
        /*margin-left: 5%;*/
    }

</style>