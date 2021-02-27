/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/views/layouts/index'),
    redirect: '/home',
    meta: {
      title: '服务中心',
      keepAlive: false
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index'),
        meta: { title: '服务中心', keepAlive: false }
      },
      {
        path: '/question',
        component: () => import('@/views/question/index'),
        meta: { title: '我有疑问', keepAlive: false }
      },
      {
        path: '/advice',
        component: () => import('@/views/advice/index'),
        meta: { title: '我的意见', keepAlive: false }
      },
      {
        path: '/project',
        name: 'project',
        component: () => import('@/views/project/index'),
        meta: { title: '确认方案', keepAlive: false }
      },
      {
        path: '/evaluation',
        component: () => import('@/views/evaluation/index'),
        meta: { title: '查看评价', keepAlive: false }
      },
      {
        path: '/publish',
        component: () => import('@/views/publish/index'),
        meta: { title: '发表评价', keepAlive: false }
      },
      {
        path: '/myTutor',
        component: () => import('@/views/myTutor/index'),
        meta: { title: '导师', keepAlive: false }
      },
      {
        path: '/tutorDetail',
        component: () => import('@/views/tutorDetail/index'),
        meta: { title: '导师详情', keepAlive: false }
      },
      {
        path: '/tutorComment',
        component: () => import('@/views/tutorComment/Index'),
        meta: { title: '导师评语', keepAlive: false }
      },
      {
        path: '/gwlogin',
        name: 'Gwlogin',
        component: () => import('@/views/gwlogin/gwlogin'),
        meta: { title: '顾问登录' }
      },
      {
        path: '/resume',
        component: () => import('@/views/resume/index'),
        meta: { title: '个人中心', keepAlive: false }
      },
      {
        path: '/gender',
        component: () => import('@/views/gender/index'),
        meta: { title: '性别选择', keepAlive: false }
      },
      {
        path: '/notice',
        component: () => import('@/views/notice/index'),
        meta: { title: '消息提醒', keepAlive: false }
      },
      {
        path: '/serve',
        component: () => import('@/views/serve/index'),
        meta: { title: '服务流程', keepAlive: false }
      },
      {
        path: '/grade',
        component: () => import('@/views/grade/Index'),
        meta: { title: '我的成绩', keepAlive: false }
      },
      {
        path: '/gradeDetails',
        component: () => import('@/views/gradeDetails/Index'),
        meta: { title: '成绩详情', keepAlive: false }
      },
      {
        path: '/jianjie',
        component: () => import('@/views/jianjie/Index'),
        meta: { title: '活动简介', keepAlive: false }
      },
      {
        path: '/MP_verify_HdSW75DJD4oFwJQG.txt',
        name: 'down',
        component: () => import('@/views/text/text')
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/login'),
        meta: { title: '登录/注册', keepAlive: false }
      },
      {
        path: '/nologin',
        name: 'noLogin',
        component: () => import('@/views/nologin/nologin'),
        meta: { title: '请先登录', keepAlive: false }
      },
      {
        path: '/applyForProgress',
        name: 'ApplyForProgress',
        meta: { title: '申请进度', keepAlive: false },
        component: () => import('@/views/applyForProgress')
      },
      {
        path: '/applyMore',
        name: 'ApplyMore',
        meta: { keepAlive: false, title: '进度' },
        component: () => import('@/views/layouts/applyMore'),
        redirect: '/applyMore/aSchool',
        children: [
          {
            path: 'aTeam',
            name: 'Ateam',
            meta: { keepAlive: true, title: '进度' },
            component: () => import('@/views/apply/aTeam')
          },
          {
            path: 'aSchool',
            name: 'Aschool',
            meta: { keepAlive: true, title: '进度' },
            component: () => import('@/views/apply/aSchool')
          },
          {
            path: 'aJapan',
            name: 'Ajapan',
            meta: { keepAlive: true, title: '进度' },
            component: () => import('@/views/apply/aJapan')
          }
        ]
      },
      {
        path: '/daiban',
        name: 'Daiban',
        component: () => import('@/views/daiban/daiban'),
        meta: { title: '我的待办', keepAlive: false }
      },
      {
        path: '/pingyu',
        name: 'Pingyu',
        component: () => import('@/views/comments/comments'),
        meta: { title: '导师评语', keepAlive: false }
      },
      {
        path: '/contract',
        name: 'Contract',
        component: () => import('@/views/contract/Index'),
        meta: { title: '合同', keepAlive: false }
      },
      {
        path: '/networkError',
        name: 'networkError',
        component: () => import('@/views/network/no-network.vue'),
        meta: { title: '网络异常', keepAlive: false }
      }
    ]
  }
]
