/**
 * moment 日期处理封装
 */
import moment from 'moment'
import Vue from 'vue'

// 配置中文语言
moment.locale('zh-cn')

// 添加全局过滤器
Vue.filter('relativeTime', value => {
  return moment(value).startOf('second').fromNow()
})
// 时间格式自定义过滤器
Vue.filter('dateTime', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(value).format(format)
})
