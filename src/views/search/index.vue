<template>
  <div class="search-Container">
      <!-- 搜索框 -->
    <form action="/" class="searchForm">
        <van-search
        background="#3296fa"
        v-model="searchText"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="$router.back()"
        @focus="isSearchShow=false"
        @input='changeSearch'
        />
    <!-- $router.back()   后退 -->
    </form>
    <!-- 搜索文章列表 -->
    <search-result v-if="isSearchShow" :q='searchText'></search-result>
    <!-- 联想记录 -->
    <van-cell-group v-else-if="searchText">
        <van-cell icon="search" v-for="(item,index) in suggestions" :key='index' @click="onSuggestionClick(item)">
            <div slot="title" v-html='highLight(item)'></div>
        </van-cell>
    </van-cell-group>
    <!-- 历史记录 -->
    <van-cell-group v-else>
        <van-cell title="历史记录">
            <template v-if="isDeleteShow">
                <span @click="searchHistories=[]">全部删除</span>
                &nbsp;&nbsp;
                <span @click="isDeleteShow=false">完成</span>
            </template>
            <van-icon v-else name="delete" @click="isDeleteShow=true"></van-icon>
        </van-cell>
        <van-cell :title="item" v-for="(item,index) in searchHistories" :key="index" @click="onHistoriesClick(item,index)">
            <van-icon v-show="isDeleteShow" name="close"/>
        </van-cell>
    </van-cell-group>

  </div>
</template>

<script>
import searchResult from './components/search-results'
import { getSearchSuggest } from '@/api/search'
import { getItem, setItem } from '@/utils/storage'
import { debounce } from 'lodash'
export default {
  name: 'searchPage',
  data () {
    return {
      searchText: '',
      isSearchShow: false, // 展示搜索结果
      isDeleteShow: false, // 删除的显示状态
      suggestions: [], // 联想建议记录
      searchHistories: getItem('search-histories') || [] // 搜索历史记录
    }
  },
  watch: {
    searchHistories (newVal) {
      setItem('search-histories', newVal)
    }
  },
  methods: {
    // 点击历史记录操作  如果删除情况  就删除该条历史记录  如果非删除情况  就以当前的内容作为参数 实现搜索功能
    onHistoriesClick (item, index) {
      if (this.isDeleteShow) {
        this.searchHistories.splice(index, 1)
      } else {
        this.onSuggestionClick(item)
      }
    },
    //   点击联想的某条记录 实现搜索
    onSuggestionClick (str) {
      // 更新文本框
      this.searchText = str
      // 展示搜索数据
      this.isSearchShow = true
    },
    // 联想  输入的内容高亮
    highLight (str) {
      // replace(oldStr,newStr)
      return str.toLowerCase().replace(this.searchText.toLowerCase(), `<span style='color:red'>${this.searchText}</span>`)
    },
    // 输入框变化时  显示建议
    changeSearch: debounce(async function () {
      const searchText = this.searchText
      //   如果搜索为空，直接返回
      if (!searchText) {
        return
      }
      const { data } = await getSearchSuggest(searchText)
      //   console.log(data)
      this.suggestions = data.data.options
    }, 400),
    // 确定时触发的事件
    onSearch () {
      // onSearch确定搜索的时候   产生历史记录
      // 如果添加重复  就把原先的删掉，重新添加
      const index = this.searchHistories.indexOf(this.searchText)
      if (index !== -1) {
        // 有的话先删除
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(this.searchText)
      // 显示结果
      this.isSearchShow = true
    },
    onCancel () {}
  },
  components: {
    searchResult

  }

}
</script>

<style lang='less' scoped>
.search-Container{
    padding-top: 54px;
    .searchForm{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1;
    }
    .van-search__action {
    color: #fff;
  }

}

</style>
