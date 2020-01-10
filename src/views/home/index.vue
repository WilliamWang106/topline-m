<template>
  <div class="home-container">
    <!-- 顶部导航栏 -->
    <van-nav-bar title="首页"/>
    <!-- 频道列表 -->
    <van-tabs v-model="active">
      <van-tab :title="channel.name" v-for="channel in channelList" :key="channel.id">
        <article-list :channel='channel'></article-list>
      </van-tab>
    </van-tabs>
    <!-- 文章列表 -->
  </div>
</template>

<script>
import { getChannels } from '@/api/user'
import ArticleList from './components/article-list'
export default {
  name: 'homePage',
  data () {
    return {
      active: 0,
      channelList: []
    }
  },
  components: {
    ArticleList
  },
  methods: {
    // 获取频道列表
    async getChannelList () {
      const { data } = await getChannels()
      console.log(data)
      this.channelList = data.data.channels
    }
  },
  created () {
    // 获取频道列表
    this.getChannelList()
  }
}
</script>

<style>

</style>
