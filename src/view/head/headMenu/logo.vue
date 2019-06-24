<template>
    <el-col
            :span="17"
            class="head-col"
    >
        <div class="head-div">
            <img class="head-logo" src="../../../../statics/images/logo.png">
            <span class="head-span">电子科技大学计划财务处</span>
        </div>
    </el-col>
</template>

<script>
    export default {
        name: ""
    }
</script>

<style scoped>
    .head-col {
        height: 100%;
        float: left;
    }

    .head-div {
        height: 100%;
    }
    .head-span {
        width: 198px;
        height: 16px;
        line-height: 16px;
        color: rgba(255, 255, 255, 1);
        font-size: 16px;
        text-align: left;
        float: left;
        position: relative;
        margin-top: -8px;
        top: 50%;
        /*font-family: SourceHanSansSC-regular;*/
    }

    .head-logo {
        display: block;
        float: left;
        height: 25px;
        position: relative;
        margin-left: 20px;
        margin-top: -12.5px;
        margin-right: 10px;
        top: 50%;
    }
</style>