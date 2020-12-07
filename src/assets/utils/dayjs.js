/**
 * 初始华 dayjs 相关配置
 */
import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用处理相对时间
dayjs.extend(relativeTime)
// 配置使用中文语言包
dayjs.locale('zh-cn')

// 在组件的模板中使用过滤器
Vue.filter('relativeTime', value => {
  return dayjs(value).from(dayjs())
})
// 日期格式化
// console.log(dayjs().format('YYYY^MM-DD HH:mm:ss'))
// console.log(dayjs('2008-5-5 19:13:00').from(dayjs()))
