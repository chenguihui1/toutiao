/**
 * 用户相关请求模块
 */
import request from '@/assets/utils/request'
// 在非组件模块中获取store
// import store from '@/store/'
/**
 * 用户登录/注册
 */
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}
/**
 * 发送短信验证码
 */
export const sendSms = mobile => {
  return request({
    method: 'get',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}
/**
 * 获取用户信息
 */
export const getCurrentUser = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/user'
  })
}
/**
 * 获取用户频道信息
 */
export const getUserChannels = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/user/channels'
  })
}
/**
 * 获取用用户个人资料
 */
export const getUserProfile = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/user/profile'
  })
}
