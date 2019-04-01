<template>
    <section>
        <head-bar :isUserInfo=true :isBtn=true ></head-bar>
        <ul>
            <li v-for="item in cardList" :key="item">
                <div class="product-item">
                    <img v-if="item.productImgUrl" :src="item.productImgUrl" alt="">
                    <p>{{item.productName}}</p>
                    <button class="welfareBtn">
                        <p v-if="item.status ===0" @click="getCard(item.cardId)">领取</p>
                        <p v-if="item.status ===1" @click="payMoney(item.productCode,item.productName,item.cardId)">去使用</p>
                        <p v-if="item.status ===2">已使用</p>
                        <p v-if="item.status ===3">券过期</p>
                        <p v-if="item.status ===4">当前会员不匹配</p>
                        <img v-if="item.cardImgUrl" :src="item.cardImgUrl" alt="">
                    </button>
                </div>
            </li>
        </ul>
    </section>    
</template>
<script>
import headBar from './../../components/HeadBar'
import service from './../../plugins/getData'
import wx from 'weixin-js-sdk'
export default {
    data() {
        return {
           cardList:[] 
        }
    },
    components:{
        headBar
    },
    created(){
        this.init()
    },
    methods: {
        init(){
            service.getCardList().then(response=>{
                let res = response.data
                this.$toast.top(JSON.stringify(res))
                if(res.rtnCode !=='0000000'){
                    this.$toast.top(res.msg)
                }
                this.cardList = res.bizData
            })
        },
        getCard(id){
            service.getCard(id).then(response=>{
                let res = response.data
                if(res.rtnCode !== '0000000'){
                    this.$toast.center(res.msg)
                }else{
                    this.init()
                }
            })
        },
        payMoney(productCode,name,cardId){
            // this.$toast.top('ok'+productCode+'/'+name)
            service.getConfig(window.location.href).then(response=>{

                this.$toast.top(JSON.stringify(response.data))
                this.configWx(response.data.bizData)

                service.payCard(productCode,name,cardId).then(response=>{
                    let res = response.data
                    this.$toast.top(JSON.stringify(res))
                    var _this = this
                        wx.chooseWXPay({
                        timestamp: res.bizData.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                        nonceStr: res.bizData.nonceStr, // 支付签名随机串，不长于 32 位
                        package: res.bizData.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                        signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                        paySign: res.bizData.paySign, // 支付签名
                            success: function (response) {
                            // 支付成功后的回调函数
                            // this.$toast.top('ok')
                                // this.response = res
                                _this.$router.push({path:'/invite',query:{
                                    payGroupId:response.data.bizData.payGroupId,
                                    groupId:response.data.bizData.groupId
                                }})
                                // _this.$router.push('/info')
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
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: bizData.appId, // 必填，公众号的唯一标识
            timestamp: bizData.timestamp, // 必填，生成签名的时间戳
            nonceStr: bizData.nonceStr, // 必填，生成签名的随机串
            signature: bizData.signature,// 必填，签名
            jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表
            });
        }
    },
}
</script>
<style lang="scss" scoped>
    section{
        background-color: rgba(255, 255, 255, 0);
        height: 500px;
        >ul{
            display: flex;
            list-style: none;
            justify-content: center;
            align-items: center;
            padding-left: 16px;
            .product-item{
                text-align: center;
                color: #fff;
                font-size: 28px;
                >img{
                    width: 80%;
                }
                .welfareBtn{
                    margin-top: 20px;
                    border: 0;
                    width:231px;
                    height:78px;
                    background:linear-gradient(180deg,rgba(255,231,112,1) 0%,rgba(231,181,20,1) 100%);
                    border-radius:8px;
                    font-size: 24px;
                    font-family:PingFangSC-Semibold;
                    font-weight:600;
                    color:rgba(255,255,255,1);
                    display: flex;
                    >p{
                        font-weight: 400;
                        font-size: 24px;
                        position: relative;
                        left: 10px;
                    }
                    >img{
                        width: 60%;
                        position: relative;
                        right: -20px;
                    }
                }
            }
        }
    }

</style>
