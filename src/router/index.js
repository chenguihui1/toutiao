import Vue from 'vue'
import VueRouter from 'vue-router'
import { Dialog } from 'vant'
import store from '@/store/'

Vue.use(VueRouter)
// 路由表
const routes = [
  {
    path: '/Login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    meta: { requiresAuth: false }
  },
  // 一级路由渲染到跟组件
  {
    path: '/',
    component: () => import('@/views/Layout.vue'),
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import('@/views/Home.vue'),
        meta: { requiresAuth: false }
      },
      {
        path: '/Qa', // 默认子路由
        name: 'qa',
        component: () => import('@/views/Qa.vue'),
        meta: { requiresAuth: false }
      },
      {
        path: '/Video', // 默认子路由
        name: 'video',
        component: () => import('@/views/Video.vue'),
        meta: { requiresAuth: false }
      },
      {
        path: '/My', // 默认子路由
        name: 'my',
        component: () => import('@/views/My.vue'),
        meta: { requiresAuth: false }
      }
    ]
  },
  {
    path: '/Search',
    name: 'search',
    component: () => import('@/views/Search.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/Profile',
    name: 'UserProfile',
    component: () => import('@/views/Profile.vue'),
    meta: { requiresAuth: false }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // 频道页面是否需要登录才能访问
  if (to.meta.requiresAuth) {
    // 检测登录状态
    // 如果以登录，直接通过
    if (store.state.user) {
      return next()
    }
    // 没有登录提示，是否登录
    Dialog.confirm({
      title: '登录提示',
      message: '该功能需要登录，是否登录'
    })
      .then(() => {
        // 确认执行
        router.replace({
          name: 'login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
      })
      .catch(() => {
        // 取消执行
        next(false)
      })
  } else {
    // 不需要登录
    next()
  }
})

export default router
