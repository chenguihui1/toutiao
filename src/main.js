import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载Vant 组件
import Vant from 'vant'

// 加载Vant组件库样式
import 'vant/lib/index.css'

// 加载全局样式
import './assets/style/index.less'

// 自动设置rem基准值
import 'amfe-flexible'

// 全局注册 vant 中的组件
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
