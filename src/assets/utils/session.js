/**
 * 会话储存封装模块
 */
export const getItem = name => {
  const data = window.sessionStorage.getItem(name)
  // 为什么把 JSON.parse 放到 try-catch 中?
  // 因为 data 可能不是 JSON 格式字符串
  try {
    // 尝试把 data 转为 JavaScript 对象
    return JSON.parse(data)
  } catch (err) {
    // data 不是JSON 格式字符 直接返回
    return data
  }
}
export const setItem = (name, value) => {
  // 如果 value 是对象， 就把 value 转为 JSON 格式字符串
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.sessionStorage.setItem(name, value)
}

export const removeItem = name => {
  window.sessionStorage.removeItem(name)
}
