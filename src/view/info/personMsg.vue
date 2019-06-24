<template>
    <div class="box personMsg">
        <little-header :name="everyHeader.title" :src="everyHeader.src"></little-header>
        <div class="header">修改个人信息</div>
        <el-form :model="form" :rules="rules" ref="form" label-position="right" label-width="100px">
            <el-form-item label="工 号：" prop="code">
                <el-input v-model="form.code"></el-input>
            </el-form-item>
            <el-form-item label="姓 名：" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="科 室：" prop="room">
                <el-input v-model="form.room"></el-input>
            </el-form-item>
            <el-form-item label="角 色：" prop="role">
                <el-input v-model="form.role"></el-input>
            </el-form-item>
            <el-form-item label="电 话：" prop="phone">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="邮 箱：" prop="email">
                <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="状 态：" prop="status">
                <el-input v-model="form.status"></el-input>
            </el-form-item>
        </el-form>
        <div class="footer">
            <el-button @click="resetForm('form')">重置</el-button>
            <el-button type="primary" @click="confirmInfo('form')">确 定</el-button>
        </div>
    </div>
</template>

<script>
    import littleHeader from '../../comonents/everyPage_header.vue'

    export default {
        components: {littleHeader},
        data() {
            return {
                everyHeader: {
                    title: '>>机构个人信息',
                    src: '../../../statics/images/icon1.png',
                },
                form: {//修改信息表单
                    code: '',
                    name: '',
                    room: '',
                    role: '',
                    phone: '',
                    email: '',
                    status: '',
                },
                rules: {//修改信息验证规则
                    code: [{required: true, message: '请输入工号', trigger: 'blur'}],
                    name: [{required: true, message: '请输入姓名', trigger: 'blur'}],
                    room: [{required: true, message: '请选择科室', trigger: 'blur'}],
                    role: [{required: true, message: '请输入角色', trigger: 'blur'}],
                    phone: [{required: true, message: '请输入联系方式', trigger: 'blur'}],
                    email: [{required: true, message: '请输入邮箱', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'}],
                    status: [{required: true, message: '请输入状态', trigger: 'blur'}],
                }
            }
        },
        methods: {
            resetForm(formName) {
                //重置修改信息的表单
                this.$refs[formName].resetFields();
            },
            confirmInfo(formName) {
                //提交修改信息
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let data = this.$qs.stringify({
                            "name": this.form.name,
                            "email": this.form.email,
                            "phone": this.form.phone,
                            "identity_card": this.form.identity_card,
                        });
                        this.$post("/api/v1/users/change/", data)
                            .then((res) => {
                                this.resetForm('form');
                                this.$message({
                                    message: '修改个人信息成功！',
                                    type: 'success'
                                })
                            })
                            .catch(function (err) {
                                this.$message({
                                    message: '修改个人信息失败！',
                                    type: 'error'
                                })
                            });
                    }
                });
            },
        },
        mounted() {

        }
    }
</script>

<style lang="scss" scoped TYPE="text/scss">
    $everyHeaderHeight: 90px; //引入的公共header组件的高度

    $paddingLeft: 40px; //整体padding-left的长度

    $headerHeight: 30px; //header的高度
    $headerFontSize: 25px; //header的字体大小
    $headerLetterSpacing: 1.5px; //header的字间距

    .personMsg {
        padding:0 $paddingLeft;
        .header {
            height: $headerHeight;
            line-height: $headerHeight;
            letter-spacing: $headerLetterSpacing;
            font-size: $headerFontSize;
        }
        .el-form {
            margin: 30px auto;
            width:500px;
        }
        .footer {
            text-align: center;
            .el-button{
                width:90px;
            }
            .el-button:nth-child(1) {
                margin-left: 60px;
            }
            .el-button:nth-child(2) {
                margin-left: 120px;
            }
        }
    }

</style>


