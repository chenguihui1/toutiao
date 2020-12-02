import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/assets/utils/storage'

Vue.use(Vuex)

// 验证用户登录储存的通用名字
const USER_EKY = 'toutiao-user'

export default new Vuex.Store({
  state: {
    user: getItem(USER_EKY)
    // 当前登录用户的登录状态
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 为了防止页面刷新数据消失，我们还需要把数据放到本地储存中，
      // 这里仅仅是为了持久化数据
      setItem(USER_EKY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
