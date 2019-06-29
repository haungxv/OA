<template>
    <div>
        <el-row class="body-row">
            <PhoneAside class="hidden-md-and-up"></PhoneAside>
            <transition name="el-fade-in">
                <Aside class="body-col hidden-sm-and-down" v-if="asideHidden"></Aside>
            </transition>
            <Main class="body-col-main"></Main>
        </el-row>
    </div>
</template>

<script>
    import Aside from './aside/aside.vue'
    import Main from './main/main.vue'
    import PhoneAside from './aside/phoneAside.vue'

    export default {
        components: {
            Aside,
            Main,
            PhoneAside
        },
        computed: {
            //根据aside点击状态以及是否处于收发文页面，来判断收发文时隐藏侧边栏
            asideHidden() {
                return !this.$store.state.asides[1] && !this.$store.state.asides[2] && this.$store.state.showPage;
            }
        },
        //将机构号传入store状态里面
        mounted() {
            let url = `/api/v1/user/signed_people/`;
            let url2=`/api/v1/user/leader/`
            let self = this;
            this.$get(url).then(
                function (e) {
                    self.$store.state.departmentName = e.data;
                }
            )
            this.$get(url2).then(
                function (e) {
                    self.$store.state.leader = e.data;
                }
            )
        }
    }
</script>

<style scoped>
    .body-row, .body-col {
        height: 100%;
    }

    .body-row {
        transition: all 0.5s;
        overflow: hidden;
    }

    .body-col-main {
        height: 100%;
        margin: 0 auto;
    }
</style>