/**
 * 请求模块
 */
import axios from 'axios'
// 在非组件模块中获取store
import store from '@/store/'
// import { config } from 'vue/types/umd'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 基础路径
})

// 请求拦截器
request.interceptors.request.use(function (cpnfig) {
  // console.log(cpnfig)
  const { user } = store.state
  // 如果用户登录统一给接口设置token
  if (user) {
    cpnfig.headers.Authorization = `Bearer ${store.state.user.token}`
  }
  // 处理完， 返回config
  return cpnfig
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截器

// 导出
export default request
