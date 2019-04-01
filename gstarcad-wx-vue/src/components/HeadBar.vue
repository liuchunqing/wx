<template>
    <div class="head" v-if="info">
        <img :src="info.favicon" alt="">
        <p v-if="!isUserInfo">{{info.nickname}}</p>
        <div v-if="isUserInfo" class="info">
            <p>{{info.nickname}}</p>
            <p>账号： <span>{{info.email}}</span></p>
        </div>
        <button v-if="isBtn" @click="toPath('/mypool')">我的拼购</button>
        <div v-if="isBook" class="book">
            <button @click="toPath('/invoice')">申请发票</button>
            <button @click="toPath('/invoicemanager')">发票管理</button>
        </div>
    </div>
</template>
<script>
import service from '../plugins/getData'
export default {
    props:{
        isUserInfo:{
            type:Boolean,
            required:false
        },
        isBtn:{
            type:Boolean,
            required:false
        },
        isBook:{
            type:Boolean,
            required:false
        }
    },
    data() {
        return {
          info:null  
        }
    },
    created(){
        this.init()
    },
    methods: {
        init(){
            service.getUserInfo().then((response)=>{
                let res = response.data
                this.info = res.bizData
            })
        },
        toPath(path){
            this.$router.push(path)
        }
    },
}
</script>

<style lang="scss" scoped>
    .head{
        display: flex;
        height: 90px;
        padding: 10px;
        >img{
            margin-left: 50px;
            width: 88px;
            border-radius: 88px;
            border: 2px solid rgba(255,255,255,1)
        }
        >p{
            line-height: 90px;
            color: rgba(255,255,255,1);
            font-family:PingFangSC-Regular;
            font-weight:400;
            margin-left: 15px;
            font-size: 28px;
            }
        >.info{
            margin-top: 21px;
            margin-left: 33px;
            font-size: 28px;
            >p{
            line-height: 25px;
            color: rgba(255,255,255,1);
            font-family:PingFangSC-Regular;
            font-weight:400;
            }
            >p:nth-of-type(2){
              margin-top: 8px;  
            }
        }
        >button{
            position: absolute;
            right: 10px;
            top: 22px;
            border: 0;
            width:156px;
            height:55px;
            background:rgba(255,255,255,0.68);
            border-radius:16px;
            font-size:24px;
            font-family:PingFangSC-Semibold;
            font-weight:600;
            color:rgba(81,81,81,1);
        }
        >.book{
            position: relative;
            right: -20px;
            top: 20px;
            >button{
                border: 0px;
                width:156px;
                height:55px;
                background:rgba(255,255,255,0.68);
                border-radius:16px;
                font-family:PingFangSC-Semibold;
                font-weight:550;
                font-size: 24px;
                color:rgba(81,81,81,1);
                }
        }
    }
</style>

