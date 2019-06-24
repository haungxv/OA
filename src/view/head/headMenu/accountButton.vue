<template>
    <el-col
            :span="2"
            class="head-col"
    >
        <div class="head-div">
            <span class="head-span" @click="showOut">修改密码</span>
        </div>
        <div class="changePassword" v-if="dialogVisible">
            <el-form :model="form" :rules="rules" ref="ruleForm" label-position="right" label-width="110px"
                     class="changeForm">
                <el-form-item label="旧密码：" prop="old">
                    <el-input v-model="form.old"></el-input>
                </el-form-item>
                <el-form-item label="新密码：" prop="pass">
                    <el-input v-model="form.pass"></el-input>
                </el-form-item>
                <el-form-item label="确认密码：" prop="repass">
                    <el-input v-model="form.repass"></el-input>
                </el-form-item>
            </el-form>
            <div class="footer">
                <el-button @click="closeChange">取消</el-button>
                <el-button type="primary" @click="confirmChange('ruleForm')">确 定</el-button>
            </div>
        </div>
        <div class="backBlack" v-if="dialogVisible" @click="closeChange"></div>
    </el-col>
</template>

<script>
    export default {
        name: "",
        // addClass(id) {
        //     this.$store.commit('activeAside', id)
        // }
        data() {
            return {
                dialogVisible: false,
                form: {
                    pass: '',
                    repass: '',
                    old: '',
                },
                rules: {
                    old: [
                        {required: true, message: '请输入旧密码', trigger: 'blur'},
                    ],
                    pass: [
                        {required: true, message: '请输入新密码', trigger: 'blur'},
                    ],
                    repass: [
                        {required: true, message: '请确认密码', trigger: 'blur'},
                    ],
                }
            }
        },
        methods: {
            showOut() {
                this.dialogVisible = true;
            },
            confirmChange(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.form.pass !== this.form.repass) {
                            this.$message(`两次密码输入不一致`);
                            return;
                        }
                        this.$post(`/api/v1/user/reset_pwd/`, this.$qs.stringify({
                            "old_pwd": this.form.old,
                            "new_pwd": this.form.pass,
                        })).then((res) => {
                            this.$success(`修改密码成功`);
                            this.closeChange();
                        }).catch((err) => {
                            this.$fail(`修改密码失败`);
                        })
                    }
                })
            },
            closeChange() {
                this.dialogVisible = false;
                this.form = {
                    old: '',
                    pass: '',
                    repass: '',
                };
            },
        }
    }
</script>

<style lang="less" scoped>
    .head-col {
        height: 100%;
        float: left;
    }

    .head-div {
        height: 100%;
        width: 100%;
        color: rgba(255, 255, 255, 1);
        display: block;
        font-size: 16px;
        font-family: SourceHanSansSC-regular;
        position: relative;
        z-index: 1;

        .head-span {
            display: block;
            width: 100%;
            height: 16px;
            line-height: 16px;
            font-size: 16px;
            text-align: center;
            position: absolute;
            margin-top: -8px;
            top: 50%;
            z-index: 0;
            cursor: pointer;
        }

    }

    .changePassword {
        position: fixed;
        left: 50%;
        top: 50%;
        margin-left: -250px;
        margin-top: -170px;
        width: 500px;
        height: 300px;
        z-index: 3;
        background-color: white;
    }

    .changeForm {
        /*border: 1px solid black;*/
        margin-top: 40px;
        margin-right: 30px;
    }

    .backBlack {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 2;
    }

</style>