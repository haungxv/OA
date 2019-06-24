<template>
    <el-col
            :span="3"
            class="head-col"
    >
        <div class="head-div">
            <img class="head-logo" src="../../../../statics/images/role.png">
            <span class="head-span">{{name}}</span>
        </div>
    </el-col>
</template>

<script>
    export default {
        computed: {
            name() {
                return this.$store.state.userName;
            }
        },

    }
</script>

<style scoped>
    .head-col {
        height: 100%;
        float: left;
    }

    .head-div {
        height: 100%;
        margin: 0 auto;
    }

    .head-span {
        width: 60%;
        height: 16px;
        line-height: 16px;
        color: rgba(255, 255, 255, 1);
        font-size: 15px;
        text-align: left;
        float: left;
        position: relative;
        margin-top: -8px;
        top: 50%;
        font-family: SourceHanSansSC-regular;
        overflow: hidden;
    }

    .head-logo {
        display: block;
        float: left;
        height: 25px;
        position: relative;
        margin-top: -12.5px;
        margin-right: 5px;
        margin-left: 15%;
        top: 50%;
    }
</style>