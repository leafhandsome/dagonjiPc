/*
* 过虑器
* */
function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}

var filters={
  formatDate:(date, fmt)=>{
    date = date ? new Date(date) : new Date();
    fmt = fmt ? fmt : 'yyyy-MM-dd hh:mm:ss';
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + ''
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
      }
    }
    return fmt;
  },
  //返回num后的字符串
  formatafter_value:(date,fmt)=>{
    if(typeof date == "string"){
      return date.slice(fmt);
    }else{
      throw '请传入string';
    }
  }
}
export default filters;
