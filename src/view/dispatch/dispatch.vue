<template>
    <div class="dispatch">
        <breadcrumb :title="data"></breadcrumb>
        <DispatchMenu></DispatchMenu>
    </div>
</template>

<script>
    import DispatchMenu from './dispatch-menu.vue';

    export default {
        components: {
            DispatchMenu
        },
        data() {
            return {
                data: '发文管理'
            }
        },
        mounted() {
            //挂载时提交不显示侧边栏状态信息
            this.$store.commit("changeShowPage")
        }
    }
</script>

<style scoped>
    .dispatch {
        overflow-y: scroll;
        border: 1px solid;
        height: 100%;
        width: 100%;
        padding-top: 20px;
        background-color: rgba(240, 242, 245, 1);
    }
    @media screen and (max-width: 768px) {
        .dispatch{
            padding: 0;
            background-color: white;
        }
    }
</style>