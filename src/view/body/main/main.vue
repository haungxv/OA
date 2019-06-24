<template>
    <el-col :xs="24" :md="layoutSize" :sm="layoutSize" :lg="layoutSize" v-loading.fullscreen.lock="loading"
            element-loading-text="请稍等"
            element-loading-background="rgba(0, 0, 0, 0.9)"
    >
        <div class="body-main">
            <transition class="fades">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </transition>
        </div>
    </el-col>
</template>

<script>
    export default {
        data() {
            return {
                loading: false
            }
        },
        computed: {
            //根据是否点击发文收文按钮以及是否处于收发文页面，自动调整body占据栅格数
            layoutSize() {
                this.loading = true;
                let show = this.$store.state.asides[1] || this.$store.state.asides[2] || !this.$store.state.showPage;
                setTimeout(() => {
                    this.loading = false;
                }, 500);
                if (show) {
                    return 24
                }
                return 20
            }
        }
    }
</script>

<style scoped>
    .body-main {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .fades-enter-active, .fades-leave-active {
        transition: all 0.5s;
    }

    .fades-enter, .fades-leave-to {
        opacity: 0;
    }
</style>