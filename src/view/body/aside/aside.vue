<template>
    <el-col :span="4">
        <div class="aside">
            <aside-list v-for="option in asideOptions" :path="option.path" :key="option.id"
                        :asideOption="option.asideOption" :asideLogo="option.asideLogo" :id="option.id"
            ></aside-list>
        </div>
    </el-col>
</template>

<script>
    export default {
        data() {
            return {
                asideOptions: [
                    {
                        id: 1,
                        path: '/home',
                        asideOption: '个人工作台',
                        asideLogo: require("../../../../statics/images/work.png"),
                    },
                    {
                        id: 2,
                        path: '/home/dispatch',
                        asideOption: '发文管理',
                        asideLogo: require('../../../../statics/images/dispatch.png'),
                    },
                    {
                        id: 3,
                        path: '/home/receive',
                        asideOption: '收文管理',
                        asideLogo: require('../../../../statics/images/catch.png'),
                    },
                    {
                        id: 4,
                        path: '/home/check',
                        asideOption: '进度查看',
                        asideLogo: require('../../../../statics/images/search.png')
                    },
                    {
                        id: 5,
                        path: '/home/done',
                        asideOption: '已办结',
                        asideLogo: require('../../../../statics/images/done.png')
                    },
                    // {
                    //     id: 6,
                    //     path: '/home/info',
                    //     asideOption: '个人信息'
                    //     , asideLogo: '../../../statics/images/info.png'
                    // },
                ]
            }
        }
    }
</script>

<style scoped>

    .aside {
        height: 100%;
        line-height: 20px;
        /*padding-top: 6%;*/
        background-color: rgba(1, 21, 40, 1);
        text-align: center;
        border: 1px solid rgba(255, 255, 255, 0);
    }


</style>