<template>
  <div class="tabbar-container">
      <!-- 子路由出口 -->
      <router-view></router-view>
      <!-- tab-bar标签 -->
      <van-tabbar route>
        <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item to="/qa" icon="comment-o">问答</van-tabbar-item>
        <van-tabbar-item to="/video" icon="video-o">视频</van-tabbar-item>
        <van-tabbar-item
        to="/my"
        icon="user-o"
        >{{ $store.state.user ? '我的' : '未登录'}}</van-tabbar-item>
        <!-- 通过store容器的存的token值来确定显示 -->
      </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'TabBar'

}
</script>

<style>

</style>
