<template>
    <el-col :span="24">
        <transition name="fade">
            <div class="aside" v-if="!active">
                <Aside v-for="option in asideOptions" :path="option.path" :key="option.id"
                       :asideOption="option.asideOption" :asideLogo="option.asideLogo" :id="option.id"
                ></Aside>
            </div>
        </transition>
    </el-col>
</template>

<script>
    import Aside from './phoneAside-list.vue'

    export default {
        components: {
            Aside
        },
        data() {
            return {
                asideOptions: [
                    {
                        id: 1,
                        path: '/home',
                        asideOption: '个人工作台',
                        asideLogo: require('../../../../statics/images/work.png'),
                    },
                    {
                        id: 2,
                        path: '/home/dispatch',
                        asideOption: '发文管理',
                        asideLogo: require('../../../../statics/images/dispatch.png'),
                    }, {
                        id: 3,
                        path: '/home/receive',
                        asideOption: '收文管理',
                        asideLogo: require('../../../../statics/images/catch.png'),
                    }
                    // {
                    //     id: 6,
                    //     path: '/home',
                    //     asideOption: '个人信息'
                    //     , asideLogo: '../../../statics/images/info.png'
                    // },
                ]
            }
        },
        computed: {
            active() {
                //获取手机顶部侧边栏显示状态
                return this.$store.state.phoneAside
            }
        },
    }
</script>

<style scoped>

    .aside {
        box-sizing: border-box;
        width: 100%;
        display: block;
        height: 245px;
        background-color: rgba(1, 21, 40, 1);
        border: 1px solid rgba(255, 255, 255, 0);
    }

    .fade-enter-active, .fade-leave-active {
        transition: all .5s;
        height: 245px;
    }

    .fade-enter, .fade-leave-to {
        height: 0;
        opacity: 0;
    }


</style>