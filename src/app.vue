<template>
    <div class="app">
        <Head class="head"></Head>
        <Body class="body"></Body>
    </div>
</template>

<script>
    import Head from './view/head/head.vue'
    import Body from './view/body/body.vue'

    export default {
        components: {
            Head,
            Body
        },
        mounted() {
            console.log(this.$refs.phoneAside)
        },
        created() {
            // 在页面加载时读取sessionStorage里的状态信息
            // if (sessionStorage.length) {
            //     this.$store.state.token = sessionStorage.getItem("token");
            //     this.$store.state.role = sessionStorage.getItem("role");
            //     this.$store.state.userName = sessionStorage.getItem("userName");
            // }

            // 在页面刷新时将vuex里的信息保存到sessionStorage里
            // window.addEventListener("beforeunload", () => {
            //     sessionStorage.setItem("token", this.$store.state.token);
            //     sessionStorage.setItem("role", this.$store.state.role);
            //     sessionStorage.setItem("userName", this.$store.state.userName);
            // })
        }
    }
</script>

<!--不可以使用type属性-->
<style lang="less" scoped>
    .app {
        width: 100%;
        height: 100%;
    }

    .head {
        width: 100%;
        height: 9%;
    }

    .body {
        width: 100%;
        height: 91%;
    }
</style>

