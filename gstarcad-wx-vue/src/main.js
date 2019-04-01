// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import wechatAuth from './utils/wechatAuth'
import service from './plugins/getData'
import qs from 'qs'
import 'lib-flexible'
import './components/Toast/toast.css'
import Toast from './components/Toast/index'
import VueScroller from "vue-scroller"
Vue.use(VueScroller)
Vue.use(Toast)


//路由全局拦截
router.beforeEach((to, from, next) => {

    if (store.state.utoken || to.path === '/bind' || to.path === '/regist') {
        if (to.path === '/') {
            next('/info')
        }
        next()
    } else {
        let url = window.location.href
            // if (to.path === '/auth') {

        // } else {
        //     next()
        // }



        let parseUrl = qs.parse(url.split('?')[1])
        if (parseUrl.code) {
            wechatAuth.returnFromWechat(to.fullPath)

            service.getToken().then((response => {
                    let res = response.data
                        // this.aaa = JSON.stringify(response);
                        // this.$toast.top(res.msg)
                    console.log('token ok=' + JSON.stringify(res))
                    if (res.rtnCode === '0000000') {
                        store.commit('setToken', res.bizData.utoken)
                        next()
                            // this.$router.push('/info')
                    }

                    if (res.rtnCode === '980003') {
                        // this.$router.push('/bind')
                        next({
                            path: '/bind',
                            query: {
                                to: to.path
                            }
                        })
                    }
                })).catch((err) => {
                    // this.aaa+='error|||||'+JSON.stringify(err)
                    // next()
                    console.log('error|||' + JSON.stringify(err))
                })
                // next()
        } else {
            wechatAuth.redirect_uri = url
            window.location.href = wechatAuth.authUrl
        }

    }

})

// router.beforeEach((to, from, next) => {
//     console.log('loginstatus=' + store.state.loginStatus)

//     if (store.state.loginStatus === 2) {
//         next()
//     } else {
//         if (to.path === '/') {
//             if (store.state.loginStatus == 0) {
//                 //微信未授权登录跳转到授权登录页面
//                 let url = window.location.href
//                     //解决重复登录url添加重复的code与state问题
//                     // let parseUrl = qs.parse(url.split('?')[1])
//                     // let loginUrl
//                     // if (parseUrl.code && parseUrl.state) {
//                     //     delete parseUrl.code
//                     //     delete parseUrl.state
//                     //     loginUrl = `${url.split('?')[0]}?${qs.stringify(parseUrl)}`
//                     // } else {
//                     //     loginUrl = url
//                     // }
//                 console.log('url=' + url)
//                 wechatAuth.redirect_uri = url
//                 store.commit('setLoginStatus', 1)
//                 console.log('set  ' + store.state.loginStatus)
//                 window.location.href = wechatAuth.authUrl
//             }
//             if (store.state.loginStatus == 1) {
//                 console.log('set  ' + store.state.loginStatus)
//                 console.log('fullpath=' + window.location.href)
//                 wechatAuth.returnFromWechat(window.location.href)
//                 console.log('code=' + wechatAuth.code)
//                 if (wechatAuth.code) {
//                     store.commit('setLoginStatus', 2)
//                     next('/pay')

//                 } else {
//                     // store.commit('setLoginStatus', 0)
//                 }
//                 next()
//             }
//         }

//     }
// })



Vue.use(wechatAuth, {
    appid: 'wx58594023b04e22ed'
})


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})