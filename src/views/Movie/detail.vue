<template>
    <div id="detail">
        <Header Title="电影详情"/>
        <div class="return" @click="handlereturn">&lt;</div>
        <img :src="list.poster" alt="#" class="poster">
        <p>{{list.synopsis}}</p>
    </div>
</template>

<script>
import Header from '@/components/Header'
export default {
    name: 'Detail',
    data(){
        return{
            list:[]
        }
    },
    components:{
        Header
    },
    methods:{
        handlereturn(){
            this.$router.go(-1)
        }
    },
    props:['movieId'],
    mounted(){
        console.log(this.movieId)
        this.axios({
        url:`https://m.maizuo.com/gateway?filmId=${this.movieId}&k=9831282`,
        headers:{
        'X-Client-Info':' {"a":"3000","ch":"1002","v":"5.0.4","e":"1612017278652186488930305","bc":"110100"}',
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then(res => {
        console.log(res.data.data.film)
        this.list = res.data.data.film
    })
    }
}
</script>

<style scoped>
    #detail{position:absolute;left:0;top:0;z-index:100;width: 100%;min-height: 100%;background-color: white;}
    .return{
    position:absolute;width: 30px;height: 30px;line-height: 30px;text-align: center;
    color:white;top:10px
    }
    .poster{
        height: 200px;
        width: 180px;
    }
</style>