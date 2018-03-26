import {
  GET_PLAYSOBJ,
}  from './mutation-types.js'

export default {
  //玩法配置
  [GET_PLAYSOBJ](state,data){
    state.playsObj = data;
  },
  //是否添加了号码
  set_isAddOrder(state,data){
    state.isAddOrder = data;
  },
  //公告消息状态
  set_announcement_badge(state,data){
    state.announcement_badge = data;
  },
  //token配置
  set_token(state,data){
    state.token = data;
  },
  //更新用户信息
  set_userInfo(state,data){
    state.userInfo = data;
  },
  //更新消息数量
  updateMsgCount(state){
    state.userInfo.messageCount = 0;
  },
  //更新余额
  set_safeMoney(state,data){
    state.userInfo.safeMoney = data;
  },
  //初始化数据
  set_initObj(state,data){
    state.initObj = data;
  },
  set_loginsucc(state,data){
    state.token = data.token;
    state.userId = data.userId;
    state.username = data.userName;
  },
  clearAll(state){
    for ( var key in state ) {
      if(key=='playsObj' || key == 'initObj'){
        continue;
      }
      state[key] = ''
    }
    state.userInfo = {messageCount:0,canCashMoney:0,safeMoney:0};
  }
}
