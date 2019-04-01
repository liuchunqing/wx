<template>
  <span>
    <label :style="labelStyle" for>{{title}}</label>
    <input
      :id="commId"
      :style="inputStyle"
      ref="input"
      v-bind:value="inputValue"
      v-on:input="updateValue($event.target.value)"
      :type="inType"
    >
    <div :style="lineStyle"></div>

    <button
      v-show="show"
      :disabled="isSend"
      v-if="commId==='volidNum'"
      class="volidBtn"
      @click="getVilid"
    >获取验证码</button>
    <button
      v-show="!show"
      :disabled="true"
      v-if="commId==='volidNum'"
      class="volidBtn"
    >{{timeCount}}s</button>
    <div v-if="commId ==='volidNum'" class="layer">
      <div class="vilid-box">
        <button class="close" @click="closeLayer">
          <img src="../../static/toolbar_cancel.png" alt>
        </button>

        <div class="image-box">
          <img id="valid-img" @click="clickImg($event)" v-if="validImg" :src="validImg" alt>
          <select id="codeSelect" style="display: none;"></select>
          <a
            href="javascript:void(0);"
            style="position:absolute;right:0;top:0; width:80px; height: 20px;"
            onclick="getCodeTree();"
          >刷新图片</a>
        </div>
      </div>
    </div>
  </span>
</template>
<script>
import service from "../plugins/getData";
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    inType: {
      type: String,
      required: true
    },
    commId: {
      type: String,
      required: true
    },
    labelStyle: {
      type: String,
      required: false
    },
    inputStyle: {
      type: String,
      required: false
    },
    lineStyle: {
      type: String,
      required: false
    },
    number:{
      type:String,
      required:false
    }
  },
  data() {
    return {
      inputValue: null, //输入框的值
      validImg: "",
      imageKey: "",
      clickCount: 0,
      isSend: false,
      show: true,
      timer: null,
      timeCount: ""
    };
  },
  methods: {
    updateValue(val) {
      this.$emit("input", val);
    },
    getVilid() {
      document.querySelector(".layer").style.visibility = "visible";
      console.log("document="+document)
      this.initImg();
    },
    closeLayer() {
      document.querySelector(".layer").style.visibility = "hidden";
    },
    initImg() {
      service.getValidImg().then(response => {
        if (response.data.rtnCode === "0000000") {
          this.validImg = response.data.bizData.image;
          this.imageKey = response.data.bizData.imageKey;
          document.getElementById("codeSelect").options.length = 0;
        }
        this.$toast.top(JSON.stringify(response.data));
      });
    },
    clickImg(event) {
      this.clickCount++;
      if (this.clickCount > 3) {
        return;
      }
      let x = event.offsetX;
      let y = event.offsetY;
      console.log(event)
      console.log("document="+document)
      let img = document.querySelector("#valid-img");
      console.log(x, y);
      let selectDom = document.createElement("option");
      selectDom.value = parseInt(this.clickCount) + 1;
      // selectDom.innerHTML = xserver + "_" + yserver;
      selectDom.innerHTML = x+"_"+y
      console.log(selectDom)
      document.querySelector("#codeSelect").appendChild(selectDom);
      var oDiv = document.createElement("img");
      oDiv.style.left = parseInt(x) - 10 + "px"; // 指定创建的DIV在文档中距离左侧的位置    图片大小30 左右移动5
      oDiv.style.top = parseInt(y) - 10 + "px"; // 指定创建的DIV在文档中距离顶部的位置
      //oDiv.style.border = '1px solid #FF0000'; // 设置边框
      oDiv.style.backgroundColor = "red";
      //oDiv.src = '/resource/image/pc-img/ftl-app-icon-1.png';
      oDiv.style.borderRadius = "50px";
      oDiv.style.position = "absolute"; // 为新创建的DIV指定绝对定位
      oDiv.style.width = "20px"; // 指定宽度
      oDiv.style.height = "20px"; // 指定高度
      //oDiv.src = 'select.png';
      oDiv.style.opacity = "0.8"; //透明度
      oDiv.style.zIndex = '999'
      oDiv.className = "zhezhao"; //加class 点刷新后删除遮罩
      console.log(oDiv)
      document.querySelector('.image-box').appendChild(oDiv);

      //第四次点击后自动提交
      if (this.clickCount == 3) {
        this.cheakOutTree();
      }
    },

    cheakOutTree() {
      var txt = "";
      let options = document.querySelectorAll('#codeSelect option')
      console.log(options)
      for (const element of options) {
        var text = element.text
        if(txt ===''){
          txt = text
        }else{
          txt = txt+","+text
        }
      }
      // options.forEach(element => {
      //   var text = element.value;
      //   if (txt === "") {
      //     txt = text;
      //   } else {
      //     txt = txt + "," + text;
      //   }
      // });
      console.log('txt='+txt+',imageKey='+this.imageKey)
      service.verify(txt, this.imageKey).then(response => {
        let res = response.data;
        console.log(res)
        if (res.rtnCode === "0000000") {
          this.closeLayer();
          this.isSend = false;
          console.log('number='+this.number)
          service.sendSms(this.number).then(response => {
            let ress = response.data;
            this.$toast.top('res=='+JSON.stringify(ress))
            if (ress.rtnCode === "0000000") {
              let dom = document.querySelector(".volidBtn");
              // dom.style.backgroundColor = "rgba(81,81,81,1);";
              dom.style.backgroundColor = "black;"
              this.show = false;
              const TIME_COUNT = 60;
              console.log('time='+TIME_COUNT)
              if (!this.timer) {
                this.timeCount = TIME_COUNT;
                this.show = false;
                let _this = this
                this.timer = setInterval(() => {
                  if (this.timeCount > 0 && this.timeCount <= TIME_COUNT) {
                    this.updateValue(this.inputValue)
                    this.timeCount--;
                    // console.log('this timeCount='+this.timeCount)
                  } else {
                    this.show = true;
                    clearInterval(this.timer);
                    this.timer = null;
                  }
                }, 1000);
              }
            }
          });

          //  this.$emit('verifyOk',1)
        }else{
          this.$emit('error',res.msg)
        }
        // this.$toast.top(JSON.stringify(res));
      });
    },
    getNodePosition(node) {
      var top =0
      var left = 0
      while (node) {
        if (node.tagName) {
          top = top + node.offsetTop;
          left = left + node.offsetLeft;
          node = node.offsetParent;
        } else {
          node = node.parentNode;
        }
      }
      return [left, top];
    }
  },
  mounted() {
    var fr = document.querySelector(".layer");
    fr.style.height = window.innerHeight + "px";
  }
};
</script>
<style lang="scss" scoped>
span {
  position: relative;
  > label {
    display: block;
    width: 200px;
    height: 40px;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 40px;
    margin-bottom: 8px;
    margin-top: 31px;
  }
  > input {
    border-style: none;
    background-color: rgba(255, 255, 255, 0);
    width: 249px;
    height: 40px;
    font-size: 28px;
    font-family: PingFangSC-Light;
    font-weight: 300;
    color: rgba(150, 150, 150, 1);
    line-height: 40px;
  }
  > div {
    width: 100%;
    height: 1px;
    background: rgba(255, 255, 255, 0.5);
    margin-top: 3px;
  }
  > .volidBtn {
    position: relative;
    right: -400px;
    bottom: 55px;
    width: 163px;
    height: 48px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 44px;
    border: 0;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(92, 199, 206, 1);
    font-size: 24px;
  }
}

.layer {
  visibility: hidden;
  position: absolute;
  width: 750px;
  height: 1300px;
  top: -570px;
  left: -98px;
  background: rgba(0, 0, 0, 0.3);
  .vilid-box {
    border-radius: 10px;
    width: 480px;
    height: 640px;
    top: 240px;
    background: #fff;
    position: absolute;
    z-index: 999;
    left: 140px;
    > .close {
      border: 0;
      background: #fff;
      position: absolute;
      top: 0;
      right: 0;
      > img {
        width: 36px;
      }
    }
    > .image-box {
      position: relative;
      width: 100%;
      height: 400px;
      text-align: center;
      top: 50px;
      border: 1px solid red;
    }
  }
}
</style>
