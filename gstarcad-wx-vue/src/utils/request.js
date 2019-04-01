import axios from 'axios'
import store from '../store/store'
import router from '../router'
// axios.defaults.withCredentials = true
// axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.baseUrl = '/api'
const service = axios.create({
    baseURL: 'https://wx-dev-cn.51ake.com/weixin/api',
    // baseURL: 'http://172.31.0.6:8999/weixin/api/',
    // baseUrl: '/api',
    // baseURL: process.env.VUE_APP_API_BASE_URL, // api的base_url
    timeout: 10000 // request timeout
})

//http 请求拦截器
service.interceptors.request.use(config => {
    if (store.state.utoken) { // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.Authorization = `token ${store.state.uToken}`;
    }
    return config;
}, error => {
    return Promise.reject(error)
})

//http 响应拦截器
service.interceptors.response.use(
    // response => {
    //     if (response.data.rtnCode === '0200001' || response.data.rtnCode === '1111111') {
    //         store.commit('clearToken');
    //         router.replace({
    //             path: '/',
    //         })
    //     }
    //     return response;
    // },
    // error => {
    //     if (error.data.rtnCode === '0200001' || response.data.rtnCode === '1111111') {
    //         store.commit('clearToken');
    //         router.replace({
    //             path: '/'
    //         })
    //     }
    //     return Promise.reject(error.response.data) // 返回接口返回的错误信息
    // }
);　　

export default service