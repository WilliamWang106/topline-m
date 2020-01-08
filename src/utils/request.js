/**
 * axios 请求模块
 */
import axios from 'axios'
import jsonBig from 'json-bigint'

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

// 请求拦截器
// axios.interceptors.request.use(function (config) {
//   return config
// })
// axios.interceptors.response.use

// 响应拦截器
export default request
