<template>
        <el-col
                :span="1"
                class="head-col"
        >

        <router-link to='/home'>
            <div class="head-div" @click="addClass(1)">
                <span class="head-span">主页</span>
            </div>
        </router-link>

        </el-col>
</template>

<script>
    export default {
        methods: {
            addClass(id) {
                this.$store.commit('activeAside', id)
            }
        }
    }
</script>

<style lang="less" scoped>
    .head-col {
        height: 100%;
        float: left;
    }

    .head-div {
        height: 100%;
        width: 100%;
        color: rgba(255, 255, 255, 1);
        display: block;
        float: left;
        font-size: 16px;
        font-family: SourceHanSansSC-regular;
        position: relative;
        z-index: 1;

        .head-span {
            display: block;
            width: 100%;
            height: 16px;
            line-height: 16px;
            font-size: 16px;
            text-align: center;
            position: absolute;
            margin-top: -8px;
            top: 50%;
            z-index: 0;
        }

    }
</style>