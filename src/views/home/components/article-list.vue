<template>
  <!-- 文章列表 -->
  <!-- 下拉刷新 v-model="isLoading"控制下拉刷新样式显示 @refresh当下拉时触发的事件 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
      <van-cell
        v-for="(article,index) in list"
        :key="index"
        :title="article.title"
      />
      </van-list>
    </van-pull-refresh>
</template>

<script>
import { getArticles } from '@/api/article'
export default {
  name: 'ArticleList',
  data () {
    return {
      // 列表数据
      list: [],
      loading: false,
      finished: false,
      isLoading: false,
      timestamp: null
    }
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  methods: {
    // 下拉刷新  组件  下拉刷新的时候触发的事件 自动默认打开下拉刷新状态
    async onRefresh () {
      // 1.请求获取数据
      const { data } = await getArticles({
        channel_id: this.channel.id,
        // 刷新数据，时间戳都是最新的
        timestamp: Date.now(),
        with_top: 1
      })
      // 2.如果有新数据，则把数据放到列表顶部
      const { results } = data.data
      this.list.unshift(...results)
      // 3.关闭下拉刷新状态
      this.isLoading = false
      this.$toast(`更新了${results.length}条数据`)
    },
    // 文章列表 tab组件
    async onLoad () {
      // 1.请求数据
      const { data } = await getArticles({
        channel_id: this.channel.id,
        // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
        timestamp: this.timestamp || Date.now(),
        // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        with_top: 1
      })
      //   console.log(data)
      const results = data.data.results
      // 2.把请求的数据添加的数组列表中
      this.list.push(...results)
      // 3.加载状态结束
      this.loading = false
      // 4.数据全部加载
      if (results.length) {
        // 说明没有加载完  继续加载
        // timestamp  获取新的历史时间戳
        this.timestamp = data.data.pre_timestamp
      } else {
        // 没有数据了  加载完了
        this.finished = true
      }
    }
  }
}
</script>

<style>

</style>
