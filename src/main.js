import Vue from 'vue'
import App from './App'
import router from './router'

// import es6promise from 'es6-promise'
//对未支持promise的浏览器进行兼容
// es6promise.polyfill()
// import 'es6-promise/auto'
import 'babel-polyfill'
import $ from 'jquery';
//引入公共样式
import './styles/mycarousel.css'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/record.css'
//引入element
import ElementUI from 'element-ui'
import './styles/base.css'

Vue.use(ElementUI)

import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard);

//引入api接口
import api from './api'
//添加到vue原型中
Vue.prototype.$api = api;

//引入vuex目录
import store from './store'
Vue.use(store)

Vue.config.productionTip = false;

//通过components下的index.js文件导入组件
import components from './components/';

//对导入的组件进行全局组件注册
Object.keys(components).forEach((key) => {
  Vue.component(key, components[key])
})

//methods.js导入自定义方法(/变量)用于全局方法
import methods from './common/js/methods';
//方法挂靠全局
Object.keys(methods).forEach((key) => {
  Vue.prototype[key] = methods[key];
})

//通过filters.js导入自定义用于过滤的函数
import filters from './common/js/filters';
//对导入的函数进行全局过滤器注册
Object.keys(filters).forEach((key)=>{
  Vue.filter(key,filters[key])
})

import { Message } from 'element-ui';
//路由验证
router.beforeEach((to, from, next) => {

  //to即将进入的目标路由对象，from当前导航正要离开的路由， next :  下一步执行的函数钩子
  // 如果即将进入登录路由，则直接放行
  if(to.path === '/login' || to.path === '/register'){
    if(methods.getValue('token')){
      Message.warning('你已经登录了！');
      next({ path: from.fullPath })
    }else{
      store.commit('clearAll');
      next();
    }

  }else {
    //进入的不是登录路由
    if(to.meta.requiresAuth==true && !methods.getValue('token')) {
      // console.log('需要验证');
      //下一跳路由需要登录验证，并且还未登录，则路由定向到  登录路由
      next({ path: '/login' })
    }else {
      //如果不需要登录验证，或者已经登录成功，则直接放行
      // console.log('放行');
      next();
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})



router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
});
