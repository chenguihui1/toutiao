/**
 * 请求模块
 */
import axios from 'axios'
// 在非组件模块中获取store
import store from '@/store/'
import { Toast } from 'vant'

import router from '@/router/'

const refreshTokenReq = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

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
request.interceptors.response.use(function (response) {
  // 响应成功
  return response
}, async function (error) {
  // 请求响应识别
  const status = error.response.status
  if (status === 400) {
    // 客户端请求参数异常
    Toast.fail('客户端请求参数异常')
  } else if (status === 401) {
    // token无效
    const { user } = store.state
    if (!user || !user.token) {
      // 直接跳转到登录页
      return redirectLogin()
    }
    // 使用refresh_token请求更新
    try {
      const { data } = await refreshTokenReq({
        method: 'PUT',
        url: '/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      // 拿到新的token后放到容器中
      user.token = data.data.token
      store.commit('setUser', user)
      // 失败请求重新发送
      // error.config 请求相关配置信息对象
      return request(error.config)
    } catch (err) {
      // 刷新 token 失败
      redirectLogin()
    }
  } else if (status === 403) {
    // 没有权限操作
    Toast.fail('没有权限操作')
  } else if (status >= 500) {
    //
    Toast.fail('服务端异常，请稍后重式')
  }
  // 抛出异常
  return Promise.reject(error)
})

function redirectLogin () {
  router.replace({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}
// 导出
export default request
