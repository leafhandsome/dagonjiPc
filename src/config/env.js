/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

let baseUrl = '';
let routerMode = 'history';
let imgBaseUrl = 'http://shengshicai.f3322.net:9097';
let appId  = '7c68da93a1cb11e79d90d89d672b2f4c';
let appkey = '6375db1d-a1cb-11e7-9d90-d89d672b2f4c';

if (process.env.NODE_ENV == 'development'){
  baseUrl = "http://shengshicai.f3322.net:9097";

} else if (process.env.NODE_ENV == 'production') {
   // 测试环境
   appId  = '7c68da93a1cb11e79d90d89d672b2f4c';
   appkey = '6375db1d-a1cb-11e7-9d90-d89d672b2f4c';
   imgBaseUrl = 'http://shengshicai.f3322.net:9097';
   baseUrl = "http://shengshicai.f3322.net:9097";
}

export {
    baseUrl,
    appId,
    appkey,
    imgBaseUrl,
    routerMode
}
