<template>
  <div class="home-container">
    <!-- 顶部导航栏 -->
    <!-- <van-nav-bar title="首页"/>  fixed属性组件中，作用固定位置 -->
    <van-nav-bar class="topNav" fixed>
      <img src="./logo-light.png" alt="" slot="left">
      <!-- <img src="" alt="" slot="left"> -->
      <van-search placeholder="搜索" slot="right" shape="round" input-align='center' background='#3196fa' />
    </van-nav-bar>
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
      isChannelEditShow: false
    }
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  methods: {
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
  .topNav{
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    .van-nav-bar__left{
      // margin-top: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        width: 100px;
      }
    }
    .van-nav-bar__right{
      height: 100%;
      .van-search{
        height: 100%;
      background: #3196fa;
      // height: 5px;
      }
    }
    ::v-deep .van-nav-bar__right{
      background: #3196fa;
    }
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
