import Vue from 'vue'
import VueRouter from 'vue-router'
import movieRouter from '@/routers/movie'
import mineRouter from '@/routers/mine'
import cinemaRouter from '@/routers/cinema'
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  //base: process.env.BASE_URL,
  base: 'shuxingFilm',
  routes: [
    movieRouter,
    mineRouter,
    cinemaRouter,
    {
      path:'/*',
      redirect:'/movie'
    }
  ]
})

export default router
