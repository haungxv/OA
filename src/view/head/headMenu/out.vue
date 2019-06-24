<template>
    <el-col
            :span="1"
            class="head-col"
    >
        <div class="head-div" @click="out">
            <span class="head-span">退出</span>
        </div>
    </el-col>
</template>

<script>
    import {
        mapMutations,
    } from 'vuex'

    export default {
        methods: {
            out() {
                console.log('sdsd')
                this['setToken'](' ');
                this['setRole'](' ');
                this['setUsername'](' ');

                sessionStorage.setItem("token", '');
                sessionStorage.setItem("role", '');
                sessionStorage.setItem("username", '');

                this.$router.push('/sign');

            },
            ...mapMutations(['setToken', 'setRole', 'setUsername']),
        }
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
        float: left;
        position: relative;
        margin-top: -8px;
        top: 50%;
        font-family: SourceHanSansSC-regular;
        overflow: hidden;
        text-align: left;
        cursor: pointer;
    }
</style>