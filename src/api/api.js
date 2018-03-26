
import  methods from './../common/js/methods'

//账号登录
/*function apiPost(url, params){
  return new Promise((resolve, reject) => {
    axios.post(url,methods.format_params(params)).then((response) => {
      console.log(params);
      resolve(response.data)
    }).catch((response) => {
      console.log(params);
      console.log('f', response)
    })
  })
 export const Login = params =>{return apiPost('/api/account/login',params)}
 }*/
function apiPost(url, params){
  return new Promise((resolve, reject) => {
    methods.unitAjax('POST',url,params,(res)=>{
      return resolve(res)})
  },(error)=>{
    return reject(error);
  })
}



//账号登录
// export const Login = params =>{return axios.post(`/api/account/login`,methods.format_params(params)).then(res=>res.data)}
export const Login = params =>{return apiPost('/api/account/login',params)}

//初始化
// export const init = params =>{return axios.post(`/api/basic/init`,methods.format_params(params)).then(res=>res.data)}
export const homeiInit = params =>{return apiPost('/api/home/init',params)}

//手机号码登录
// export const mobileLogin = params =>{return axios.post(`/api/account/mobileLogin`,methods.format_params(params)).then(res=>res.data)}
export const mobileLogin = params =>{return apiPost('/api/account/mobileLogin',params)}

//获取loginmsg
// export const getLoginSmsCode = params =>{return axios.post(`/api/account/getLoginSmsCode`,methods.format_params(params)).then(res=>res.data)}
export const getLoginSmsCode = params =>{return apiPost('/api/account/getLoginSmsCode',params)}

//验证手机号是否被注册接口
// export const checkRegMobile = params =>{return axios.post(`/api/account/checkRegMobile`,methods.format_params(params)).then(res=>res.data)}
export const checkRegMobile = params =>{return apiPost('/api/account/checkRegMobile',params)}

//会员注册短信验证码
// export const getRegSmsCode = params =>{return axios.post(`/api/account/getRegSmsCode`,methods.format_params(params)).then(res=>res.data)}
export const getRegSmsCode = params =>{return apiPost('/api/account/getRegSmsCode',params)}

//会员手机号注册
// export const register = params =>{return axios.post(`/api/account/register`,methods.format_params(params)).then(res=>res.data)}
export const register = params =>{return apiPost('/api/account/register',params)}

//会员账号密码注册
// export const registerByUserName = params =>{return axios.post(`/api/account/registerByUserName`,methods.format_params(params)).then(res=>res.data)}
export const registerByUserName = params =>{return apiPost('/api/account/registerByUserName',params)}


//个人中心_游戏记录游戏类型接口
// export const gameTypeList = params =>{return axios.post(`/api/userCenter/game/gameTypeList`,methods.format_params(params)).then(res=>res.data)}
export const gameTypeList = params =>{return apiPost('/api/userCenter/game/gameTypeList',params)}

//最近玩过的游戏接口
// export const playGamesNearest = params => {return axios.post(`/api/userCenter/game/playGamesNearest`,methods.format_params(params)).then(res => res.data)}
export const playGamesNearest = params => {return apiPost('/api/userCenter/game/playGamesNearest',params)}

//公告列表接口
// export const noticeList = params =>{return axios.post(`/api/userCenter/notice/noticeList`,methods.format_params(params)).then(res=>res.data)}
export const noticeList = params =>{return apiPost('/api/userCenter/notice/noticeList',params)}

//公告列表接口
// export const noticeDetail = params =>{return axios.post(`/api/userCenter/notice/noticeDetail`,methods.format_params(params)).then(res=>res.data)}
export const noticeDetail = params =>{return apiPost('/api/userCenter/notice/noticeDetail',params)}

//个人中心会员创建资金密码
// export const createAccountPwd = params =>{return axios.post(`/api/userCenter/setUp/createAccountPwd`,methods.format_params(params)).then(res=>res.data)}
export const createAccountPwd = params =>{return apiPost('/api/userCenter/setUp/createAccountPwd',params)}

//个人中心会员修改资金密码
// export const editAccountPwd = params =>{return axios.post(`/api/userCenter/setUp/editAccountPwd`,methods.format_params(params)).then(res=>res.data)}
export const editAccountPwd = params =>{return apiPost('/api/userCenter/setUp/editAccountPwd',params)}

//个人中心会员设置
// export const setUpAll = params =>{return axios.post(`/api/userCenter/setUp/index`,methods.format_params(params)).then(res=>res.data)}
export const setUpAll = params =>{return apiPost('/api/userCenter/setUp/index',params)}

//个人中心会员设置绑定手机号
// export const bindPhone = params =>{return axios.post(`/api/userCenter/setUp/bindPhone`,methods.format_params(params)).then(res=>res.data)}
export const bindPhone = params =>{return apiPost('/api/userCenter/setUp/bindPhone',params)}

//获取密保问题列表接口
// export const getPasswordQuestions = params =>{return axios.post(`/api/userCenter/setUp/getPasswordQuestions`,methods.format_params(params)).then(res=>res.data)}
export const getPasswordQuestions = params =>{return apiPost('/api/userCenter/setUp/getPasswordQuestions',params)}

//通过密保找回登录密码，填写用户名后，调用此接口获取该用户的问题列表
// export const getPasswordQuestion = params =>{return axios.post(`/api/account/getPasswordQuestion`,methods.format_params(params)).then(res=>res.data)}
export const getPasswordQuestion = params =>{return apiPost('/api/account/getPasswordQuestion',params)}

//用户保存密保信息
// export const savePasswordQuestion = params =>{return axios.post(`/api/userCenter/setUp/savePasswordQuestion`,methods.format_params(params)).then(res=>res.data)}
export const savePasswordQuestion = params =>{return apiPost('/api/userCenter/setUp/savePasswordQuestion',params)}

//验证资金密码 / 通过密保找回登录密码，验证问题答案正确后，进行重置密码
// export const validFindPwdAccountPwd = params =>{return axios.post(`/api/account/validFindPwdAccountPwd`,methods.format_params(params)).then(res=>res.data)}
export const validFindPwdAccountPwd = params =>{return apiPost('/api/account/validFindPwdAccountPwd',params)}

//绑定手机号码获取验证码
// export const sendBindPhoneSmsCode = params =>{return axios.post(`/api/userCenter/setUp/sendBindPhoneSmsCode`,methods.format_params(params)).then(res=>res.data)}
export const sendBindPhoneSmsCode = params =>{return apiPost('/api/userCenter/setUp/sendBindPhoneSmsCode',params)}

//修改登录密码
// export const changeLoginPwd = params =>{return axios.post(`/api/userCenter/setUp/changeLoginPwd`,methods.format_params(params)).then(res=>res.data)}
export const changeLoginPwd = params =>{return apiPost('/api/userCenter/setUp/changeLoginPwd',params)}

//个人中心数据
// export const userCenterIndex = params =>{return axios.post(`/api/userCenter/index`,methods.format_params(params)).then(res=>res.data)}
export const userCenterIndex = params =>{return apiPost('/api/userCenter/index',params)}

//验证密保
// export const checkPwdQuestion = params =>{return axios.post(`/api/account/checkPwdQuestion`,methods.format_params(params)).then(res=>res.data)}
export const checkPwdQuestion = params =>{return apiPost('/api/account/checkPwdQuestion',params)}

//个人中心_聊天消息列表
// export const talkList = params =>{return axios.post(`/api/userCenter/message/talkList`,methods.format_params(params)).then(res=>res.data)}
export const talkList = params =>{return apiPost('/api/userCenter/message/talkList',params)}

//个人中心_聊天详情列表
// export const talkDetail = params =>{return axios.post(`/api/userCenter/message/talkDetail`,methods.format_params(params)).then(res=>res.data)}
export const talkDetail = params =>{return apiPost('/api/userCenter/message/talkDetail',params)}

//个人中心_消息中心搜索下级用户名
// export const searchUserName = params =>{return axios.post(`/api/userCenter/message/searchUserName`,methods.format_params(params)).then(res=>res.data)}
export const searchUserName = params =>{return apiPost('/api/userCenter/message/searchUserName',params)}

//个人中心_标注消息为已读接口
// export const labelMsgRead = params =>{return axios.post(`/api/userCenter/message/labelMsgRead`,methods.format_params(params)).then(res=>res.data)}
export const labelMsgRead = params =>{return apiPost('/api/userCenter/message/labelMsgRead',params)}

//个人中心_发送消息
// export const sendMsg = params =>{return axios.post(`/api/userCenter/message/sendMsg`,methods.format_params(params)).then(res=>res.data)}
export const sendMsg = params =>{return apiPost('/api/userCenter/message/sendMsg',params)}

//人个中心_游戏记录接口(历史记录)
// export const gameOrderList = params =>{return axios.post(`/api/userCenter/game/gameOrderListByPC`,methods.format_params(params)).then(res=>res.data)}
export const gameOrderList = params =>{return apiPost('/api/userCenter/game/gameOrderListByPC',params)}

//找回密码-手机找回-获取短信验证码接口
// export const getFindPwdSmsCode = params =>{return axios.post(`/api/account/getFindPwdSmsCode`,methods.format_params(params)).then(res=>res.data)}
export const getFindPwdSmsCode = params =>{return apiPost('/api/account/getFindPwdSmsCode',params)}


//找回密码-手机找回-验证短信码接口
// export const validFindPwdSmsCode = params =>{return axios.post(`/api/account/validFindPwdSmsCode`,methods.format_params(params)).then(res=>res.data)}
export const validFindPwdSmsCode = params =>{return apiPost('/api/account/validFindPwdSmsCode',params)}

//通过手机找回密码，重置登录密码
// export const resetPwdByPhone = params =>{return axios.post(`/api/account/resetPwdByPhone`,methods.format_params(params)).then(res=>res.data)}
export const resetPwdByPhone = params =>{return apiPost('/api/account/resetPwdByPhone',params)}

//判断用户名是否存在接口
// export const validateUserNameExist = params =>{return axios.post(`/api/account/validateUserNameExist`,methods.format_params(params)).then(res=>res.data)}
export const validateUserNameExist = params =>{return apiPost(`/api/account/validateUserNameExist`,params)}

//通过密保找回登录密码，验证问题答案是否正确
// export const validPasswordQuestion = params =>{return axios.post(`/api/account/validPasswordQuestion`,methods.format_params(params)).then(res=>res.data)}
export const validPasswordQuestion = params =>{return apiPost(`/api/account/validPasswordQuestion`,params)}

//通过密保找回登录密码，验证问题答案正确后，进行重置密码
// export const resetPwdPasswordQuestion = params =>{return axios.post(`/api/account/resetPwdPasswordQuestion`,methods.format_params(params)).then(res=>res.data)}
export const resetPwdPasswordQuestion = params =>{return apiPost('/api/account/resetPwdPasswordQuestion',params)}

//通过资金密码找回登录密码时，重置登录密码
// export const resetPwdByAccountPwd = params =>{return axios.post(`/api/account/resetPwdByAccountPwd`,methods.format_params(params)).then(res=>res.data)}
export const resetPwdByAccountPwd = params =>{return apiPost('/api/account/resetPwdByAccountPwd',params)}

//设置中心_校验用户登录密码接口
// export const checkLoginPwd = params =>{return axios.post(`/api/userCenter/setUp/checkLoginPwd`,methods.format_params(params)).then(res=>res.data)}
export const checkLoginPwd = params =>{return apiPost('/api/userCenter/setUp/checkLoginPwd',params)}

//重置资金密码接口
// export const restAccountPwd = params =>{return axios.post(`/api/userCenter/setUp/restAccountPwd`,methods.format_params(params)).then(res=>res.data)}
export const restAccountPwd = params =>{return apiPost('/api/userCenter/setUp/restAccountPwd',params)}

//取消订单接口
// export const cancelOrder = params =>{return axios.post(`/api/lottery/cancelOrder`,methods.format_params(params)).then(res=>res.data)}
export const cancelOrder = params =>{return apiPost(`/api/lottery/cancelOrder`,params)}

//进入某个彩票游戏后，获取其前三期场次的游戏信息
// export const gameMatches = params =>{return axios.post(`/api/lottery/gameMatches`,methods.format_params(params)).then(res=>res.data)}
export const gameMatches = params =>{return apiPost('/api/lottery/gameMatches',params)}

//游戏详情-历史开奖记录接口
// export const gameMatchResultList = params =>{return axios.post(`/api/lottery/gameMatchResultList`,methods.format_params(params)).then(res=>res.data)}
export const gameMatchResultList = params =>{return apiPost('/api/lottery/gameMatchResultList',params)}

//获取最新下载地址（包括Android，ios，h5），还有微信客服，qq客服
// export const clientPackageDownloadUrl = params =>{return axios.post(`/api/spread/clientPackageDownloadUrl`,methods.format_params(params)).then(res=>res.data)}
export const clientPackageDownloadUrl = params =>{return apiPost('/api/spread/clientPackageDownloadUrl',params)}



