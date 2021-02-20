<template>
    <div class="cinema_body">
        <ul v-for="data in datalist" :key="data.cinemaId">
            <li>
                <div>
                    <span>{{data.name}}</span>
                    <span class="q"><span class="price">{{(data.lowPrice * 0.01).toFixed(1)}}</span>元起</span>
                </div>
                <div class="address">
                    <span>{{data.address}}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'CinemaList',
    data:function(){
    return{
        datalist:[]
        }
    },
    activated(){
        var id = window.localStorage.getItem('cityId')
        // var id = $store.state.city.cityId
        axios({
        url:`https://m.maizuo.com/gateway?cityId=${id}&ticketFlag=1&k=6293628`,
        headers:{
            'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1612017278652186488930305","bc":"110100"}',
            'X-Host': 'mall.film-ticket.cinema.list'
        }
        }).then(res => {
        //   console.log(res.data.data.cinemas)
        this.datalist = res.data.data.cinemas
    })
    }
}
</script>

<style scoped>
    /* #content .cinema_menu{width: 100%;height: 45px;border-bottom:1px solid #e6e6e6;
    display: flex;justify-content: space-between;text-overflow: ellipsis;} */
    #content .cinema_body{flex:1;overflow: auto;}
    .cinema_body ul{padding:20px}
    .cinema_body li{border-bottom:1px solid #e6e6e6;margin-bottom:20px}
    .cinema_body div{margin-bottom:10px}
    .cinema_body .q{font-size: 11px;color:#f03d37}
    .cinema_body .price{font-size: 18px;}
    .cinema_body .address{font-size:13px;color:#666}
    .cinema_body .address span:nth-of-type(2){float: right;}
    .cinema_body .card{display: flex;}
    .cinema_body .card div{padding:0 3px;height: 15px;line-height: 15px;border-radius: 2px;
    color: #f90;border:1px solid #f90}
    .cinema_body .card div.or{color: #f90;border:1px solid #f90}
    .cinema_body .card div.bl{color: #589daf;border:1px solid #589daf}
</style>