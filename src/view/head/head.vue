<template>
    <el-row class="head-row">
        <Logo></Logo>
        <HomePageButton class="hidden-sm-and-down"></HomePageButton>
        <AccountButton class="hidden-sm-and-down"></AccountButton>
        <Role class="hidden-sm-and-down"></Role>
        <out class="hidden-sm-and-down"></out>
        <PhoneHead class="hidden-md-and-up"></PhoneHead>
    </el-row>
</template>

<script>
    import Logo from './headMenu/logo.vue'
    import HomePageButton from './headMenu/homePageButton.vue'
    import AccountButton from './headMenu/accountButton.vue'
    import Role from "./headMenu/role.vue"
    import PhoneHead from './phoneTip/phone.vue'
    import out from './headMenu/out.vue'


    export default {
        components: {
            Logo,
            HomePageButton,
            AccountButton,
            Role,
            PhoneHead,
            out
        }
    }
</script>

<style scoped>
    .head-row {
        position: relative;
        background-color: #011528;
        line-height: 20px;
        background-color: rgba(1, 21, 40, 1);
        text-align: center;
        box-shadow: 0 0 1px 1px rgba(83, 83, 83, 1);
        border-bottom: 1px solid rgba(255, 255, 255, 0);
        z-index: 99;
    }

</style>