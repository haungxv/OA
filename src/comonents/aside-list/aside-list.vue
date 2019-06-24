<template>
    <router-link :to='path' :class="activeClass">
        <div class="aside-option" @click="addClass(id)">
            <img class="aside-logo" :src="asideLogo" alt="asideLogo">
            <div class="aside-text">{{asideOption}}</div>
        </div>
        <div class="aside-border"></div>
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
                this.$store.commit('activeAside', id)
            }
        }
    }
</script>

<style lang="less" TYPE="text/less" scoped>

    .aside-a {
        width: 100%;
        height: 70px;
        display: block;
        transition: all .7s;
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
        text-align: left;
        line-height: 70px;
        color: white;
        cursor: pointer;
    }

    .aside-text {
        width: 45%;
        float: left;
        height: 70px;
        font-size: 15px;
        letter-spacing: 2px;
        font-family: SourceHanSansSC-regular;
    }

    .aside-logo {
        float: left;
        display: block;
        width: 20px;
        margin: 25px 6% auto 20%;
    }

    .aside-border {
        clear: both;
        width: 85%;
        margin: 0 auto;
    }

</style>