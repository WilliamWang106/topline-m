/**
 * 表单验证配置模块
 */
import Vue from 'vue'

// 加载需要使用的验证组件
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
// ValidationProvider 和 ValidationObserver  需要全局注册 用于包裹
// extend用于自定义校验规则

// 加载内置的验证规则
import * as rules from 'vee-validate/dist/rules'

// 加载中文语言包
import { messages } from 'vee-validate/dist/locale/zh_CN.json'

// 全局注册
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

// 配置规则和中文提示
Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule],
    message: messages[rule]
  })
})
// 添加自定义规则 extend

// 最简单的用法
// extend('positive', value => {
//   return value >= 0;
// });

// 自定义手机号的规则
extend('mobile', {
  validate: value => {
    // return  布尔值   如果是true通过  如果是false 不通过  提示message的信息
    return /^1(3|5|6|7|8|9)\d{9}$/.test(value)
  },
  // 不满足会提示
  message: '{_field_}格式错误'
})

// 自定义验证码的规则
extend('code', {
  validate: value => {
    return /^\d{6}$/.test(value)
  },
  message: '{_field_}格式错误'
})
