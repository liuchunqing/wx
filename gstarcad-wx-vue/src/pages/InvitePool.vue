<template>
    <section>
        <div class="wrap">
            <div class="box">
                <p>还差{{num}}人，赶紧邀请好友拼单吧</p>
                <button @click="inviteFriend">邀请好友</button>
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
            num,
            info
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
                this.num = res.bizData.payGroup.number - res.bizData.paySuccessList.length
            }
            })
        },
        inviteFriend(){
            service.getConfig(window.location.url).then(response=>{
                let res = response.data
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: res.bizData.appId, // 必填，公众号的唯一标识
                    timestamp: res.bizData.timestamp, // 必填，生成签名的时间戳
                    nonceStr: res.bizData.nonceStr, // 必填，生成签名的随机串
                    signature: res.bizData.signature,// 必填，签名
                    jsApiList: ['chooseWXPay','updateTimelineShareData','translateVoice','checkJsApi'] // 必填，需要使用的JS接口列表
                });
                this.shareData()
            })
        },
        shareData(){
            let _this = this
            wx.ready(function () {      //需在用户可能点击分享按钮前就先调用
                wx.updateTimelineShareData({ 
                title: `${_this.info.payGroup.name}邀请您拼购CAD看图王 ${_this.info.payGroup.productName} ￥${_this.info.payGroup.price}`, // 分享标题
                link: `https://wx-dev-cn.51ake.com/invited/${_this.$route.query.groupId}/${_this.$route.query.payGroupId}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: _this.info.payGroup.imageUrl, // 分享图标
                success: function () {
                // 设置成功
                    _this.$toast.top('邀请成功')
                }
    })
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
                font-size: 36px;
                font-family:PingFangSC-Semibold;
                font-weight:500;
                color:rgba(255,255,255,1);
            }
            >button{
                margin-left:  140px;
                margin-top: 70px;
                border: 0;
                width:220px;
                height:57px;
                color: #fff;
                font-size: 28px;
                font-weight: 500;
                border-radius: 39px;
                background:linear-gradient(180deg,rgba(255,231,112,1) 0%,rgba(231,181,20,1) 100%);
            }
        }
    }
</style>

