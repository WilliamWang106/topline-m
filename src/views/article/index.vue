<template>
  <div class="article-Container">
    <van-nav-bar
    title="文章详情"
    fixed
    left-arrow
    @click-left="$router.back()"/>
    <!-- 加载中 -->
    <!-- vertical 是否垂直排列图标和文字内容 -->
    <van-loading
    v-if="loading"
    class="loading"
    color="#1989fa"
    vertical>
      加载中...
    </van-loading>
    <!-- 文章详情 -->
    <div v-else-if="article.title" class="detail">
      <h3 class="title">{{article.title}}</h3>
      <div class="auther-wrap">
        <div class="auther-info">
          <!-- fit 图片填充模式 -->
          <van-image
          class="avatar"
          round
          fit="cover"
          :src="article.aut_photo"
          ></van-image>
          <div class="text">
            <p class="name">{{article.aut_name}}</p>
            <p class="time">{{article.pubdate | dateTime}}</p>
          </div>
        </div>
        <!-- 如果当前文章作者是当前用户 则不显示按钮    反过来想 -->
        <!-- 用户没有登录  或是 当前文章的作者不是当前用户 则显示关注按钮
          用户没有登录  跳转到登录页面
          当前文章作者不是当前用户  则点击后加关注  改样式发请求
         -->
         <!-- 用户没有登录       当前文这样的作者id    不等于   当前用户的id -->
        <van-button
        v-if="!$store.state.user || article.aut_id !==$store.state.user.id"
        class="follow-btn"
        :type="article.is_followed ? 'default' : 'info'"
        size="mini"
        round
        :loading='isFollowLoading'
        @click='onFollow'
        >{{article.is_followed ? '已关注' : '+ 关注'}}</van-button>
      </div>
      <div class="markdown-body content" v-html="article.content"></div>
      <van-divider>正文结束</van-divider>
      <!-- 文章评论 -->
      <van-cell title="全部评论" :border="false"></van-cell>
      <van-list
        v-model="articleComments.loading"
        :finished="articleComments.finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
      <!-- 改为遍历组件 -->
      <comment-item
      v-for="(comment,index) in articleComments.list"
      :key="index"
      :comment='comment'
      ></comment-item>
        <!-- <van-cell v-for="(comment,index) in articleComments.list" :key="index" :title="comment.content" /> -->
      </van-list>
    </div>
    <!-- 加载失败 -->
    <div v-else class="err">
      <img src="./no-network.png" alt="">
      <p class="text">亲，网络不给力啊</p>
      <van-button class="btn" type="default" size="small">点击重试</van-button>
    </div>
    <!-- 底部固定区域 -->
    <div class="footer">
      <van-button
      class="wirte-btn"
      type="default"
      round
      size="small">写评论</van-button>
      <!-- info 图标右上角徽标的内容 -->
      <van-icon class="comment-icon" name="comment-o" :info="articleComments.totalCount"></van-icon>
      <van-icon
      color="orange"
      :name="article.is_collected ? 'star' : 'star-o'"
      @click="onCollect"
      ></van-icon>
      <van-icon
      color="#e5645f"
      :name="article.attitude ===1 ? 'good-job' : 'good-job-o'"
      @click="onLike"
      ></van-icon>
      <van-icon class="share-icon" name="share"></van-icon>
    </div>
  </div>
</template>

<script>
import { getArticleById, addCollect, deleteCollect, addLike, deleteLike } from '@/api/article'
import { addFollow, deleteFollow } from '@/api/user'
import { getComments } from '@/api/comment'
import CommentItem from './components/comment-item'

export default {
  name: 'articlePage',
  components: {
    CommentItem
  },
  props: {
    articleId: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      article: {}, // 文章详情
      loading: true,
      isFollowLoading: false, // 关注按钮的loading状态
      // 文章评论
      articleComments: {
        list: [],
        loading: false,
        finished: false,
        offset: null, // 相当于评论列表请求下一页评论的页码
        totalCount: 0 // 评论的总数量
      }
    }
  },
  methods: {
    async onLoad () {
      const articleComments = this.articleComments
      // 1.请求获取数据
      const { data } = await getComments({
        // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
        type: 'a',
        // 源id，文章id或评论id
        source: this.articleId,
        // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
        offset: null,
        // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
        limit: 10
      })
      console.log(data)
      // 2.将数据添加到列表中
      const { results } = data.data
      articleComments.list.push(...results)
      // 更新总数据条数
      articleComments.totalCount = data.data.total_count
      // 3.将加载更多的loading 设置为false
      articleComments.loading = false
      // 4.判断是否还有数据
      if (results.length) {
        // 更新下一页数据
        articleComments.offset = data.data.last_id
      } else {
        // 数据加载完成
        articleComments.finished = true
      }
    },
    async onFollow () {
      // console.log(this.article)
      // 用户关注、取消关注
      // 开启loading
      this.isFollowLoading = true
      try {
        // 如果已关注  则取消关注
        const autherId = this.article.aut_id
        if (this.article.is_followed) {
          await deleteFollow(autherId)
        } else {
          // 否则添加关注
          await addFollow(autherId)
        }
        // 更新关注视图的显示
        this.article.is_followed = !this.article.is_followed
        // 发请求
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败')
      }
      // 关闭loading
      this.isFollowLoading = false
    },
    // 文章详情点赞
    async onLike () {
      // 交互提示   防止连续点击选择
      this.$toast.loading({
        duration: 0,
        message: '操作中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        if (this.article.attitude === 1) {
          // 如果已点赞，则取消点赞
          // 发请求
          await deleteLike(this.articleId)
          // 改变返回结果中的点赞状态
          this.article.attitude = -1
          // 提示信息
          this.$toast.success('取消点赞')
        } else {
          // 否则添加点赞
          await addLike(this.articleId)
          this.article.attitude = 1
          this.$toast.success('点赞成功')
        }
      } catch (error) {
        console.log(error)
        this.$toast.fail('操作失败')
      }
    },
    // 文章详情收藏
    async onCollect () {
      // 交互提示   防止连续点击选择
      this.$toast.loading({
        duration: 0,
        message: '操作中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        if (this.article.is_collected) {
          // 如果收藏，则取消收藏
          // 发请求
          await deleteCollect(this.articleId)
          // 改变返回结果中的收藏状态
          this.article.is_collected = false
          // 提示信息
          this.$toast.success('取消收藏')
        } else {
          // 否则添加收藏
          await addCollect(this.articleId)
          this.article.is_collected = true
          this.$toast.success('收藏成功')
        }
      } catch (error) {
        console.log(error)
        this.$toast.fail('操作失败')
      }
    },
    // 获取文章详情
    async loadArticle () {
      this.loading = true
      try {
        // 获取文章详情数据
        const { data } = await getArticleById(this.articleId)
        console.log(data)

        // 将数据存储给data中的article空对象
        this.article = data.data
      } catch (error) {
      }
      this.loading = false
    }
  },
  created () {
    this.loadArticle()
  }

}
</script>

<style lang='less' scoped>
// 用下载好的css  直接引入  用markdown-body 当做文章详情内容的class类名
  // 才能生效 成功改写文章详情里面的css样式
@import './github-markdown.css';

.article-Container{
  padding: 46px 0px 150px;
  background-color: #fff;
  .loading{
    padding-top: 100px;
    text-align: center;
  }
  .detail{
    .title{
      margin: 0;
      padding: 0 20px;
      padding-top: 24px;
      font-size: 20px;
      color: #3A3A3A;
    }
    .content{
      padding:0 20px;
    }
    .auther-wrap{
      padding: 20px 20px;
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .auther-info{
        display: flex;
        align-items: center;
        .avatar{
          width: 40px;
          height: 40px;
          margin-right: 8px;
        }
        .text{
          line-height: 1.5;
          .name{
            margin: 0;
            font-size: 14px;
          }
          .time{
            margin: 0;
            font-size: 12px;
            color: #999;
          }
        }
      }
      .follow-btn{
        width: 85px;
      }
    }
  }
  .err{
    padding-top: 100px;
    text-align: center;
    .text{
      font-size: 15px;
    }
    .btn{
      width: 30%;
    }
  }
  .footer{
    position:fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .wirte-btn{
      width: 160px;
    }
    .comment-icon{
      bottom: -2px;
    }
    .share-icon{
      bottom: -2px;
    }
  }

}

</style>
