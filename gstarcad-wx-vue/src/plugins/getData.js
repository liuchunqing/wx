import request from '../utils/request'
import store from '../store/store'
import wechatAuth from '../utils/wechatAuth'
import qs from 'qs'

const REQUEST_OK = '0000000'
export default {
    //用户及认证


    // {
    //     "data": {
    //         "code":"0"
    //     },
    //     "clientInfo": {
    //         "clientType":"DF_Android",
    //         "clientVersion":"android6.0",
    //         "appVersion":"3.0.2"
    //     },
    //     "style":"0",
    //     "secret":"0"
    // }

    async getToken() {
        let res = await request.post('/getToken.json', {
            data: {
                code: wechatAuth.code
            },
            clientInfo: {
                clientType: '',
                clientVersion: '',
                appVersion: ''
            },
            style: 0,
            secret: 0


        })
        return res

    },
    //获取用户信息
    async getUserInfo() {
        let res = await request.post(`/getUserInfo.json?utoken=${store.state.utoken}`)
        return res
    },

    //绑定用户
    async bindUser(user, pwd) {
        let res = await request.post('/bindThird.json', {
            data: {
                code: wechatAuth.code,
                loginName: user,
                password: pwd,
            },
            clientInfo: {
                clientType: '',
                clientVersion: '',
                appVersion: ''
            },
            style: 0,
            secret: 0

        })
        return res
    },

    //获取图片验证码
    async getValidImg() {
        let res = await request.post('/kaptcha.json', {
            data: {},
            clientInfo: {
                clientType: '',
                clientVersion: '',
                appVersion: ''
            },
            style: 0,
            secret: 0
        })

        return res
    },

    //进行图片验证
    async verify(coordinate, imageKey) {
        let res = await request.post('/verify.json', {
            data: {
                coordinate,
                imageKey
            },
            clientInfo: {
                clientType: '',
                clientVersion: '',
                appVersion: ''
            },
            style: 0,
            secret: 0
        })
        return res
    },


    //发送短信
    async sendSms(number) {
        let res = await request.post('/sendMcode.json', {
            data: {
                loginName: number
            },
            clientInfo: {
                clientType: '',
                clientVersion: '',
                appVersion: ''
            },
            style: 0,
            secret: 0
        })
        return res
    },
    //创建并绑定用户
    async createUser(user, pwd, recommendCode, kaptcha, imageKey, volidNum) {
        let res = await request.post('/newBindThird.json', {
            data: {
                code: wechatAuth.code,
                loginName: user,
                password: pwd,
                recommendCode,
                kaptcha,
                imageKey,
                mcode: volidNum
            },
            clientInfo: {
                clientType: '',
                clientVersion: '',
                appVersion: ''
            },
            style: 0,
            secret: 0

        })
        return res
    },

    //解绑用户
    async unbindUser() {
        let res = await request.post(`/unbindThird.json?utoken=${store.state.utoken}`)
        return res
    },
    //签到
    async signIn() {
        let res = await request.post(`/signIn.json?utoken=${store.state.utoken}`)
        return res
    },

    //获取payConfig
    async getConfig(url) {
        let res = await request.post(`/getJsTicketInfo.json`, {
            data: {
                jsUrl: url
            },
            clientInfo: {
                clientType: '',
                clientVersion: '',
                appVersion: ''
            },
            style: 0,
            secret: 0
        })
        return res
    },

    //卡券支付
    async payCard(productCode, name, cardId) {
        let res = await request.post(`/order/unifiedorder.json?utoken=${store.state.utoken}`, {
            data: {
                productCode,
                goodsName: name,
                cardId
            },
            clientInfo: {
                clientType: '',
                clientVersion: '',
                appVersion: ''
            },
            style: 0,
            secret: 0
        })
        return res
    },

    //调取支付
    async pay(productCode, name) {
        let res = await request.post(`/order/unifiedorder.json?utoken=${store.state.utoken}`, {
            data: {
                productCode,
                goodsName: name
            },
            clientInfo: {
                clientType: '',
                clientVersion: '',
                appVersion: ''
            },
            style: 0,
            secret: 0
        })
        return res
    },
    //团购支付
    async payGroup(productCode, name, payGroupId, groupId) {
        let res = await request.post(`/order/unifiedorder.json?utoken=${store.state.utoken}`, {
            data: {
                productCode,
                goodsName: name,
                payGroupId,
                groupId
            },
            clientInfo: {
                clientType: '',
                clientVersion: '',
                appVersion: ''
            },
            style: 0,
            secret: 0
        })
        return res
    },


    //获取广告列表
    async getNewsList() {
        let res = await request.post(`/getNewsList.json`, {
            data: {},
            clientInfo: {
                clientType: '',
                clientVersion: '',
                appVersion: ''
            },
            style: 0,
            secret: 0
        })
        return res
    },

    //订单

    //发票保存信息
    async saveInvoice(invoice) {
        let res = await request.post(`/order/saveInvoice.json?utoken=${store.state.utoken}`, {
            data: {
                title: invoice.title, //类型：String  必有字段  备注：发票抬头
                taxpayerNumber: invoice.taxpayerNumber, //类型：String  必有字段  备注：纳税人税号
                taxpayerAddr: invoice.taxpayerAddr, //类型：String  必有字段  备注：纳税人地址
                bank: invoice.bank, //类型：String  必有字段  备注：开户行
                bankAccount: invoice.bankAccount, //类型：String  必有字段  备注：开户户号
                name: invoice.name, //类型：String  必有字段  备注：发票接收人名
                mobile: invoice.mobile, //类型：String  必有字段  备注：发票接收人手机号
                address: invoice.address, //类型：String  必有字段  备注：发票接收人地址
                orderIds: invoice.orderIds
            },
            clientInfo: {
                clientType: '',
                clientVersion: '',
                appVersion: ''
            },
            style: 0,
            secret: 0
        })
        return res
    },


    //获取团购信息
    async getGroupInfo(payGroupId, groupId) {
        let res = await request.post(`/order/getGroupProgress.json?utoken=${store.state.utoken}`, {
            data: {
                groupId,
                payGroupId
            },
            clientInfo: {
                clientType: '',
                clientVersion: '',
                appVersion: ''
            },
            style: 0,
            secret: 0
        })
        return res
    },


    //获取商品列表信息
    async getProductList() {
        let res = await request.post(`/order/getProductList.json?utoken=${store.state.utoken}`, {
            data: {},
            clientInfo: {
                clientType: '',
                clientVersion: '',
                appVersion: ''
            },
            style: 0,
            secret: 0
        })
        return res
    },

    //获取订单列表
    async getOrderList(size, num) {
        let res = await request.post(`/order/getOrderPage.json?utoken=${store.state.utoken}`, {
            data: {
                pageSize: size,
                pageNo: num
            },
            clientInfo: {
                clientType: '',
                clientVersion: '',
                appVersion: ''
            },
            style: 0,
            secret: 0
        })
        return res
    },

    //获取最后一次开票信息
    async getLatestInvoiceInfo() {
        let res = await request.post(`/order/getLatestInvoiceInfo.json?utoken=${store.state.utoken}`)
        return res
    },

    //未开发票订单列表
    async getNeedInvoiceOrderPage(size, num) {
        let res = await request.post(`/order/getNeedInvoiceOrderPage.json?utoken=${store.state.utoken}`, {
            data: {
                pageSize: size,
                pageNo: num
            },
            clientInfo: {
                clientType: '',
                clientVersion: '',
                appVersion: ''
            },
            style: 0,
            secret: 0
        })
        return res
    },


    //获取卡券列表
    async getCardList() {
        let res = await request.post(`/order/getMyCardList.json?utoken=${store.state.utoken}`, {
            data: {},
            clientInfo: {
                clientType: '',
                clientVersion: '',
                appVersion: ''
            },
            style: 0,
            secret: 0
        })
        return res
    },

    //卡券领取
    async getCard(cardId) {
        let res = await request.post(`/order/getCard.json?utoken=${store.state.utoken}`, {
            data: {
                cardId
            },
            clientInfo: {
                clientType: '',
                clientVersion: '',
                appVersion: ''
            },
            style: 0,
            secret: 0
        })
        return res
    },

    //获取发票列表
    async getInvoicePage(size, num) {
        let res = await request.post(`/order/getInvoicePage.json?utoken=${store.state.utoken}`, {
            data: {
                pageSize: size,
                pageNo: num
            },
            clientInfo: {
                clientType: '',
                clientVersion: '',
                appVersion: ''
            },
            style: 0,
            secret: 0
        })
        return res
    },

    //取消开票申请
    async cancelInvoice(id) {
        let res = await request.post(`/order/cancelInvoice.json?utoken=${store.state.utoken}`, {
            invoiceId: id
        })
        return res
    },

    //发票对应订单列表
    async getInvoicedOrderPage(size, num, id) {
        let res = await request.post(`/order/getInvoicedOrderPage.json?utoken=${store.state.utoken}`, {
            data: {
                pageSize: size,
                pageNo: num,
                id
            },
            clientInfo: {
                clientType: '',
                clientVersion: '',
                appVersion: ''
            },
            style: 0,
            secret: 0
        })
        return res
    },

    //取消订单
    async cancelOrder(order) {
        let res = await request.post(`/order/cancelOrder.json.json?utoken=${store.state.utoken}`, {
            insideOrder: order.insideOrder, //类型：String  必有字段  备注：内部订单号
            orderTime: order.orderTime, //类型：String  必有字段  备注：订单生成时间yyyy-MM-dd HH:mm:ss
            groupId: order.groupId, //类型：Number  可有字段  备注：参团ID
            orderId: order.orderId //类型：Number  必有字段  备注：订单Id
        })
        return res
    },

    //申请退费
    async refundOrder(order) {
        let res = await request.post(`/order/refundOrder.json?utoken=${store.state.utoken}`, {
            outsideOrder: order.outsideOrder, //类型：String  必有字段  备注：外部订单编号
            insideOrder: order.insideOrder, //类型：String  必有字段  备注：内部订单编号
            orderMoney: order.orderMoney, //类型：String  必有字段  备注：订单金额
            orderMoneyCurrency: order.orderMoneyCurrency, //类型：String  必有字段  备注：订单货币类型
            groupId: order.groupId //类型：Number  必有字段  备注：参团Id
        })
        return res
    },

    //获取订单团购列表
    async getMyPayGroup(pageSize, pageNo, isSuccess) {
        let res = await request.post(`/order/getMyPayGroup.json?utoken=${store.state.utoken}`, {
            data: {
                pageSize,
                pageNo,
                isSuccess
            },
            clientInfo: {
                clientType: '',
                clientVersion: '',
                appVersion: ''
            },
            style: 0,
            secret: 0
        })
        return res
    }

}