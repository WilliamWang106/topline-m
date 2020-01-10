import Vue from 'vue'
import Vuex from 'vuex'
// import { setItem } from '@/utils/storage'
import { getItem, setItem } from '@/utils/storage'

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
