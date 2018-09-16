import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

Vue.mixin({
  watch: {},
  computed: {},
  beforeRouteUpdate(to, from, next) {
    next()
  },
  mounted() {
  }
})

let route = new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: (resolve) => require(['@/pages/index'], resolve)
    },
    {
      path: '/myinfo',
      name: 'myinfo',
      component: (resolve) => require(['@/pages/user/myinfo'], resolve)
    },
    {
      path: '/mine',
      name: 'mine',
      component: (resolve) => require(['@/pages/user/mine'], resolve)
    },
    {
      path: '/login',
      name: 'login',
      component: (resolve) => require(['@/pages/user/login'], resolve)
    },
    {
      path: '/register',
      name: 'register',
      component: (resolve) => require(['@/pages/user/register'], resolve)
    },
    {
      path: '/forget',
      name: 'forget',
      component: (resolve) => require(['@/pages/user/forget'], resolve)
    },
    {
      path: '/mygrow',
      name: 'mygrow',
      component: (resolve) => require(['@/pages/user/mygrow'], resolve)
    },
    {
      path: '/growdetail',
      name: 'growdetail',
      component: (resolve) => require(['@/pages/user/growdetail'], resolve)
    },
    {
      path: '/article',
      name: 'article',
      component: (resolve) => require(['@/pages/zhuanti/article'], resolve)
    },
    {
      path: '/ztlist',
      name: 'ztlist',
      component: (resolve) => require(['@/pages/zhuanti/ztlist'], resolve)
    },
    {
      path: '/courselist',
      name: 'courselist',
      component: (resolve) => require(['@/pages/course/courselist'], resolve)
    },
    {
      path: '/coursedetail',
      name: 'coursedetail',
      component: (resolve) => require(['@/pages/course/coursedetail'], resolve)
    },
    {
      path: '/coursevideo',
      name: 'coursevideo',
      component: (resolve) => require(['@/pages/course/coursevideo'], resolve)
    },
    {
      path: '/shujixinxiang',
      name: 'shujixinxiang',
      component: (resolve) => require(['@/pages/shujixinxiang'], resolve)
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: (resolve) => require(['@/pages/user/ranking'], resolve)
    },
    {
      path: '/learning',
      name: 'learning',
      component: (resolve) => require(['@/pages/user/learning'], resolve)
    },
    {
      path: '/xxzt',
      name: 'xxzt',
      component: (resolve) => require(['@/pages/xianxiahuodong'], resolve)
    },
    {
      path: '/examquet',
      name: 'examquet',
      component: (resolve) => require(['@/pages/exam/examquet'], resolve)
    },
    {
      path: '/paper',
      name: 'paper',
      component: (resolve) => require(['@/pages/exam/paper'], resolve)
    },
    {
      path: '/exam',
      name: 'exam',
      component: (resolve) => require(['@/pages/exam/exam'], resolve)
    },
    {
      path: '/exam',
      name: 'exam',
      component: (resolve) => require(['@/pages/exam/exam'], resolve)
    },
    {
      path: '/examresult',
      name: 'examresult',
      component: (resolve) => require(['@/pages/exam/examresult'], resolve)
    },
    {
      path: '/zzgl',
      name: 'zzgl',
      component: (resolve) => require(['@/pages/user/zzgl'], resolve)
    },
    {
      path: '/learnlist',
      name: 'learnlist',
      component: (resolve) => require(['@/pages/user/learnlist'], resolve)
    },
    {
      path: '/mygrowmonth',
      name: 'mygrowmonth',
      component: (resolve) => require(['@/pages/user/mygrowmonth'], resolve)
    }
  ]
})

export default route
