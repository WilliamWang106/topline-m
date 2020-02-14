/**
 * axios 请求模块
 */
import axios from 'axios'
import jsonBig from 'json-bigint'
// 引入store来获取token   通过Vuex的容器来获取token
import store from '@/store'
import router from '@/router'

// axios.create({})   可以自定义创建一个axios实例 baseURL headers timeout
// timeout   如果请求超出了timeout 时间 请求会被中断
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})
// transformResponse 是 axios  专门提供的一个API
// 支持由用户来决定如何转换后端返回的数据
// 配置全局的axios的默认值
// axios.defaults.baseURL
// transformRequest  允许在向服务器发送请求前 修改请求数据
// transformResponse  在传递给then/catch前  允许修改响应数据
request.defaults.transformResponse = [function (data) {
  try {
    //   之前默认用JSON.parse()转换   改为jsonBig.parse
    return jsonBig.parse(data)
    // 如果转换成功，就直接返回数据
    // 如果转换失败，就进入catch 返回一个空对象
  } catch (err) {
    return {}
  }
}]

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const { user } = store.state
  if (user) {
    // 设置请求头  按照请求接口来设置
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, async function (error) {
  // 如果存在错误响应  并且 错误响应的状态码是401
  if (error.response && error.response.status === 401) {
    // 如果没有refresh_token 则直接跳转到登录页面
    const user = store.state.user
    if (!user || !user.refresh_token) {
      redirectLogin()
      return
    }
    // 如果有refresh_token  则更新token
    try {
      const { data } = await axios({
        method: 'PUT',
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      // 如果刷新成功，则把更新的tokeng更新到容器中
      store.commit('setUser', {
        ...user,
        token: data.data.token
      })
      // 把之前失败的请求继续发送出来
      return request(error.config)
    } catch (err) {
      console.log('刷新token失败', err)
      redirectLogin()
    }
  }
  // 对响应错误做点什么
  return Promise.reject(error)
})
// 封装函数  跳转到主页
function redirectLogin () {
  router.push({
    name: 'login',
    query: {
      // router.currentRoute  获取当前路由对象  JS中获取当前路由对象的方法
      // 其中fullPath当前路由的路径
      redirect: router.currentRoute.fullPath
    }
  })
}

// 请求拦截器
// axios.interceptors.request.use(function (config) {
//   return config
// })
// axios.interceptors.response.use

// 响应拦截器
export default request
