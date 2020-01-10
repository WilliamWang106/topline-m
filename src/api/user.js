/**
 * 用户相关的请求模块
 */
import request from '@/utils/request'

export const login = data => {
  return request({
    //   请求方法
    method: 'POST',
    // 请求路径
    url: '/app/v1_0/authorizations',
    // 请求头
    // headers: {},
    // Query查询参数
    // params: {},
    // Body请求体参数
    data
  })
}
// 验证登录
export const getSmsCode = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}
// 获取当前用户登录信息
export const getUserInfo = mobile => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
  })
}
