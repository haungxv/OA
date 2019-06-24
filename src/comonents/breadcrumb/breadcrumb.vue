<template>
    <div class="breadcrumb">
        <router-link to='/home' style="display: block" class="breadcrumb-it" @click="addClass(1)">
            <div class="breadcrumb-item breadcrumb-home breadcrumb-it" @click="addClass(1)">首页</div>
        </router-link>
        <div class="breadcrumb-item breadcrumb-detail breadcrumb-it"> >{{title}}</div>
        <div style="display: none" class="phone-title">{{title}}</div>
    </div>
</template>

<script>
    export default {
        name: 'breadcrumb',
        props: ['title'],
        methods: {
            //添加class的方法，点击后提交该组件的id值，改变其激活状态
            addClass(id) {
                this.$store.commit('activeAside', id);
            }
        }
    }
</script>

<style scoped TYPE="text/less">
    .breadcrumb {
        padding: 10px;
        font-size: 16px;
        font-family: SourceHanSansSC-regular;
        text-align: left;
        display: flex;
        cursor: default;
        color: rgba(16, 16, 16, 1);
        margin: 0 auto;
        width: 90%;
    }

    .breadcrumb-home {
        color: black;
        font-weight: 500;
    }

    .breadcrumb-item {
        cursor: pointer;
        float: left;
        width: 100%;
        margin-right: 5px;
    }

    .breadcrumb-detail {
        margin-left: 5px;
    }

    @media screen and (max-width: 768px) {
        .breadcrumb-it {
            display: none;
        }

        .breadcrumb {
            height: auto !important;
            padding: 0 !important;
            width: 100%;
        }

        .phone-title {
            display: block !important;
            padding: 5px 0 5px 20px;
            border-bottom: 1px solid #dcdfe6;
            height: 100%;
            text-align: left;
            font-weight: 600;
            font-size: 17px;
            width: 100%;
        }
    }
</style>