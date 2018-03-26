<template>
  <div>
    <div class="dgj-container-fluid bgc">
      <div class="login-header">
        <a href="javascript:;" @click="$router.push({path:'/index/index'})"><img class="logo" src="~assets/img/index/logo.png" alt=""></a>
        <span class="welcome">欢迎您的登录</span>
      </div>
    </div>
    <div class="dgj-container-fluid login-content" v-bind:style="{background:'url('+adurl+')'}">
      <transition name="bounceleft">
        <div v-show="isleftfontshow" class="left-font"></div>
      </transition>
      <div class="dgj-container por">
        <div class="login-right">
          <ul class="login_top clearfix">
            <li :class="{active:logintype=='username'}" class="icon_right" @click="logintype='username'"><a href="javascript:;">账户密码登录</a></li>
            <li :class="{active:logintype=='telphone'}" @click="logintype='telphone'"><a href="javascript:;">手机验证码登录</a></li>
          </ul>
          <div class="form-content" v-show="logintype=='username'">
            <form action="#">
              <p class="username"><input type="text" name="username" maxlength="20" v-model="userinfo.username" placeholder="请输入账号/已绑定手机号"></p>
              <p class="password"><input type="password" maxlength="20" name="password" v-model="userinfo.password" placeholder="请输入密码" @keyup.enter="login">
              </p>
              <p class="login-remember-group">
                <span @click="remember" id="login_checkbox" class="remember" :class="{ischeck:userinfo.isremember}"></span>
                <input class="login-hidden" id="remember" type="checkbox" name="remember">
                <span @click="remember" id="isremember" class="isremember user-no-select bz">记住密码</span>
                <a class="wj-right bz" href="javascript:;" @click="$router.push('/public/getloginpwd')">忘记密码？</a>
              </p>
              <p class="loginbox"><button class="logining" type="button" @click="login">登录</button></p>
            </form>
          </div>
          <div class="form-content" v-show="logintype=='telphone'">
            <form action="#">
              <p class="telphone"><input type="text" maxlength="11" name="telphone" v-model="userinfo.telphone" placeholder="请输入已绑定手机号"></p>
              <p class="code">
                <input type="text" name="code" maxlength="6" v-model="userinfo.code" placeholder="请输入验证码"  @keyup.enter="login">
                <a @click="getcode" v-show="iscode_clk" href="javascript:;" class="getcode">获取验证码</a>
                <a v-show="!iscode_clk" :class="{nucode:!iscode_clk}" href="javascript:;" class="getcode">{{countnew}}s秒后重新获取</a>
                <!--<a class='getcode' :class="{nucode:!iscode_clk}" @click="getcode" href="javascript:;">获取验证码</a>-->
              </p>
              <p class="loginbox login_two"><button class="logining" type="button" @click="login">登录</button></p>
            </form>
          </div>
          <div class="goregister">
            <span>还没账号？<a href="javascript:;" @click="$router.push({path:'/register'})">快捷注册</a></span>
          </div>
        </div>
      </div>
    </div>
    <div class="dgj-container-fluid bgc11">
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
        msg: 'login页！',
        isleftfontshow:false,
        iscode_clk:true,
        countnew:'',
        userinfo:{
          username:'',
          password:'',
          telphone:'',
          code:'',
          isremember:false,
        },
        logintype:'username',
        adurl:require('assets/img/other/login.jpg'),
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
          $('.login-right [placeholder]').each(function(){
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
      this.isleftfontshow = true;
      this.userinfo.username = this.getValue('username');
      this.userinfo.password = this.getValue('password');
      this.userinfo.telphone = this.getValue('mobile');
    },
    methods:{
      getcode(){
        if(this.check_tel()){
          this.loading.text='加载中...';
          this.loading.show=true;
            this.$api.getLoginSmsCode({mobile:this.userinfo.telphone}).then(res=>{
              this.loading.show=false;
              if(res.result){
                this.$message({
                  message: '获取验证码成功',
                  type:'success'
                });
                //获取验证码
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
                this.$message.error(res.msg);
              }
            })
        }
      },
      remember(){
        this.userinfo.isremember = !this.userinfo.isremember;
        if(this.userinfo.isremember){
          this.$message.warning('公共场合下请不要勾选记住密码！');
        }
      },
      login(){

        if ( this.logintype == 'username' ) {
          if ( this.userinfo.username == '' || this.userinfo.password == '' ) {
            this.$message.error('请输入账号或密码');
            return;
          }
          let reg = /^[0-9A-Za-z]{1,20}$/;
          if(!reg.test(this.userinfo.username)){
            this.$message.error('请输入20位以内的数字/字母的用户名');
            return;
          }
          if(!reg.test(this.userinfo.password)){
            this.$message.error('请输入20位以内的数字/字母的密码');
            return;
          }

          this.loading.text='登录中...';
          this.loading.show=true;
          this.$api.Login({userName: this.userinfo.username, password: this.userinfo.password}).then((res) => {
            if ( res.result ) {
              this.loginSuccess(res.data,this.userinfo.isremember);
            } else {
              this.$message.error(res.msg);
            }
            this.loading.show=false;
          })
        } else {
          //短信验证码登录
          if( this.check_tel() ) {
            //验证通过成功
            this.loading.text='登录中...';
            this.loading.show=true;
            this.$api.mobileLogin({mobile: this.userinfo.telphone,smsCode:this.userinfo.code}).then((res) => {
              if(res.result){
                this.loginSuccess(res.data);
                this.setValue({
                  name: "mobile",
                  value: this.userinfo.telphone,
                });
              }else{
                this.$message.error(res.msg);
//                this.$message.error('登录失败，请重新登录');
              }
              this.loading.show=false;
            })


          }
        }

      },
      check_tel(){
        let telreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if(!telreg.test(this.userinfo.telphone)){
          this.$message.error('请输入正确的手机号码！');
          return false;
        }else{
          return true;
        }
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
  .login-content{
    margin-top: 50px;
    height: 930px;
    background-color: #2d3740;
    .left-font{
      position: absolute;
      top: 300px;
      left: 0px;
      width: 695px;
      height: 251px;
      background: url('~assets/img/other/left-font.png') no-repeat;
/*      -webkit-animation: bounceInLeft 1s 0.2s;
      animation: bounceInLeft 1s 0.2s;*/

    }
    .por{
      position: relative;

      &>div{
          position: absolute;
          width: 430px;
          height: 370px;
          right: 50px;
        }
      .login-right{
        top: 180px;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        background-color: #fff;

        .login_top{
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
              color:#43484a;
              font-weight: bold;
              padding: 0 18px;
            }
          }
        }

        .form-content{
          padding-top: 33px;
          width: 100%;
          form{
            width: 310px;
            margin: 0 auto;
          }

          .placeholder{
            position: absolute;
            top: 10px;
            left: 0;
          }
          /*background-color: #bfd7e9;*/
          p{
            width: 100%;
            position: relative;
            margin-bottom: 17px;
            text-align: center;

            /*登录按钮*/
            &.loginbox{
               margin-top: 33px;
             }
           &.login_two.loginbox{
              margin-top: 40px;
            }
            /*验证码登录begin*/
            &.code{
             position: relative;
              .nucode{
                cursor: not-allowed;
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


            &.login-remember-group{
               width: 310px;
               margin: 0 auto;
               margin-bottom: 20px;
               text-align: left;
              .login-hidden{
                display: none;
              }
              .isremember{
                display: inline-block;
                font-size: 12px;
                color:#bbbbbb;
                height: 20px;
                padding-left: 5px;
                line-height: 20px;
                cursor: pointer;
              }
              .remember{
                position: relative;
                display: inline-block;
                cursor: pointer;
                top: 4px;
                width: 22px;
                height: 22px;
                background: url('~assets/img/index/check_n.png') no-repeat;
                &.ischeck{
                   background: url('~assets/img/index/check_y.png') no-repeat;
                 }
              }
              .wj-right{
                float: right;
                height: 27px;
                padding-top: 10px;
                color:#1a95f2;
                font-size: 12px;
              }

             }
            input{
              padding-left: 12px;
              height: 40px;
              width: 310px;
              outline: none;
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
            .logining{
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
      .goregister{
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


  .bgc11{
    background-color: #110f12;
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
  @-webkit-keyframes bounceInLeft{
    0%,60%,75%,90%,100%{-webkit-transition-timing-function:cubic-bezier(0.215,.610,.355,1.000);transition-timing-function:cubic-bezier(0.215,.610,.355,1.000)}
    0%{opacity:0;-webkit-transform:translate3d(-3000px,0,0);transform:translate3d(-3000px,0,0)}
    60%{opacity:1;-webkit-transform:translate3d(25px,0,0);transform:translate3d(25px,0,0)}
    75%{-webkit-transform:translate3d(-10px,0,0);transform:translate3d(-10px,0,0)}
    90%{-webkit-transform:translate3d(5px,0,0);transform:translate3d(5px,0,0)}
    100%{-webkit-transform:none;transform:none}
  }
  @keyframes bounceInLeft{
    0%,60%,75%,90%,100%{-webkit-transition-timing-function:cubic-bezier(0.215,.610,.355,1.000);transition-timing-function:cubic-bezier(0.215,.610,.355,1.000)}
    0%{opacity:0;-webkit-transform:translate3d(-3000px,0,0);transform:translate3d(-3000px,0,0)}
    60%{opacity:1;-webkit-transform:translate3d(25px,0,0);transform:translate3d(25px,0,0)}
    75%{-webkit-transform:translate3d(-10px,0,0);transform:translate3d(-10px,0,0)}
    90%{-webkit-transform:translate3d(5px,0,0);transform:translate3d(5px,0,0)}
    100%{-webkit-transform:none;transform:none}
  }
  .bounceleft-enter-active {
    animation: bounceInLeft .8s;
  }
  .bounceleft-leave-active {
    animation: bounceInLeft .8s reverse;
  }
</style>
