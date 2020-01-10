<template>
  <div class="my-container">
    <!-- 已登录用户信息 -->
    <!-- round  圆形 -->
      <!-- border  布尔值  表示是否显示边框 -->
    <div class="user-info" v-if="$store.state.user">
      <div class="user-info-top">
        <div class="user-info-left">
          <van-image
            class="img"
            round
            :src="user.photo"
          />
          <div class="user-name">{{user.name}}</div>
        </div>
        <van-button class="button" size="mini" round>编辑资料</van-button>
      </div>
      <van-grid class="user-info-button" :border='false'>
        <van-grid-item>
          <span>{{user.art_count}}</span>
          <span>头条</span>
        </van-grid-item>
        <van-grid-item>
          <span>{{user.follow_count}}</span>
          <span>关注</span>
        </van-grid-item>
        <van-grid-item>
          <span>{{user.fans_count}}</span>
          <span>粉丝</span>
        </van-grid-item>
        <van-grid-item>
          <span>{{user.like_count}}</span>
          <span>获赞</span>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 未登录用户信息 -->
    <div class="not-login" v-else @click="$router.push('/login')">
      <div class="mobile"></div>
      <div class="text">点击登录</div>
    </div>
    <!-- 收藏 历史 作品 导航栏 -->
    <!-- clickable  开启点击反馈   column-num  显示列数-->
    <!-- 如果想给icon加样式 就写标签van-icon可以通过具名插槽来实现添加 -->
    <!-- 如果icon不加样式，可以和text一样，直接写 -->
    <van-grid class="historyNav" clickable :column-num="3">
      <van-grid-item text='我的收藏'>
        <van-icon slot="icon" name="star-o" color="#eb5253"></van-icon>
      </van-grid-item>
      <van-grid-item text='浏览历史'>
        <van-icon slot="icon" name="browsing-history-o" color="#ffa023"></van-icon>
      </van-grid-item>
      <van-grid-item text='作品'>
        <van-icon slot="icon" name="edit" color="#678eff"></van-icon>
      </van-grid-item>
    </van-grid>
    <!-- 消息 小智 cell单元格 -->
      <!-- is-link  展示箭头 -->
    <van-cell-group class="messageCell" :border="false">
      <van-cell title="消息通知" is-link></van-cell>
      <van-cell title="小智同学" is-link></van-cell>
    </van-cell-group>
    <!-- 退出按钮 -->
      <!-- clickable 是否开启点击反馈 -->
    <van-cell-group class="logout" v-if="$store.state.user">
      <van-cell style="text-align:center" title="退出登录" clickable @click="logOut"></van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
export default {
  name: 'my',
  data () {
    return {
      // 用户信息
      user: {}
    }
  },
  methods: {
    // 用户退出
    logOut () {
      this.$dialog.confirm({
        title: '退出提示',
        message: '确认要退出么？'
      }).then(() => {
        // 确定退出 清除token  主要是清除容器中的user
        this.$store.commit('setUser', null)
      }).catch(() => {
        // 点击了取消，不退出 提示一下
        this.$toast('已取消退出登录')
      })
    },
    // 用户信息
    async loadUser () {
      try {
        const { data } = await getUserInfo()
        console.log(data)
        this.user = data.data
      } catch (error) {
        this.$toast('获取数据失败')
      }
    }
  },
  created () {
    // 如果有token  就执行获取用户信息函数
    if (this.$store.state.user) {
      this.loadUser()
    }
  }

}
</script>

<style lang='less' scoped>
  .my-container{
    background: #eee;
    height: 100vh;
    // 已登录用户信息
    .user-info{
      background: url('./banner.png') no-repeat;
      height: 182px;
      padding: 40px 20px;
      // ???????????
      // 以设置的寛高呈现  一旦有padding或是边框线设置了 就要设置box-sizing:border-box
      box-sizing: border-box;
      background-size: cover;
      font-size: 15px;
      color: #fff;
      .user-info-top{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .user-info-left{
          display: flex;
          justify-content: center;
          align-items: center;
          .img{
            width: 66px;
            height: 66px;
            padding: 2px;
            background: #fff;
          }
          .user-name{
            margin-left: 15px;
          }
        }
      }
      .user-info-button{
        // ????????????
        ::v-deep .van-grid-item__content {
        background: none;
        }
      }
    }
    .not-login{
      background: url('./banner.png') no-repeat;
      height: 182px;
      box-sizing: border-box;
      background-size: cover;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction:column;
      .mobile{
        background: url('./mobile.png') no-repeat;
        width: 66px;
        height: 66px;
        background-size: cover;
        margin-bottom: 10px;
      }
      .text{
        font-size: 14px;
        color: #fff;

      }
    }
    .historyNav{
      font-size: 14px;
    }
    .messageCell{
      margin: 10px 0;
    }
  }

</style>
