<template>
    <section>
        <button @click="pay">支付</button>  

        <p>{{response}}</p>
    </section>  
</template>


<script>
import axios from 'axios'
import wx from 'weixin-js-sdk'
import service from '../plugins/getData'
export default {
    data() {
        return {
            response:''
        }
    },
    methods: {
        onBridgeReady(){
        service.pay('com.gstarcad.auto_pre_12_250','dfasdf').then((response)=>{
            let res = response.data
            this.response+= 'token='+this.$store.state.utoken
            this.response +='data='+ JSON.stringify(res)
            if(res.rtnCode==='0000000'){
                WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
             "appId":res.bizData.appId,     //公众号名称，由商户传入     
             "timeStamp":res.bizData.timeStamp,         //时间戳，自1970年以来的秒数     
             "nonceStr":res.bizData.nonceStr, //随机串     
            "package":res.bizData.package,     
            "signType":res.bizData.signType,         //微信签名方式：     
            "paySign":res.bizData.paySign //微信签名 
        },
        function(res){
        if(res.err_msg == "get_brand_wcpay_request:ok" ){
      // 使用以上方式判断前端返回,微信团队郑重提示：
            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            this.$toast.top('ok')
        } 
    });
            }
        })
         
    },
    pay(){ 

        //支付
        
        // service.pay('com.gstarcad.auto_pre_12_250','dfasdf').then(response=>{
        //     let res = response.data
        //     this.response+= 'token='+this.$store.state.utoken
        //     this.response +='data='+ JSON.stringify(res)
        //     wx.config({
        //     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        //     appId: res.bizData.configParam.appId, // 必填，公众号的唯一标识
        //     timestamp: res.bizData.configParam.timestamp, // 必填，生成签名的时间戳
        //     nonceStr: res.bizData.configParam.nonceStr, // 必填，生成签名的随机串
        //     signature: res.bizData.configParam.signature,// 必填，签名
        //     jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表
        //     });


        //      wx.chooseWXPay({
        //     timestamp: res.bizData.orderMap.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        //     nonceStr: res.bizData.orderMap.nonceStr, // 支付签名随机串，不长于 32 位
        //     package: res.bizData.orderMap.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
        //     signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        //     paySign: res.bizData.orderMap.paySign, // 支付签名
        //     success: function (res) {
        //     // 支付成功后的回调函数
        //     // this.$toast.top('ok')
        //     this.response = res
        //     },
        //     fail:function(res){
        //         this.response = res
        //     }
        //     });
        // })
        

        service.payGroup('com.gstarcad.auto_pre_01_250','dfasdadf',2).then(response=>{
            let res = response.data
            this.response+= 'token='+this.$store.state.utoken
            this.response +='data='+ JSON.stringify(res)
            wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: res.bizData.configParam.appId, // 必填，公众号的唯一标识
            timestamp: res.bizData.configParam.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.bizData.configParam.nonceStr, // 必填，生成签名的随机串
            signature: res.bizData.configParam.signature,// 必填，签名
            jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表
            });


            wx.chooseWXPay({
            timestamp: res.bizData.orderMap.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: res.bizData.orderMap.nonceStr, // 支付签名随机串，不长于 32 位
            package: res.bizData.orderMap.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
            signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: res.bizData.orderMap.paySign, // 支付签名
            success: function (res) {
            // 支付成功后的回调函数
            // this.$toast.top('ok')
            this.response = res
            },
            fail:function(res){
                this.response = res
            }
            });
        })


       

        wx.error(function(res){
            this.response = res
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        });
     }
    },

    created() {
        
    },
}
</script>


<style lang="scss" scoped>
    button{
        margin: 0 auto;
    }
</style>