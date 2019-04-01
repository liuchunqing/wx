<template>
    <section @click="onChecked($event)">
        <p class="first-line">订单编号：{{order}}</p>
        <p class="second-line">{{title}} </p>
        <p class="third-line">订单时间：{{time}}</p>
        <div class="line"></div>
        <img :id="checkId"  src="../../static/unselect.png"  alt="">
    </section>
</template>

<script>
export default {
    props:{
        checkId:{
            type:  String,
            required:true
        },
        order:{
            type: String,
            required: true
        },
        title:{
            type: String,
            required: true,
        },
        time:{
            type:String,
            required: true
        }
    },
    data() {
        return {
            isCheck:false
        }
    },
    mounted() {
        this.$store.commit('pushInvoice',{id:this.checkId,isChecked:this.isCheck});
    },
    methods: {
        onChecked(){
            if(this.isCheck){
                this.isCheck=!this.isCheck;
                document.querySelector('#'+this.checkId).src="../../static/unselect.png"
            }else{
                this.isCheck=!this.isCheck;
                document.querySelector('#'+this.checkId).src="../../static/select.png"
            } 
            this.$store.commit('updateInvoice',{id:this.checkId,isChecked:this.isCheck})
            this.$parent.btnEnable();
        }
    },
}
</script>

<style lang="scss" scoped>
    section{
        padding: 10px 15px;
        padding-left: 80px;
        height: 145px;
        border-bottom: 1px solid #d1d1d1;
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
            margin-bottom: 16px;
        }
        .second-line{
            margin-bottom: 16px;
            font-size: 24px;
        }
        .third-line{
            font-size: 24px;
        }
        >img{
            width: 48px;
            position: relative;
            left: -70px;
            bottom: 90px;
        }
    }
</style>

