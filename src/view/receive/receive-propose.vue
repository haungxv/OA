<template>
    <div>
        <el-form ref="form" :model="form" :rules="rules" label-width="100px" labelPosition="left" id="Print"
                 class="receive-propose-form">
            <el-form-item>
                <el-button type="primary" @click="onSubmit" class="receive-propose-head-button1">发送</el-button>
                <el-button type="primary" @click="save" class="receive-propose-head-button2">保存</el-button>
            </el-form-item>
            <div class="receive-propose-title">电子科技大学计划财务处收文单</div>
            <!--<Form></Form>-->
            <el-form-item label="收文字号:" prop="text_number">
                <el-input v-model="form.text_number"></el-input>
            </el-form-item>
            <el-form-item label="来文单位:" prop="department">
                <el-input v-model="form.department"></el-input>
            </el-form-item>
            <el-form-item label="文件标题:" prop="title">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="收文日期" prop="add_time">
                <el-date-picker value-format="yyyy-MM-ddT23:59:59" v-model="form.add_time"
                                placeholder="选择日期" type="date"></el-date-picker>
            </el-form-item>
            <el-form-item label="办理期限">
                <el-date-picker value-format="yyyy-MM-ddT23:59:59" v-model="form.term"
                                placeholder="选择日期" type="date"></el-date-picker>
            </el-form-item>
            <el-form-item label="紧急程度:" prop="emergency">
                <el-select v-model="form.emergency" placeholder="请选择紧急程度">
                    <el-option label="无" value="0"></el-option>
                    <el-option label="普通" value="1"></el-option>
                    <el-option label="紧急" value="2"></el-option>
                    <el-option label="特急" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="综合办拟办:" prop="receiving_proposed">
                <el-input v-model="form.receiving_proposed"></el-input>
            </el-form-item>
            <el-form-item label="领导审批:" prop="first_check_leader">
                <el-select v-model="form.first_check_leader" placeholder="请选择分管领导">
                    <el-option v-for="(lead,index) in leader" :label=lead.title+lead.name :value=lead.id
                               :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="正文:" size="medium">
                <mavon-editor v-model="form.desc_content" :toolbars="toolbars"/>
            </el-form-item>
            <el-form-item label="附件:">
                <!--<input type="file" multiple="multiple" @change="getupload($event)" ref="clearFile">-->
                <div class="fileCom">
                    <div class="file-div">
                        <button class="file-button">上传文件</button>
                        <input
                                type="file"
                                @change="getupload($event)"
                                ref="clearFile"
                                multiple="multiple"
                                class="fileInput"
                        >
                    </div>
                    <ul class="file-list">
                        <li v-for="(file,index) in list" class="file-list-li">
                            {{file.name}}
                            <img src="../../../statics/images/close.png"
                                 @click="remove(index)"
                                 style="display: block;height: 25px;float: right; cursor: pointer;">
                        </li>
                    </ul>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="onSubmit" class="receive-sendButton">发送文单 send</el-button>
                <el-button type="primary" class="receive-saveButton" @click="save">保存</el-button>
            </el-form-item>
        </el-form>
    </div>

</template>

<script>
    import axios from 'axios'
    import {mavonEditor} from 'mavon-editor'

    export default {
        components: {mavonEditor},
        data() {
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
                    editable: true,
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
                form: this.$store.state.reformData,
                leader: this.$store.state.leader,
                rules: {
                    text_number: [
                        {required: true, message: '请输入收文字号', trigger: 'blur'}
                    ],
                    department: [
                        {required: true, message: '请输入来文单位', trigger: 'blur'}
                    ],
                    title: [
                        {required: true, message: '请输入文件标题', trigger: 'blur'}
                    ],
                    emergency: [
                        {required: true, message: '请选择紧急程度', trigger: 'blur'}
                    ],
                    receiving_proposed: [
                        {required: true, message: '请输入综合办拟办', trigger: 'blur'}
                    ],
                    first_check_leader: [
                        {required: true, message: '请选择审批领导', trigger: 'blur'}
                    ],
                    add_time: [
                        {required: true, message: '请选发文日期', trigger: 'blur'}
                    ]
                },
                dialogVisible: false,
                role: '',
                upLoad: []
            }
        },
        methods: {
            //添加附件
            // getupload(event) {
            //     this.form.upload = event.target.files;
            //     console.log(this.form.upload);
            // },
            getupload(event) {
                let files = event.target.files
                for (let i = 0; i < files.length; i++) {
                    this.form.upload.push(files[i])
                }
            },
            remove(e) {
                this.form.upload.splice(e, 1)
            },
            //提交文单至相应领导
            onSubmit() {
                event.preventDefault();
                // this.dialogVisible = false;
                let formData = new FormData();
                let form = this.form;
                let self = this;
                let textareaContent = form.desc_content
                // .replace(/\n/g, "</br>");
                textareaContent = textareaContent.replace(/ /g, "&nbsp;");
                formData.append('text_number', form.text_number);
                formData.append('department', form.department);
                formData.append('title', form.title);
                formData.append('add_time', form.add_time);
                if (form.term) {
                    formData.append('term', form.term);
                }
                console.log(form.term)
                formData.append('emergency', form.emergency);
                formData.append('receive_number', form.receive_number);
                formData.append('first_check_leader', form.first_check_leader);
                formData.append('receiving_proposed', form.receiving_proposed);
                formData.append('desc_content', textareaContent);
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
                let url = `/api/v1/receive/`;
                if (form.id) {
                    url = `/api/v1/receive/${form.id}/push/`
                    axios.post(url).then(
                        function () {
                            self.form = {
                                text_number: '',
                                title: '',
                                term: '',
                                receive_number: '',
                                department: '',
                                emergency: '',
                                receiving_proposed: '',
                                add_time: '',
                                desc_content: '',
                                upload: [],
                                first_check_leader: ''
                            }
                            self.$refs.clearFile.value = ''
                            self.$store.commit('clearReFormData')
                            self.$message({
                                message: '已发送',
                                // type: 'success',
                                center: true,
                                customClass: 'tip',
                                duration: 1500
                            })
                            self.$store.commit('getReData');
                        }
                    )
                } else {
                    this.$post(url, formData, config).then(
                        function (e) {
                            let url = '/api/v1/receive/' + e.data.id + '/push/';
                            axios.post(url).then(
                                function () {
                                    self.form = {
                                        text_number: '',
                                        title: '',
                                        term: '',
                                        receive_number: '',
                                        department: '',
                                        emergency: '',
                                        receiving_proposed: '',
                                        add_time: '',
                                        desc_content: '',
                                        upload: [],
                                        first_check_leader: ''
                                    }
                                    self.$refs.clearFile.value = ''
                                    self.$store.commit('clearReFormData')
                                    self.$message({
                                        message: '已发送',
                                        // type: 'success',
                                        center: true,
                                        customClass: 'tip',
                                        duration: 1500
                                    })
                                    self.$store.commit('getReData');
                                }
                            )
                        }
                    )
                }
            },
            //保存
            save() {
                this.$refs.form.validate((valid) => {
                        if (valid) {
                            event.preventDefault();
                            //保存后更新已保存但未发送发文单列表
                            this.$store.commit('getReData');
                            let formData = new FormData();
                            let form = this.form;
                            let self = this;
                            console.log(form);
                            let textareaContent = form.desc_content;
                            // .replace(/\n/g, "</br>");
                            textareaContent = textareaContent.replace(/ /g, "&nbsp;");
                            formData.append('text_number', form.text_number);
                            formData.append('department', form.department);
                            formData.append('title', form.title);
                            formData.append('add_time', form.add_time);
                            if (form.term) {
                                formData.append('term', form.term);
                            }
                            console.log(form.term)
                            formData.append('emergency', form.emergency);
                            formData.append('receive_number', form.receive_number);
                            formData.append('first_check_leader', form.first_check_leader);
                            formData.append('receiving_proposed', form.receiving_proposed);
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
                            let url = `/api/v1/receive/`;
                            if (form.id) {
                                url = `/api/v1/receive/${form.id}/`;
                                this.$put(url, formData, config).then(
                                    function () {
                                        self.$store.commit('getData');
                                        self.form = {
                                            text_number: '',
                                            title: '',
                                            term: '',
                                            receive_number: '',
                                            department: '',
                                            emergency: '',
                                            receiving_proposed: '',
                                            add_time: '',
                                            desc_content: '',
                                            upload: [],
                                            first_check_leader: ''
                                        };
                                        self.$refs.clearFile.value = ''
                                        self.$store.commit('clearReFormData')
                                        self.$message({
                                            message: '已保存修改',
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
                                        self.form = {
                                            text_number: '',
                                            title: '',
                                            term: '',
                                            receive_number: '',
                                            department: '',
                                            emergency: '',
                                            receiving_proposed: '',
                                            add_time: '',
                                            desc_content: '',
                                            upload: [],
                                            first_check_leader: ''
                                        };
                                        self.$refs.clearFile.value = ''
                                        self.$store.commit('clearReFormData')
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
        computed: {
            list() {
                return this.form.upload;
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
    .receive-propose-title {
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

    .receive-propose-head-button1 {
        float: right;
        margin-right: 2.5%;
        margin-top: 20px;
        margin-bottom: 40px;
    }

    .receive-propose-head-button2 {
        float: right;
        margin-right: 20px;
        margin-top: 20px;
        margin-bottom: 40px;
    }

    .receive-propose-form {
        width: 90%;
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

    .receive-saveButton {
        display: block;
        margin: 20px auto 0 auto;

    }

    .receive-sendButton {
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

    .fileInput {
        width: 70px;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        z-index: 99;
        cursor: pointer;
    }

    .file-button {
        width: 70px;
        height: 30px;
        position: absolute;
        left: 0;
        top: 0;
        display: block;
        box-shadow: none;
        border-radius: 5px;
        cursor: pointer;
        color: #fff;
        background-color: #409eff;
        border: 1px solid #409eff;
    }

    .file-div {
        vertical-align: top;
        width: 70px;
        height: 30px;
        position: relative;
        cursor: pointer;
        display: inline-block;
    }

    .file-list {
        display: inline-block;
        list-style: none;
        margin-left: 10px;
        position: relative;
        width: 30%;
        vertical-align: top;
        font-size: 14px;
    }

    .file-list-li {
        line-height: 25px;
        height: 25px;
        font-size: 14px;
        display: block;
        padding-bottom: 3px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    .file-list-li:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }

    .fileCom {
        position: relative;
    }
</style>