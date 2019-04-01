<template>
    <section>
        <input-comm class="input-comm" :commId="'title'" v-model="title" :inType="'text'" :title="'发票抬头'" :labelStyle="labelStyle" :lineStyle="lineStyle"></input-comm>
        <input-comm class="input-comm" :commId="'identificationNum'" v-model="identificationNum" :inType="'text'" :title="'纳税人识别号'" :labelStyle="labelStyle" :lineStyle="lineStyle"></input-comm>
        <input-comm class="input-comm" :commId="'phoneNum'" v-model="phoneNum" :inType="'text'" :title="'地址、电话'" :labelStyle="labelStyle" :lineStyle="lineStyle"></input-comm>
        <input-comm class="input-comm" :commId="'bankName'" v-model="bankName" :inType="'text'" :title="'开户银行'" :labelStyle="labelStyle" :lineStyle="lineStyle"></input-comm>
        <input-comm class="input-comm" :commId="'bankNum'" v-model="bankNum" :inType="'text'" :title="'银行账号'" :labelStyle="labelStyle" :lineStyle="lineStyle"></input-comm>
        <input-comm class="input-comm" :commId="'reciveName'" v-model="reciveName" :inType="'text'" :title="'收票人姓名'" :labelStyle="labelStyle" :lineStyle="lineStyle"></input-comm>
        <input-comm class="input-comm" :commId="'recivePhone'" v-model="recivePhone" :inType="'text'" :title="'收票人手机'" :labelStyle="labelStyle" :lineStyle="lineStyle"></input-comm>
        <input-comm class="input-comm" :commId="'reciveAddress'" v-model="reciveAddress" :inType="'text'" :title="'收票人地址'" :labelStyle="labelStyle" :lineStyle="lineStyle"></input-comm>
        <button @click="toPath('/applyinvoice')">下一步</button>
    </section>
</template>

<script>
import inputComm from '../components/inputComm'
export default {
    data() {
        return {
          title:null,
          identificationNum:null,
          phoneNum:null,
          bankName:null,
          bankNum:null,
          reciveName:null,
          recivePhone:null,
          reciveAddress:null,
          labelStyle:`  font-family:PingFangSC-Regular;
                        font-weight:400;
                        color:rgba(81,81,81,1);`,
          lineStyle:`background:#D1D1D1;`,  
        }
    },
    components:{
        inputComm
    },
    methods: {
        toPath(path){
            this.$store.commit('setInvoice',{
                title:this.title,
                taxpayerNumber:this.identificationNum,
                taxpayerAddr:this.phoneNum,
                bank:this.bankName,
                bankAccount:this.bankNum,
                name:this.reciveName,
                mobile:this.recivePhone,
                address:this.reciveAddress
                })
            this.$router.push(path)
        }
    },
}
</script>

<style lang="scss" scoped>
    section{
        padding: 0 20px;
        >button{
            border: 0;
            position: relative;
            left: 25%;
            width:353px;
            height:64px;
            background:rgba(97,197,205,1);
            border-radius:44px;
            margin-top: 30px;
            font-family:PingFangSC-Semibold;
            font-weight:600;
            color:rgba(255,255,255,1);
            font-size: 36px;
        }
    }
</style>

