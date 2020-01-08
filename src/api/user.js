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

export const getSmsCode = mobile => {
  return request({
    //   请求方法
    method: 'GET',
    // 请求路径
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}
