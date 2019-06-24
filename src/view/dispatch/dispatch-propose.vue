<template>
    <div>
        <el-form ref="form" :model="form" :rules="rules" label-width="100px" labelPosition="left" id="Print"
                 class="dispatch-propose-form">
            <el-form-item>
                <el-button type="primary" @click="onSubmit" class="dispatch-propose-head-button1">发送</el-button>
                <el-button type="primary" @click="save" class="dispatch-propose-head-button2">保存</el-button>
            </el-form-item>
            <div class="dispatch-propose-title">电子科技大学计划财务处发文单</div>
            <!--<Form></Form>-->
            <!--<el-form-item label="发文字号:" prop="text_number">-->
            <!--<el-select v-model="form.text_number" placeholder="请选择拟发文字号">-->
            <!--<el-option label="处办〔2019〕1号" value="处办〔2019〕1号"></el-option>-->
            <!--<el-option label="通知〔2019〕1号" value="通知〔2019〕1号"></el-option>-->
            <!--<el-option label="财函〔2018〕1号" value="财函〔2018〕1号"></el-option>-->
            <!--<el-option label="改纪〔2018〕9号" value="改纪〔2018〕9号"></el-option>-->
            <!--</el-select>-->
            <!--&lt;!&ndash;<el-select v-model="form.text_number" placeholder="请选择拟发文字号">&ndash;&gt;-->
            <!--&lt;!&ndash;<el-option  v-for="obj in text_num" :label=obj.name value=obj.name></el-option>&ndash;&gt;-->
            <!--&lt;!&ndash;</el-select>&ndash;&gt;-->
            <!--</el-form-item>-->
            <el-form-item label="印发份数:" prop="print_sum">
                <el-input v-model="form.print_sum"></el-input>
            </el-form-item>
            <el-form-item label="标题:" prop="title">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="主送/发至:">
                <el-input v-model="form.destination"></el-input>
            </el-form-item>
            <!--<el-form-item label="抄送:">-->
            <!--<el-input v-model="form.cc"></el-input>-->
            <!--</el-form-item>-->
            <el-form-item label="公开属性:" prop="public">
                <el-select v-model="form.public" placeholder="请选择公开属性">
                    <el-option label="公开" value='true'></el-option>
                    <el-option label="不公开" value='false'></el-option>
                </el-select>
            </el-form-item>
            <!--<el-form-item label="拟稿机构:" prop="department">-->
            <!--<el-select v-model="form.department" placeholder="请选择拟稿机构">-->
            <!--<el-option label="机构1" value=1></el-option>-->
            <!--<el-option label="机构2" value=2></el-option>-->
            <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="拟稿人:" prop="people">-->
            <!--<el-input v-model="form.people"></el-input>-->
            <!--</el-form-item>-->
            <el-form-item label="紧急程度:" prop="emergency">
                <el-select v-model="form.emergency" placeholder="请选择紧急程度">
                    <el-option label="无" value="0"></el-option>
                    <el-option label="普通" value="1"></el-option>
                    <el-option label="紧急" value="2"></el-option>
                    <el-option label="特急" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="领导审批:" prop="first_check_leader">
                <el-select v-model="form.first_check_leader" placeholder="请选择分管领导">
                    <el-option v-for="(lead,index) in leader"  :label=lead.title+lead.name :value=lead.id
                               :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="正文:" size="medium" prop="desc_content">
                <!--<el-input type="textarea" v-model="form.desc_content"></el-input>-->
                <mavon-editor v-model="form.desc_content" :toolbars="toolbars"/>
            </el-form-item>
            <el-form-item label="附件:">
                <input type="file" @change="getupload($event)" ref="clearFile" multiple="multiple">
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="onSubmit" class="dispatch-sendButton">发送文单 send</el-button>
                <el-button type="primary" class="dispatch-saveButton" @click="save">保存</el-button>
            </el-form-item>
        </el-form>
    </div>

</template>

<script>
    import axios from 'axios'
    import {mavonEditor} from 'mavon-editor'

    export default {
        components: {mavonEditor},
        data: function () {
            return {
                toolbars: {
                    value: '',//初始值
                    bold: true, // 粗体
                    italic: true, // 斜体
                    header: false, // 标题
                    underline: true, // 下划线
                    mark: true, // 标记
                    superscript: true, // 上角标
                    quote: true, // 引用
                    ol: true, // 有序列表
                    // link: true, // 链接
                    // imagelink: true, // 图片链接
                    help: false, // 帮助
                    code: false, // code
                    subfield: true, // 是否需要分栏
                    // edit: false,
                    // default_open: 'edit',
                    editable: false,
                    preview: true,
                    // fullscreen: false, // 全屏s编辑
                    // readmodel: false, // 沉浸式阅读
                    /* 1.3.5 */
                    undo: true, // 上一步
                    trash: true, // 清空
                    // save: true, // 保存（触发events中的save事件）
                    /* 1.4.2 */
                    navigation: false // 导航目录
                },
                form: this.$store.state.formData,
                leader: this.$store.state.leader,
                rules: {
                    // text_number: [
                    //     {required: true, message: '请输入发文字号', trigger: 'blur'}
                    // ],
                    print_sum: [
                        {required: true, message: '请输入印发份数', trigger: 'blur'}
                    ],
                    title: [
                        {required: true, message: '请输入标题', trigger: 'blur'}
                    ],
                    public: [
                        {required: true, message: '请选择公开属性', trigger: 'blur'}
                    ],
                    first_check_leader: [
                        {required: true, message: '请选审批领导', trigger: 'blur'}
                    ],
                    // people: [
                    //     {required: true, message: '请输入拟稿人', trigger: 'blur'}
                    // ],
                    // emergency: [
                    //     {required: true, message: '请选择紧急程度', trigger: 'blur'}
                    // ],
                    desc_content: [
                        {required: true, message: '请输入文单正文', trigger: 'blur'}
                    ]
                },
                dialogVisible: false,
                role: ''
            }
        },
        methods: {
            //添加附件
            getupload(event) {
                this.form.upload = event.target.files;
                console.log(this.form.upload);
            },
            //提交文单至相应领导
            onSubmit() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        event.preventDefault();
                        this.dialogVisible = false;
                        let formData = new FormData();
                        let form = this.form;
                        let self = this;
                        console.log(form);
                        let textareaContent = form.desc_content;
                        // .replace(/\n/g, "</br>");
                        textareaContent = textareaContent.replace(/ /g, "&nbsp;");
                        // formData.append('text_number', form.text_number);
                        formData.append('print_sum', form.print_sum);
                        formData.append('title', form.title);
                        formData.append('destination', form.destination);
                        formData.append('cc', form.cc);
                        formData.append('public', form.public);
                        // formData.append('department', form.department);
                        // formData.append('people', form.people);
                        formData.append('emergency', form.emergency);
                        formData.append('first_check_leader', form.first_check_leader);
                        // formData.append('red', form.red);套红编号不发
                        formData.append('desc_content', textareaContent);
                        // formData.append('upload', form.upload);
                        let length = form.upload.length;
                        for (let i = 0; i < length; i++) {
                            formData.append('upload', form.upload[i]);
                        }
                        console.log(formData)
                        let config = {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        };
                        let url = `/api/v1/send/`;
                        if (form.id) {
                            url = `/api/v1/send/${form.id}/push/`
                            axios.post(url).then(
                                function () {
                                    self.$store.commit('getData');
                                    self.$store.commit('clearFormData')
                                    self.form = {
                                        id: '',
                                        // text_number: '',
                                        print_sum: '',
                                        destination: '',
                                        cc: '',
                                        title: '',
                                        public: '',
                                        // department: '',
                                        // people: '',
                                        emergency: '0',
                                        first_check_leader: '',
                                        // red: '',
                                        desc_content: '',
                                        upload: []
                                    }
                                    self.$refs.clearFile.value = ''
                                    self.$message({
                                        message: '已发送',
                                        // type: 'success',
                                        center: true,
                                        customClass: 'tip',
                                        duration: 1500
                                    })
                                }
                            )
                        } else {
                            this.$post(url, formData, config).then(
                                function (e) {
                                    let url = '/api/v1/send/' + e.data.id + '/push/';
                                    axios.post(url).then(
                                        function () {
                                            self.$store.commit('getData');
                                            self.$store.commit('clearFormData')
                                            self.form = {
                                                id: '',
                                                // text_number: '',
                                                print_sum: '',
                                                destination: '',
                                                cc: '',
                                                title: '',
                                                public: '',
                                                // department: '',
                                                // people: '',
                                                emergency: '0',
                                                first_check_leader: '',
                                                // red: '',
                                                desc_content: '',
                                                upload: []
                                            }
                                            self.$refs.clearFile.value = ''
                                            self.$message({
                                                message: '已发送',
                                                // type: 'success',
                                                center: true,
                                                customClass: 'tip',
                                                duration: 1500
                                            })
                                        }
                                    )
                                }
                            )
                        }
                    }
                })
            },

            //打开弹窗
            // openDialog() {
            //     event.preventDefault();
            //     this.$refs.form.validate((valid) => {
            //         if (valid) {
            //             this.dialogVisible = true;
            //         }
            //     });
            // },

            //保存
            save() {
                this.$refs.form.validate((valid) => {
                        if (valid) {
                            event.preventDefault();
                            //保存后更新已保存但未发送发文单列表
                            this.$store.commit('getData');
                            let formData = new FormData();
                            let form = this.form;
                            let self = this;
                            let textareaContent = form.desc_content.replace(/\n/g, "</br>");
                            textareaContent = textareaContent.replace(/ /g, "&nbsp;");
                            // formData.append('text_number', form.text_number);
                            formData.append('print_sum', form.print_sum);
                            formData.append('title', form.title);
                            formData.append('destination', form.destination);
                            formData.append('cc', form.cc);
                            formData.append('public', form.public);
                            // formData.append('department', form.department);
                            // formData.append('people', form.people);
                            formData.append('first_check_leader', form.first_check_leader);
                            formData.append('emergency', form.emergency);
                            // formData.append('red', form.red);套红编号不发
                            formData.append('desc_content', textareaContent);
                            // formData.append('upload', form.upload);
                            let length = form.upload.length;
                            for (let i = 0; i < length; i++) {
                                formData.append('upload', form.upload[i]);
                            }
                            let config = {
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                            };
                            let url = `/api/v1/send/`;
                            if (form.id) {
                                url = `/api/v1/send/${form.id}/`;
                                this.$put(url, formData, config).then(
                                    function () {
                                        self.$store.commit('getData');
                                        self.$store.commit('clearFormData')
                                        self.form = {
                                            id: '',
                                            // text_number: '',
                                            print_sum: '',
                                            destination: '',
                                            cc: '',
                                            title: '',
                                            public: '',
                                            // department: '',
                                            // people: '',
                                            emergency: '0',
                                            first_check_leader: '',
                                            // red: '',
                                            desc_content: '',
                                            upload: []
                                        };
                                        self.$refs.clearFile.value = ''
                                        self.$message({
                                            message: '已保存修改',
                                            // type: 'success',
                                            center: true,
                                            customClass: 'tip',
                                            duration: 1500
                                        })
                                    }
                                ).catch(
                                    function () {
                                        self.$store.commit('getData');
                                        self.$store.commit('clearFormData')
                                        self.form = {
                                            id: '',
                                            // text_number: '',
                                            print_sum: '',
                                            destination: '',
                                            cc: '',
                                            title: '',
                                            public: '',
                                            // department: '',
                                            // people: '',
                                            emergency: '0',
                                            first_check_leader: '',
                                            // red: '',
                                            desc_content: '',
                                            upload: []
                                        };
                                        self.$refs.clearFile.value = ''
                                        self.$message({
                                            message: '保存失败',
                                            // type: 'success',
                                            center: true,
                                            customClass: 'tip',
                                            duration: 1500
                                        })
                                    }
                                )
                            } else {
                                this.$post(url, formData, config).then(
                                    function () {
                                        self.$store.commit('getData');
                                        self.$store.commit('clearFormData')
                                        self.form = {
                                            id: '',
                                            // text_number: '',
                                            print_sum: '',
                                            destination: '',
                                            cc: '',
                                            title: '',
                                            public: '',
                                            // department: '',
                                            // people: '',
                                            emergency: '0',
                                            first_check_leader: '',
                                            // red: '',
                                            desc_content: '',
                                            upload: []
                                        };
                                        self.$refs.clearFile.value = ''
                                        self.$message({
                                            message: '已保存',
                                            // type: 'success',
                                            center: true,
                                            customClass: 'tip',
                                            duration: 1500
                                        })
                                    }
                                )
                            }
                        }
                    }
                )
                ;
            },
            //关闭弹窗
            handleClose(done) {
                done();
            }
        },
        mounted() {
            document.getElementsByClassName("fa-mavon-columns")[0].click();
            this.$nextTick(() => {
                this.toolbars.subfield = false;
            })
        }
    }
</script>

<style scoped lang="less" TYPE="text/less">
    .dispatch-propose-title {
        width: 100%;
        margin: 0 auto 20px auto;
        height: 80px;
        line-height: 80px;
        color: rgba(229, 28, 35, 1);
        font-size: 36px;
        text-align: center;
        font-family: FZShuSong-Z01S;
        border-bottom: 3px solid rgba(229, 28, 35, 1);
        clear: both;
    }

    .dispatch-propose-head-button1 {
        float: right;
        margin-right: 2.5%;
        margin-top: 20px;
        margin-bottom: 40px;
    }

    .dispatch-propose-head-button2 {
        float: right;
        margin-right: 20px;
        margin-top: 20px;
        margin-bottom: 40px;
    }

    .dispatch-propose-form {
        width: 90%;
        height: 100%;
        margin: 0 auto;
    }

    .el-input {
        width: 30%;
    }

    .upload-upload {
        background-color: white;
        color: black;
        border: 1px solid black;
    }

    .dispatch-saveButton {
        display: block;
        margin: 20px auto 0 auto;

    }

    .dispatch-sendButton {
        display: block;
        margin: 0 auto;
        width: 335px;
        height: 47px;
        line-height: 20px;
        border-radius: 5px 5px 5px 5px;
        text-align: center;
        font-size: 18px;
        font-family: PingFangSC-regular;
    }

</style>