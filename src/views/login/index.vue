<template>
  <div class="login-container">
    <van-nav-bar left-arrow title="注册/登录"/>
    <van-cell-group>
    <van-field
      v-model="username"
      clearable
      left-icon="phone-o"
      label="手机号"
      placeholder="请输入手机号"
    />
    <van-field
      v-model="password"
      label="验证码"
      left-icon="bag-o"
      placeholder="请输入验证码">
      <van-button slot="button" type="primary" size="small">获取验证码</van-button>
    </van-field>
  </van-cell-group>
  <div class="btn-login">
    <van-button type="info">登录</van-button>
  </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage'

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
