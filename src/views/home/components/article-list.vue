<template>
  <!-- 文章列表 -->
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
    // 下拉刷新  组件
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 500)
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
