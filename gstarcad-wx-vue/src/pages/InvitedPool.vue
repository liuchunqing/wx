<template>
    <section>
        <div class="wrap">
            <div class="box" v-if="info">
                <p id="name">“{{info.payGroup.name}}” 邀请您拼购CAD看图王</p>
                <p id="price">{{info.payGroup.productName}} ¥{{info.payGroup.price}}</p>
                <button @click="payMoney(info.payGroup.codes,info.payGroup.productName,this.$route.query.payGroupId,this.$route.query.groupId)">接受邀请</button>
            </div>
        </div>
        <router-view></router-view>
    </section>
</template>
<script>
import service from '../plugins/getData'
import wx from 'weixin-js-sdk'
export default {
    data() {
        return {
            info:null    
        }
    },
    created() {
        this.init()
    },
    methods: {
        init(){
            service.getGroupInfo(this.$route.query.payGroupId,this.$route.query.groupId).then(response=>{
            let res = response.data
            if(res.rtnCode !== '0000000'){
                this.$toast.center(res.msg)
            }else{
                this.info = res.bizData
            }
            })
        },
        payMoney(productCode,name,payGroupId,groupId){
            let _this = this
            service.getConfig(window.location.url).then(response=>{
                this.configWx(response.data.bizData)

                service.payGroup(productCode,name,payGroupId,groupId).then(response=>{
                    let res = response.data
                        wx.chooseWXPay({
                        timestamp: res.bizData.orderMap.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                        nonceStr: res.bizData.orderMap.nonceStr, // 支付签名随机串，不长于 32 位
                        package: res.bizData.orderMap.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                        signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                        paySign: res.bizData.orderMap.paySign, // 支付签名
                            success: function (res) {
                            // 支付成功后的回调函数
                                _this.$toast.top('支付成功')
                                // this.response = res
                                _this.$router.push('/info')
                            },
                            fail:function(res){
                                // this.response = res
                                _this.$toast.center(res)
                            }
                        });
                })
            })
            
        },
        configWx(bizData){
            wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: bizData.configParam.appId, // 必填，公众号的唯一标识
            timestamp: bizData.configParam.timestamp, // 必填，生成签名的时间戳
            nonceStr: bizData.configParam.nonceStr, // 必填，生成签名的随机串
            signature: bizData.configParam.signature,// 必填，签名
            jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表
            });
        }
    },
}
</script>
<style lang="scss" scoped>
    .wrap{
        width: 100%;
        height: 413px;
        background:linear-gradient(135deg,rgba(147,226,230,1) 0%,rgba(19,152,166,1) 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        .box{
            >p{
                font-size: 28px;
                font-family:PingFangSC-Semibold;
                font-weight:500;
                color:rgba(255,255,255,1);
            }
            #name{
                font-size: 28px;
                margin-bottom: 35px;
            }
            #price{
                font-size: 48px;
                margin-left: 15%;
            }
            >button{
                margin-left: 25%;
                margin-top: 66px;
                border: 0;
                width:220px;
                height:57px;   
                color: #fff;
                font-size: 28px;
                font-weight: 550;
                border-radius: 39px;
                background:linear-gradient(180deg,rgba(255,231,112,1) 0%,rgba(231,181,20,1) 100%);
            }
        }
    }
</style>

