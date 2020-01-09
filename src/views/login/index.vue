<template>
  <div class="login-container">
    <van-nav-bar left-arrow title="注册/登录"/>
    <!-- vee-validate  验证插件的使用 -->
    <!-- ValidationObserver 把需要校验的整个表单包裹起来
        ValidationProvider 把需要校验的具体表单元素包裹起来
        ValidationProvider 配置校验规则
        name 配置验证字段的名字
        rules 配置验证的规则 -->
    <ValidationObserver ref="myForm">
      <ValidationProvider name='手机号' rules='required|mobile' >
        <van-field
          v-model="user.mobile"
          clearable
          left-icon="phone-o"
          label="手机号"
          placeholder="请输入手机号"
        />
        <!-- <span>{{errors[0]}}</span> -->
    </ValidationProvider>
    <ValidationProvider name='验证码' rules='required|code'>
      <van-field
        v-model="user.code"
        label="验证码"
        left-icon="bag-o"
        placeholder="请输入验证码">
        <van-button
        v-if="sendSmscode"
        slot="button"
        type="default"
        disabled
        size="small">
          <van-count-down
          :time="1000*60"
          format="ss s"
          @finish='sendSmscode=false'
        />
        </van-button>
        <van-button
        v-else
        slot="button"
        type="primary"
        size="small"
        @click="getSms"
        >获取验证码</van-button>
      </van-field>
    </ValidationProvider>
  </ValidationObserver>
  <div class="btn-login">
    <van-button type="info" @click="onLogin">登录</van-button>
  </div>
  </div>
</template>

<script>
import { login, getSmsCode } from '@/api/user'
import { validate } from 'vee-validate'
export default {
  name: 'LoginPage',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      sendSmscode: false
    }
  },
  // try{}catch(err){}
  methods: {
    // 发送验证码
    async getSms () {
      // 1.获取手机号
      const { mobile } = this.user
      // 2.校验手机号是否有效
      // validate(要验证的数据，验证规则，一个可选的验证对象（如name）)
      const validateRes = await validate(mobile, 'required|mobile', {
        name: '手机号'
      })
      console.log(validateRes)
      if (!validateRes.valid) {
        this.$toast(validateRes.errors[0])
        return
      }
      // 3.发送请求
      // try catch  进行try操作 如果出错  错误会在catch中取到
      try {
        // 显示倒计时
        this.sendSmscode = true
        // 发请求
        await getSmsCode(mobile)
      } catch (err) {
        // 发送失败
        console.log(err)
        // console.log(1)
        // 关闭倒计时
        this.sendSmscode = false
        // 提示发送错误
        if (err.response.status === 429) {
          // console.log(err.response)
          this.$toast('请勿频繁操作')
          return
        }
        this.$toast('发送失败')
      }
    },
    // 登录
    async onLogin () {
      // 1.获取表单数据
      let user = this.user
      // 2.表单验证
      const success = await this.$refs.myForm.validate()
      console.log(success)
      if (!success) {
        // 如果验证失败 停止表单提交  return
        // console.log('验证失败')
        // 如果验证失败 进行提示
        setTimeout(() => {
          // console.log(this.$refs.myForm)
          const errors = this.$refs.myForm.errors
          console.log(errors)
          // console.log(Object.values(errors))
          // find 返回满足条件的数组
          const findArr = Object.values(errors).find(item => item[0])
          // console.log(item[0])
          this.$toast(findArr[0])
        }, 100)
        // console.log(this.$refs.myForm.errors)
        return
      }
      // 3.发送axios请求拿数据
      try {
        // 请求成功
        // new Promise(
        //   function (resolev, reject) {

        //   }
        // )
        // console.log(1)
        const res = await login(user)
        console.log(res)
        // console.log(new Promise())
        this.$toast.loading({
          duration: 0,
          message: '加载中...',
          // 是否禁止背景点击
          forbidClick: true
        })
        // 存储令牌  实现共享和持久化  用Vuex容器实现共享   用本次存储实现持久化
        this.$store.commit('setUser', res.data.data)
        // console.log(res.data)
        this.$toast.success('登录成功')
      } catch (err) {
        console.log('登录失败', err)
        // console.log(err.response)
        this.$toast.fail('登录失败')
      }

      // 4.根据拿到的数据进行后续的操作
    }
  }

}
</script>

<style lang='less' scoped>
.login-container{
  background-color: #f5f7f9;
  height: 100vh;
  .btn-login{
    padding: 27px 16px;
    .van-button{
      width: 100%;
      background-color: #6db4fb;
    }
  }
}
</style>
