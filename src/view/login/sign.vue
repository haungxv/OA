<template>
    <div class="sign">
        <div class="sign_box">
            <img class="header" src="../../../statics/images/sign_head.png"/>
            <div class="title_1">计划财务处</div>
            <div class="title_2">OA系统</div>
            <el-form :model="form">
                <el-form-item>
                    <img src="../../../statics/images/user.png"/>
                    <input v-model="form.username" class="self-input" type="text" placeholder="请输入账号"/>
                </el-form-item>
                <el-form-item>
                    <img src="../../../statics/images/password.png"/>
                    <input v-model="form.password" class="self-input" type="password" placeholder="请输入密码"/>
                </el-form-item>
            </el-form>
            <div class="login" @click="login">登录</div>
        </div>
        <div class="add">1<div class="dd">1</div></div>
    </div>
</template>

<script>

    import {
        mapState,
        mapMutations,
    } from 'vuex'

    export default {
        name: "sign",
        data() {
            return {
                form: {
                    username: '',
                    password: '',
                },
            }
        },
        methods: {
            login() {
                if (this.form.username === '') {
                    this.$message('请填写用户名！');
                    return
                }
                if (this.form.password === '') {
                    this.$message('请填写密码！');
                    return
                }
                let data = this.$qs.stringify({
                    "username": this.form.username,
                    "password": this.form.password,
                });
                let self = this;
                //登录权限处理********************************
                this.$post("/login/", data)
                    .then((res) => {
                        this.$success(`登录成功`);
                        this['setToken'](res.data.token);
                        this['setRole'](res.data.role);
                        this['setUsername'](res.data.name);

                        sessionStorage.setItem("token", res.data.token);
                        sessionStorage.setItem("role", res.data.role);
                        sessionStorage.setItem("username", res.data.name);

                        this.$router.push('/home');
                    })
                    .catch((err) => {
                        this.$fail(`登陆失败`);
                    })
            },
            ...mapMutations(['setToken', 'setRole','setUsername']),
        }
    }
</script>

<style lang="scss" scoped TYPE="text/scss">
    $signBoxHeight: 500px; //整个登陆框的高度
    $signBoxWidth: 400px; //整个登陆框的宽度

    $bigImgHeight: 100px; //登陆框上部分图标的宽高

    $titleHeight: 65px; //两行文字的高度
    $titleLetterSpacing: 1px; //两行文字的字间距
    $titleFontSize: 23px; //两行文字的字体大小

    $littleImgHeight: 35px; //小图片的宽高

    $inputHeight: 42px; //输入框的高度
    $inputWidth: 240px; //输入框的宽度
    $inputColor: rgba(136, 136, 136, 1); //输入框的字体颜色
    $inputBorderColor: rgba(187, 187, 187, .8); //输入框的边框颜色
    $inputFocusColor: rgb(121, 171, 254); //输入框获取焦点时的边框颜色
    $inputFontSize: 14px; //输入框字体的大小

    $loginColor: white; //登录框字体颜色
    $loginBackColor: rgba(26, 173, 25, 1); //登陆框背景颜色
    $loginWidth: 300px; //登陆框宽度
    $loginHeight: 40px; //登陆框高度
    $loginFontSize: 18px; //登陆框字体大小
    $loginFontWeight: 500; //登陆框字体粗细
    $loginLetterSpacing: 3px; //登陆框字体间距
    .sign {
        width: 100%;
        height: 100%;
        background-image: url("../../../statics/images/sign_back.jpg");
        background-size: 100% 100%;
        overflow: hidden;
        position: relative;
        .sign_box {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            width: $signBoxWidth;
            height: $signBoxHeight;
            box-shadow: 0 0 8px 5px rgba(0, 0, 0, 0.06);
            border: 1px solid rgba(255, 255, 255, 0);
            border-radius: 11px;
            background-color: white;
            text-align: center;
            img.header {
                height: $bigImgHeight;
                width: $bigImgHeight;
                margin-top: calc(0px - (#{$bigImgHeight} / 2));
            }
            .title_1, .title_2 {
                /*border: 1px solid black;*/
                letter-spacing: $titleLetterSpacing;
                text-indent: $titleLetterSpacing;
                height: $titleHeight;
                font-size: $titleFontSize;
            }
            .title_1 {
                line-height: calc(#{$titleHeight} + 25px);
            }
            .title_2 {
                line-height: calc(#{$titleHeight} - 25px);
            }
            .el-form {
                img {
                    height: $littleImgHeight;
                    width: $littleImgHeight;
                    margin: calc((#{$inputHeight} - #{$littleImgHeight}) / 2 + 20px) 30px 0 40px;
                    float: left;
                }
                .self-input {
                    border-radius: 4px;
                    border: 1px solid $inputBorderColor;
                    color: $inputColor;
                    display: block;
                    float: left;
                    font: $inputFontSize Microsoft Yahei;
                    box-shadow: 0 0 4px 0 rgba(170, 170, 170, 0.2);
                    width: $inputWidth;
                    height: $inputHeight;
                    line-height: $inputHeight;
                    outline: none;
                    margin-top: 20px;
                    padding: 0 15px;
                }
                input:focus {
                    box-shadow: 0 0 4px 0 $inputFocusColor;
                    border: 1px solid $inputFocusColor;
                }
            }
            .login {
                width: $loginWidth;
                height: $loginHeight;
                line-height: $loginHeight;
                margin: 50px auto 0;
                border-radius: 5px;
                background-color: $loginBackColor;
                color: $loginColor;
                text-align: center;
                letter-spacing: $loginLetterSpacing;
                text-indent: $loginLetterSpacing;
                font-weight: $loginFontWeight;
                font-size: $loginFontSize;
                cursor: pointer;
            }
        }
    }
    @font-face {
        font-family: fangzheng;
        src: url('../../../statics/font/fz.ttf');
    }

    @font-face {
        font-family: fangzhengxiao;
        src: url('../../../statics/font/fzx.ttf');
    }
    .add{
        opacity: 0;
        position: absolute;
        margin-left: -999px;
        font-family: fangzheng;
        .dd{
            opacity: 0;
            position: absolute;
            margin-left: -999px;
            font-family: fangzhengxiao;
        }
    }
</style>