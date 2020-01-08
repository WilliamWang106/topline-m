import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 注册Vuex
import store from './store'
// 动态设置 REM 基准值(html标签字体大小)
import 'amfe-flexible'
// 注册vant组件
import './utils/register-vant'
// 注册style中的index.less  加载全局样式  要放到第三方的样式之后
import './styles/index.less'
// 引入校验插件
import './utils/validation'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
