<template>
    <div id="main">
        <Header Title="我的书信"/>
        <div id="content">
            <Login />
        </div>
        <Tabbar />
    </div>
</template>

<script>
import Header from '@/components/Header'
import Tabbar from '@/components/Tabbar'
import Login from '@/components/Login'
export default {
    name:'Mine',
    components:{
        Header,
        Tabbar,
        Login
    }
}
</script>

<style>

</style>