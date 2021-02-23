<template>
    <div class="movie_body" ref="movie_body">
        <!-- <Scroller> -->
            <ul>
                <li class="pullDown">{{this.pullDown}}</li>
                <li v-for="data in datalist" :key="data.filmId">
                    <div class="pic_show" @tap="handleToDetail(data.filmId)"><img :src="data.poster" :alt="data.name"></div>
                    <div class="info_list">
                        <h2 @tap="handleToDetail(data.filmId)">{{data.name}}</h2>
                        <p v-if="data.grade">观众评 <span class="grade">{{data.grade}}</span></p>
                        <p v-else>暂无评分</p>
                        <p>{{data.actors | actorFilter}}</p>
                    </div>
                    <div class="btn_mall">购票</div>
                </li>
            </ul>
        <!-- </Scroller> -->
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import Vue from 'vue'
import { Indicator } from 'mint-ui'
Vue.filter('actorFilter',function(data){
    var arr = data.map(item=>item.name)
    arr = arr.join(',').split(',').slice(1).join(' ')
    // var newarr = arr.slice(1).join(' ')
    // console.log(newarr)
    return arr
})
export default {
    name:'Nowplaying',
    data(){
        return{
            datalist:[],
            pullDown:'',
            isNowPlayingPage:1,
            isShow:true,
            loading:false
        }
    },
    mounted(){
        Indicator.open({
            text:'加载中...',
            spinnerType:'fading-circle'
        })
        this.axios({
            url:'https://m.maizuo.com/gateway?cityId=310100&pageNum=1&pageSize=10&type=1&k=2698040',
            headers:{
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1612017278652186488930305","bc":"310100"}',
                'X-Host': 'mall.film-ticket.film.list'
            }
        }).then(res=>{
            this.datalist = res.data.data.films
            Indicator.close()
            this.$nextTick(()=>{
                var scroll = new BScroll(this.$refs.movie_body,{
                    tap:true,
                    probeType: 1
                })
                scroll.on('scroll',(pos)=>{
                    if(pos.y > 30){
                        this.pullDown = '正在更新中'
                    }
                })
                scroll.on("touchEnd",(pos)=>{
                    this.axios({
                        url:'https://m.maizuo.com/gateway?cityId=310100&pageNum=1&pageSize=10&type=1&k=2698040',
                        headers:{
                            'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1612017278652186488930305","bc":"310100"}',
                            'X-Host': 'mall.film-ticket.film.list'
                        }
                    }).then(res=>{
                        // console.log(res.data)
                        var msg = res.data.msg
                        if(msg === 'ok'){
                            if(pos.y > 30){
                            this.pullDown = '更新成功'
                            setTimeout(()=>{
                                this.datalist = res.data.data.films
                                this.pullDown = ''
                            },1000)
                            }
                            if(scroll.maxScrollY > pos.y + 30){
                                console.log("上拉刷新")
                                this.isNowPlayingPage++
                                    this.axios({
                                        url:`https://m.maizuo.com/gateway?cityId=310100&pageNum=${this.isNowPlayingPage}&pageSize=10&type=1&k=2698040`,
                                        headers:{
                                            'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1612017278652186488930305","bc":"310100"}',
                                            'X-Host': 'mall.film-ticket.film.list'
                                        }
                                    }).then(res => {
                                        this.datalist = [...this.datalist, ...res.data.data.films]
                                        scroll.refresh();
                                    })
                            }
                        }
                    })
                    
                })
            })
        
        })
    },
    methods:{
        handleToDetail(movieId){
            this.$router.push('/movie/detail/1/'+ movieId) //去创建动态路由
        },
    }
}
</script>

<style scoped>
    #content .movie_body{flex:1;overflow: auto;}
    .movie_body ul{margin:0 12px;overflow: hidden;}
    .movie_body ul li{margin-top:12px;display: flex;align-items: center;border-bottom:1px solid #e6e6e6;
    padding-bottom:10px}
    .movie_body .pic_show{width: 64px;height: 90px;}
    .movie_body .pic_show img{width: 100%;}
    .movie_body .info_list{margin-left:10px;flex:1;position: relative;}
    .movie_body .info_list h2{font-size: 17px;line-height: 24px;width: 150px;overflow: hidden;
    white-space: nowrap;text-overflow: ellipsis;}
    .movie_body .info_list p{font-size: 13px;color:#666;line-height: 22px;width: 200px;overflow: hidden;
    white-space: nowrap;text-overflow: ellipsis;}
    .movie_body .info_list .grade{font-weight: 700;color: #faaf00;font-size:15px;}
    .movie_body .info_list img{width: 50px;position: absolute;right: 10px;top:5px;}
    .movie_body .btn_mall,.movie_body .btn_pre{width: 47px;height: 27px;line-height: 28px;text-align:center;
    background-color: rgb(243, 130, 110);}
    .movie_body .btn_pre{background-color: #3c9fe6;}
    .movie_body .pullDown{margin:0;padding:0;border:0}
</style>