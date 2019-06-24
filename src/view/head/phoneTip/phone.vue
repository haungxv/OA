<template>
    <el-col :span="3" class="head-phone-col">
        <div class="head-phone-drop" @click="PhoneAsideTurnOn"><img src="../../../../statics/images/phoneTabs.png">
        </div>
    </el-col>
</template>

<script>
    export default {
        methods: {
            PhoneAsideTurnOn() {
                this.$store.commit('showPhoneAside');
            }
        }
    }
</script>

<style lang="less" TYPE="text/less" scoped>
    .head-phone-col {
        height: 100%;
        float: right;
        cursor: pointer;
    }

    .head-phone-drop {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;

    img {
        height: 30%;
        margin: 0 auto;
    }

    &:hover {
        transition: all .7s;
        background-color: rgba(255, 255, 255, 0.09);
    }

    }
</style>