import  Vue from 'vue'
import  Vuex from 'vuex'
import  methods from '@/common/js/methods'

import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)


const state = {
  playsObj:{},
  initObj:{},
  announcement_badge:false,
  userId:methods.getValue('userId'),
  username:methods.getValue('username'),
  token:methods.getValue('token'),
  userInfo:{messageCount:0,canCashMoney:0,safeMoney:0},
  isAddOrder:false,
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
})
