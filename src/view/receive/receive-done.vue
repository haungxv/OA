<template>
    <div class="receive-propose-done" id="Print">
        <el-table
                :data="pageDataDone"
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
                    prop="department"
                    label="来文单位"
                    style="width: 20%">
            </el-table-column>
            <el-table-column
                    prop="add_time"
                    label="来文日期"
                    style="width: 20%">
            </el-table-column>
            <el-table-column
                    prop="term"
                    label="截止日期"
                    style="width: 20%">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    style="width: 20%">
                <template slot-scope="scope">
                    <el-button @click="onPrint(scope.row)" type="text"
                               class="receive-propose-done-button">打印
                    </el-button>
                    <el-button @click="onLoad(scope.row)" type="text"
                               class="receive-propose-done-button">下载附件
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
                    @current-change="handleCurrentChange"
                    class="receive-propose-dueout-page"
                    background
                    layout="prev, pager, next"
                    :total="tableDataLengthDone">
            </el-pagination>
        </div>
        <el-dialog
                title="下载列表"
                :visible.sync="dialog"
                width="30%"
                :before-close="handleClose"
                center>
            <div >
                <h4 style="display: block;font-size: 16px;margin-bottom: 10px">附件下载:</h4>
                <a v-for="(li,index) in list" :href="li.upload" download style="display: block;margin-bottom: 10px;color: black">{{index+1}}.{{li.name}}</a>
            </div>
        </el-dialog>
    </div>
</template>

<script>


    export default {
        data() {
            return {
                list: [],
                dialog: false
            }
        },
        methods: {
            handleCurrentChange(e) {
                console.log("now current page is:", e)
                this.$store.commit('changeRePageDataDone', e);
            },
            onPrint(event) {
                const myWindow = window.open('', '标题');

                // 获取head标签内的html
                let headHtml = document.head.innerHTML;

                // 头中的screen换成打印样式print
                headHtml = headHtml.replace('screen', 'screen, print');

                //重新写入文档流-->
                // console.log(event.department,event.add_time)
                myWindow.document.write('<html>');
                myWindow.document.write(headHtml);
                myWindow.document.write('<body >');
                myWindow.document.write(`<section><div class="print-h1"><span class="print-head">电子科技大学计划财务处</span><div class="print-h3">${event.text_number}</div></div>`);
                myWindow.document.write(`<div class="print-div"><div class="print-div-head">${event.title}</div><p class="print-div-pre">${event.desc_content.replace(/<\/br>/g, '\r\n').replace(/&nbsp;/g, ' ')}</p>`);
                myWindow.document.write(`<div class="print-foot"><div class="print-organ">计划财务处</div><div class="print-date">${event.add_time}</div></section>`);
                myWindow.document.write('<script>setTimeout(function() {window.print();window.close()}, 500)</');
                myWindow.document.write('script>');
                myWindow.document.write('</body></html>');
            },
            handleClose(done) {
                done();
            },
            onLoad(e) {
                this.list = e.download_list;
                this.dialog = true
            }
        },
        computed: {
            //当前页面显示的文单信息
            pageDataDone() {
                let now = this.$store.state.receivePageDataDone;
                let self = this;
                if (now) {
                    now.map(function (a) {
                        a.re_term = a.term;
                        a.re_time = a.add_time;
                        let date = new Date(a.add_time);
                        let dateterm = new Date(a.term);
                        let emergency = a.emergency;
                        let times = `${dateterm.getFullYear()}年${dateterm.getMonth() + 1}月${dateterm.getDate()}日`;
                        let time = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
                        a.term = times;
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
            tableDataLengthDone() {
                return this.$store.state.receiveDataDone.count;
            }
        },
        mounted() {
            //获取初始文单信息，展示初始页面
            this.$store.commit('getReDataDone');
        }
    }
</script>

<style lang="less" TYPE="text/less">
    .receive-propose-done {
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

        .receive-dueout-link {
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

    .receive-propose-done-button {
        width: 45%;
        height: 31px;
        line-height: 31px;
        border-radius: 5px 5px 5px 5px;
        text-align: center;
        border: 1px solid rgba(26, 173, 25, 1);
        color: rgba(26, 173, 25, 1);
        padding: 0;
        transition: all 0.5s;
        margin: 0 auto;
        &:hover {
            background-color: rgba(26, 173, 25, 1) !important;
            color: white !important;
        }
        &:focus {
            background-color: rgba(26, 173, 25, 1);
            color: white;
        }
    }

    @import url("./print.less");
</style>


<!--<template>-->
<!--<div class="print-box" style="margin-left: 20px; margin-right: 20px" id="app">-->
<!--<h2 class="print-header" style="margin-top: 0px">预分拣单</h2>-->

<!--<div class="top-info-box">-->
<!--<div class="flex-box">-->
<!--<div class="flex-2">预分拣单：{{printData.crossDockingNo}}</div>-->
<!--<div class="flex-1">总SKU数：{{printData.skuQty}}</div>-->
<!--<div class="flex-1">总PCS数：{{printData.pcsQty}}</div>-->
<!--</div>-->
<!--<div class="flex-box">-->
<!--<div class="flex-1">生单时间：{{printData.createTime}}</div>-->
<!--<div class="flex-1">打印时间：{{printData.printTime}}</div>-->
<!--</div>-->
<!--</div>-->

<!--<hr class="top-line" style="margin-top: 2px;margin-bottom: 2px;"/>-->

<!--<ul class="printTable">-->
<!--<li v-for="item in printData.commodityList" :key="item.commodityCode">-->
<!--<div class="table-top-box">-->
<!--<div class="flex-box">-->
<!--<div class="flex-1">商品编码：{{item.commodityCode}}</div>-->
<!--<div class="flex-1">越库数量：{{item.crossQty}}</div>-->
<!--</div>-->
<!--<div class="flex-box">-->
<!--<div class="flex-2">品名：{{item.commodityName}}</div>-->
<!--<div class="flex-1">规格：{{item.spec}}</div>-->
<!--<div class="flex-1">单位：{{item.unit}}</div>-->
<!--</div>-->
<!--</div>-->
<!--<table>-->
<!--<thead>-->
<!--<tr>-->
<!--<th>门店编码</th>-->
<!--<th>门店名称</th>-->
<!--<th>门店库位</th>-->
<!--<th>播种数量</th>-->
<!--</tr>-->
<!--</thead>-->
<!--<tbody>-->
<!--<tr v-for="subItem in item.distributionDetail" :key="subItem.storeCode">-->
<!--<td>{{ subItem.storeCode }}</td>-->
<!--<td>{{ subItem.storeName }}</td>-->
<!--<td>{{ subItem.collectionLocation}}</td>-->
<!--<td>{{ subItem.matchQty }}</td>-->
<!--</tr>-->
<!--</tbody>-->
<!--</table>-->
<!--</li>-->
<!--</ul>-->

<!--<hr class="bottom-line" style="margin-top: 2px;margin-bottom: 2px;"/>-->

<!--<div class="footer-center">-->
<!--<el-button @click="startPrint" type="primary">打印</el-button>-->
<!--</div>-->
<!--</div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--data() {-->
<!--return {-->
<!--printData: {}-->
<!--}-->
<!--},-->
<!--mounted() {-->
<!--this.init();-->
<!--},-->
<!--methods: {-->
<!--init() {-->
<!--const data = {-->
<!--'crossDockingNo': 'PSTSHW000218314-9999',-->
<!--'skuCount': 3,-->
<!--'pcsCount': 2452,-->
<!--'createTime': '2018-03-14 17:40:01',-->
<!--'printTime': '2018-03-14 17:40:01',-->
<!--'commodityList': [-->
<!--{-->
<!--'commodityCode': 200004960001,-->
<!--'commodityName': '薯片',-->
<!--'spec': '32.4g',-->
<!--'unit': '袋',-->
<!--'crossQty': 150,-->
<!--'distributionDetail': [-->
<!--{-->
<!--'storeCode': 0,-->
<!--'storeName': '人广店',-->
<!--'collectionLocation': 'MENDIAN1',-->
<!--'matchQty': 21,-->
<!--}-->
<!--]-->
<!--}-->
<!--],-->
<!--};-->
<!--for (let i = 0; i < 10; i++) {-->
<!--const item = Object.assign({}, data.commodityList[0].distributionDetail[0]);-->
<!--item.storeCode = i + 1;-->
<!--data.commodityList[0].distributionDetail.push(item);-->
<!--}-->
<!--for (let i = 0; i < 10; i++) {-->
<!--const item = Object.assign({}, data.commodityList[0]);-->
<!--item.commodityCode = i + 1;-->
<!--data.commodityList.push(data.commodityList[0]);-->
<!--}-->
<!--this.printData = data || {};-->
<!--},-->
<!--startPrint() {-->
<!--// 打开一个新窗口-->
<!--const myWindow = window.open('', '标题');-->

<!--// 获取id为app内的html-->
<!--const bodyHtml = window.document.getElementById('app').innerHTML;-->

<!--// 获取head标签内的html-->
<!--let headHtml = document.head.innerHTML;-->

<!--// 头中的screen换成打印样式print-->
<!--headHtml = headHtml.replace('screen', 'screen, print');-->

<!--//重新写入文档流-->
<!--myWindow.document.write('<html>');-->
<!--myWindow.document.write(headHtml);-->
<!--myWindow.document.write('<body >');-->
<!--myWindow.document.write(bodyHtml);-->
<!--myWindow.document.write('<script>setTimeout(function() {window.print(); window.close();}, 500)</');-->
<!--myWindow.document.write('script>');-->
<!--myWindow.document.write('</body></html>');-->
<!--}-->
<!--}-->
<!--};-->
<!--</script>-->

<!--<style lang="less" scoped>-->
<!--@import "./print.less";-->
<!--</style>-->