<template>
  <section class="wrap">
    <div class="reg-wrap">
      <p class="title">绑定账号</p>
      <input-comm class="input-comm" :commId="'user'" v-model="user" :inType="'text'" :title="'账号'"></input-comm>
      <input-comm
        class="input-comm"
        :commId="'pwd'"
        v-model="pwd"
        :inType="'password'"
        :title="'密码'"
      ></input-comm>
      <p id="error" v-if="error">{{error}}</p>
      <button @click="bindBtn" id="bindBtn">绑定账号</button>
      <button @click="regBtn" id="regBtn">注册账号</button>
    </div>
    <img id="img-top" src="../../static/bitmaptop.png" alt>
    <img id="img-bot" src="../../static/bitmapbot.png" alt>
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
      error:null
    };
  },
  methods: {
    bindBtn() {
      sessionStorage.setItem("isBind", "0");
      sessionStorage.setItem("bindUser", this.user);
      sessionStorage.setItem("bindPwd", this.pwd);
      // this.$store.commit('setBind',0)
      // this.$store.commit('setBindUser',{user:this.user,pwd:this.pwd})
      window.location.reload();
      // this.$toast.top(sessionStorage.getItem('isBind'))
    },
    regBtn() {
      this.$router.push("/regist");
    }
  },
  created() {
    // this.error = sessionStorage.getItem('bindError')
    if (this.$route.query.to) {
      sessionStorage.setItem("to", this.$route.query.to);
    }
  },
  mounted() {
    var ifr = document.querySelector(".wrap");
    // ifr.style.height=document.body.offsetHeight;
    ifr.style.height = window.innerHeight + "px";

    let isSubmit = sessionStorage.getItem("isBind");
    if (isSubmit === "2") {
      return;
    }
    // this.$toast.top(isSubmit+"/")
    if (isSubmit === "1") {
      //第二次打开页面
      let aaa = this;
      sessionStorage.setItem("isBind", "2");
      // this.$toast.top(isSubmit+'/第二次打开页面')
      let url = window.location.href;
      wechatAuth.returnFromWechat(url);
      let user = sessionStorage.getItem("bindUser");
      let pwd = sessionStorage.getItem("bindPwd");
      service.bindUser(user, pwd).then(response => {
        let res = response.data;
        aaa.$toast.top(JSON.stringify(res));
        console.log(JSON.stringify(res));
        if (res.rtnCode === "0000000") {
            sessionStorage.setItem('bindError','')
          this.$store.commit("setToken", res.bizData.utoken);
          let to = sessionStorage.getItem("to");
          if (to) {
            this.$router.replace(to);
          } else {
            this.$router.replace("/info");
          }
        }else{
            // sessionStorage.setItem('bindError',res.msg)
            this.error = res.msg
        }
      });
    }
    if (isSubmit === "0") {
      //第一次打开页面
      // this.$toast.top(isSubmit+'/第一次打开页面')
      window.sessionStorage.setItem("isBind", "1");
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
  width: 100%;
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
    > #bindBtn {
      width: 381px;
      height: 64px;
      background: rgba(255, 255, 255, 0.8);
      border-radius: 44px;
      display: block;
      border-radius: 30px;
      border: 0;
      font-size: 36px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(92, 199, 206, 1);
      line-height: 50px;
      margin: 0 auto;
      margin-top: 50px;
    }
    > #regBtn {
      width: 113px;
      height: 40px;
      font-size: 28px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 40px;
      border: 0;
      display: block;
      margin: 0 auto;
      background-color: rgba(255, 255, 255, 0);
      margin-top: 30px;
      position: relative;
    }
  }

  #img-top {
    display: block;
    position: absolute;
    width: 55%;
    top: 0;
    right: 0;
  }
  #img-bot {
    display: block;
    position: absolute;
    width: 72%;
    bottom: 0;
    left: 0;
  }
}
</style>

