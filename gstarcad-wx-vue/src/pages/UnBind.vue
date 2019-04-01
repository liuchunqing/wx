<template>
    <div>
        <div class="wrap">
        <div class="unbind-box">
            <div class="box-wrap" v-if="info">
                <img :src="info.favicon" alt="">
                <p id="name">{{info.nickname}}</p>
                <p id="email">{{info.email}}</p>
                <p id="mark"> <img src="../../static/ic-favorite-24px.png" alt=""> 积分: <span>{{info.score}}</span></p>
                <p id="unbind" @click="unBind">解除绑定</p>   
            </div>
            <img class="bottom" src="../../static/group.png" alt="">
        </div>
    </div>
    </div>
</template>
<script>
import service from '../plugins/getData'
export default {

    mounted(){
        var ifr= document.querySelector('.wrap');
        // ifr.style.height=document.body.offsetHeight;
        ifr.style.height = window.innerHeight+'px'
    },
    created(){
        this.init()
    },
    data() {
        return {
            info:null
        }
    },
    methods: {
        init(){
            service.getUserInfo().then((response)=>{
                let res = response.data
                this.info = res.bizData
                this.$toast.top(JSON.stringify(this.info))
            })
        },
        unBind(){
            service.unbindUser().then(response=>{
                let res = response.data
                this.$toast.top(JSON.stringify(res))
                if(res.rtnCode === '0000000'){
                    this.$router.replace('/bind')
                }
            })
        }
    },
    
}
</script>
<style lang="scss" scoped>
    .wrap{
        width:100%;
        height:1251px;
        background:linear-gradient(135deg,rgba(147,226,230,1) 0%,rgba(19,152,166,1) 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        >.unbind-box{
            width:562px;
            height:815px;
            background:rgba(255,255,255,1);
            box-shadow:0px 18px 36px 0px rgba(0,0,0,0.2);
            border-radius:32px;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            >.box-wrap{
                width: 100%;
                >img{
                border-radius: 100%;
                width: 208px;
                box-shadow:0px 2px 8px 0px rgba(0,0,0,0.5);
                border:3px solid rgba(255,255,255,1);
                }
                >#name{
                    width:300px;
                    height:67px;
                    font-size:48px;
                    font-family:PingFangSC-Semibold;
                    font-weight:600;
                    color:rgba(81,81,81,1);
                    line-height:67px;
                    margin: 42px auto;
                }
                >#email{
                    width:350px;
                    height:40px;
                    font-size:28px;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                    color:rgba(141,141,141,1);
                    line-height:40px;
                    margin: 0 auto;
                }
                >#mark{
                    min-width:273px;
                    height:44px;
                    background:rgba(228,228,228,0.68);
                    border-radius:22px;
                    margin-top: 15px;
                    width:173px;
                    height:40px;
                    font-size:28px;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                    color:rgba(100,100,100,1);
                    line-height:40px;
                    display: flex;
                    vertical-align: middle;
                    align-items: center;
                    padding-left: 12px;
                    margin: 26px auto;
                    margin-bottom: 58px;
                    >img{
                        height: 32px;
                        width: 32px;
                    
                    }
                    >span{
                        margin-left: 10px;
                    }
                }
                >#unbind{
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                    font-size: 36px;
                    color:rgba(252,37,37,1);
                    margin-top: 35px;
                }
               
                >p{
                display: block;
                }
            }
            >.bottom{
                width: 100%;
                position: absolute;
                bottom: 0px;
                border-radius: 0;
            }
        }
    }
</style>
