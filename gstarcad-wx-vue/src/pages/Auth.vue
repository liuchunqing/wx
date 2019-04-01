<template>
   <section>
       {{aaa}}
    </section> 
</template>

<script>
import service from '../plugins/getData'
import axios from 'axios'
export default {
    data() {
        return {
            aaa:''
        }
    },
    created(){

        // axios.post('https://wx-dev-cn.51ake.com/weixin/api/getToken.json',{code:this.$route.code}).then(response=>{
        //     this.aaa = JSON.stringify(response)
        // })
        // let code = this.$route.query.code+'   code';
        // this.aaa = code
        // let state = this.$route.state+'   state';
        service.getToken().then((response=>{
            let res = response.data
            // this.aaa = JSON.stringify(response);
            this.$toast.top(res.msg)
            if(res.rtnCode === '0000000'){
                this.$store.commit('setToken',res.bizData.utoken)
                this.$router.push('/info')
            }
            
            if(res.rtnCode === '980003'){
                this.$router.push('/bind')
            }
            })).catch((err)=>{
                this.aaa+='error|||||'+JSON.stringify(err)
            })
        
    }
    
}
</script>

<style lang="scss" scoped>

</style>

