<template>
    <section @click="toPath">
        <p class="first-line">{{invoice.title}} <span id="price">¥{{invoice.money}}</span></p>
        <p class="second-line">开票时间：{{invoice.createTime}} <span id=statusId>{{statusText}}</span> </p>
        <div class="line"></div>
    </section>
</template>

<script>
export default {
    props:{
        invoice:{
            type:Object,
            required:true
        }
    },
    data() {
        return {
            //发票状态开票状态 0：申请中 1：已邮寄 2：被驳回 3：用户取消
            statusText:'',
            statusId:''
        }
    },
    methods: {
        toPath(){
            window.sessionStorage.setItem(invoice.id,JSON.stringify(invoice))
            this.$router.push({path:'/relateinvoice',query:{
                invoice:JSON.stringify(invoice)
            }})
        }
    },
    created() {
        if(invoice.status){
            switch(invoice.status){
                case 0:
                    this.statusText = '申请中'
                    this.statusId = 'status-ok'
                    break
                case 1:
                    this.statusText = '已邮寄'
                    this.statusId = 'status'
                    break
                case 2:
                    this.statusText = '被驳回'
                    this.statusId = 'status'
                    break
                case 3:
                    this.statusText = '用户取消'
                    this.statusId = 'status'
                    break
                default:
                    this.statusText= '未知异常'
                    this.statusId = 'status'
                    break
            }
        }
    },
}
</script>

<style lang="scss" scoped>
    section{
        padding: 21px 32px;
        border-bottom: 1px solid #D1D1D1;
        >p{
            font-family:PingFangSC-Light;
            font-weight:300;
            color:rgba(81,81,81,1);
        }
        .first-line{
            font-family:PingFangSC-Semibold;
            font-weight:600;
            color:rgba(81,81,81,1);
            font-size: 28px;
            margin-bottom: 20px;
            >#price{
                font-family:PingFangSC-Semibold;
                font-weight:600;
                color:rgba(64,178,189,1);
                position: absolute;
                right: 17px;
            }
        }
        .second-line{
            margin-bottom: 10px;
            >#status{
                font-family:PingFangSC-Semibold;
                font-weight:600;
                color:rgba(93,200,205,1);
                position: absolute;
                right: 17px;
            }
            >#status-ok{
                font-family:PingFangSC-Semibold;
                font-weight:600;
                color:#FFD027;
                position: absolute;
                right: 17px;
            }
        }
    }
</style>

