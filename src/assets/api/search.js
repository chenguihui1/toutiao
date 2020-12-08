/**
 * 搜索请求相关模块
 */
import request from '@/assets/utils/request'

/**
 * 获取搜索联想建议
 */
export const getSearchSuggestions = q => {
  return request({
    method: 'get',
    url: '/app/v1_0/suggestion',
    params: {
      q // 联想建议关键词
    }
  })
}

/**
 * 获取搜索结果
 */
export const getSearchResult = params => {
  return request({
    method: 'get',
    url: '/app/v1_0/search',
    params
  })
}
