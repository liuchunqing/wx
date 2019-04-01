<template>
    <section>
        <div class="wrap">
            <router-view></router-view>
        </div>
        <div class="foot">
            <router-view name="foot"></router-view>
        </div>
    </section>
</template>
<script>
export default {
    components:{
    }
    
}
</script>

<style lang="scss" scoped>
    section{
        background:linear-gradient(135deg,rgba(147,226,230,1) 0%,rgba(19,152,166,1) 100%);
        width: 100%;
        height: 230px;
    }
  
</style>

