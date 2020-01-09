/**
 * 一个专门操作本地存储的工具模块
 * setItem    getItem    removeItem
 * 本地存储主要用于持久化    共享用Vue容器
 */
// 建立本地存储
export const setItem = (name, value) => {
  if (typeof value === 'object') {
    // console.log(value)
    value = JSON.stringify(value)
    // console.log(value)
  }
  window.localStorage.setItem(name, value)
}
// 获取本地存储
export const getItem = name => {
  const data = window.localStorage.getItem(name)
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}
// 删除本地存储
export const removeItem = name => {
  window.localStorage.removeItem(name)
}
