import crypto from 'crypto'
import {
  baseUrl,appId,appkey
} from '../../config/env'
//定义公共的方法
var methods = {
  /*
   *参数说明：
   *opts: {'可选参数'}
   **method: 请求方式:GET/POST,默认值:'GET';
   **url:    发送请求的地址, 默认值: 当前页地址;
   **data: string,json;
   **async: 是否异步:true/false,默认值:true;
   **cache: 是否缓存：true/false,默认值:true;
   **contentType: HTTP头信息，默认值：'application/json';
   **success: 请求成功后的回调函数;
   **error: 请求失败后的回调函数;
   */
  unitAjax: function (type, url, data, success, failed, async = 'true') {
    url = baseUrl + url;
    var sign = '';
    // 创建ajax对象
    var xhr = null;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else {
      xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }

    var type = type.toUpperCase();

    // 用于清除缓存
    var random = Math.random();

    //获取用户id
    data.userId = methods.getValue("userId") == null ? "" : methods.getValue("userId");
    //获取token
    data.token = methods.getValue("token") == null ? "" : methods.getValue("token");

    //获取其他参数
    data = methods.getParam(data);

    //参数排序
    data = methods.objKeySort(data);

    if (typeof data == 'object') {
      var str = '';
      //拼接字符串
      for (var key in data) {
        if (data[key] != "") {
          str += key + '=' + data[key] + '&';
        }
      }
      //md5加密
      if (str !== '') {
        str = str + "appKey="+appkey;

        //md5加密 获取验签
        sign = methods.getmd5(str);

      }
      data.sign = sign;
    }

    if (type == 'GET') {
      if (data) {
        xhr.open('GET', url + '?' + data, true);
      } else {
        xhr.open('GET', url + '?t=' + random, true);
      }
      xhr.send();

    } else if (type == 'POST') {
      xhr.open('POST', url, async);
      // 如果需要像 html 表单那样 POST 数据，请使用 setRequestHeader() 来添加 http 头。
      xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
      xhr.send(JSON.stringify(data));
    }

    // 处理返回数据
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          success(JSON.parse(xhr.responseText));
        } else {
          if (failed) {
            failed(xhr.status);
          }
        }
      }
    }
  },
  /**
   * 存储localStorage
   */
  setStore: function (name, content) {
    if (!name) return;
    if (typeof content !== 'string') {
      content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
  },

  /**
   * 获取localStorage
   */
  getStroe: function (name) {
    if (!name) return;
    return window.localStorage.getItem(name);
  },
  /**
   *删除localStorage
   */
  removeStore: function (name) {
    if (!name) return;
    window.localStorage.removeItem(name);
  },

  /**
   *数组中删除指定值元素
   */
  removeByValue: function (arr, val) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == val) {
        arr.splice(i, 1);
        return arr;
      }
    }
  },
  //->设置
  setValue: function (options) {
    var _default = {
      name: null,
      value: null,
      expires: new Date(new Date().getTime() + (30 * 1000 * 60 * 60 * 24)),
      path: '/'
    };
    for (var key in options) {
      if (options.hasOwnProperty(key)) {
        _default[key] = options[key];
      }
    }
    // document.cookie = _default.name + "=" + escape(_default.value) + ";expires=" + _default.expires.toGMTString() + ";path=" + _default.path + ";domain=" + _default.domain;
    document.cookie = _default.name + "=" + escape(_default.value) + ";expires=" + _default.expires.toGMTString() + ";path=" + _default.path;

  },

  //->获取
  getValue: function (name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) {
      return unescape(arr[2]);
    }
    return null;

  },

  //->删除
  removeValue: function (options) {
    var _default = {
      name: null,
      path: '/'
    };
    for (var key in options) {
      if (options.hasOwnProperty(key)) {
        _default[key] = options[key];
      }

    }
    if (methods.getValue(_default.name)) {
      // document.cookie = _default.name + "= ;path=" + _default.path + ";domain=" + _default.domain + ";expires=Fri,02-Jan-1970 00:00:00 GMT";
      document.cookie = _default.name + "= ;path=" + _default.path + ";expires=Fri,02-Jan-1970 00:00:00 GMT";

    }

  },
  //清除所有cookie
  clearAllCookie() {
    var _default = {
      name: null,
      path: '/',
    };
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if(keys) {
      for(var i =0;i < keys.length; i++){
        if(keys[i]=='username' || keys[i]=='mobile'){
          continue;
        }
        if(this.getValue('isremember')=='true'){
          if(keys[i] == 'password'){
            continue;
          }
        }else{

        }
        this.removeValue({name:keys[i]});
      }
      // document.cookie = keys[i] + "= ;domain="+_default.domain + ";path=" + _default.path+";expires=Fri,02-Jan-1970 00:00:00 GMT;"
    }
  },
   //  电话号码中间*号
  toTel(str) {
       let start = str.slice(0, 3);
       let end = str.slice(-4);
       return `${start}******${end}`;
     },
     //银行卡
  tobank(str) {
       let start = str.slice(0, 4);
       let end = str.slice(-3);
       return `**********${end}`;
     },
     // 隐藏名字
  tousername(str) {
       if (str.length < 3) {
         let end = str.slice(-1);
         return `*${end}`;
       } else if (str.length == 3) {
         let end = str.slice(-1);
         return `**${end}`;
       } else {
         let end = str.slice(-2);
         return `**${end}`;
       }
     },
     //支付宝
  tozhifubao(str) {
       if (str.indexOf("@") >= 0) {
         let end = str.slice(-11);
         return `*****${end}`;
       } else {
         let start = str.slice(0, 3);
         let end = str.slice(-4);
         return `${start}******${end}`;
       }

     },

  //获取当前时间，格式YYYY-MM-DD
  getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
  },
  //获取一个月前时间，格式YYYY-MM-DD
  getMonthFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth();
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (month == 0) {
      year = year - 1;
      month = 12;
    }

    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
  },
  //获取一周前时间，格式YYYY-MM-DD
  getsunFormatDate() {
    return this.getDay(-6)
  },
  //获取三天前时间，格式YYYY-MM-DD
  getshrFormatDate() {
    return this.getDay(-2)
  },
  //获取昨天时间，格式YYYY-MM-DD
  getYesToDate() {
    return this.getDay(-1)
  },
  getDay(day){
    var today = new Date();

    var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;

    today.setTime(targetday_milliseconds); //注意，这行是关键代码

    var tYear = today.getFullYear();
    var tMonth = today.getMonth();
    var tDate = today.getDate();
    tMonth = this.doHandleMonth(tMonth + 1);
    tDate = this.doHandleMonth(tDate);
    return tYear + "-" + tMonth + "-" + tDate;
  },
  doHandleMonth(month) {
    var m = month;
    if ( month.toString().length == 1 ) {
      m = "0" + month;
    }
    return m;
  },
  /**
   *判断数组含有某个元素
   */
  contains(arr, obj) {
    let i = arr.length;
    while (i--) {
      if (arr[i] === obj) {
        return true;
      }
    }
    return false;
  },
  //找出两个数组相同的元素
  filterData(a, b) { //循环判断数组a里的元素在b里面有没有，有的话就放入新建立的数组中
    var result = new Array();
    var c = b.toString();
    for (var i = 0; i < a.length; i++) {
      if (c.indexOf(a[i].toString()) > -1) {
        for (var j = 0; j < b.length; j++) {
          if (a[i] == b[j]) {
            result.push(a[i]);
            break;
          }
        }
      }
    }
    return result;
  },
  /*
   * 对象排序 a-z
   *
   */
  objKeySort(obj) { //排序的函数
    let newkey = Object.keys(obj).sort();
    //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
    let newObj = {}; //创建一个新的对象，用于存放排好序的键值对
    for (let i = 0; i < newkey.length; i++) { //遍历newkey数组
      newObj[newkey[i]] = obj[newkey[i]]; //向新创建的对象中按照排好的顺序依次增加键值对
    }
    return newObj; //返回排好序的新对象
  },
  /**
   * 跳转url
   */
  goURL(url) {
    this.$router.push({
      path: url
    });
  },
  /**
   * 异地登录退出
   * @param res
   */
  remoteLogin(res){
    this.$message.error(res.msg);
    if(res.operateCode==100){
      this.clearAllCookie();
      this.$store.commit('clearAll')
      this.$router.push({path:'/login'})
    }
  },
  /**
   * 退出登录
   */
  logOut(){
    this.clearAllCookie();
    this.$store.commit('clearAll');
    this.$router.push({path:'/index/index'});
    this.$message.success('退出登录成功！');
  },
  /**
   * 登录成功设置和请求
   * @param res
   */
  loginSuccess(data,isremember){
    let expiresTime = new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 30));
    if(isremember == true){
      this.setValue({
        name: "password",
        value: data.password,
        expires: expiresTime
      });
    }
    this.setValue({
      name: "username",
      value: data.userName,
      expires: expiresTime
    });
    this.setValue({
      name: "isremember",
      value: isremember,
      expires: expiresTime
    });
    this.setValue({
      name: "userId",
      value: data.userId,
      expires: expiresTime
    });
    this.setValue({
      name: "token",
      value: data.token,
      expires: expiresTime
    });

    this.$store.commit('set_loginsucc', data);

    this.$router.push({path:'/index/index'});
  },
  /**
   * 获取最近游戏的订单
   * @param options 查询参数
   */
  getOrderGame(options,fn){
    if(!this.$store.getters.token || !this.$store.getters.userId){if(fn)fn([]);return;};
    var params = {userId: this.$store.getters.userId, token: this.$store.getters.token,startDate:'',endDate:''};
    if(Object.prototype.toString.call(options) == "[object Object]"){//判断传入参数类型
      for(var i in options) { //根据传入的参数，修改默认参数值
        params[i] = options[i];
      }
    }else{
      if(options){params.gameType = options;}
    }
    this.$api.gameOrderList(params).then(res=>{

      if(res.result){
        if(fn)fn(res.data.items)
      }else{
        this.remoteLogin(res);
      }
    });
  },
  /*
   * md5 加密
   * str 加密字符串
   * */
  getmd5(str) {
    let md5 = crypto.createHash("md5");
    md5.update(str);
    let a = md5.digest("hex");
    return a; //47bce5c74f589f4867dbd57e9ca9f808
  },

  /*
   * 组装参数
   *
   * */
  MergeObj(o, n, override) {
    for (var p in n) {
      if (n.hasOwnProperty(p) && (!o.hasOwnProperty(p) || override)) {
        o[p] = unescape(n[p]);
      }
    }
  },
  getParam(iOptions) {
    let cParams = {
      "versionCode": "1510",
      "deviceInfo": "Redmi+Note+4X",
      "appId": appId,
      "requestId": this.getrandom(),
    }
    this.MergeObj(cParams, iOptions, false);
    return cParams;
  },

  /*
   * 获取随机数32位
   * */
  getrandom() {
    let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let nums = "";
    for (let i = 0; i < 32; i++) {
      let id = parseInt(Math.random() * 61);
      nums += chars[id];
    }
    return nums;
  },
  /*
 * 时间转换器
 *
 * */
  formatDuring(mss) {

    let hh = parseInt(mss / 60 / 60 ); //计算剩余的小时数
    let mm = parseInt(mss / 60 % 60); //计算剩余的分钟数
    let ss = parseInt(mss % 60); //计算剩余的秒数

    if (hh > 0) {
      return methods.checkTime(hh) + ":" + methods.checkTime(mm) + ":" + methods.checkTime(ss);
    } else {
      return methods.checkTime(mm) + ":" + methods.checkTime(ss);
    }

  },

  format_params(data) {
    var sign = '';
    //获取用户id
    data.userId = this.getValue("userId") == null ? "" : this.getValue("userId");
    //获取token
    data.token = this.getValue("token") == null ? "" : this.getValue("token");

    //获取其他参数
    data = this.getParam(data);

    //参数排序
    data = this.objKeySort(data);

    if (typeof data == 'object') {
      var str = '';
      //拼接字符串
      for (var key in data) {
        if (data[key] != "") {
          str += key + '=' + data[key] + '&';
        }
      }
      //md5加密
      if (str !== '') {
        str = str + "appKey="+appkey;
        //md5加密 获取验签
        sign = this.getmd5(str);
      }
      data.sign = sign;
    }
    return data;
  },
  //将0-9的数字前面加上0，例1变为01
  checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  },

  //单式
  util_unique(v, reg, digit, itemsort, baohao) {
    if (digit == undefined || digit == null) {
      digit = 1;
    }

    var sszz = new Array();
    var titems = {};
    var titem;
    while ((titem = reg.exec(v)) != null) {
      var key = titem[0];
      if (itemsort) {
        if (digit == 1) {
          key = key.match(/./g).sort().join('');
        } else if (digit == 2) {
          key = key.match(/.{2}/g).sort().join(' ');
        } else {
          key = key.match(/./g).sort().join('');
        }
      } else {
        if (digit == 2) {
          key = key.match(/.{2}/g).join(' ');
        }
      }
      if (!titems[key]) {
        if (baohao) {
          // 去除豹子号如222，用户前三 任选三混合组选 前二
          if (!(key.charAt(0) == key.charAt(1) && key.charAt(0) == key.charAt(2) && key.charAt(1) == key.charAt(2))) {
            titems[key] = 1;
            sszz.push(key);
          }
        } else {
          titems[key] = 1;
          sszz.push(key);
        }
      }
    }
    return sszz;
  },

  //提示
  messges(){
  let vm = this;
  vm.$message({
     message: '不能选择相同的号码',
       type: 'warning'
    });
  },
  //登录
  goLogin() {
    this.$router.push('/login');
  },
  //对象转数组
  objForArr(object){
    var arr = []
    for (var key in object) {
      arr.push(object[key]); //属性
    }
    return arr;
  },
  /**
   * 验证手机号格式
   * @param phone
   * @returns {boolean}
   */
  check_tel(phone){
    let telreg=/^[1][3,4,5,7,8][0-9]{9}$/;
    if(!telreg.test(phone)){
      return false;
    }else{
      return true;
    }
  },
  /**
   * 验证密码格式
   * @param password
   * @returns {boolean}
   */
  check_pwd(password){
    var pwd = /^[0-9A-Za-z]{6,20}$/;
    if(!pwd.test(password)){
      return false;
    }else{
      return true;
    }
  },
  /**
   * 判断是否为空
   * @param Content
   * @returns {boolean}
   */
  checkAllNull(Content){
    let reg=/^[\s]+$/;
    if (reg.test(Content)) {
      return false;
    }else{
      return true;
    }
  },
  /**
   * 判断是否为有空格
   * @param Content
   * @returns {boolean}
   */
  checkNull(Content){
    let reg=/[\s]+/;
    if (reg.test(Content)) {
      return false;
    }else{
      return true;
    }
  },
  /**
   * 更新个人信息
   * @param fn 回调
   */
  getUserInfo(fn){
    this.$api.userCenterIndex({userId:this.$store.getters.userId,token:this.$store.getters.token}).then(res => {
      if(res.result){
        if(fn)fn(res.data);
      }else{
        this.remoteLogin(res);
      }
    })
  },
  //清除下注选中号码
  clearNumber(data){
    let vm = this;
    if(vm.$store.getters.isAddOrder){
      for(var key in data){
        data[key].number = [];
        vm.$emit('responseData',vm.responseData.count_zs=0);  //调用父组件的自定义事件，并传值
      }
      vm.$store.commit('set_isAddOrder', false);
    }
  }
}

export default methods;
