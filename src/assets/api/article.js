/**
 * 文章相关请求模块
 */
import request from '@/assets/utils/request'

/**
 * 获取文章列表
 */
export const getArtivles = params => {
  return request({
    method: 'get',
    url: '/app/v1_1/articles',
    params
  })
}
