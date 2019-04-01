<template>
    <section>
        <div class="info">
            <p id="num">{{num}}</p>
            <div class="item-box">
                <img v-if="img" :src="img" alt="">
                <p id="title">{{title}}</p>
            </div>
            <p id="start">拼购发起人：{{startName}}</p>
            <p id="join">拼购发起人：{{joinName}}</p>
            <p id="start-time">拼购发起时间：{{startTime}}</p>
            <p id="end-time">拼购失效时间：{{endTime}}</p>
        </div>
        <div class="price-box">
            <p id="price">{{price}}</p>
            <p v-if="flag === true" id="status-ok">{{status}}</p>
            <p v-if="flag === false" id="status-no">{{status}}</p>
        </div>
    </section> 
</template>

<script>
export default {
   props:{
        num:{
            type: String,
            required: true
        },
        img:{
            type: String,
            required: true
        },
        title:{
            type: String,
            required: true
        },
        startName:{
            type: String,
            required: true
        },
        joinName:{
            type: String,
            required: true
        },
        startTime:{
            type: String,
            required: true
        },
        endTime:{
            type: String,
            required: true
        },
        price:{
            type:Number,
            required: true
        },
        status:{
            type:String,
            required: true
        },
        flag:{
            type:Boolean,
            required: true
        }
   } 
}
</script>

<style lang="scss" scoped>
    section{
        height: 438px;
        width: 750px;
        border-bottom: 1px solid #D1D1D1;
        .info{
            padding: 10px;
            font-family:PingFangSC-Semibold;
            font-weight:600;
            font-size: 24px;
            color:rgba(81,81,81,1);
            >p{
                font-family:PingFangSC-Light;
                font-weight:300;
                color:rgba(81,81,81,1);
                font-size: 24px;
                margin-top: 5px;
                margin-bottom: 16px;
            }
            >#num{
                font-family:PingFangSC-Semibold;
                font-weight:600;
                font-size: 28px;
            }
        }
        .item-box{
            display: flex;
            margin-top: 10px;
            >img{
                height: 124px;
                margin-bottom: 24px;
            }
            >#title{
                position: relative;
                top: 30px;
                font-family:PingFangSC-Semibold;
                font-weight:600;
                font-size: 28px;
                color:rgba(81,81,81,1);
            }
        }

        .price-box{
            position: relative;
            right: -605px;
            top: -300px;
            width: 145px;
            >#price{
                font-size: 36px;
                font-family:PingFangSC-Semibold;
                font-weight:600;
                color:rgba(64,178,189,1);
            }
            >#status-ok{
                margin-top: 5px;
                font-size: 24px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(252,37,37,1);
                margin-left: 15px;
            }
            >#status-no{
                margin-top: 5px;
                font-size: 24px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(81,81,81,1);
                margin-left: 15px;
            }
        }
    }
</style>

