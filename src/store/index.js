import Vue from 'vue'
import Vuex from 'vuex'
// import { setItem } from '@/utils/storage'
import { getItem, setItem } from '@/utils/storage'
import decodeJwt from 'jwt-decode'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem('user')
    // user: JSON.parse(window.localStorage.getItem('user'))
    // user: null
    // 因为容器不能持久化 一刷新就没了  所以要把user的值null
    // 为了持久把  就本地存储的数据再次赋值给user   保证user数据的持久化
  },
  mutations: {
    // 建立toekn   token名   token值
    setUser (state, data) {
      // console.log(data)
      // 在建立本地存储token之前  先检验一下是否有token 如果有的话  对象中加入 id这一项属性
      if (data && data.token) {
        // 有时候我们会用的当前用户的id 所以如果后端没有提供ID 就需要手动解析ID 添加到对象当中
        data.id = decodeJwt(data.token).user_id
        // console.log(decodeJwt(data.token))
      }
      // 实现共享
      // console.log(data)
      state.user = data
      // 为了持久化 尽力本地存储   本地存储进行封装
      // console.log(state.user)
      setItem('user', state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
