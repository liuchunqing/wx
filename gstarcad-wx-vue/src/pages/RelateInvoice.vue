<template>
    <section>
        <div class="head">
            <p id="title">发票{{statusText}}</p>
            <p id="time" v-if="invoice&&invoice.updateTime">{{invoice.updateTime}}</p>
            <img src="../../static/relate-invoice.png" alt="">
        </div>
        <div class="body">
            <p id="invoice-title">发票信息</p>
            <p class="item-name">销方名称 <span v-if="invoice&&invoice.sellName">{{invoice.sellName}}</span> </p>
            <p class="item-name">发票抬头 <span v-if="invoice&&invoice.title">{{invoice.title}}</span> </p>
            <p class="item-name">发票类型 <span v-if="invoice&&invoice.invoiceTypeStr">{{invoice.invoiceTypeStr}}</span> </p>
            <p class="item-name">开票金额 <span v-if="invoice&&invoice.money">{{invoice.money}}</span> </p>
            <p class="item-name">申请日期 <span v-if="invoice&&invoice.createTime">{{invoice.createTime}}</span> </p>
            <p class="item-name">发票编号 <span v-if="invoice&&invoice.invoiceNum">{{invoice.invoiceNum}}</span> </p>
            <p class="item-name">物流信息 <span v-if="invoice&&invoice.diliveryCom">{{invoice.diliveryCom}}  {{invoice.diliveryNum}}</span> </p>
            <div class="line"></div>
        </div>
        <div class="foot">
            <p id="relate-title">您的发票关联</p>
            <relate-item v-for="relate in relateList" :key="relate" :item="relate"></relate-item>
        </div>
    </section>
</template>

<script>
import relateItem from '../components/RelateItem'
import service from '../plugins/getData'
export default {
    components:{
        relateItem
    },
    data() {
        return {
            invoice,
            statusText,
            relateList:[]
        }
    },
    methods: {
        init(){
            service.getInvoicedOrderPage(200, 0, this.invoice.id).then(response=>{
                let res = response.data
                this.$toast.top(JSON.stringify(res))
                if(res.rtnCode==='0000000'){
                    this.relateList = this.relateList.concat(res.bizData.rows)
                }
            })
        }
    },
    created() {
        let invoiceObj = JSON.parse(this.$route.query.invoice)
        if(invoiceObj){
            this.invoice = invoiceObj 
            this.init()
        }
        

        if(this.invoice.status){
            switch(this.invoice.status){
                case 0:
                    this.statusText = '申请中'
                    break
                case 1:
                    this.statusText = '已邮寄'
                    break
                case 2:
                    this.statusText = '被驳回'
                    break
                case 3:
                    this.statusText = '用户取消'
                    break
                default:
                    this.statusText= '未知异常'
                    break
            }
        }
    },
}
</script>

<style lang="scss" scoped>
    section{
        background: rgba(255,255,255,1);
        >.head{
            background:linear-gradient(135deg,rgba(147,226,230,1) 0%,rgba(19,152,166,1) 100%);
            width: 100%;
            height: 260px;
            >p{
                margin-left: 102px;
                color: #fff;
                position: relative;
                top: 75px;
            }
            >#title{
              font-size: 48px;  
            }
            >#time{
                font-size: 24px;
                margin-top: 15px;
            }
            >img{
                width: 278px;
                position: absolute;
                right: 0;
                top: 0;
            }
        }
        >.body{
           padding: 20px;
           background: rgba(255,255,255,1);
           >#invoice-title{
                font-family:PingFangSC-Semibold;
                font-weight:600;
                color:rgba(81,81,81,1);
           } 
           >.item-name{
                font-size: 28px;
                font-family:PingFangSC-Light;
                font-weight:300;
                color:rgba(150,150,150,1);
                margin-top: 24px;
                position: relative;
                width: 100%;
                >span{
                    position: absolute;
                    right: 0;
                }
           }
           >.line{
                height: 1px;
                background:#D1D1D1;
                margin-top: 20px;
           }
        }
        >.foot{
            background: rgba(255,255,255,1);
          >#relate-title{
              margin-top: 32px;
              margin-bottom: 30px;
                padding: 0 20px;
                font-family:PingFangSC-Semibold;
                font-weight:600;
                color:rgba(81,81,81,1);
          } 
        }
    }
</style>

