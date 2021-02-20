const state = {
    name : window.localStorage.getItem('cityName') || '北京', //根据city组件中的值得到的
    cityId : window.localStorage.getItem('cityId') || '110100'
}
const actions = {

}
const mutations = {
    CITY_INFO(state,payload){
        state.name = payload.name
        state.cityId = payload.cityId
    }
}
export default {
    namespaced :true,
    state,
    actions,
    mutations
}