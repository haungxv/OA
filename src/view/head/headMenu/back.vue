<template>
    <el-col
            :span="2"
            class="head-col"
    >

        <div class="head-div">
            <span class="head-span" @click="showOut">退出</span>
        </div>
    </el-col>
</template>

<script>
    export default {
        name: "",
        // addClass(id) {
        //     this.$store.commit('activeAside', id)
        // }
        data() {
            return {
                dialogVisible: false,
            }
        },
        methods: {
            showOut() {
                //修改密码等逻辑，打开弹窗也行
                this.dialogVisible = true;
                console.log(`你好`)
            },
            closeDetail() {
                this.dialogVisible = false;
                console.log(`关闭`)
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
            cursor: pointer;
        }

    }
</style>