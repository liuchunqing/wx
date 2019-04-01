<template>
     <div class="ad-wrap">
           <ul>
                <li v-for="item in newsList" :key="item"><a :href="item.destUrl"> <img v-if="item.imagePath" :src="item.imagePath" alt=""></a></li>
           </ul>
       </div>  
</template>
<script>
import service from '../plugins/getData'
export default {
    data() {
        return {
           newsList:[] 
        }
    },
    methods: {
        init(){
            service.getNewsList().then(response=>{
                let res = response.data
                if(res.rtnCode === '0000000'){
                    this.newsList = this.newsList.concat(res.bizData)
                }
                // this.$toast.top(JSON.stringify(res))
            })
        }
    },
    created() {
        this.init()
    },
}
</script>
<style lang="scss" scoped>
 .ad-wrap{
      width: 730px;
      >ul{
         >li{
             display: block;
             width: 100%;
             height: 204px;
             margin-top: 20px;
             >a{
                 height: 100%;
                 >img{
                     width: 100%;
                 }
             }
         }
      }  
    }
</style>

