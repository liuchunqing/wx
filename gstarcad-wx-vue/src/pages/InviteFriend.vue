<template>
  <section class="wrap-box">
    <head-bar :isUserInfo="true" :isBtn="false"></head-bar>
    <div class="wrap">
      <div class="box">
        <p id="invite">邀请码</p>
        <p id="inviteNum">{{info.uid}}</p>
        <button @click="toPath()">
          <img src="../../static/invite.png" alt>
          <p>邀请好友</p>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import headBar from "../components/HeadBar";
import service from "../plugins/getData";
import wx from "weixin-js-sdk";
export default {
  data() {
    return {
      info: null
    };
  },
  components: {
    headBar
  },
  methods: {
    init() {
      service.getUserInfo().then(response => {
        this.info = response.data.bizData;
      });
    },
    toPath() {
      // this.$router.push({path:'/invite',query:{
      //     groupId:this.$route.query.groupId,
      //     payGroupId:this.$route.query.payGroupId
      // }})
      this.inviteFriend();
    },
    inviteFriend() {
      service.getConfig(window.location.href).then(response => {
        let res = response.data;
        // this.$toast.top(JSON.stringify(res));
        wx.config({
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.bizData.appId, // 必填，公众号的唯一标识
          timestamp: res.bizData.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.bizData.nonceStr, // 必填，生成签名的随机串
          signature: res.bizData.signature, // 必填，签名
          jsApiList: ["updateAppMessageShareData", "updateTimelineShareData",'onMenuShareAppMessage','onMenuShareTimeline'] // 必填，需要使用的JS接口列表
        });
        this.shareData();
      });
    },
    shareData() {
      console.log("info=" + JSON.stringify(this.info));
      let _this = this;
      wx.ready(function() {
        //需在用户可能点击分享按钮前就先调用
        wx.updateAppMessageShareData({
          title: `${_this.info.nickname}(邀请码${
            _this.info.uid
          })邀请您注册CAD看图王，享受高级权益`, // 分享标题
          desc:'xxxxx',
          link: `https://wx-dev-cn.51ake.com/info`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          // imgUrl: _this.info.imageUrl, // 分享图标
          imgUrl: _this.info.favicon,
          success: function() {
            // 设置成功
            _this.$toast.top("邀请成功");
          }
        });
      });
    }
  },
  created() {
    this.init();
  },
  mounted() {
    var ifr = document.querySelector(".wrap-box");
    // ifr.style.height=document.body.offsetHeight;
    ifr.style.height = window.innerHeight + "px";
  }
};
</script>

<style lang="scss" scoped>
section {
  background: linear-gradient(
    135deg,
    rgba(147, 226, 230, 1) 0%,
    rgba(19, 152, 166, 1) 100%
  );
  width: 100%;
  height: 1251px;
  > .wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    button {
      position: relative;
      left: -100px;
      bottom: -680px;
      border: 0;
      width: 409px;
      height: 78px;
      background: rgba(255, 255, 255, 0.6);
      border-radius: 8px;
      color: rgba(255, 255, 255, 1);
      line-height: 50px;
      font-size: 36px;
      text-align: center;
      > img {
        width: 48px;
        float: left;
        position: relative;
        left: 100px;
      }
    }
    > .box {
      position: relative;
      left: 130px;
      margin-top: 40px;
      > p {
        font-size: 48px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
      }
      > #inviteNum {
        font-size: 64px;
        position: relative;
        left: -20px;
        margin-top: 10px;
      }
    }
  }
}
</style>

