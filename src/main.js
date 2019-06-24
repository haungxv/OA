import Vue from 'vue'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import axios from 'axios';
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'

import 'mavon-editor/dist/css/index.css'
import '../statics/styles/global.less'
import '../statics/styles/base.css'

import app from './app_all.vue'
import asideList from './comonents/aside-list'
import breadcrumb from './comonents/breadcrumb'
import createRouter from '../config/router'
import createStore from './store/vuex.js'
import qs from 'qs';
import {get, post, put, deleteDate, success, fail} from './utils/http.js'

Vue.prototype.$qs = qs;
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$put = put;
Vue.prototype.$delete = deleteDate;
Vue.prototype.$success = success;
Vue.prototype.$fail = fail;

Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(asideList);
Vue.use(breadcrumb);
Vue.use(VueRouter);
const router = createRouter();
const store = createStore();

// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (sessionStorage.getItem('token') || store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            let token = sessionStorage.getItem('token') || store.state.token;
            config.headers.Authorization = `OA ${token}`;
            // console.log(`进入了请求拦截器，为请求加上了token验证`);
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // console.log(`进入了响应拦截器,返回401`);
                    // 返回 401 清除token信息并跳转到登录页面
                    // store.commit(types.LOGOUT);
                    router.replace({
                        path: '/sign',
                        query: {redirect: router.currentRoute.fullPath}
                    });
                // console.log(`返回sign页面`)
            }
        }
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    });


new Vue({
    el: '#root',
    router,
    store,
    render: (h) => h(app)
});

