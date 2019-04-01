<template>
    <section>
        <p>全部发票</p>
        <div class="line"></div>
        <ul>
            <li v-for="item in invoiceList" :key="item"><invoice-item :invoice="item"></invoice-item></li>
        </ul>
    </section>
</template>

<script>
import invoiceItem from '../components/InvoiceItem'
import service from '../plugins/getData'
export default {
    data() {
        return {
          invoiceList:[]  
        }
    },
    methods: {
        init(){
            service.getInvoicePage(1000,0).then(response=>{
                let res = response.data
                if(res.rtnCode ==='0000000'){
                    this.invoiceList = this.invoiceList.concat(res.bizData.rows)
                }
            })
        }
    },
    components:{
        invoiceItem
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
    }
</style>

