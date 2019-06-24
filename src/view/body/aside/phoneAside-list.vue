<template>
    <router-link :to='path' :class="activeClass">
        <div class="aside-option" @click="addClass(id)">
            <div class="aside-text">
                <img class="aside-logo" :src="asideLogo" alt="asideLogo">
                {{asideOption}}
            </div>
        </div>
    </router-link>
</template>

<script>
    export default {
        name: 'aside-list',
        props: ['path', 'asideOption', 'asideLogo', "id"],
        computed: {
            //计算属性返回class类，是否为激活状态
            activeClass() {
                //从store仓库获取当前按钮的状态
                let active = this.$store.state.asides[this.id - 1] === 1;
                //返回:Class需要添加的类
                return {
                    "aside-a": true,
                    "aside-active": active
                }
            }
        },
        methods: {
            //添加class的方法，点击后提交该组件的id值，改变其激活状态
            addClass(id) {
                 //选择隐藏
                this.$store.commit('showPhoneAside');
                this.$store.commit('activeAside', id)
            }
        }
    }
</script>

<style lang="less" TYPE="text/less" scoped>

    .aside-a {
        width: 100%;
        height: 30%;
        display: block;
        transition: all .7s;
        text-decoration: none;
        &:hover {
            background-color: rgba(255, 255, 255, 0.09);
        }
    }

    .aside-active {
        background-color: rgba(255, 255, 255, 0.09);
    }

    .aside-option {
        width: 100%;
        height: 100%;
        color: white;
        cursor: pointer;
        text-align: left;
    }

    .aside-text {
        overflow-y: hidden;
        font-size: 13px;
        line-height: 70px;
        width: 100%;
        height: 100%;
        font-family: SourceHanSansSC-regular;
    }

    .aside-logo {
        float: left;
        width: 22px;
        margin-top: 26px;
        margin-left: 10%;
        margin-right: 3%;
    }

</style>