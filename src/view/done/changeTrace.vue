<template>
    <div class="changeTrace">
        <!--<br/>-->
        <el-select class="top" v-model="type" placeholder="请选择查看对象">
            <el-option
                    v-for="item in types"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name">
            </el-option>
        </el-select>
        <el-button class="top" @click="back">返回已办结</el-button>
        <br/>
        <div class="people_and_time">修改人：{{name}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;时间：{{time}}</div>
        <iframe name="viewContent" id="viewContent"></iframe>
    </div>
</template>

<script>
    export default {
        name: "changeTrace",
        props: ['one_one', 'one_two', 'dealer'],
        data() {
            return {
                name: '',
                time: '',
                type: '一审一评修改',
                types: [
                    {
                        id: 1,
                        name: '一审一评修改',
                    },
                    {
                        id: 2,
                        name: '一审二评修改',
                    },
                    {
                        id: 3,
                        name: '综合办修改'
                    }
                ]
            }
        },
        methods: {
            writeIn(str) {
                let content = '无';
                if (str === '一审一评修改') {
                    if (this.one_one.value) {
                        content = this.one_one.value;
                        this.name = this.one_one.name;
                        this.time = this.one_one.time.replace('T', ' ').substring(0, 19);
                    }
                } else if (str === '一审二评修改') {
                    if (this.one_two.value) {
                        content = this.one_two.value;
                        this.name = this.one_two.name;
                        this.time = this.one_two.time.replace('T', ' ').substring(0, 19);
                    }
                } else if (str === '综合办修改') {
                    if (this.dealer.value) {
                        content = this.dealer.value;
                        this.name = this.dealer.name;
                        this.time = this.dealer.time.replace('T', ' ').substring(0, 19);
                    }
                }
                let frame = window.frames["viewContent"];
                frame.document.open();
                frame.document.write(content);
                frame.document.close();
            },
            back() {
                this.$emit('backToDetail');
            }
        },
        mounted() {
            this.writeIn(this.type);
        },
        watch: {
            type: function () {
                this.name = '';
                this.time = '';
                this.writeIn(this.type);
            }
        }

    }
</script>

<style scoped lang="scss">
    .changeTrace {
        height: 100%;
        background-color: white;
        .top {
            margin-top: 5px;
            margin-left: 5px;
        }
        .people_and_time {
            height: 50px;
            line-height: 50px;
            margin-left: 5px;
        }
        #viewContent {
            height: calc(100% - 95px);
            width: 100%;
        }
    }
</style>