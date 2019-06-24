<template>
    <router-link class="dispatch-link" :to="to" v-if="isTrue" :id="id">
        <button class="dispatch-button" @click=go>{{title}}</button>
    </router-link>
</template>

<script>

    export default {
        props: ["title", "to", "isTrue", "id"],
        methods: {
            go() {
                this.$router.push(this.to.path);
            }
        }
    }
</script>

<style lang="less" TYPE="text/less" scoped>
    .dispatch-button {
        @media screen and (max-width: 768px) {
            width: calc(50% - 20px);
            /*border: 1px solid;*/
            display: inline-block;
            height: 40px;
            margin: 10px;
            padding: 0;
        }
        font-family: PingFangSC-regular;
        font-weight: normal;
        font-size: 16px;
        display: inline-block;
        width: 85px;
        height: 35px;
        border-radius: 5px 5px 5px 5px;
        background-color: rgba(240, 242, 245, 1);
        margin: 20px 25px 10px 25px;
        text-align: center;
        border: 1px solid rgba(5, 5, 5, 0.08);
        transition: all 0.5s;
        &:hover {
            cursor: pointer;
            background-color: rgba(26, 173, 25, 1);
            color: white;
        }
    }

    .exact-active-link {
        button {
            background-color: rgba(26, 173, 25, 1);
            color: white;
        }
    }
</style>