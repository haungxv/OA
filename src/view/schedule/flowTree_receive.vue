<template>
    <div class="chart_send">
        <el-button @click="back">返回查看进度</el-button>
        <div id="main">

        </div>
    </div>
</template>
<script>
    var echarts = require('echarts');

    export default {
        props: ['lists', 'titleName'],
        data() {
            return {
                data: [
                    {
                        "message": "草稿",
                        "pass_or_not": 1,
                        "detail": {
                            "user": "黄旭",
                            "time": "2019-05-10T18:07:57.310772"
                        }
                    },
                    {
                        "message": "一审",
                        "pass_or_not": 1,
                        "detail": {
                            "first_check_first_comment": {
                                "first_comment_leader": "杨铁铣",
                                "first_comment": "2019-05-10T18:08:23.581669",
                                "first_comment_time": "2019-05-10T18:08:23.581669"
                            },
                            "first_check_second_comment": {
                                "second_comment_leader": "徐谡",
                                "second_comment": "ok",
                                "second_comment_time": "2019-05-10T18:08:37.547677"
                            }
                        }
                    },
                    {
                        "message": "签发",
                        "pass_or_not": 1,
                        "detail": {
                            "user": "黄粑粑",
                            "comment": "修改了",
                            "time": "2019-05-10T18:08:58.852400"
                        }
                    },
                    {
                        "message": "传阅",
                        "pass_or_not": 0,
                        "detail": {
                            "count": 1,
                            "result": [
                                {
                                    "id": 5,
                                    "user": "凌凌漆",
                                    "comment_time": "2019-05-10T18:09:31.615610",
                                    "comment_content": "我局的可以",
                                    "is_read": true,
                                    "people": 8
                                }
                            ]
                        }
                    },
                    {
                        "message": "二审",
                        "pass_or_not": 1,
                        "detail": {
                            "user": "易雪辉",
                            "time": "2019-05-10T19:17:07.428726"
                        }
                    },
                    {
                        "message": "二审通过",
                        "pass_or_not": 1,
                        "detail": {}
                    },
                    {
                        "message": "是否允许办结",
                        "pass_or_not": 0,
                        "detail": {}
                    },
                    {
                        "message": "已办结",
                        "pass_or_not": 0,
                        "detail": ""
                    },
                    {
                        "message": "其他信息",
                        "pass_or_not": 0,
                        "detail": {
                            "status": 6,
                            "pre_status": 4,
                            "is_send": true
                        }
                    }
                ],
                control: {
                    color: ['gray', 'gray', 'gray', 'gray', 'gray', 'gray'],
                    lineColor: ['gray', 'gray', 'gray', 'gray', 'gray', 'gray', 'gray', 'gray'],
                    tooltip: [
                        '未进行',
                        '未进行',
                        '未进行',
                        '未进行',
                        '未进行',
                        '未进行',
                        '未进行',
                    ]
                },
            }
        },
        methods: {
            judgeControl() {
                this.data = this.lists;
                //发稿人和发稿时间
                this.control.tooltip[0] = `时间：${this.data[0].detail.time.replace('T', ' ').substring(0, 19)}`;
                for (let i = 1; i < 8; i++) {
                    //处理一审和上级审批两个状态
                    if (i === 1) {
                        if (this.data[i].pass_or_not === 1) {
                            //已经通过状态，处理了签发前的连线状态
                            if (this.data[i].detail.first_check_second_comment.second_comment_leader) {
                                //有一审二评
                                this.control.color[i - 1] = '#1AAD19';//一审设为绿色
                                this.control.color[i] = '#1AAD19';//一审二评设为绿色

                                this.control.lineColor[i - 1] = '#1AAD19';//0连线设为绿色
                                this.control.lineColor[i] = '#1AAD19';//1连线设为绿色
                                this.control.lineColor[i + 2] = 'gray';//3连线设为灰色

                                this.control.tooltip[i] = `审批人：${this.data[i].detail.first_check_first_comment.first_comment_leader}<br/>
时间：${this.data[i].detail.first_check_first_comment.first_comment_time.replace('T', ' ').substring(0, 19)}`;
                                this.control.tooltip[i + 1] = `处长审批：${this.data[i].detail.first_check_second_comment.second_comment_leader}<br/>
时间：${this.data[i].detail.first_check_second_comment.second_comment_time.replace('T', ' ').substring(0, 19)}`;

                                //处理签发前的连线状态
                                if (this.data[i + 1].pass_or_not === 1) {
                                    //如果签发已通过
                                    this.control.lineColor[i + 1] = '#1AAD19';//2连线设为绿色
                                }
                                else if (this.data[i + 1].pass_or_not === 0) {
                                    //如果签发正在进行中
                                    this.control.lineColor[i + 1] = '#34A0D2';//2连线设为蓝色
                                }
                                else if (this.data[i + 1].pass_or_not === -1) {
                                    //如果签发为-1，说明一定是被终止
                                    this.control.lineColor[i + 1] = '#D50101';//2连线设为红色
                                }
                            }
                            else {
                                //没有一审二评
                                this.control.color[i - 1] = '#1AAD19';//一审设为绿色
                                this.control.color[i] = 'gray';//一审二评设为灰色

                                this.control.lineColor[i - 1] = '#1AAD19';//0连线设为绿色
                                this.control.lineColor[i] = 'gray';//1连线设为灰色
                                this.control.lineColor[i + 1] = 'gray';//2连线设为灰色

                                this.control.tooltip[i] = `审批人：${this.data[i].detail.first_check_first_comment.first_comment_leader}<br/>
时间：${this.data[i].detail.first_check_first_comment.first_comment_time.replace('T', ' ').substring(0, 19)}`;

                                //处理签发前的连线状态
                                if (this.data[i + 1].pass_or_not === 1) {
                                    //如果签发已通过
                                    this.control.lineColor[i + 2] = '#1AAD19';//3连线设为绿色
                                }
                                else if (this.data[i + 1].pass_or_not === 0) {
                                    //如果签发正在进行中
                                    this.control.lineColor[i + 2] = '#34A0D2';//3连线设为蓝色
                                }
                                else if (this.data[i + 1].pass_or_not === -1) {
                                    //如果签发为-1，说明一定是被终止
                                    this.control.lineColor[i + 2] = '#D50101';//3连线设为红色
                                }
                            }
                        }
                        else if (this.data[i].pass_or_not === 0) {
                            //正在进行状态
                            if (!this.data[i].detail.first_check_first_comment.first_comment_leader) {
                                //正在进行一审一评
                                this.control.color[i - 1] = '#34A0D2';//一审设为蓝色
                                this.control.lineColor[i - 1] = '#34A0D2';//0连线设为蓝色

                                this.control.tooltip[i] = `正在进行分管处领导审批`;
                            }
                            else {
                                //正在进行一审二评
                                this.control.color[i - 1] = '#1AAD19';//一审一评设为绿色
                                this.control.color[i] = '#34A0D2';//一审二评设为蓝色

                                this.control.lineColor[i - 1] = '#1AAD19';//0连线设为绿色
                                this.control.lineColor[i] = '#34A0D2';//1连线设为蓝色

                                this.control.tooltip[i] = `审批人：${this.data[i].detail.first_check_first_comment.first_comment_leader}<br/>
时间：${this.data[i].detail.first_check_first_comment.first_comment_time.replace('T', ' ').substring(0, 19)}`;
                                this.control.tooltip[i + 1] = `正在进行处长审批`;
                            }
                            return;
                        }
                        else if (this.data[i].pass_or_not === -1) {
                            //文件终止或者审核未通过
                            if (this.data[8].detail.pre_status > 0) {
                                //终止
                                if (this.data[i].detail.first_check_second_comment.second_comment_leader) {
                                    //进行了一审二评后终止
                                    this.control.color[i - 1] = '#1AAD19';//一审设为绿色
                                    this.control.color[i] = '#D50101';//一审二评设为红色

                                    this.control.lineColor[i - 1] = '#1AAD19';//0连线设为绿色
                                    this.control.lineColor[i] = '#D50101';//1连线设为红色

                                    this.control.tooltip[i] = `审批人：${this.data[i].detail.first_check_first_comment.first_comment_leader}<br/>
时间：${this.data[i].detail.first_check_first_comment.first_comment_time.replace('T', ' ').substring(0, 19)}`;
                                    this.control.tooltip[i + 1] = `文件流程终止终止`;

                                }
                                else if (this.data[i].detail.first_check_first_comment.first_comment_leader) {
                                    //进行了一审一评后终止
                                    this.control.color[i - 1] = '#D50101';//一审一评设为红色

                                    this.control.lineColor[i - 1] = '#D50101';//0连线设为绿色

                                    this.control.tooltip[i] = `文件流程终止`;
                                }
                            }
                            else {
                                //审核不通过
                                if (this.data[i].detail.first_check_second_comment.second_comment_leader) {
                                    //一审二评不通过
                                    this.control.color[i - 1] = '#1AAD19';//一审设为绿色
                                    this.control.color[i] = '#D50101';//一审二评设为红色

                                    this.control.lineColor[i - 1] = '#1AAD19';//0连线设为绿色
                                    this.control.lineColor[i] = '#D50101';//1连线设为红色

                                    this.control.tooltip[i] = `审批人：${this.data[i].detail.first_check_first_comment.first_comment_leader}<br/>
时间：${this.data[i].detail.first_check_first_comment.first_comment_time.replace('T', ' ').substring(0, 19)}`;
                                    this.control.tooltip[i + 1] = `处长审批：${this.data[i].detail.first_check_second_comment.second_comment_leader}<br/>
时间：${this.data[i].detail.first_check_second_comment.second_comment_time.replace('T', ' ').substring(0, 19)}<br/>
审核未通过`;

                                }
                                else if (this.data[i].detail.first_check_first_comment.second_comment_leader) {
                                    //一审一评不通过
                                    this.control.color[i - 1] = '#D50101';//一审一评设为红色

                                    this.control.lineColor[i - 1] = '#D50101';//0连线设为绿色

                                    this.control.tooltip[i] = `审批人：${this.data[i].detail.first_check_first_comment.first_comment_leader}<br/>
时间：${this.data[i].detail.first_check_first_comment.first_comment_time.replace('T', ' ').substring(0, 19)}<br/>
审核未通过`;
                                }
                            }
                            return;
                        }
                    }
                    //处理签发状态
                    else if (i === 2) {
                        if (this.data[i].pass_or_not === 1) {
                            //已经通过状态，处理了传阅前的连线状态
                            this.control.color[i] = '#1AAD19';//签发节点设为绿色
                            this.control.tooltip[i + 1] = `签发人：${this.data[i].detail.user}<br/>时间：${this.data[i].detail.time.replace('T', ' ').substring(0, 19)}`;

                            //处理传阅前的连线状态
                            if (this.data[i + 1].pass_or_not === 1) {
                                //如果传阅已通过
                                this.control.lineColor[i + 2] = '#1AAD19';//4连线设为绿色
                            }
                            else if (this.data[i + 1].pass_or_not === 0) {
                                //如果传阅正在进行中
                                this.control.lineColor[i + 2] = '#34A0D2';//4连线设为蓝色
                            }
                            else if (this.data[i + 1].pass_or_not === -1) {
                                //如果传阅为-1，说明一定是被终止
                                this.control.lineColor[i + 2] = '#D50101';//4连线设为红色
                            }

                        }
                        else if (this.data[i].pass_or_not === 0) {
                            //正在进行状态
                            this.control.color[i] = '#34A0D2';//签发节点设为蓝色
                            this.control.tooltip[i + 1] = `正处于签发状态`;
                            return;
                        }
                        else if (this.data[i].pass_or_not === -1) {
                            //文件被终止
                            this.control.color[i] = '#D50101';//签发节点设为红色
                            this.control.tooltip[i + 1] = `文件流程被终止`;
                            return;
                        }
                    }
                    //处理传阅状态
                    else if (i === 3) {
                        if (this.data[i].pass_or_not === 1) {
                            //已经通过状态，处理了二审前或者办结前的连线状态
                            this.control.color[i] = '#1AAD19';//传阅节点设为绿色
                            this.control.tooltip[i + 1] = `已经行传阅`;
                            let str = '';
                            if (this.data[i].detail.result.length) {
                                let len = this.data[i].detail.result.length;
                                console.log(len);
                                for (let j = 0; j < len; j++) {
                                    if (this.data[i].detail.result[j].is_read) {
                                        str += this.data[i].detail.result[j].people.name;
                                        str += `&nbsp;&nbsp;`;
                                    }
                                }
                            }
                            if (str) {
                                this.control.tooltip[i + 1] = `已传阅：${str}`;
                            }


                            //处理下一步的连线状态
                            if (this.data[i + 4].pass_or_not === 1 && this.data[i + 1].pass_or_not === 0) {
                                //选择了直接办结，并且办结完成
                                this.control.lineColor[i + 4] = '#1AAD19';//7连线设为绿色
                            } else if (this.data[i + 1].pass_or_not === 1) {
                                //选择了二审，并且二审通过
                                this.control.lineColor[i + 2] = '#1AAD19';//5连线设为绿色
                            } else if (this.data[i + 1].pass_or_not === -1) {
                                //选择了二审，但是二审没通过或者终止了
                                this.control.lineColor[i + 2] = '#D50101';//5连线设为红色
                            } else if (this.data[i + 4].pass_or_not === 0 && this.data[i + 1].pass_or_not === 0) {
                                //二审和办结均没有处理，需要判断
                                if (this.data[8].detail.status === this.data[8].detail.pre_status) {
                                    //传阅完毕，没有选择是直接进行办结还是二审
                                } else if (this.data[i + 3].pass_or_not === -1) {
                                    //文件被终止了
                                    this.control.color[i] = '#D50101';//传阅节点设为绿色
                                    this.control.tooltip[i + 1] = `文件流程终止`;
                                } else if (this.data[8].detail.status === 4 && this.data[8].detail.pre_status === 3) {
                                    //选择了二审，正在进行中
                                    this.control.lineColor[i + 2] = '#34A0D2';//5连线设为蓝色
                                } else if (this.data[8].detail.status === 7 && this.data[8].detail.pre_status === 3) {
                                    //选择了直接办结，正在进行中
                                    this.control.lineColor[i + 4] = '#34A0D2';//7连线设为蓝色
                                }
                            }
                        }
                        else if (this.data[i].pass_or_not === 0) {
                            //正在进行状态
                            this.control.color[i] = '#34A0D2';//传阅节点设为蓝色
                            this.control.tooltip[i + 1] = `正处于传阅状态`;
                            let str = '';
                            if (this.data[i].detail.result.length) {
                                let len = this.data[i].detail.result.length;
                                console.log(len);
                                for (let j = 0; j < len; j++) {
                                    if (this.data[i].detail.result[j].is_read) {
                                        str += this.data[i].detail.result[j].people.name;
                                        str += `&nbsp;&nbsp;`;
                                    }
                                }
                            }
                            if (str) {
                                this.control.tooltip[i + 1] = `已传阅：${str}`;
                            }
                            return;
                        }
                        else if (this.data[i].pass_or_not === -1) {
                            //文件被终止
                            this.control.color[i] = '#D50101';//传阅节点设为红色
                            this.control.tooltip[i + 1] = `文件流程被终止`;
                            return;
                        }
                    }
                    //处理二审状态
                    else if (i === 4) {
                        if (this.data[i].pass_or_not === 1) {
                            //已经通过状态，处理了办结前的连线状态
                            this.control.color[i] = '#1AAD19';//二审节点设为绿色
                            this.control.tooltip[i + 1] = `已通过分管处领导审核`;

                            //处理办结前的连线状态
                            if (this.data[i + 3].pass_or_not === 1) {
                                //如果办结已通过
                                this.control.lineColor[i + 2] = '#1AAD19';//6连线设为绿色
                            }
                            else if (this.data[i + 3].pass_or_not === 0) {
                                //未办结，判断是终止或者办结进行中
                                if (this.data[i + 2].pass_or_not === -1) {
                                    //终止
                                    this.control.lineColor[i + 2] = '#D50101';//6连线设为红色
                                } else {
                                    //办结进行中
                                    this.control.lineColor[i + 2] = '#34A0D2';//6连线设为蓝色
                                }
                            }
                        }
                        else if (this.data[i].pass_or_not === 0) {
                            //正在进行状态
                            this.control.color[i] = '#34A0D2';//传阅节点设为蓝色
                            this.control.tooltip[i + 1] = `正处于分管处领导审核状态`;

                            return;
                        }
                        else if (this.data[i].pass_or_not === -1) {
                            //文件被终止或者审核未通过
                            if (this.data[8].detail.pre_status > 0) {
                                //终止
                                this.control.color[i] = '#D50101';//二审节点设为红色
                                this.control.tooltip[i + 1] = `文件流程被终止`;
                            }
                            else {
                                //审核不通过
                                this.control.color[i] = '#D50101';//传阅节点设为红色

                                this.control.tooltip[i] = `分管处领导审核不通过`;
                            }
                            return;
                        }
                    }
                    //处理办结状态
                    else if (i === 7) {
                        if (this.data[i].pass_or_not === 1) {
                            //已经通过状态
                            this.control.color[i - 2] = '#1AAD19';//办结节点设为绿色
                            this.control.tooltip[i - 1] = `已办结`;
                        }
                        else if (this.data[i].pass_or_not === 0) {
                            //未办结，判断是终止或者办结进行中
                            if (this.data[i - 1].pass_or_not === -1) {
                                //终止
                                this.control.color[i - 2] = '#D50101';//办结节点设为红色
                                this.control.tooltip[i - 1] = `文件流程终止`;
                            }
                            else {
                                //办结进行中
                                this.control.color[i - 2] = '#34A0D2';//办结节点设为蓝色
                                this.control.tooltip[i - 1] = `正在进行办结`;
                            }
                        }
                    }
                }
            },
            draw() {
                var myChart = echarts.init(document.getElementById('main'));
                // 绘制图表
                myChart.setOption({
                    title: {
                        //表格标题
                        text: `${this.titleName}`,
                    },
                    tooltip: {
                        //提示框组件
                        triggerOn: 'mousemove|click',//提示框触发条件
                        trigger: 'item',//在数据项图中触发
                    },

                    animationDurationUpdate: 1500,//数据更新动画的时长
                    animationEasingUpdate: 'quinticInOut',//数据更新动画的缓动效果
                    series: [
                        {
                            type: 'graph',
                            layout: 'none',//图的布局，设置为none，表示不采用任何布局，使用节点中提供的x,y作为节点的位置
                            roam: true,//是否开启鼠标缩放和平移漫游
                            force: {
                                edgeLength: 10,//连线的长度
                                repulsion: 100  //子节点之间的间距
                            },

                            edgeSymbol: 'circle',//边两端的标记类型，从圆开始到箭头结束
                            edgeSymbolSize: 0,//边两端标记的大小


                            //控制连线上的说明是否显示
                            edgeLabel: {
                                textStyle: {
                                    fontSize: 15,//设置线上标签的字体大小
                                }
                            },

                            //关系图的节点数据列表
                            data: [
                                {
                                    name: '拟稿',
                                    x: 100,
                                    y: 300,
                                    //框框大小
                                    symbolSize: [60, 20],
                                    //节点样式
                                    itemStyle: {
                                        color: 'white',
                                        borderColor: '#1AAD19',
                                    },
                                    //节点标签的样式
                                    label: {
                                        show: true,
                                        color: '#1AAD19',
                                        align: 'center',//水平对齐方式
                                        verticalAlign: 'middle',//垂直对齐方式
                                        width: 100,
                                    },
                                    //提示框设置
                                    tooltip: {
                                        formatter: this.control.tooltip[0],//提示框内容
                                    },

                                },
                                {
                                    name: '分管处领导初审',
                                    x: 300,
                                    y: 300,
                                    //节点样式
                                    itemStyle: {
                                        color: 'white',
                                        borderColor: this.control.color[0],//椭圆框颜色
                                    },
                                    //节点标签的样式
                                    label: {
                                        show: true,
                                        color: this.control.color[0],//字体颜色
                                        align: 'center',//水平对齐方式
                                        verticalAlign: 'middle',//垂直对齐方式
                                    },
                                    //提示框设置
                                    tooltip: {
                                        formatter: this.control.tooltip[1],//提示框内容
                                    },
                                    //框框大小
                                    symbolSize: [100, 20],
                                },
                                {
                                    name: '处长审批',
                                    x: 500,
                                    y: 100,
                                    // symbol: 'rect',//节点类型
                                    //节点样式
                                    itemStyle: {
                                        color: 'white',
                                        borderColor: this.control.color[1],
                                    },
                                    //节点标签的样式
                                    label: {
                                        show: true,
                                        color: this.control.color[1],
                                        align: 'center',//水平对齐方式
                                        verticalAlign: 'middle',//垂直对齐方式
                                    },
                                    //提示框设置
                                    tooltip: {
                                        formatter: this.control.tooltip[2],//提示框内容
                                    },
                                    //框框大小
                                    symbolSize: [60, 20],
                                },
                                {
                                    name: '综合办签发',
                                    x: 700,
                                    y: 300,
                                    // symbol: 'rect',//节点类型
                                    //节点样式
                                    itemStyle: {
                                        color: 'white',
                                        borderColor: this.control.color[2],
                                    },
                                    //节点标签的样式
                                    label: {
                                        show: true,
                                        color: this.control.color[2],
                                        align: 'center',//水平对齐方式
                                        verticalAlign: 'middle',//垂直对齐方式
                                    },
                                    //提示框设置
                                    tooltip: {
                                        formatter: this.control.tooltip[3],//提示框内容
                                    },
                                    //框框大小
                                    symbolSize: [80, 20],
                                },
                                {
                                    name: '传阅',
                                    x: 900,
                                    y: 300,
                                    // symbol: 'rect',//节点类型
                                    //节点样式
                                    itemStyle: {
                                        color: 'white',
                                        borderColor: this.control.color[3],
                                    },
                                    //节点标签的样式
                                    label: {
                                        show: true,
                                        color: this.control.color[3],
                                        align: 'center',//水平对齐方式
                                        verticalAlign: 'middle',//垂直对齐方式
                                    },
                                    //提示框设置
                                    tooltip: {
                                        formatter: this.control.tooltip[4],//提示框内容
                                    },
                                    //框框大小
                                    symbolSize: [50, 20],
                                },
                                {
                                    name: '分管处领导复审',
                                    x: 1100,
                                    y: 400,
                                    // symbol: 'rect',//节点类型
                                    //节点样式
                                    itemStyle: {
                                        color: 'white',
                                        borderColor: this.control.color[4],
                                    },
                                    //节点标签的样式
                                    label: {
                                        show: true,
                                        color: this.control.color[4],
                                        align: 'center',//水平对齐方式
                                        verticalAlign: 'middle',//垂直对齐方式
                                    },
                                    //提示框设置
                                    tooltip: {
                                        formatter: this.control.tooltip[5],//提示框内容
                                    },
                                    //框框大小
                                    symbolSize: [100, 20],
                                },
                                {
                                    name: '办结',
                                    x: 1300,
                                    y: 300,
                                    // symbol: 'rect',//节点类型
                                    //节点样式
                                    itemStyle: {
                                        color: 'white',
                                        borderColor: this.control.color[5],
                                    },
                                    //节点标签的样式
                                    label: {
                                        show: true,
                                        color: this.control.color[5],
                                        align: 'center',//水平对齐方式
                                        verticalAlign: 'middle',//垂直对齐方式
                                    },
                                    //提示框设置
                                    tooltip: {
                                        formatter: this.control.tooltip[6],//提示框内容
                                    },
                                    //框框大小
                                    symbolSize: [50, 20],
                                },
                            ],

                            //节点间的关系数据
                            links: [
                                {
                                    source: '拟稿',
                                    target: '分管处领导初审',
                                    lineStyle: {
                                        color: this.control.lineColor[0],
                                    }
                                },
                                {
                                    source: '分管处领导初审',
                                    target: '处长审批',
                                    lineStyle: {
                                        color: this.control.lineColor[1],
                                    }
                                },
                                {
                                    source: '处长审批',
                                    target: '综合办签发',
                                    lineStyle: {
                                        color: this.control.lineColor[2],
                                    }
                                },
                                {
                                    source: '分管处领导初审',
                                    target: '综合办签发',
                                    lineStyle: {
                                        color: this.control.lineColor[3],
                                    }
                                },

                                {
                                    source: '综合办签发',
                                    target: '传阅',
                                    lineStyle: {
                                        color: this.control.lineColor[4],
                                    }
                                },

                                {
                                    source: '传阅',
                                    target: '分管处领导复审',
                                    lineStyle: {
                                        color: this.control.lineColor[5],
                                    }
                                },

                                {
                                    source: '分管处领导复审',
                                    target: '办结',
                                    lineStyle: {
                                        color: this.control.lineColor[6],
                                    }
                                },
                                {
                                    source: '传阅',
                                    target: '办结',
                                    lineStyle: {
                                        color: this.control.lineColor[7],
                                    }
                                },
                            ],

                            //连线样式
                            lineStyle: {
                                normal: {
                                    opacity: 0.7,
                                    width: 2,
                                }
                            },
                            left: 100,
                            right: 100,
                            top: 100,
                            bottom: 100,
                            height: 300,
                            width: 700,

                        }
                    ]
                });
            },
            back() {
                this.$emit('backToDetail');
            },
        },
        mounted() {
            this.judgeControl();
            this.draw();
        },
        watch: {}

    }
</script>
<style scoped lang="scss">
    .chart_send {
        width: 100%;
        height: 100%;
        #main {
            margin-top: 30px;
            margin-left: 20px;
            height: 600px;
        }
    }


</style>