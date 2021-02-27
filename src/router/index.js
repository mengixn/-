import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap } from './router.config.js'
import { home } from '@/api/home'

// hack router push callback
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const createRouter = () =>
  new Router({
    mode: 'hash', // 如果你是 history模式 需要配置vue.config.js publicPath
    // base: process.env.BASE_URL,
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
  })

const router = createRouter()

// router.beforeEach(({ meta }, form, next) => {
//     // const { title = '' } = meta
//     // document.title = title
//     next()
// })
router.beforeEach((to, from, next) => {
  // 我在这里模仿了一个获取用户信息的方法
  window.document.title = to.meta.title // 设置title名
  const isLogin = JSON.parse(window.localStorage.getItem('userInfo'))
  if (isLogin) {
    home({ suserId: isLogin.user.id, gj: isLogin.user.gj }).then(res => {
      if (res.data.suser) {
        // 如果用户信息存在则往下执行。
        if (to.path === '/applyMore/aSchool') {
          if (to.query.sshqkh !== isLogin.user.sshqkh) {
            next('/nologin')
          } else {
            next()
          }
        } else if (to.path === '/home' || to.path === '/login' || to.path === '/nologin') {
          to.query.log = 1
          next()
        } else {
          next()
        }
      } else {
        localStorage.removeItem('userInfo')
        next('/login')
      }
    })
  } else {
    // 如果用户token不存在则跳转到login页面
    if (to.path === '/login') {
      to.query.log = 1
      next()
    } else {
      next('/login')
    }
  }
})

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
