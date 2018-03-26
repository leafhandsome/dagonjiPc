<template>
  <div>
    <div class="dgj-container-fluid bgc">
      <div class="login-header">
        <a href="javascript:;" @click="$router.push({path:'/index/index'})"><img class="logo" src="~assets/img/index/logo.png" alt=""></a>
        <span class="welcome">欢迎您的加入</span>
      </div>
    </div>

    <div class="dgj-container-fluid register-content" v-bind:style="{background:'url('+adurl+')'}">
      <div class="dgj-container por">
        <div class="register-right">
          <ul class="register_top clearfix">
            <li :class="{active:regType=='username'}" class="icon_right" @click="regType='username'"><a href="javascript:;">账户密码注册</a></li>
            <li :class="{active:regType=='mobile'}" @click="regType='mobile'"><a href="javascript:;">手机验证码注册</a></li>
          </ul>
          <div class="form-content" v-show="regType=='username'">
            <form action="#">
              <p class="telphone"><input type="text" name="username" v-model="user.username" maxlength="20" v-on:blur="check_username(user.username)" placeholder="请输入用户名"></p>
              <p class="tel_pwd"><input type="password" maxlength="20" name="telphone" v-model="user.password" v-on:blur="check_regpwd(user.password,'请输入6-20位的数字/字母的密码！')" placeholder="请输入登录密码"></p>
              <p class="tel_pwd"><input type="password" maxlength="20" name="telphone" v-model="user.confirmPwd" v-on:blur="check_regpwd(user.confirmPwd,'请输入6-20位的数字/字母的密码！',true)"  @keyup.enter="userregister" placeholder="请再次输入登录密码"></p>
              <p class="registerbox"><button class="registering" type="button" @click="accountRegister">注册</button></p>
            </form>
          </div>
          <div class="form-content" v-show="regType=='mobile'">
            <form action="#">
              <p class="telphone"><input type="text" name="telphone" maxlength="11" v-model="userinfo.telphone" v-on:blur="check_regtel(userinfo.telphone,'请输入正确的手机号码！')" placeholder="请输入手机号"></p>
              <p class="tel_pwd"><input type="password" name="telphone" maxlength="20" v-model="userinfo.password" v-on:blur="check_regpwd(userinfo.password,'请输入6-20位的数字/字母的密码！')" placeholder="请输入登录密码"></p>
              <p class="code">
                <input type="text" name="code" v-model="userinfo.code" maxlength="6" placeholder="请输入验证码" @keyup.enter="register">
                <a @click="getcode" v-show="iscode_clk" href="javascript:;" class="getcode">获取验证码</a>
                <a v-show="!iscode_clk" :class="{nucode:!iscode_clk}" href="javascript:;" class="getcode">{{countnew}}s秒后重新获取</a>
              </p>
              <p class="registerbox"><button class="registering" type="button" @click="register">注册</button></p>
            </form>
          </div>
          <div class="gologin">
            <span>已有账号？<a href="javascript:;" @click="$router.push({path:'/login'})">立即登录</a></span>
          </div>
        </div>

      </div>
    </div>
    <div class="dgj-container-fluid bgc02">
      <div class="dgj-container index-bottom">
        <a href="##">
          <img src="~assets/img/index/hzsj.png" alt="">
        </a>
      </div>
    </div>
    <div class="dgj-container-fluid bgc0c">
      <div class="dgj-container index-footer">
        <p>获得First Cagayan Leisure和Resort Corporation线上博彩执照认证。获得国际博弈机构IGC、GLI及BMM Testlabs权威认证。</p>
      </div>
    </div>
    <!--加载动画-->
    <div class="loading">
      <loading :show="loading.show" :text="loading.text"></loading>
    </div>
  </div>
</template>

<script>
  const TIME_COUNT = 60;
  export default {
    name: 'hello',
    data () {
      return {
        msg: 'register页！',
        regType:'username',
        iscode_clk:true,
        isRegister:false,
        countnew:'',
        userinfo:{
          telphone:'',
          password:'',
          code:''
        },
        user:{
          username:'',
          password:'',
          confirmPwd:''
        },
        adurl:require('assets/img/other/register.jpg'),
        loading:{
          show:false,
          text:'加载中...'
        }
      }
    },
    mounted(){
      /*
       *placeholder兼容ie9以下
       */
      if(!this.placeholderSupport()){   // 判断浏览器是否支持 placeholder
        $(document).ready(function(){
          //默认遍历循环添加placeholder
          $('.register_top [placeholder]').each(function(){
            if(!$(this).val() && $(this).parent().find('.placeholder').length <= 0) {
              $(this).parent().prepend("<span class='placeholder' style='position: absolute;left: 10px;top:10px;color:#898b8e'>" + $(this).attr('placeholder') + "</span>");
            }
          })
          $('.placeholder').on('click',function () {
            $(this).hide();
            $(this).parent().find('input').focus();
          })
          $('[placeholder]').focus(function () {
            $(this).parent().find('span.placeholder').hide();
          })
          $('[placeholder]').blur(function(){
            if($(this).val()!=""){  //如果当前值不为空，隐藏placeholder
              $(this).parent().find('span.placeholder').hide();
            }
            else{
              $(this).parent().find('span.placeholder').show();
            }
          })
        });
      }
    },
    methods: {
      getcode(){
        if(!this.check_tel(this.userinfo.telphone)){this.$message.error('请输入正确的手机号码！');return;}
        if(this.check_pwd(this.userinfo.telphone)){
          this.loading.text = '获取中...';
          this.loading.show = true;
          this.$api.checkRegMobile({mobile:this.userinfo.telphone}).then(res=>{
            if(!res.result){
              this.$message.error('该手机号已被注册！');
              this.loading.show = false;
            }else{
              this.$api.getRegSmsCode({mobile:this.userinfo.telphone}).then(res=>{
                if(res.result){
                  this.iscode_clk = false;
                  //获取验证码
                  this.$message.success('短信验证码发送成功!');
                  //获取验证码成功
                  if (!this.timernew) {
                    this.countnew = TIME_COUNT;
                    this.iscode_clk = false;
                    this.timernew = setInterval(() => {
                      if (this.countnew > 0 && this.countnew <= TIME_COUNT) {
                        this.countnew--;
                      } else {
                        this.iscode_clk = true;
                        clearInterval(this.timernew);
                        this.timernew = null;
                      }
                    }, 1000)
                  }
                }else{
                  this.$message.error('短信发送失败，请稍后再试！');
                }
                this.loading.show = false;
              })
            }
          })
        }
      },
      register(){
        if(!this.check_tel(this.userinfo.telphone)){this.$message.error('请输入正确的手机号码！');return;}
        if(!this.check_pwd(this.userinfo.password)){this.$message.error('请输入6-20位的数字/字母的密码！');return;}

        //验证码验证
        if(this.check_tel(this.userinfo.telphone) && this.check_pwd(this.userinfo.password)){
            //注册成功
          this.loading.text = '注册中...';
          this.loading.show = true;
          this.$api.register({mobile:this.userinfo.telphone,msgCode:this.userinfo.code,password:this.userinfo.password}).then(res=>{
            if ( res.result ) {
              this.userinfo.password = '';
              this.loginSuccess(res.data);
            }else{
              this.$message.error(res.msg);
            }
            this.loading.show = false;
          })

        }else{
            //填写有误
        }
      },
      check_username(name){
        let tip = '请输入5-20位的数字/字母的用户名!';
        let reg = /^[0-9A-Za-z]{5,20}$/;
        if(!reg.test(name)){
          this.$message.warning(tip);
          return false;
        }else{
          //判断账号是否被注册
          this.$api.validateUserNameExist({userName:name}).then(res=>{
            if (res.result){
              this.$message.error('该用户名已被注册，请更换用户名！');
              this.isRegister = false;
            }else{
              if(res.operateCode == 0){
                this.isRegister = true;
              }
            }
          })
          return true;
        }
      },

      check_regpwd(name,tips,status){
        if(!this.check_pwd(name)){
          this.$message.warning(tips);
          return false;
        }
        if(status && this.user.password!=this.user.confirmPwd){
          this.$message.warning('请输入两次一致的登录密码！');
          return false;
        }
        return true;
      },
      check_regtel(name,tips){
        if(!this.check_pwd(name)){
          this.$message.warning(tips);
        }
      },
      accountRegister(){
        let tip = '请输入5-20位的数字/字母的用户名!';
        let reg = /^[0-9A-Za-z]{5,20}$/;
        if(!reg.test(this.user.username)){
          this.$message.warning(tip);
          return false;
        }

        if(!this.check_pwd(this.user.password)){this.$message.error('请输入6-20位的数字/字母的密码！');return false;}
        if(!this.check_pwd(this.user.confirmPwd)){this.$message.error('请再次输入6-20位的数字/字母的密码！');return false;}
        if(this.user.password!=this.user.confirmPwd){this.$message.warning('请输入两次一致的登录密码！');return false;}

        this.$api.validateUserNameExist({userName:this.user.username}).then(res=>{
          if (res.result){
            this.$message.error('该用户名已被注册，请更换用户名！');
            this.isRegister = false;
          }else{
            if(res.operateCode == 0){
              this.isRegister = true;
            }
          }
        }).then(()=>{
          if(this.isRegister){
            this.loading.text = '注册中...';
            this.loading.show = true;
            this.$api.registerByUserName({userName:this.user.username,password:this.user.password}).then(res=>{
              if ( res.result ) {
                this.user.username = '';
                this.user.password = '';
                this.user.confirmPwd = '';
                this.loginSuccess(res.data);
              }else{
                this.$message.error(res.msg);
              }
              this.loading.show = false;
            })
          }
        })

      },
      placeholderSupport() {
        return 'placeholder' in document.createElement('input');
      }
    }
  }
</script>
<style lang="scss" scoped>
  .bgc{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1001;
    background: rgba(13,18,22,1);
  }
  .login-header{
    width: 1400px;
    min-width: 1200px;
    height: 50px;
    margin: 0 auto;
  a{
    color:#ffffff;
    height: 50px;
    padding-right: 5px;
    line-height: 50px;
  .logo{
    display: inline-block;
    width: 101px;
    height: 36px;
  }
  }
  .welcome{
    display: inline-block;
    position: relative;
    top: 3px;
    padding-left: 10px;
    height: 50px;
    line-height: 50px;
    font-size: 12px;
    color: #ffffff;
  &::after{
     position: absolute;
     content: "|";
     top: -1px;
     left: 0;
   }
  }
  }
  .register-content{
    margin-top: 50px;
    height: 930px;
    background-color: #2d3740;

  .por{
    position: relative;

  &>div{
      position: absolute;
      width: 430px;
      height: 400px;
      right: 50px;
    }
  .register-right{
    top: 180px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    background-color: #fff;

  .register_top{
    border-bottom: 1px solid #eeeeee;
    width:100%;
    li{
      position: relative;
      float: left;
      width: 50%;
      text-align: center;
      padding-top: 20px;
      padding-bottom: 15px;
      height: 35px;
      line-height: 35px;
      &.icon_right::after{
         content: '';
         position: absolute;
         background-color: #eeeeee;
         width: 1px;
         height: 35px;
         right: 0;
         top: 20px;
       }
      &.active{
        a{
          position: relative;
          color:#1a95f2;
          font-weight: bold;
          &:after{
             content: '';
             position: absolute;
             background-color: #1a95f2;
             width: 100%;
             height: 2px;
             left: 0;
             bottom: -16px;
           }
        }
      }
      a{
        letter-spacing: 1px;
        font-size: 16px;
        font-weight: bold;
        color:#43484a;
        padding: 0 18px;
      }
    }
  }

  .form-content{
    padding-top: 33px;
    width: 100%;
    form{
      width: 100%;
    }

  p{
    width: 310px;
    margin: 0 auto;
    position: relative;
    margin-bottom: 17px;
    text-align: center;

  /*登录按钮*/
  &.registerbox{
     margin-top: 40px;
   }
  /*验证码登录begin*/
  &.code{
     position: relative;
    .nucode{
      color:#898b8e;
    }
    a{
      position: absolute;
      top: 12px;
      font-size: 12px;
      right: 10px;
      color:#1a95f2;
    }
  }
  /*end*/


  input{
    padding-left: 12px;
    height: 40px;
    width: 310px;
    color:#43484a;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    margin: 0 auto;
    border: 1px solid #eeeeee;
  &:focus{
     border: 1px solid #1a95f2;
   }
  }
  .registering{
    width: 310px;
    height: 40px;
    background-color: #1a95f2;
    font-size: 16px;
    letter-spacing: 5px;
    color:#ffffff;
    cursor: pointer;
    border: none;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    &:hover{
       background-color: #1aa1ff;
     }
  }
  }

  }

  }
  .gologin{
    margin-top: 20px;
    height: 15px;
    line-height: 15px;
    font-size: 12px;
    color:#898b8e;
    text-align: center;

  a{
    color:#898b8e;
    border-bottom: 1px solid #898b8e;
    &:hover{
       color:#1a95f2;
       border-bottom: 1px solid #1a95f2;
     }
  }
  }
  }

  }


  .bgc02{
    background-color: #020611;
  }
  .bgc0c{
    background-color: #0c1118;
  }
  .index-bottom{
    text-align: center;
    padding-top: 20px;
    height: 50px;

  }
  .index-footer{
  p{
    text-align: center;
    height: 32px;
    font-size: 12px;
    line-height: 32px;
    color:#6c6f74;
  }
  }
</style>
