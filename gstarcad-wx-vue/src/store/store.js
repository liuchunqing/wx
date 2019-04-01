import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

//state
const state = {
    invoiceCheckList: [],
    checkCount: 0,
    utoken: null,
    loginStatus: 0,
    invoice: {
        title: '',
        identificationNum: '',
        phoneNum: '',
        bankName: '',
        bankNum: '',
        reciveName: '',
        recivePhone: '',
        reciveAddress: ''
    },
    isBind: 0,
    bindUser: '',
    bindPwd: ''
}

//mutations
const mutations = {
    //申请开票list增加数据
    pushInvoice(state, data) {
        state.invoiceCheckList[data.id] = data.isChecked;
        if (data.isChecked)(
            state.checkCount++
        )
    },
    //申请开票list更改状态
    updateInvoice(state, data) {
        state.invoiceCheckList[data.id] = data.isChecked;
        if (data.isChecked) {
            state.checkCount++
        } else {
            state.checkCount--
        }
    },
    //设置token
    setToken(state, token) {
        state.utoken = token
    },
    //清除token
    clearToken(state) {
        state.utoken = null
    },
    //设置loginStatus
    setLoginStatus(state, status) {
        state.loginStatus = status
    },
    //设置订单信息
    setInvoice(state, invoice) {
        for (let item in invoice) {
            state.invoice[item] = invoice[item]
        }
    },
    //设置bind标志
    setBind(state, isBind) {
        state.isBind = isBind
    },
    //设置user pwd
    setBindUser(state, user) {
        state.bindUser = user.user
        state.bindPwd = user.pwd
    }
}

//actions
const actions = {

}

export default new Vuex.Store({
    state,
    mutations,
    actions
})