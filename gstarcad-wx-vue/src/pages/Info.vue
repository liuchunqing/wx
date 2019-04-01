<template>
    <section>
       <div class="head">
           <div class="left">
               <img v-if="info.favicon" :src="info.favicon" alt="">
               <div class="user-info" v-if="info">
                   <p id="name">{{info.nickname}}</p>
                   <p id="email">{{info.email}}</p>
                   <p id="mark"> <img src="../../static/ic-favorite-24px.png" alt=""> 积分: <span>{{info.score}}</span></p>
               </div>
           </div>
           <div  class="sign-wrap" v-if="!info.signFlag">
               <p> <img src="../../static/ic-assignment-turned-in-48px.png" alt=""> <a @click="signIn" href="javascript:;">签到去广告</a></p>
           </div>
           <div  class="signed-wrap" v-if="info.signFlag">
               <p> <a href="javascript:;">已签到</a></p>
           </div>
       </div>
       <div class="open-vip">
          <div class="left" @click="toPath('/purse/pool')">
               <img src="../../static/group3.png" alt="">
               <p>开通会员</p>
           </div>
           <div class="right">
               <p id="title">签到去广告功能</p>
               <p id="desc">功能信息描述</p>
           </div>
       </div>
       <div class="items-wrap">
           <ul>
               <li><a href="javascript:;" @click="toPath('/purse/welfare')"> <div class="wrap"><img src="../../static/ic-card-giftcard-48px.png" alt=""> <p>领取福利</p></div></a></li>
               <li><a href="javascript:;" @click="toPath('/invitedfriend')"><div class="wrap"><img src="../../static/ic-insert-emoticon-48px.png" alt=""> <p>邀请好友</p></div></a></li>
               <li><a href="javascript:;" @click="toPath('/mybook')"><div class="wrap"><img src="../../static/ic-date-range-48px.png" alt=""> <p>我的订单</p></div></a></li>
               <li><a href="javascript:;" @click="toPath('/unbind')"><div class="wrap"><img src="../../static/ic-insert-link-48px.png" alt=""> <p>绑定账户</p></div></a></li>
           </ul>
       </div>
        <advanture class="ad_wrap"></advanture>
    </section>
</template>
<script>
import advanture from '../components/Advanture'
import service from '../plugins/getData'
export default {
    components:{
        advanture
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
        signIn(){
            service.signIn().then((response)=>{
                let res = response.data
                if(res.rtnCode ==='0000000'){
                    // this.init()
                    this.info.signFlag = !this.info.signFlag
                }
                this.$toast.top(JSON.stringify(res))
            })
        },
        toPath(path){
            this.$router.push(path)
        }
    },
    created() {
        this.init()
    }
}
</script>

<style lang="scss" scoped>
    section{
        background: #fff;
    }
    .head{
        width: 750px;
        height:316px;
        display: flex;
        background:linear-gradient(135deg,rgba(147,226,230,1) 0%,rgba(19,152,166,1) 100%);
        >.left{
            display: flex;
            flex-wrap: wrap;
            >img{
                width: 144px;
                height:144px;
                border:4px solid rgba(255,255,255,1);
                border-radius: 144px;
                margin-top:36px;
                margin-left: 22px;
            }
            >.user-info{
                width: 260px;
                margin-top: 48px;
                margin-left: 38px;
                color: #fff;
                >#name{
                    width:200px;
                    height:50px;
                    font-size:36px;
                    font-family:PingFangSC-Semibold;
                    font-weight:600;
                    color:rgba(255,255,255,1);
                    line-height:50px;
                }
                >#email{
                    width:230px;
                    height:30px;
                    font-size:22px;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                    color:rgba(255,255,255,1);
                }
                >#mark{
                    width:187px;
                    height:30px;
                    background:rgba(255,255,255,0.68);
                    border-radius:15px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-top: 11px;
                    >img{
                        width: 24px;
                        height: 24px;
                    }
                }
            }
        }
        >.sign-wrap{
            position: relative;
            top: 81px;
            right: -80px;
            width:188px;
            height:55px;
            background:linear-gradient(180deg,rgba(255,231,112,1) 0%,rgba(231,181,20,1) 100%);
            border-radius:16px;
            >p{
                width:188px;
                height:33px;
                font-size:24px;
                font-family:PingFangSC-Semibold;
                font-weight:600;
                color:rgba(255,255,255,1);
                display: flex;
                justify-content: center;
                align-items: center;
                padding-top: 10px;
                >img{
                    height: 36px;
                    width: 36px;
                }
                >a{
                    text-decoration: none;
                    color: rgba(255,255,255,1);
                }
            }
        }
        >.signed-wrap{
            position: relative;
            top: 81px;
            right: -110px;
            width:150px;
            height:55px;
            background:linear-gradient(180deg,rgba(227,227,227,1) 0%,rgba(172,172,172,1) 100%);
            border-radius:16px;
            >p{
                width:110px;
                height:33px;
                font-size:24px;
                font-family:PingFangSC-Semibold;
                font-weight:600;
                color:rgba(255,255,255,1);
                line-height: 55px;
                align-items: center;
                padding-left: 40px;
                >a{
                    text-decoration: none;
                    color: rgba(255,255,255,1);
                }
            }
        }
    }
    .open-vip{
        width:718px;
        height:144px;
        border-radius:16px;
        margin: 0 auto;
        background-image: url(../../static/open-vip.png);
        background-color: #fff;
        background-repeat: round;
        position: relative;
        top: -50px;
        display: flex;
        overflow: hidden;
        >.left{
            padding-left: 42px;
            padding-top: 25px;
            width:113px;
            height:40px;
            font-size:28px;
            font-family:PingFangSC-Semibold;
            font-weight:600;
            color:rgba(80,80,80,1);
            line-height:40px;
           >img{
               width: 114px;
               height: 54px;
           }
           >p{
               width: 160px;
           }
       }
       >.right{
           padding: 10px;
           padding-top: 21px;
           margin-left: 35px;
           >#title{
                width:293px;
                height:33px;
                font-size:24px;
                font-family:PingFangSC-Semibold;
                font-weight:600;
                color:rgba(80,80,80,1);
                line-height:33px;
           }
           >#desc{
                width:287px;
                height:59px;
                font-size:18px;
                font-family:PingFangSC-Light;
                font-weight:300;
                color:rgba(155,155,155,1);
                line-height:25px;
           }
       }
    }
    .items-wrap{
        position: relative;
        top: -20px;
        a{
            text-decoration: none;
        }
        >ul{
            list-style: none;
            display: flex;
            flex-wrap: nowrap;
            justify-content: space-between;
            
            .wrap{
                padding-left: 38px;
                padding-right: 38px;
                >p{
                    width:97px;
                    height:33px;
                    font-size:24px;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                    color:rgba(80,80,80,1);
                    line-height:33px;
                }
                >img{
                    width: 80px;
                }
            }
        }
    }

    .ad-wrap{
        width: 750px;
        padding: 10px;
        height: 400px;
    }
</style>
