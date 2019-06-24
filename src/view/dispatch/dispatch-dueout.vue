<template>
    <div class="dispatch-propose-dueout-title">
        <el-table
                :data="pageData"
                style="width: 100%;margin-top: 10px;height: 100%">
            <el-table-column
                    prop="title"
                    label="标题"
                    style="width: 20%;height: 50px"
            >
            </el-table-column>
            <el-table-column
                    prop="emergency"
                    label="紧急程度"
                    style="width: 20%">
            </el-table-column>
            <el-table-column
                    prop="people_name"
                    label="拟稿人"
                    style="width: 20%">
            </el-table-column>
            <el-table-column
                    prop="add_time"
                    label="日期"
                    style="width: 20%">
            </el-table-column>
            <el-table-column
                    prop="department"
                    label="拟稿机构"
                    style="width: 20%">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    style="width: 20%">
                <template slot-scope="scope">
                    <router-link class="dispatch-dueout-link" to="posts">
                        <el-button @click="onChange(scope.row)" type="text"
                                   class="dispatch-propose-dueout-button1">修改
                        </el-button>
                    </router-link>
                    <el-button type="text" @click="onSubmit(scope.row)" :plain="true"
                               class="dispatch-propose-dueout-button2">发送
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
                    @current-change="handleCurrentChange"
                    class="dispatch-propose-dueout-page"
                    background
                    layout="prev, pager, next"
                    :total="tableDataLength">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                role: '',
                page: 1
            }
        },
        methods: {
            //进行换页操作
            handleCurrentChange(e) {
                this.page = e
                this.$store.commit('changePageData', e);
            },
            //进行每一个文单编辑
            onChange(row) {
                let emergency = row.emergency
                let publics = row.public.toString()
                // let department = row.department.toString()
                switch (emergency) {
                    case '无':
                        emergency = '0';
                        break;
                    case '普通':
                        emergency = '1';
                        break;
                    case '紧急':
                        emergency = '2';
                        break;
                    case  '特急':
                        emergency = '3';
                        break;
                }
                row.public = publics
                row.emergency = emergency
                // row.first_check_leader = leader
                // console.log('use it');
                this.$store.commit('getFormData', row)
            },

            //打开弹窗
            // openDialog(data) {
            //     this.dialogVisibles = true;
            //     this.nowForm = data;
            //     console.log(this.nowForm);
            // },


            //提交文单，把草稿变成正式的
            onSubmit(data) {
                let url = `/api/v1/send/${data.id}/push/`;
                let self = this;
                this.$post(url).then(
                    function () {
                        self.$message({
                            message: '已发送',
                            // type: 'success',
                            center: true,
                            customClass: 'tip',
                            duration: 1500
                        });
                        self.handleCurrentChange(self.page);
                    }
                )
            },
            //关闭弹窗
            handleClose(done) {
                done();
            }
        },
        computed: {
            //当前页面显示的文单信息
            pageData() {
                let now = this.$store.state.pageData;
                if (now) {
                    now.map(function (a) {
                        let date = new Date(a.add_time);
                        let emergency = a.emergency;
                        let time = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
                        a.add_time = time;
                        switch (emergency) {
                            case 0:
                                a.emergency = '无';
                                break;
                            case 1:
                                a.emergency = '普通';
                                break;
                            case 2:
                                a.emergency = '紧急';
                                break;
                            case  3:
                                a.emergency = '特急';
                                break;
                        }
                        return a;
                    });
                }
                return now;
            },
            //获取总共的发文单长度
            tableDataLength() {
                return this.$store.state.dispatchData.count;
            }
        },
        mounted() {
            //获取初始文单信息，展示初始页面
            this.$store.commit('getData');
        }
    }
</script>

<style lang="less" TYPE="text/less">
    .dispatch-propose-dueout-title {
        width: 90%;
        margin: 0 auto;
        .el-table .warning-row {
            background: oldlace;
        }

        .el-table .success-row {
            background: #f0f9eb;
        }

        .block {
            margin: 20px auto 0 auto;
            padding: 0 auto;
            text-align: center;
        }

        .dispatch-dueout-link {
            z-index: 99;
            height: auto;
        }
    }

    .tip {
        height: 250px;
        width: 250px;
        font-weight: normal;
        top: calc(50% - 50px);

        background: rgba(17, 17, 17, 0.7);
        p {
            color: white !important;
            font-size: 30px;
        }
        i {
            font-size: 30px;
            color: white !important;
        }
    }

    .dispatch-propose-dueout-button1 {
        width: 35%;
        height: 31px;
        line-height: 31px;
        border-radius: 5px 5px 5px 5px;
        text-align: center;
        border: 1px solid rgba(26, 173, 25, 1);
        color: rgba(26, 173, 25, 1);
        padding: 0;
        transition: all 0.5s;
        float: left;
        margin-right: 10px;
        &:hover {
            background-color: rgba(26, 173, 25, 1) !important;
            color: white !important;
        }
        &:focus {
            background-color: rgba(26, 173, 25, 1);
            color: white;
        }
    }

    .dispatch-propose-dueout-button2 {
        width: 35%;
        height: 31px;
        line-height: 31px;
        border-radius: 5px 5px 5px 5px;
        text-align: center;
        border: 1px solid rgba(26, 173, 25, 1);
        background-color: rgba(26, 173, 25, 1) !important;
        color: white !important;
        padding: 0;
        transition: all 0.5s;
        float: left;
        margin-right: 10px;
        &:hover {
            color: rgba(26, 173, 25, 1) !important;
            border: 1px solid rgba(26, 173, 25, 1) !important;
            background-color: transparent !important;
        }
        &:focus {
            background-color: rgba(26, 173, 25, 1);
            color: white;
        }
    }
</style>