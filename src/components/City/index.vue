<template>
  <div class="city_body">
    <div class="city_list">
        <div class="city_hot">
            <h2>热门城市</h2>
            <ul class="clearfix">
                <li>上海</li>
                <li>北京</li>
                <li>深圳</li>
            </ul>
        </div>
        <div class="city_sort" ref="city_sort">
            <div v-for="(data,index) in datalist" :key="index">
                <h2>{{data.index}}</h2>
                <ul v-for="cities in data.list" :key="cities.cityId" @click="handleGet(cities.cityId,cities.name)">
                    <li>{{cities.name}}</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="city_index">
        <ul>
            <li v-for="(city,index) in datalist" :key="index" @click="handleToIndex(index)">
                {{city.index}}
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
    name:'City',
    data(){
        return {
            datalist:[]
        }
    },
    mounted(){
        this.axios({
            url:'https://m.maizuo.com/gateway?k=4903366',
            headers:{
                'X-Client-Info':' {"a":"3000","ch":"1002","v":"5.0.4","e":"1612017278652186488930305","bc":"110100"}',
                'X-Host': 'mall.film-ticket.city.list'
            }
        }).then(res=>{
            console.log(res.data.data.cities)
            this.datalist = this.handleFilter(res.data.data.cities)
        })
    },
    methods:{
        handleFilter(data){
            var zmArr = []
            for(var i = 65;i < 91;i++){
                zmArr.push(String.fromCharCode(i))
            }
            console.log(zmArr)
            var cityArr = []
            for(var j = 0;j < zmArr.length;j++){
                var arr = data.filter(item=>item.pinyin.substring(0,1) === zmArr[j].toLowerCase())
                if(arr.length > 0){
                    cityArr.push({
                        index:zmArr[j],
                        list:arr
                    })
                }
            }
            console.log(cityArr)
            return cityArr
        },
        handleToIndex(index){
            var h2 = this.$refs.city_sort.getElementsByTagName("h2")
            this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop
        },
        handleGet(id,name){
            console.log(id,name)
            localStorage.setItem('cityId',id)
            localStorage.setItem('cityName',name)
            this.$router.push('/movie')
        }
    }
}
</script>

<style scoped>
    #content .city_body{margin-top:45px;display: flex;width: 100%;position: absolute;top:0;
    bottom:0}
    .city_body .city_list{flex:1;overflow: auto;background:#fff5f0}
    .city_body .city_list::-webkit-scrollbar{
        background-color: transparent;
        width: 0;
    }
    .city_body .city_hot{margin-top:20px}
    .city_body .city_hot h2{padding-left:15px;line-height: 30px;font-size:14px;background: #f0f0f0;
    font-weight: normal;}
    .city_body .city_hot ul li{float: left;background: #fff;width: 25%;height: 33px;text-align: center;
    margin-top:15px;margin-left:3%;padding:0 4px;border:1px solid #f0f0f0;line-height: 33px;}
    .city_body .city_sort div{margin-top:20px;}
    .city_body .city_sort h2{padding-left:15px;line-height: 30px;font-size:14px;background: #f0f0f0;
    font-weight: normal;}
    .city_body .city_sort ul{padding-left:10px;margin-top:10px}
    .city_body .city_sort ul li{line-height: 30px;}
    .city_body .city_index{width: 20px;display: flex;flex-direction: column;justify-content: center;
    text-align: center;border-left: 1px solid #e6e6e6;}
</style>    