const getters = {
  token: state => state.token,
  userId: state => state.userId,
  username: state => state.username,
  announcement_badge:state=>state.announcement_badge,
  userInfo:state=>state.userInfo,
  safeMoney:state=>state.userInfo.safeMoney,
  isAddOrder:state=>state.isAddOrder,
  serviceUrl:state=>state.initObj.serviceUrl,
  initObj:state=>state.initObj
}

export default getters
