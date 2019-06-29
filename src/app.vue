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

