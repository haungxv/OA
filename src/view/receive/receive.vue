<template>
    <div class="receive">
        <breadcrumb :title="data"></breadcrumb>
        <receiveMenu></receiveMenu>
    </div>
</template>

<script>
    import receiveMenu from './receive-menu.vue';

    export default {
        components: {
            receiveMenu
        },
        data() {
            return {
                data: '收文管理'
            }
        },
        mounted() {
            //挂载时提交不显示侧边栏状态信息
            this.$store.commit("changeShowPage")
        }
    }
</script>

<style scoped>
    .receive {
        overflow-y: scroll;
        border: 1px solid;
        height: 100%;
        width: 100%;
        padding-top: 20px;
        background-color: rgba(240, 242, 245, 1);
    }
    @media screen and (max-width: 768px) {
        .receive{
            padding: 0;
            background-color: white;
        }
    }

</style>