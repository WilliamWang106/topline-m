<template>
  <div id="app">
    <!-- 根路由出口 -->
    <!-- 组件缓存  运行时缓存-->
    <!-- keep-alive  vue内置的一个专门用来缓存组件的-->
    <keep-alive :include='$store.state.cachePage'>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
  // data () {
  //   return {
  //     cachePage: ['TabBar']
  //   }
  // }
}
</script>

<style>
</style>
