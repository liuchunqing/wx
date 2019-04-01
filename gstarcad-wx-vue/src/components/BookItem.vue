<template>
  <section>
    <p class="first-line">
      {{title}}
      <span id="price">¥{{price}}</span>
    </p>
    <p class="second-line">
      订单时间：{{createTime}}
      <span id="type">{{payment}}</span>
    </p>
    <p class="third-line">
      订单编号：{{order}}
      <span id="status">{{statusText}}</span>
    </p>
    <div class="line"></div>
  </section>
</template>

<script>
export default {
  // 订单状态订单状态：0未支付，1支付成功，2取消订单，3订单服务过期，4，支付失败/异常，5，已退款
  props: {
    title: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    createTime: {
      type: String,
      required: true
    },
    order: {
      type: String,
      required: true
    },
    statusNum: {
      type: Number,
      required: true
    },
    payment: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      statusText: ""
    };
  },
  mounted() {
    console.log(this.title + "/" + this.statusNum);
    if (this.statusNum) {
      switch (this.statusNum) {
        case 0:
          this.statusText = "未支付";
          break;
        case 1:
          this.statusText = "已成功";
          break;
        case 2:
          this.statusText = "取消订单";
          break;
        case 3:
          this.statusText = "订单服务过期";
          break;
        case 4:
          this.statusText = "支付失败/异常";
          break;
        case 5:
          this.statusText = "已退款";
          break;
        default:
          this.statusText = "未知异常";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  height: 140px;
  padding: 10px 15px;
  border-bottom: 1px solid #d1d1d1;
  > p {
    font-family: PingFangSC-Light;
    font-weight: 300;
    color: rgba(81, 81, 81, 1);
  }
  .first-line {
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(81, 81, 81, 1);
    font-size: 32px;
    margin-bottom: 16px;
    > #price {
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(64, 178, 189, 1);
      position: absolute;
      right: 17px;
    }
  }
  .second-line {
    font-size: 24px;
    margin-bottom: 16px;
    > #type {
      position: absolute;
      right: 17px;
    }
  }
  .third-line {
    > #status {
      position: absolute;
      right: 17px;
    }
  }
}
</style>

