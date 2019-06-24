<template>
    <div class="dispatch-menu">
        <DispatchList></DispatchList>
        <router-view :key="$route.fullPath"></router-view>
    </div>
</template>

<script>
    import DispatchList from './dispatch-list.vue'

    export default {
        components: {
            DispatchList
        }
    }
</script>

<style scoped>
    .dispatch-menu {
        background: white;
        width: 90%;
        margin: 0 auto 30px auto;
        min-height: 700px;
        padding-bottom: 30px;
    }

    @media screen and (max-width: 768px) {
        .dispatch-menu {
            width: 100%;
            padding-top: 20px;
            min-height: auto;
            background-color: white !important
        }
    }
</style>