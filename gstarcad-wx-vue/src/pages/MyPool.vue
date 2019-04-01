<template>
  <section class="wrap">
    <p @click="isOpen(1)">拼购成功</p>
    <div class="success-list" v-show="show===1">
      <scroller :on-refresh="refreshOk" :on-infinite="infiniteOk" ref="scroller_ok">
        <pool-item
          v-for="itemOk in successList"
          :key="itemOk"
          :num="itemOk.insideOrder"
          :img="itemOk.imageUrl"
          :title="itemOk.title"
          :startName="itemOk.createUser"
          :joinName="itemOk.joinUser"
          :startTime="itemOk.createTime"
          :endTime="itemOk.validTime"
          :price="itemOk.orderMoney"
          :status="itemOk.status"
          :flag="true"
        ></pool-item>
      </scroller>
    </div>
    <p @click="isOpen(2)">拼购未成功</p>
    <div class="nofinish-list" v-show="show===2">
      <scroller :on-refresh="refreshNo" :on-infinite="infiniteNo" ref="scroller_no">
        <pool-item
          v-for="itemNo in noFinishList"
          :key="itemNo"
          :num="itemNo.insideOrder"
          :img="itemNo.imageUrl"
          :title="itemNo.title"
          :startName="itemNo.createUser"
          :joinName="itemNo.joinUser"
          :startTime="itemNo.createTime"
          :endTime="itemNo.validTime"
          :price="itemNo.orderMoney"
          :status="itemNo.status"
          :flag="false"
        ></pool-item>
      </scroller>
    </div>
  </section>
</template>

<script>
import poolItem from "../components/PoolItem";
import service from "../plugins/getData";
export default {
  data() {
    return {
      show: 1,
      successList: [],
      noFinishList: [],
      okCount: 0,
      noCount: 0,
      pageSize: 4,
      isFreshOk: false,
      isFreshNo: false
    };
  },
  methods: {
    isOpen(index) {
      if (this.show === index) {
        this.show = 0;
      } else {
        this.show = index;
      }
    },
    refreshOk() {
      this.$refs.scroller_ok.finishPullToRefresh();
    },
    infiniteOk(done) {
      let pageNo = this.okCount;
      service
        .getMyPayGroup(this.pageSize, pageNo, true)
        .then(response => {
          let res = response.data;
          this.$toast.top(JSON.stringify(res));
          this.$refs.scroller_ok.finishInfinite(true);
          if (res.bizData.groupSuccess.rows.length > 0) {
            this.successList = this.successList.concat(
              res.bizData.groupSuccess.rows
            );
            this.okCount += res.bizData.groupSuccess.rows.length;
          } else {
            this.isFreshOk = false;
          }
        })
        .catch(err => {
          this.$refs.scroller_ok.finishInfinite(false);
        });
    },
    refreshNo() {
      this.$refs.scroller_no.finishPullToRefresh();
    },
    infiniteNo(done) {
      let pageNo = this.noCount;
      service
        .getMyPayGroup(this.pageSize, pageNo, false)
        .then(response => {
          let res = response.data;
          this.$toast.top(JSON.stringify(res));
          this.$refs.scroller_ok.finishInfinite(true);
          if (res.bizData.groupOther.rows.length > 0) {
            this.noFinishList = this.noFinishList.concat(
              res.bizData.groupOther.rows
            );
            this.noCount += res.bizData.groupOther.rows.length;
          } else {
            // done()
            this.isFreshNo = false;
          }
        })
        .catch(err => {
          this.$refs.scroller_no.finishInfinite(false);
        });
    },
    init() {
      this.isFreshOk = true;
      this.isFreshNo = true;
      service.getMyPayGroup(this.pageSize, okCount, true).then(response => {
        let res = response.data;
        this.$toast.top(JSON.stringify(res));
        if (res.bizData.groupSuccess.rows.length > 0) {
          this.$refs.scroller_ok.finishInfinite(true);
          this.successList = this.successList.concat(
            res.bizData.groupSuccess.rows
          );
          this.okCount += res.bizData.groupSuccess.rows.length;
        } else {
          done();
        }
      });
    }
  },
  components: {
    poolItem
  },
  mounted() {
    var ifr = document.querySelector(".wrap");
    // ifr.style.height=document.body.offsetHeight;
    ifr.style.height = window.innerHeight + "px";
  },
  created() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
section {
  width: 100%;
  p {
    font-family: PingFangSC-Light;
    font-weight: 300;
    color: rgba(81, 81, 81, 1);
    width: 100%;
    text-align: center;
    height: 60px;
    font-size: 24px;
    line-height: 60px;
    border-bottom: 1px solid #d1d1d1;
  }
}

/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
// .slide-fade-enter-active {
//     transition: all .3s ease-in;
// }
// .slide-fade-leave-active {
//     transition: all .3s ease-out;
// }
// .slide-fade-enter, .slide-fade-leave-to
// /* .slide-fade-leave-active for below version 2.1.8 */ {
//     transform: translateY(200px);
//     opacity: 0;
// }
</style>

