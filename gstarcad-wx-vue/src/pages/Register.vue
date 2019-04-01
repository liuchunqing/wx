<template>
  <section class="wrap">
    <div class="reg-wrap">
      <p class="title">注册账号</p>
      <input-comm class="input-comm" :commId="'user'" v-model="user" :inType="'text'" :title="'账号'"></input-comm>
      <input-comm
        class="input-comm"
        :commId="'pwd'"
        v-model="pwd"
        :inType="'password'"
        :title="'密码'"
      ></input-comm>
      <input-comm
        class="input-comm"
        :commId="'volidNum'"
        v-model="volidNum"
        :inType="'number'"
        :number="user"
        :error="errorMsg"
        :title="'验证码'"
      ></input-comm>
      <input-comm
        class="input-comm"
        :commId="'invite'"
        v-model="inviteNum"
        :inType="'text'"
        :title="'邀请码'"
      ></input-comm>
      <p id="error" v-if="error">{{error}}</p>

      <img id="img-top" src="../../static/bitmaptop.png" alt>
      <img id="img-bot" src="../../static/bitmapbot.png" alt>
      <button id="regBtn" @click="regBtn">注册账号</button>
    </div>
  </section>
</template>
<script>
import inputComm from "../components/inputComm";
import service from "../plugins/getData";
import wechatAuth from "../utils/wechatAuth";
export default {
  components: {
    inputComm
  },
  data() {
    return {
      user: null,
      pwd: null,
      volidNum: null,
      inviteNum: null,
      kaptcha: "",
      imageKey: "",
      error:null
    };
  },
  methods: {
    regBtn() {
      sessionStorage.setItem("isReg", "0");
      sessionStorage.setItem("regUser", this.user);
      sessionStorage.setItem("regPwd", this.pwd);
      sessionStorage.setItem("regVolid", this.volidNum);
      sessionStorage.setItem("regInvite", this.inviteNum);
      sessionStorage.setItem("kaptcha", this.kaptcha),
        sessionStorage.setItem("imageKey", this.imageKey);
      window.location.reload();
    },
    verify(kaptcha, imageKey) {
      this.kaptcha = kaptcha;
      this.imageKey = imageKey;
    },
    errorMsg(msg){
      this.error = msg
    }
  },
  mounted() {
    var ifr = document.querySelector(".wrap");
    // ifr.style.height=document.body.offsetHeight;
    ifr.style.height = window.innerHeight + "px";
  },
  created() {
      // this.error = sessionStorage.getItem('errorReg')
    let isReg = sessionStorage.getItem("isReg");

    if (isReg === "2") {
      return;
    }
    if (isReg === "1") {
      //第二次打开页面
      sessionStorage.setItem("isReg", "2");
      let url = window.location.href;
      wechatAuth.returnFromWechat(url);
      let user = sessionStorage.getItem("regUser");
      let pwd = sessionStorage.getItem("regPwd");
      let volidNum = sessionStorage.getItem("regVolid");
      let recommendCode = sessionStorage.getItem("regInvite");
      let kaptcha = sessionStorage.getItem("kaptcha");
      let imageKey = sessionStorage.getItem("imageKey");
      service
        .createUser(user, pwd, recommendCode, kaptcha, imageKey, volidNum)
        .then(response => {
          let res = response.data;
          this.$toast.center(res.msg + "code:" + res.rtnCode);
          if (res.rtnCode === "0000000") {
            this.$store.commit("setToken", res.bizData.utoken);
            let to = sessionStorage.getItem("to");
            // sessionStorage.setItem('errorReg','')
            if (to) {
              this.$router.replace(to);
            } else {
              this.$router.push("/info");
            }
          }else{
              this.error = res.msg
          }
        });
    }
    if (isReg === "0") {
      //第一次打开页面
      sessionStorage.setItem("isReg", "1");
      wechatAuth.redirect_uri = window.location.href;
      window.location.href = wechatAuth.authUrl;
    }
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
  height: 1251px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  > .reg-wrap {
    width: 100%;
    height: 100%;
    top: 100px;
    padding-left: 98px;
    padding-right: 98px;
    position: relative;
    > #error {
      width: 100%;
      font-size: 28px;
      text-align: center;
      color: red;
    }
    > .title {
      width: 260px;
      height: 78px;
      font-size: 56px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      line-height: 78px;
      margin-bottom: 40px;
    }
    > .input-comm {
      margin-bottom: 20px;
    }
    > #regBtn {
      width: 353px;
      height: 64px;
      background: rgba(255, 255, 255, 0.8);
      border-radius: 44px;
      border: 0;
      font-size: 36px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(92, 199, 206, 1);
      line-height: 50px;
      margin: 0 auto;
      display: block;
      z-index: 888;
      position: relative;
      top: 100px;
    }

    #img-top {
      display: block;
      position: absolute;
      width: 412px;
      top: -200px;
      right: 0px;
      z-index: 777;
    }
    #img-bot {
      display: block;
      position: absolute;
      height: 441px;
      bottom: 0px;
      left: 0px;
      z-index: 777;
    }
  }
}
</style>

