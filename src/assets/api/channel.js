/**
 * 频道相关请求列表
 */
import request from '@/assets/utils/request'

/**
 * 获取所有频道列表
 */
export const getAllChannels = () => {
  return request({
    methosd: 'get',
    url: '/app/v1_0/channels'
  })
}
