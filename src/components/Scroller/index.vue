<template>
  <div class="wrapper" ref="wrapper">
      <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name:'Scroller',
    mounted(){
        // this.$nextTick(()=>{
        new BScroll(this.$refs.wrapper,{
                tap:true,
                probeType: 1
            })
        // })
    }
}
</script>

<style scoped>
    .wrapper{height: 100%;}
</style>