<template>
    <div class="box" v-if="item">
                <p class="first-line">{{item.title}} <span id="price">¥{{item.orderMoney}}</span></p>
                <p class="second-line">订单时间：{{item.orderTime}} <span id="type">{{item.paymentStr}}</span> </p>
                <p class="third-line">订单编号：{{item.orderNum}} <span id="status"></span></p>
    </div>
</template>

<script>
export default {
    props:{
        item:{
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
        .box{
                background:rgba(255,255,255,1);
                height: 150px;
                box-shadow:0px 2px 15px 0px rgba(0,0,0,0.2);
                border-radius:10px;
                margin: 20px 16px;
                padding: 16px;
                >p{
                    font-family:PingFangSC-Light;
                    font-weight:300;
                    color:rgba(81,81,81,1);
                }
                .first-line{
                    font-family:PingFangSC-Semibold;
                    font-weight:600;
                    color:rgba(81,81,81,1);
                    font-size: 32px;
                    margin-bottom: 16px;
                    >#price{
                        font-family:PingFangSC-Semibold;
                        font-weight:600;
                        color:rgba(64,178,189,1);
                        position: absolute;
                        right: 30px;
                    }
                }
                .second-line{
                    margin-bottom: 16px;
                    >#type{
                        position: absolute;
                        right: 30px;
                    }
                }
                .third-line{
                    >#status{
                        position: absolute;
                        right: 30px;
                    }
                }
        } 
</style>

