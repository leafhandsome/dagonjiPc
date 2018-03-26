import Vue from 'vue'
import Router from 'vue-router'

//固定页
const nav = resolve => require(['@/views/index'], resolve)
const gameindex = resolve => require(['@/views/game/index'], resolve)
const userindex = resolve => require(['@/views/user/index'], resolve)
const other = resolve => require(['@/views/public/index'], resolve)

//其他公共页
const xtgg = resolve => require(['@/views/nav/xtgg'], resolve)
//找回登录/资金密码
const getpwd = resolve => require(['@/views/public/other/getpwd'], resolve)
//找回密保
const getQuestionPwd = resolve => require(['@/views/public/other/getQuestionPwd'], resolve)
//其他页
const login = resolve => require(['@/views/login'], resolve)
const register = resolve => require(['@/views/register'], resolve)
const notFound = resolve => require(['@/views/404'], resolve)
const trend = resolve => require(['@/views/public/other/trend'], resolve)
// const developing = resolve => require(['@/views/developing'], resolve)

//首页
const index = resolve => require(['@/views/nav/index'], resolve)
const tyzx = resolve => require(['@/views/nav/tyzx'], resolve)
const zrylc = resolve => require(['@/views/nav/zrylc'], resolve)
const dzylc = resolve => require(['@/views/nav/dzylc'], resolve)
const yhzx = resolve => require(['@/views/nav/yhzx'], resolve)


//用户
// const user1 = resolve => require(['@/views/user/account/one'], resolve)
// const user2 = resolve => require(['@/views/user/account/two'], resolve)
// const user3 = resolve => require(['@/views/user/account/three'], resolve)

//用户中心
const grzx = resolve => require(['@/views/user/account/grzx/index'], resolve)

//报表中心
const bbzx = resolve => require(['@/views/user/account/bbzx/index'], resolve)
const gameRecord = resolve => require(['@/views/user/userRecord/gameRecord'], resolve)
const lotterRecord = resolve => require(['@/views/user/userRecord/lotterRecord'], resolve)
const billRecord = resolve => require(['@/views/user/userRecord/billdRecord'], resolve)
const withdrawRecord = resolve => require(['@/views/user/userRecord/withdrawRecord'], resolve)
const transferRecord = resolve => require(['@/views/user/userRecord/transferRecord'], resolve)
const payRecord = resolve => require(['@/views/user/userRecord/payRecord'], resolve)

//代理中心
const dlzx = resolve => require(['@/views/user/account/dlzx/index'], resolve)
const teamCenter = resolve => require(['@/views/user/teamRecord/teamCenter'], resolve)
const accountCenter = resolve => require(['@/views/user/teamRecord/accountCenter'], resolve)
const teambillRecord = resolve => require(['@/views/user/teamRecord/teambillRecord'], resolve)
const teamGameRecord = resolve => require(['@/views/user/teamRecord/teamGameRecord'], resolve)
const teamList = resolve => require(['@/views/user/teamRecord/teamList'], resolve)
const teamPayRecord = resolve => require(['@/views/user/teamRecord/teamPayRecord'], resolve)
const teamRebateRecord = resolve => require(['@/views/user/teamRecord/teamRebateRecord'], resolve)
const teamRecord = resolve => require(['@/views/user/teamRecord/teamRecord'], resolve)

//消息中心
const xxzx = resolve => require(['@/views/user/account/xxzx/index'], resolve)

//彩票
// const cqssc = resolve => require(['@/views/game/gamessc/gamecqssc'], resolve)
// const xjssc = resolve => require(['@/views/game/gamessc/gamexjssc'], resolve)
const betpage = resolve => require(['@/views/lottery/betpage'], resolve)

Vue.use(Router)

export default new Router({
  linkActiveClass:'active',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path:'/',
      component:nav,
      name:'index',
      redirect:'/index/index',
      children:[
        {path:'/index/index',component:index,name:'index_index'},
        {path:'/index/zrylc',component:zrylc,name:'index_zrylc'},
        {path:'/index/dzylc',component:dzylc,name:'index_dzylc'},
        {path:'/index/tyzx',component:tyzx,name:'index_tyzx'},
        {path:'/index/yhzx',component:yhzx,name:'index_yhzx'},
        {path:'/index/xtgg',component:xtgg,name:'index_xtgg'}
      ]
    },
    {
      path:'/user',
      component:userindex,
      name:'user',
      redirect:'/user/grzx',
      children:[
        {path:'/user/grzx',component:grzx,name:'user_grzx',meta: { requiresAuth: true }},
        {
          path: '/user/bbzx', component: bbzx, name: 'user_bbzx', redirect: '/user/bbzx/gameRecord',meta: { requiresAuth: true },//个人报表

          children: [
            // 游戏记录
            { path: '/user/bbzx/gameRecord', name: 'gameRecord', component: gameRecord, meta: { requiresAuth: true } },
            //彩票报表
            { path: '/user/bbzx/lotterRecord', name: 'lotterRecord', component: lotterRecord, meta: { requiresAuth: true } },
            //账变记录
            { path: '/user/bbzx/billRecord', name: 'billRecord', component: billRecord, meta: { requiresAuth: true } },
            //充值记录
            { path: '/user/bbzx/payRecord', name: 'payRecord', component: payRecord, meta: { requiresAuth: true } },
            //提现记录
            { path: '/user/bbzx/withdrawRecord', name: 'withdrawRecord', component: withdrawRecord, meta: { requiresAuth: true } },
            // 转账记录
            { path: '/user/bbzx/transferRecord', name: 'transferRecord', component: transferRecord, meta: { requiresAuth: true } },
          ]},
        {path:'/user/dlzx',component:dlzx,name:'user_dlzx',meta: { requiresAuth: true },redirect: '/user/dlzx/teamCenter',
          children: [
            // 代理首页
            { path: '/user/dlzx/teamCenter', name: 'teamCenter', component: teamCenter, meta: { requiresAuth: true }},
            //开户中心
             { path: '/user/dlzx/accountCenter', name: 'accountCenter', component: accountCenter, meta: { requiresAuth: true }},
            { path: '/user/dlzx/teambillRecord', name: 'teambillRecord', component: teambillRecord, meta: { requiresAuth: true }},
            { path: '/user/dlzx/teamList', name: 'teamList', component: teamList, meta: { requiresAuth: true },},
            { path: '/user/dlzx/teamPayRecord', name: 'teamPayRecord', component: teamPayRecord, meta: { requiresAuth: true }},
            { path: '/user/dlzx/teamRebateRecord', name: 'teamRebateRecord', component: teamRebateRecord, meta: { requiresAuth: true }},
            { path: '/user/dlzx/teamRecord', name: 'teamRecord', component: teamRecord, meta: { requiresAuth: true },},
            { path: '/user/dlzx/teamGameRecord', name: 'teamGameRecord', component: teamGameRecord, meta: { requiresAuth: true }},
            ]},
        {path:'/user/xxzx',component:xxzx,name:'user_xxzx',meta: { requiresAuth: true }}
      ]
    },
    {
      path:'/public',
      component:other,
      name:'other',
      children:[
        {path:'/public/getloginpwd',component:getpwd,name:'public_getloginpwd',meta: { type:0}},
        {path:'/public/getmoneypwd',component:getpwd,name:'public_getmoneypwd',meta: { type:1,requiresAuth: true}},
        {path:'/public/getQuestionPwd',component:getQuestionPwd,name:'public_getQuestionPwd',meta: {requiresAuth: true}},
        {path:'/public/trend/:gameId/:gameType',component:trend,name:'trend'}
      ]
    },
    {
      path: '/404',
      name: 'error',
      component: notFound
    },
    {
    path: '/betpage/:gameId/:gameType',
    name: '投注页',
    component: betpage
  },
    {
      path: '*',
      redirect: { path: '/404' }
    }

  ]
})
