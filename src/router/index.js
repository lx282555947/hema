import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import Home from '../components/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  //如果请求路径不是login，则判断是否有token
  if (to.path === '/login') {
    console.log(to.path)
    next()
    return
  }
  //如果包含token，放行
  const token = window.sessionStorage.getItem('token')
  console.log(token)
  if (token) {
    next()
    return
  }
  console.log('重定向')
  //如果不包含token，则重定向到login
  next('/login')
  return
})

export default router
