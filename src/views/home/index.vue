<template>
  <div class="home-container">
    <!-- 顶部导航栏 -->
    <!-- <van-nav-bar title="首页"/>  fixed属性组件中，作用固定位置 -->
    <!-- <van-nav-bar class="topNav" fixed> -->
      <!-- <img src="./logo-light.png" alt="" slot="left"> -->
      <!-- <img src="" alt="" slot="left"> -->
      <!-- <van-search placeholder="搜索" slot="right" shape="round" input-align='center' background='#3196fa' /> -->
      <!-- <form action="/">
        <van-search
          v-model="searchText"
          placeholder="请输入搜索关键词"
          show-action
          @search="onSearch"
          @cancel="onCancel"
        />
      </form> -->
      <div class="nav-bar">
        <div class="logo"></div>
        <van-button
        class="search-btn"
        round
        type="info"
        size="small"
        icon="search"
        @click='$router.push("./search")'
        ></van-button>
      </div>
    <!-- </van-nav-bar> -->
    <!-- 频道列表 animated切换动画 -->
    <van-tabs v-model="active" animated>
      <van-icon class="wap-nav" name="wap-nav" slot="nav-right" @click="isChannelEditShow=true" />
      <van-tab :title="channel.name" v-for="channel in channelList" :key="channel.id">
        <!-- 文章列表 -->
        <article-list :channel='channel'></article-list>
      </van-tab>
    </van-tabs>
    <!-- 弹层 -->
    <van-popup
      v-model="isChannelEditShow"
      closeable
      round
      close-icon-position=top-left
      position="bottom"
      :style="{ height: '90%' }"
    >
      <!-- 弹层组件 -->
      <!-- :value='active'
      @input='active=事件参数' -->
      <channel-edit
      :channelList='channelList'
      v-model="active"
      @close='isChannelEditShow=false'
      />
    </van-popup>
  </div>
</template>

<script>
import { getChannels } from '@/api/user'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
// import { getItem } from '@/utils/storage'
export default {
  name: 'homePage',
  data () {
    return {
      active: 0, // 切换频道的当前频道页
      channelList: [],
      isChannelEditShow: false,
      searchText: ''
    }
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  methods: {
    onCancel () {},
    onSearch () {},
    // 获取频道列表
    async getChannelList () {
      // 如果有存储的user-channel  获取  如果没有  就请求拿
      let channels = []
      // const localUserChannels = getItem('user-channels')
      // if (localUserChannels) {
      //   channels = localUserChannels
      // } else {
      //   const { data } = await getChannels()
      //   // console.log(data)
      //   channels = data.data.channels
      // }
      const { data } = await getChannels()
      // console.log(data)
      channels = data.data.channels
      this.channelList = channels
    }
  },
  created () {
    // 获取频道列表
    this.getChannelList()
  }
}
</script>

<style lang='less' scoped>
.home-container{
  padding-top: 90px;
  padding-bottom: 50px;
  // .topNav{
  //   display: flex;
  //   justify-content: space-between;
  //   align-items: center;
  //   box-sizing: border-box;
    .nav-bar{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 15px;
      height: 46px;
      background-color: #3196fa;
      z-index: 1;
      .logo {
        background: url("./logo-light.png") no-repeat;
        background-size: cover;
        width: 100px;
        height: 30px;
      }
      .search-btn {
        background-color: #5babfb;
        width: 50%;
      }
    // }
    .van-nav-bar__left{
      // margin-top: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        width: 100px;
      }
    }
    // .van-nav-bar__right{
    //   height: 100%;
    //   .van-search{
    //     height: 100%;
    //   background: #3196fa;
    //   // height: 5px;
    //   }
    // }
    // ::v-deep .van-nav-bar__right{
    //   background: #3196fa;
    // }
  }
  .wap-nav{
    position: fixed;
    right: 0;
    line-height: 44px;
    background-color: #fff;
  }
  ::v-deep .van-tabs__wrap{
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    z-index:2;
  }
}

</style>
