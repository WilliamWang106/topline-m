import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
    // @  vuecli项目中特指的src
  },
  {
    path: '/',
    // name: 'tabBar',
    component: () => import('@/views/tab-bar'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: 'qa',
        name: 'qa',
        component: () => import('@/views/qa')
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
    // @  vuecli项目中特指的src
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    // 开启映射   将路由参数映射到组件的props数据中
    props: true
  },
  // {
  //   path: '/article',
  //   name: 'article',
  //   component: () => import('@/views/article'),
  //   // 开启映射   将路由参数映射到组件的props数据中
  //   props: true
  // },
  {
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('@/views/user-profile')
  },
  {
    path: '/user/chat',
    name: 'user-chat',
    component: () => import('@/views/user-chat')
  },
  {// 我的作品
    path: '/my-article',
    name: 'my-article',
    component: () => import('@/views/user-chat')
  },
  {// 我的收藏
    path: '/user/chat',
    name: 'user-chat',
    component: () => import('@/views/user-chat')
  },
  {// 我的历史
    path: '/user/chat',
    name: 'user-chat',
    component: () => import('@/views/user-chat')
  }

]

const router = new VueRouter({
  routes
})

export default router
