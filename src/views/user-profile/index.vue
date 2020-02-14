<template>
  <div class="user-profile">
      <!-- 导航栏 -->
      <van-nav-bar
      title="编辑资料"
      left-arrow
      @click-left="$router.back()"
      ></van-nav-bar>
      <!-- cell-group 单元格显示 -->
      <!-- is-link 是否展示右侧箭头并开启点击反馈 -->
      <van-cell-group>
          <van-cell title="头像" is-link>
              <van-image width="30" height="30" round src="https://img.yzcdn.cn/vant/cat.jpeg"></van-image>
          </van-cell>
          <van-cell title="昵称" is-link></van-cell>
          <van-cell title="介绍" is-link></van-cell>
          <van-cell title="性别" is-link></van-cell>
          <van-cell title="生日" is-link></van-cell>
      </van-cell-group>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'

export default {
  name: 'UserProfile',
  components: {},
  props: {},
  data () {
    return {
      user: {}// 用户资料
    }
  },
  computed: {},
  watch: {},
  created () {
    //   获取用户信息
    this.loadProfile()
  },
  mounted: {},
  methods: {
    //   获取用户信息
    async loadProfile () {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
      } catch (error) {
        console.log(error)
        this.$toast.fail('获取用户信息失败')
      }
    }
  }
}
</script>

<style>

</style>
