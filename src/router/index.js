import Vue from 'vue'
import Home from '../views/Home/Home.vue'
import VueRouter from 'vue-router'
import Login from '../views/Login/Login.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login },
  { path: '/', redirect: '/login' },
  { path: '/home', component: Home }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // next()为放行函数，两种形式
  // 1. next()    2. next('/login') 强制跳转
  // 路由导航步骤一：检查当前要去（to）的页面是否是登录页，如果是则放行，不是则进入下一步；
  if (to.path === '/login') {
    return next()
  }
  // 路由导航步骤二：获取token并检查是否有效
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) {
    return next('/login')
  } else {
    next()
  }
})

export default router
