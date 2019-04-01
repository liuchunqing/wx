<template>
    <section>
        <head-bar :isUserInfo=false :isBtn=true ></head-bar>
        <ul>
            <li v-for="item in productList" :key="item">
                <div class="product-item">
                    <img v-if="item.imageUrl" :src="item.imageUrl" alt="">
                    <p>{{item.productName}}</p>
                    <button @click="payMoney(item.productCode,item.productName,item.payGroupId,item.groupId)" id="poolBtn">
                        <p>{{item.payGroupPrice}}</p>
                        <p>{{item.payGroupName}}</p>
                    </button>
                    <button @click="payMoney(item.productCode,item.productName)" id="onlyBtn">
                        <p>{{item.originalPrice}}</p>
                        <p>单独购买</p>
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
           productList: [] 
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
            service.getProductList().then(response=>{
                let res = response.data
                // this.$toast.top(JSON.stringify(res))
                if(res.rtnCode !=='0000000'){
                    this.$toast.top(res.msg)
                }
                console.log(JSON.stringify(res))
                this.productList = res.bizData
                console.log(this.productList.length)
            })
        },
        payMoney(productCode,name,payGroupId,groupId){
            if(payGroupId){
                console.log('group buy')
            }else{
                console.log('zhengchang')
            }
            service.getConfig(window.location.href).then(response=>{
                this.configWx(response.data.bizData)
                var _this = this

                service.payGroup(productCode,name,payGroupId,groupId).then(response=>{
                    let res = response.data
                        wx.chooseWXPay({
                        timestamp: res.bizData.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                        nonceStr: res.bizData.nonceStr, // 支付签名随机串，不长于 32 位
                        package: res.bizData.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                        signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                        paySign: res.bizData.paySign, // 支付签名
                            success: function (res) {
                            // 支付成功后的回调函数
                            // this.$toast.top('ok')
                                // this.response = res
                                if(payGroupId){
                                    _this.$router.push({path:'/invitedfriend',query:{
                                        payGroupId,
                                        groupId
                                    }})
                                }else{
                                _this.$router.push('/info')
                                }
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
        height: 580px;
        background-color: rgba(255, 255, 255, 0);
        >ul{
            display: flex;
            list-style: none;
            justify-content: space-around;
            align-items: center;
            .product-item{
                margin-top: 24px;
                text-align: center;
                color: #fff;
                font-size:28px;
                font-family:PingFangSC-Semibold;
                font-weight:600;
                color:rgba(255,255,255,1);
                >img{
                    width: 184px;
                }
                #poolBtn{
                    margin-top: 16px;
                    width:199px;
                    height:78px;
                    background:linear-gradient(180deg,rgba(255,231,112,1) 0%,rgba(231,181,20,1) 100%);
                    border-radius:8px;
                    border: 0;
                    font-size:32px;
                    font-family:PingFangSC-Semibold;
                    font-weight:600;
                    color:rgba(255,255,255,1);
                    >p:nth-of-type(2){
                        font-weight: 400;
                        font-size:22px;;
                    }
                }
                #onlyBtn{
                    margin-top: 16px;
                    width:197px;
                    height:78px;
                    background:rgba(255,255,255,0.4);
                    border-radius:8px;
                    border: 0;
                    font-size:32px;
                    font-family:PingFangSC-Semibold;
                    font-weight:600;
                    color:rgba(255,255,255,1);
                    margin-top: 10px;
                    >p:nth-of-type(2){
                        font-weight: 400;
                        font-size: 22px;
                    }
                }
            }
        }
    }

</style>

