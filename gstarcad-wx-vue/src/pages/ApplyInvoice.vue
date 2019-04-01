<template>
    <section>
        <p>全部发票</p>
        <div class="line"></div>
        <ul>
            <li v-for="item in invoiceList" :key="item"><apply-item  :checkId="item.orderId" :order="item.orderNum" :title="item.title" :time="item.orderTime"></apply-item></li>
        </ul>
        <button :disabled="isSubmit"  @click="submit">申请发票</button>
    </section>
</template>

<script>
import applyItem from '../components/ApplyItem'
import service from '../plugins/getData'
export default {
    data() {
        return {
           isSubmit:true,
           invoiceList:[]
        }
    },
    methods: {
        submit(){
            let orderIds=''
            let checkList = this.$store.state.invoiceCheckList
            for(let i in checkList){
                orderIds+=i.checkId+','
            }
            let invoice ={}
            for(let index in this.$store.state.invoice){
                invoice[index] = this.$store.state.invoice[index]
            }
            invoice['orderIds'] = orderIds
            service.saveInvoice(invoice).then(response=>{
                let res = response.data
                this.$toast.top(res.msg)
                if(res.rtnCode === '0000000'){
                    this.$router.replace('/invoicemanager')
                }
            }) 
            console.log(this.$store.state.invoiceCheckList);
        },
        btnEnable(){
            let dom = document.querySelector('button');
            this.isSubmit=this.$store.state.checkCount>0?false:true;
            if(!this.isSubmit){
                dom.style.backgroundColor='rgba(97,197,205,1)';
            }else{
                dom.style.backgroundColor='rgba(81,81,81,1)';
            }
        },
        init(){
            service.getNeedInvoiceOrderPage(200, 0).then(response=>{
                let res = response.data
                this.invoiceList = this.invoiceList.concat(res.bizData.rows)
            })
        }
    },
    components:{
        applyItem
    }
}
</script>

<style lang="scss" scoped>
    section{
        >p{
            font-family:PingFangSC-Light;
            font-weight:300;
            color:rgba(81,81,81,1);
            width: 100%;
            text-align: center;
            height: 60px;
            font-size: 24px;
            line-height: 60px;
        }
        >.line{
            width: 100%;
            height: 1px;
            background:#D1D1D1; 
        }

        >button{
          width: 100%;
          height: 100px;
          border: 0;
          background: rgba(81,81,81,1);
          position: absolute;
          bottom: 0;
          color: #fff;
          font-size: 36px;
        }
    }
</style>


