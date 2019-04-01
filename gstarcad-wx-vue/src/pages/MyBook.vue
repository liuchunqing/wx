<template>
  <section class="wrap">
    <head-bar class="head" :isBook="true"></head-bar>
    <ul>
      <scroller class="scroller" :on-refresh="refresh" :on-infinite="infinite" ref="scroller">
        <li v-for="item in bookList" :key="item">
          <book-item
            :title="item.title"
            :price="item.orderMoney"
            :createTime="item.tradeTime"
            :order="item.insideOrder"
            :statusNum="item.status"
            :payment="item.paymentStr"
          ></book-item>
        </li>
      </scroller>
    </ul>
  </section>
</template>
<script>
import headBar from "../components/HeadBar";
import bookItem from "../components/BookItem";
import service from "./../plugins/getData";
export default {
  data() {
    return {
      count: 0,
      pageSize: 8,
      bookList: [],
      isFresh: false
    };
  },
  methods: {
    refresh() {
      this.$refs.scroller.finishPullToRefresh();
    },
    infinite(done) {
      let pageNo = this.count;
      if (!isFresh) {
        this.$refs.scroller.finishInfinite(2);
        this.$refs.scroller.noDataText = "没有更多数据了";
        this.$refs.scroller.resize();
        done();
        return;
      }
      service
        .getOrderList(this.pageSize, pageNo)
        .then(response => {
          let res = response.data;
          this.$toast.top(JSON.stringify(res));
          this.$refs.scroller.finishInfinite(2);
          if (res.bizData.rows.length > 0) {
            this.bookList = this.bookList.concat(res.bizData.rows);
            this.count += res.bizData.rows.length;
          } else {
            this.isFresh = false;
            this.$refs.scroller.noDataText = "没有更多数据了";
            this.$refs.scroller.resize();
            done();
          }
        })
        .catch(err => {
          this.$refs.scroller.finishInfinite(false);
        });
    },
    init() {
      this.isFresh = true;
      service.getOrderList(this.pageSize, 0).then(response => {
        let res = response.data;
        this.$toast.top(res);
        this.bookList = this.bookList.concat(res.bizData.rows);
        if (res.bizData.rows.length === 0) {
          this.isFresh = false;
        }
      });
    }
  },
  created() {
    this.init();
  },
  components: {
    headBar,
    bookItem
  },
  mounted() {
    let fr = document.querySelector(".wrap");
    fr.style.height = window.innerHeight + "px";
  }
};
</script>
<style lang="scss" scoped>
section {
  height: 800px;
  .head {
    background: linear-gradient(
      135deg,
      rgba(147, 226, 230, 1) 0%,
      rgba(19, 152, 166, 1) 100%
    );
  }

  .scroller {
    margin-top: 110px;
  }
}
</style>

