<template>
    <div class="receive-menu">
        <receiveList></receiveList>
        <router-view :key="$route.fullPath"></router-view>
    </div>
</template>

<script>
    import receiveList from './receive-list.vue'

    export default {
        components: {
            receiveList
        }
    }
</script>

<style scoped>
    .receive-menu {
        background: white;
        width: 90%;
        margin: 0 auto 30px auto;
        min-height: 700px;
        padding-bottom: 30px;
    }
    @media screen and (max-width: 768px) {
        .receive-menu {
            width: 100%;
            padding-top: 20px;
            min-height: auto;
            background-color: white !important
        }
    }
</style>