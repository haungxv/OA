import Vuex from 'vuex'
import axios from 'axios'

export default () => {
    const store = new Vuex.Store({
        state: {
            // 侧边栏状态管理
            asides: [1, 0, 0, 0, 0, 0],
            //手机侧边栏显状态管理
            phoneAside: true,
            //初始状态是否处于收发文页面
            showPage: true,
            //拟文页面的文单信息
            role: 2,
            departmentName: [],
            formData: {
                // text_number: '',
                destination: '',
                cc: '',
                title: '',
                public: '',
                department: '',
                people: '',
                emergency: '',
                first_check_status: '',
                red: '',
                desc_content: '',
                upload: [],
                print_sum: ''
            },
            reformData: {
                text_number: '',
                add_time: '',
                title: '',
                department: '',
                emergency: '',
                first_check_status: '',
                desc_content: '',
                upload: [],
                receiving_proposed: '',
                receive_number: '',
                term: ''
            },

            //总发文单信息（保存未提交）
            dispatchData: [],
            //每一页显示的发文文单信息(保存未提交)
            pageData: [],
            //总发文单信息（保存未提交）
            receiveData: [],
            //每一页显示的发文文单信息(保存未提交)
            receivePageData: [],


            // //在办发文文单（所有状态文单）
            // dispatchDataAll: [],
            // //每一页显示的在办发文文单信息(所有状态文单)
            // pageDataAll: [],


            //未审批发文文单（提交未审批）
            dispatchDataUn: [],
            //每一页显示的未审批发文文单(提交未审批)
            pageDataUn: [],
            //显示审批修改页面
            UnDispatchMark: false,
            //未审批发文文单（提交未审批）
            receiveDataUn: [],
            //每一页显示的未审批发文文单(提交未审批)
            receivePageDataUn: [],
            //显示审批修改页面
            UnReceiveMark: false,

            //审批完待签发发文单(审批完待签发)
            dispatchDataSign: [],
            //每一页审批完待签发发文单(审批完待签发)
            pageDataSign: [],
            SignDispatchMark: false,
            //审批完待签发发文单(审批完待签发)
            receiveDataSign: [],
            //每一页审批完待签发发文单(审批完待签发)
            receivePageDataSign: [],
            SignReceiveMark: false,

            //传阅状态发文单(签发完传阅中)
            dispatchDataRead: [],
            //每一页传阅状态发文单(签发完传阅中)
            pageDataRead: [],
            ReadDispatchMark: false,
            //传阅状态收文单(签发完传阅中)
            receiveDataRead: [],
            //每一页传阅状态收文单(签发完传阅中)
            receivePageDataRead: [],
            ReadReceiveMark: false,

            //传阅状态发文单(传阅完待二审)
            dispatchDataRe: [],
            //每一页传阅状态发文单(传阅完待二审)
            pageDataRe: [],
            ReDispatchMark: false,
            //传阅状态收文单(传阅完待二审)
            receiveDataRe: [],
            //每一页传阅状态收文单(传阅完待二审)
            receivePageDataRe: [],
            ReReceiveMark: false,


            //总发文单信息（已办结）
            dispatchDataDone: [],
            //每一页显示的文单信息(已办结)
            pageDataDone: [],
            //总发文单信息（已办结）
            receiveDataDone: [],
            //每一页显示的文单信息(已办结)
            receivePageDataDone: [],

        },
        mutations: {
            //设置角色
            setRole(state, val) {
                state.role = val;
                //设置公司名称
            },
            //根据点击时输入的参数改变侧边栏状态的数值
            activeAside(state, i) {
                state.asides = [0, 0, 0, 0, 0, 0];
                state.asides[i - 1] = 1;
                state.showPage = true;
            },
            //手机适配点击侧边栏选项后触发此函数
            showPhoneAside(state) {
                state.phoneAside = !state.phoneAside;
            },

            //初始收发文页面挂载时触发此函数
            changeShowPage(state) {
                state.showPage = false;
            },


            //获取初始发文页码(已保存未发送)
            getData(state) {
                // let url = '/api/v1/send/my/?status=0';
                let url;
                if (state.role === 2) {
                    url = `/api/v1/send/?status=0`;
                }
                if (state.role === 3) {
                    url = `/api/v1/send/my/?status=0`;
                }
                let states = state;
                axios.get(url).then(function (e) {
                    console.log(e.data)
                    states.dispatchData = e.data;
                    states.pageData = states.dispatchData.results
                });
            },
            //点击后获取更新每页信息(已保存未发送）
            changePageData(state, currentPage) {
                // let url = `/api/v1/send/my/?status=0&&page=${currentPage}`;
                let url;
                if (state.role === 2) {
                    url = `/api/v1/send/?status=0&&page=${currentPage}`;
                }
                if (state.role === 3) {
                    url = `/api/v1/send/my/?status=0&&page=${currentPage}`;
                }
                let states = state;
                axios.get(url).then(function (e) {
                    states.dispatchData = e.data;
                    states.pageData = e.data.results;
                })
            },
            //获取初始收文页码(已保存未发送)
            getReData(state) {
                // let url = '/api/v1/receive/my/?status=0';
                let url;
                if (state.role === 2) {
                    url = `/api/v1/receive/?status=0`;
                }
                if (state.role === 3) {
                    url = `/api/v1/receive/my/?status=0`;
                }
                let states = state;
                axios.get(url).then(function (e) {
                    console.log(e.data)
                    states.receiveData = e.data;
                    states.receivePageData = states.receiveData.results
                });
            },
            //点击后更新收文每页信息(已保存未发送）
            changeRePageData(state, currentPage) {
                // let url = `/api/v1/receive/my/?status=0&&page=${currentPage}`;
                let url;
                if (state.role === 2) {
                    url = `/api/v1/receive/?status=0&&page=${currentPage}`;
                }
                if (state.role === 3) {
                    url = `/api/v1/receive/my/?status=0&&page=${currentPage}`;
                }
                let states = state;
                axios.get(url).then(function (e) {
                    states.receiveData = e.data;
                    states.receivePageData = e.data.results;
                })
            },

            //获取初始发文页码(提交未审批)
            getDataUn(state) {
                let url = '/api/v1/send/?status=2';
                let states = state;
                axios.get(url).then(function (e) {
                    // console.log(e.data)
                    states.dispatchDataUn = e.data;
                    states.pageDataUn = states.dispatchDataUn.results
                });
            },
            //点击后获取更新每页信息(提交未审批）
            changePageDataUn(state, currentPage) {
                let url = `/api/v1/send/?status=2&&page=${currentPage}`;
                let states = state;
                axios.get(url).then(function (e) {
                    states.dispatchDataUn = e.data;
                    states.pageDataUn = e.data.results;
                })
            },
            changeUnDispatchMark(state) {
                state.UnDispatchMark = !state.UnDispatchMark;
            },
            //获取初始收文页码(提交未审批)
            getReDataUn(state) {
                let url = '/api/v1/receive/?status=2';
                let states = state;
                axios.get(url).then(function (e) {
                    // console.log(e.data)
                    states.receiveDataUn = e.data;
                    states.receivePageDataUn = states.receiveDataUn.results
                });
            },
            //点击后获取更新收文每页信息(提交未审批）
            changeRePageDataUn(state, currentPage) {
                let url = `/api/v1/receive/?status=2&&page=${currentPage}`;
                let states = state;
                axios.get(url).then(function (e) {
                    states.receiveDataUn = e.data;
                    states.receivePageDataUn = e.data.results;
                })
            },
            changeUnReceiveMark(state) {
                state.UnReceiveMark = !state.UnReceiveMark;
            },


            //获取初始发文页码(审批完待签发)
            getDataSign(state) {
                let url = '/api/v1/send/?status=3';
                let states = state;
                axios.get(url).then(function (e) {
                    states.dispatchDataSign = e.data;
                    states.pageDataSign = states.dispatchDataSign.results
                });
            },
            //点击后获取更新每页信息(审批完待签发）
            changePageDataSign(state, currentPage) {
                let url = `/api/v1/send/?status=3&&page=${currentPage}`;
                let states = state;
                axios.get(url).then(function (e) {
                    states.dispatchDataSign = e.data;
                    states.pageDataSign = e.data.results;
                })
            },
            changeSignDispatchMark(state) {
                state.SignDispatchMark = !state.SignDispatchMark;
            },
            //获取初始收文页码(审批完待签发)
            getReDataSign(state) {
                let url = '/api/v1/receive/?status=3';
                let states = state;
                axios.get(url).then(function (e) {
                    states.receiveDataSign = e.data;
                    states.receivePageDataSign = states.receiveDataSign.results
                });
            },
            //点击后获取更新收文每页信息(审批完待签发）
            changeRePageDataSign(state, currentPage) {
                let url = `/api/v1/receive/?status=3&&page=${currentPage}`;
                let states = state;
                axios.get(url).then(function (e) {
                    states.receiveDataSign = e.data;
                    states.receivePageDataSign = e.data.results;
                })
            },
            changeSignReceiveMark(state) {
                state.SignReceiveMark = !state.SignReceiveMark;
            },


            //获取初始发文页码(签发完传阅中)
            getDataRead(state) {
                let url = '/api/v1/send/?status=4';
                let states = state;
                axios.get(url).then(function (e) {
                    states.dispatchDataRead = e.data;
                    states.pageDataRead = states.dispatchDataRead.results
                });
            },
            //点击后获取更新每页信息(签发完传阅中）
            changePageDataRead(state, currentPage) {
                let url = `/api/v1/send/?status=4&&page=${currentPage}`;
                let states = state;
                axios.get(url).then(function (e) {
                    states.dispatchDataRead = e.data;
                    states.pageDataRead = e.data.results;
                })
            },
            changeReadDispatchMark(state) {
                state.ReadDispatchMark = !state.ReadDispatchMark;
            },
            //获取初始发文页码(签发完传阅中)
            getReDataRead(state) {
                let url = '/api/v1/receive/?status=4';
                let states = state;
                axios.get(url).then(function (e) {
                    states.receiveDataRead = e.data;
                    states.receivePageDataRead = states.receiveDataRead.results
                });
            },
            //点击后获取更新每页信息(签发完传阅中）
            changeRePageDataRead(state, currentPage) {
                let url = `/api/v1/receive/?status=4&&page=${currentPage}`;
                let states = state;
                axios.get(url).then(function (e) {
                    states.receiveDataRead = e.data;
                    states.receivePageDataRead = e.data.results;
                })
            },
            changeReadReceiveMark(state) {
                state.ReadReceiveMark = !state.ReadReceiveMark;
            },


            //获取初始发文页码(传阅完待二审)
            getDataRe(state) {
                let url = '/api/v1/send/?status=5';
                let states = state;
                axios.get(url).then(function (e) {
                    states.dispatchDataRe = e.data;
                    states.pageDataRe = states.dispatchDataRe.results
                });
            },
            //点击后获取更新每页信息(传阅完待二审）
            changePageDataRe(state, currentPage) {
                let url = `/api/v1/send/?status=5&&page=${currentPage}`;
                let states = state;
                axios.get(url).then(function (e) {
                    states.dispatchDataRe = e.data;
                    states.pageDataRe = e.data.results;
                })
            },
            changeReDispatchMark(state) {
                state.ReDispatchMark = !state.ReDispatchMark;
            },
            //获取初始收文页码(传阅完待二审)
            getReDataRe(state) {
                let url = '/api/v1/receive/?status=5';
                let states = state;
                axios.get(url).then(function (e) {
                    states.receiveDataRe = e.data;
                    states.receivePageDataRe = states.receiveDataRe.results
                });
            },
            //点击后获取更新收文每页信息(传阅完待二审）
            changeRePageDataRe(state, currentPage) {
                let url = `/api/v1/receive/?status=5&&page=${currentPage}`;
                let states = state;
                axios.get(url).then(function (e) {
                    states.receiveDataRe = e.data;
                    states.receivePageDataRe = e.data.results;
                })
            },
            changeReReceiveMark(state) {
                state.ReReceiveMark = !state.ReReceiveMark;
            },


            //获取初始发文页码(已办结)
            getDataDone(state) {
                let url;
                if (state.role === 3) {
                    url = '/api/v1/send/my/?status=7';
                } else {
                    url = '/api/v1/send/?status=7';
                }
                axios.get(url).then(function (e) {
                    state.dispatchDataDone = e.data;
                    state.pageDataDone = state.dispatchDataDone.results
                })
            },
            //点击后获取更新每页信息(已办结）
            changePageDataDone(state, currentPage) {
                let url;
                if (state.role === 3) {
                    url = `/api/v1/send/my/?status=7&&page=${currentPage}`;
                } else {
                    url = `/api/v1/send/?status=7&&page=${currentPage}`;
                }
                axios.get(url).then(function (e) {
                    state.dispatchDataDone = e.data;
                    state.pageDataRe = e.data.results;
                })
            },
            //获取初始收文页码(已办结)
            getReDataDone(state) {
                let url;
                if (state.role === 3) {
                    url = '/api/v1/receive/my/?status=7';
                } else {
                    url = '/api/v1/receive/?status=7';
                }
                axios.get(url).then(function (e) {
                    state.receiveDataDone = e.data;
                    state.receivePageDataDone = state.receiveDataDone.results
                })
            },
            //点击后获取更新每页信息(已办结）
            changeRePageDataDone(state, currentPage) {
                let url;
                if (state.role === 3) {
                    url = `/api/v1/receive/my/?status=7&&page=${currentPage}`;

                } else {
                    url = `/api/v1/receive/?status=7&&page=${currentPage}`;
                }
                axios.get(url).then(function (e) {
                    state.receiveDataDone = e.data;
                    state.receivePageDataDone = e.data.results;
                })
            },


            //拟文编辑发文单时触发，获取编辑文单信
            getFormData(state, obj) {
                console.log('enter', obj)
                state.formData = {
                    id: obj.id,
                    // text_number: obj.text_number,
                    print_sum: obj.print_sum,
                    destination: obj.destination,
                    cc: obj.cc,
                    title: obj.title,
                    public: obj.public,
                    department: obj.department,
                    people: obj.people,
                    emergency: obj.emergency,
                    first_check_status: obj.first_check_status,
                    red: obj.red,
                    desc_content: obj.desc_content.replace(/<\/br>/g, '\r\n').replace(/&nbsp;/g, ' '),
                    upload: []
                }
                console.log('donesss', state.formData)
            }
            ,
            //拟文编辑发文单时触发，获取编辑文单信
            getReFormData(state, obj) {
                console.log('enter', obj)
                state.reformData = {
                    id: obj.id,
                    text_number: obj.text_number,
                    print_sum: obj.print_sum,
                    receive_number: obj.receive_number,
                    title: obj.title,
                    add_time: obj.add_time,
                    department: obj.department,
                    emergency: obj.emergency,
                    receiving_proposed: obj.receiving_proposed,
                    first_check_status: obj.first_check_status,
                    desc_content: obj.desc_content.replace(/<\/br>/g, '\r\n').replace(/&nbsp;/g, ' '),
                    upload: [],
                    term: obj.term
                }
                console.log('donesss', state.reformData)
            }
            ,
        }
    });
    return store;
};