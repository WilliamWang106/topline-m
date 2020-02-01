<template>
  <div class="search-Result">
      <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      >
      <van-cell
          v-for="(item,index) in list"
          :key="index"
          :title="item.title"
          @click="$router.push('/article'+article.art_id)"
      />
      </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'searchResult',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20
    }
  },
  props: {
    q: {
      type: String,
      require: true
    }
  },
  methods: {
    async onLoad () {
      // console.log(this.q)
      // 1.请求获取数据
      const { data } = await getSearchResult({
        page: this.page,
        per_page: this.perPage,
        q: this.q
      })
      // 2.将数据添加到数组中
      const { results } = data.data
      this.list.push(...results)
      // 3.设置加载状态结束
      this.loading = false
      // 4.判断是否加载完
      if (results.length) {
        // 还没有更新完
        // 为了拿上一次加载的最后数据的节点 如：时间戳 页码
        this.page++
      } else {
        // 数据加载完
        this.finished = true
      }
    }
  }

}
</script>

<style>

</style>
