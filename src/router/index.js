import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 路由表
const routes = [
  {
    path: '/Login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
  // 一级路由渲染到跟组件
  {
    path: '/',
    name: '',
    component: () => import('@/views/Layout.vue'),
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import('@/views/Home.vue')
      },
      {
        path: '/Qa', // 默认子路由
        name: 'qa',
        component: () => import('@/views/Qa.vue')
      },
      {
        path: '/Video', // 默认子路由
        name: 'video',
        component: () => import('@/views/Video.vue')
      },
      {
        path: '/My', // 默认子路由
        name: 'my',
        component: () => import('@/views/My.vue')
      }
    ]
  },
  {
    path: '/Search',
    name: 'search',
    component: () => import('@/views/Search.vue')
  },
  {
    path: '/Profile',
    name: 'UserProfile',
    component: () => import('@/views/Profile.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
