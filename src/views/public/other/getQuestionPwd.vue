<template>
    <div class="pt60">
      <div class="index-getpwd dgj-container bgcfff clearfix">
        <div class="getpwd-top bz">
          <ul class="clearfix">
            <li @click="goback_active(0)" :class="{active:active>=0,iscursor:active==1}">
              <span class="icon"></span>
              <em class="num">1</em>
              <span class="tip-info">填写账户名</span>
            </li>
            <li @click="goback_active(1)" :class="{active:active>=1,iscursor:active==2}">
              <span class="icon"></span>
              <span class="num">2</span>
              <span class="tip-info">选择找回方式</span>
            </li>
            <li :class="{active:active>=2}">
              <span class="icon"></span>
              <span class="num">3</span>
              <span class="tip-info">验证身份</span>
            </li>
            <li :class="{active:active>=3}">
              <span class="icon"></span>
              <span class="num">4</span>
              <span class="tip-info">重置密保</span>
            </li>
            <li :class="{active:active>=4}">
              <span class="sucicon"></span>
              <span class="tip-info">完成</span>
            </li>
          </ul>
        </div>
        <div class="getpwd-content">
          <div v-show="active==0" class="ctx_one">
            <form action="#">
              <p class="input">
                <span class="info">账号：</span>
                <input type="text" v-model="user.username" placeholder="请输入账户/已绑定手机号" v-if="!islogin">
                <input type="text" v-model="user.username" placeholder="请输入账户/已绑定手机号" v-else disabled>
              </p>
              <p class="input">
                <span class="info">验证码：</span>
                <input class="code" type="text" v-model="user.code" placeholder="请输入验证码">
                <!--<img class="ml20" :src="codeurl" alt="">-->
                <i class="codebox ml20" id="imgcode"></i>
                <a href="javascript:;" @click="updateCode" class="updatecode">看不清楚？换一张</a>
              </p>
              <p>
                <button @click="checkUser" class="btn" type="button">下一步</button>
              </p>
            </form>
          </div>
          <div v-if="active==1" class="ctx_two">
            <p>
              <button @click="pwdResetType(1)" class="two_btn">通过手机短信验证码找回密保</button>
            </p>
            <p>
              <button @click="pwdResetType(2)" class="two_btn">通过登录密码找回密保</button>
            </p>
            <p>
              <button @click="pwdResetType(3)" class="two_btn">通过资金密码找回密保</button>
            </p>
            <p @click="goService">
              <button class="two_btn">没有您想要的找回方式？</button>
              <a class="call_server" href="javascript:;">联系客服</a>
            </p>
          </div>
          <div v-if="active==2" class="ctx_three">
            <!--手机找回-->
           <div class="telcode" v-show="codetype==1">
             <form action="##">
               <p class="input">
                 <span class="info">手机号：</span>
                 <input v-model="telobj.mobile" class="bz" placeholder="请输入已绑定手机号" type="text" disabled>
               </p>
               <p class="input">
                 <span class="info">验证码：</span>
                 <input v-model="telobj.code" class="bz" placeholder="请输入验证码" type="text">
                 <span @click="get_tel_code" v-show="ismsgcode_clk" class="getcode">获取验证码</span>
                 <span v-show="!ismsgcode_clk" :class="{success:!ismsgcode_clk}" class="getcode">{{countnew}}s秒后重新获取</span>
               </p>
               <div class="ctx_three_btn">
                 <button @click="code_tel_msg" class="btn" type="button">提交</button>
                 <!--<button class="btn reset" type="reset">重置</button>-->
               </div>
             </form>
           </div>
            <!--登录密码找回-->
           <div class="zijinpwd" v-show="codetype==2">
              <form action="##">
                <p class="input">
                  <span class="info">登录密码：</span>
                  <input v-model="loginPwd" class="bz" placeholder="请输入您的登录密码" type="password">
                </p>
                <div class="ctx_three_btn">
                  <button @click="code_LoginPwd" class="btn" type="button">提交</button>
                </div>
              </form>
            </div>
            <!--资金密码找回-->
           <div class="zijinpwd" v-show="codetype==3">
             <form action="##">
               <p class="input">
                 <span class="info">资金密码：</span>
                 <input v-model="accountPwd" class="bz" placeholder="请输入您的资金密码" type="password">
               </p>
               <div class="ctx_three_btn">
                 <button @click="code_accountPwd" class="btn" type="button">提交</button>
               </div>
             </form>
           </div>
          </div>
          <div v-if="active==3" class="ctx_four">
            <form action="##">
              <div class="question" v-for="(questionitem,index) in userquestion">
                <p class="selectp">
                  <span class="info" v-text="questionitem.tips+'：'">问题一：</span>
                  <el-select v-model="questionitem.question" placeholder="请选择" disabled>
                  </el-select>
                </p>
                <p class="input">
                  <span class="info">答案：</span>
                  <input v-model="questionitem.value" class="bz" placeholder="请输入问题的答案" type="text">
                </p>
              </div>
              <div class="ctx_three_btn">
                <button @click="reSetPwdQuestion" class="btn" type="button">提交</button>
                <!--<button class="btn reset" @click="reset" type="button">重置</button>-->
              </div>
            </form>
          </div>
          <div v-if="active==4" class="ctx_five">
            <img class="success" src="~assets/img/other/success.png" alt="">
            <p>修改成功，请点击<a href="javascript:;" @click="$router.push('/user')">回到个人中心</a></p>
          </div>
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
    data () {
      return {
        msg: '忘记密保！',
        CodeObj:{},
        type:0,
        active:0, //步骤
        codetype:1,//步骤2的选择步骤 1短信找回 2密保找回 3资金/登录密码找回
        accountPwd:'',
        loginPwd:'',
        countnew:'',
        ismsgcode_clk:true,
        user: {
          username: '',
          mobile:'',
          code: ''
        },
        hasBind:'',
        telobj:{mobile:'',code:''},//步骤3短信找回
        userquestion:[{tips:'问题一',question:'',value:'',placeholder:'请输入问题的答案'},{tips:'问题二',question:'',value:'',placeholder:'请输入问题的答案'},{tips:'问题三',question:'',value:'',placeholder:'请输入问题的答案'}],
        loading:{
          show:false,
          text:'加载中...'
        },
        noLoginhasBind:'',
      }
    },
    mounted(){
      /*
       *placeholder兼容ie9以下
      */
      this.Noplaceholder();
      this.CodeObj = new this.getGVerify('imgcode');
      if(this.islogin){
        this.loading.text='加载中...';
        this.loading.show=true;
        this.user.username = this.getValue('username');
        this.$api.setUpAll({userId: this.$store.getters.userId,
          token: this.$store.getters.token}).then(res=>{
            if(res.result) {
              this.hasBind = res.data;
            }else{
              this.remoteLogin(res);
            }
            this.active = 1;
            this.loading.show=false;
        })
      }
    },
    methods: {
      //步骤1
      checkUser(){
          if(!this.user.username){this.$message.warning('请输入账户/已绑定手机号！');return;}
          if(!this.user.code){this.$message.warning('请输入验证码！');return;}
          if(this.codeValidate()){
            this.loading.text='验证中...';
            this.loading.show=true;
            this.$api.validateUserNameExist({userName:this.user.username}).then(res=>{
              if(res.result){
                this.$message.success('验证账号成功！');
                this.noLoginhasBind = res.data;
                if(this.noLoginhasBind.bindPhoneStatus){
                  this.telobj.mobile = this.noLoginhasBind.mobile;
                }
                this.nextcheck();
              }else {
                this.remoteLogin(res);
              }
              this.loading.show=false;
            })
          }else{
              this.$message.warning('验证码不正确！')
          }
      },
      goback_active(num){
        if(num==0)this.updateCode();
        if(this.active-1==num){
            this.active--;
        }else{
            return;
        }
      },
      reset(){},
      goService(){
        location.href = this.$store.getters.serviceUrl;
      },
      nextcheck(){
        this.active++;
        this.Noplaceholder();
      },
      //步骤2选择
      pwdResetType(num){
        switch(num){
          case 1:
            if(this.islogin){
                //已登录 手机找回
              if(!this.hasBind.hasBindPhone){
                this.$message.warning('对不起，该账号没有绑定手机号，请去个人中心绑定！');
                return;
              }else{
                this.telobj.mobile = this.hasBind.mobile;
                this.codetype = num;
                this.nextcheck();
              }
            }
            break;
          case 2:
            if(this.islogin){
              //已登录。登录密码找回
              this.codetype = num;
              this.nextcheck();
            }
            break;
          case 3:
            if(this.islogin){
              //已登录 自己密码找回
              if(!this.hasBind.hasCreateAccountPwd){
                this.$message.warning('对不起，该账号没有设置过资金密码，请去个人中心设置！')
                return;
              }else{
                this.codetype = num;
                this.nextcheck();
              }
            }
            break;
          default:
            this.$message.warning('请选择正确的找回密码步骤！');
        }
      },
      //发送验证码
      get_tel_code(){
        //发送手机验证码
        if(!this.check_tel(this.telobj.mobile)){this.$message.error('请输入正确的手机号码！');return;}
          //找回登录密码
        this.loading.text='加载中...';
        this.loading.show=true;
        this.$api.getFindPwdSmsCode({mobile:this.telobj.mobile}).then(res=>{
            if(res.result){
              this.ismsgcode_clk = false;
              //获取验证码
              this.$message.success('短信验证码发送成功!');
              //获取验证码成功
              if (!this.timernew) {
                this.countnew = TIME_COUNT;
                this.ismsgcode_clk = false;
                this.timernew = setInterval(() => {
                  if (this.countnew > 0 && this.countnew <= TIME_COUNT) {
                    this.countnew--;
                  } else {
                    this.ismsgcode_clk = true;
                    clearInterval(this.timernew);
                    this.timernew = null;
                  }
                }, 1000);
              }
            }else{
              this.$message.error(res.msg);
            }
            this.loading.show=false;
          })
      },
      //验证短信验证码
      code_tel_msg(){
        //验证已绑定手机短信找回登录/资金密码
        if(!this.check_tel(this.telobj.mobile)){this.$message.error('请输入正确的手机号码！');return;};
        if(this.telobj.code.length<=0){this.$message.error('请输入短信验证码！');return;};
        this.loading.text='验证中...';
        this.loading.show=true;
        this.$api.validFindPwdSmsCode({mobile:this.telobj.mobile,smsCode:this.telobj.code}).then(res=>{
          if(res.result){
            this.$message.success('短信验证成功!');
            this.getPasswordQuestions();
          }else{
            this.$message.error(res.msg);
          }
          this.loading.show=false;
          });
      },
      //登录密码验证
      code_LoginPwd(){
        //登录密码找回密保
        if(!this.islogin){this.$message.error('你没有登录，请登录后再操作！');return;}
        if(this.loginPwd.length<=0){this.$message.error('请输入登录密码！');return;}
        if(!this.check_pwd(this.loginPwd)){this.$message.error('请输入6-20位的数字/字母的登录密码！');return;}

        this.loading.text='验证中...';
        this.loading.show=true;
        this.$api.checkLoginPwd({password:this.loginPwd,userId:this.$store.getters.userId,token:this.$store.getters.token}).then(res=>{
          if(res.result){
            this.$message.success('登录密码验证成功!');
            this.loginPwd = '';
            this.getPasswordQuestions();
          }else{
            this.remoteLogin(res);
          }
          this.loading.show=false;
        })
      },
      //资金密码验证
      code_accountPwd(){
        //资金密码找回密保
        if(!this.islogin){this.$message.error('你没有登录，请登录后再操作！');return;}
        if(this.accountPwd.length<=0){this.$message.error('请输入资金密码！');return;}
        if(!this.check_pwd(this.accountPwd)){this.$message.error('请输入6-20位的数字/字母的资金密码！');return;}

        this.loading.text='验证中...';
        this.loading.show=true;
          this.$api.validFindPwdAccountPwd({userName:this.user.username,accountPwd:this.accountPwd}).then(res=>{
            if(res.result){
              this.$message.success('资金密码验证成功!');
              this.accountPwd = '';
              this.getPasswordQuestions();
            }else{
              this.remoteLogin(res);
            }
            this.loading.show=false;
          })

      },
      //获取设置密保列表
      getPasswordQuestions(){
        if(!this.islogin)return
        this.loading.text='加载中...';
        this.loading.show=true;
        this.$api.getPasswordQuestions({userId:this.$store.getters.userId,token:this.$store.getters.token}).then(res=>{
          if(res.result){
            let index = 0;
            for ( var key in res.data) {
              this.userquestion[index].question = res.data[key];
              index++;
            }
            this.nextcheck();
          }else{
            this.remoteLogin(res);
          }
          this.loading.show=false;
        })
      },
      //重置密保
      reSetPwdQuestion(){
        let isnext = true;
        for (let i = 0; i <  this.userquestion.length; i++) {
          if(!this.userquestion[i].value){
            this.$message.error(this.userquestion[i].tips+'不能为空！');
            isnext = false;
            break;
          }
          if(!this.checkNull(this.userquestion[i].value)){
            this.$message.warning(this.userquestion[i].tips+'不能有空格！');
            isnext = false;
            break;
          }
        }
        if(isnext){
          let params = {
            userId:this.$store.getters.userId,
            token:this.$store.getters.token,
            question1:this.userquestion[0].question,
            question2:this.userquestion[1].question,
            question3:this.userquestion[2].question,
            answer1:this.userquestion[0].value,
            answer2:this.userquestion[1].value,
            answer3:this.userquestion[2].value,
          }
          this.loading.text='重置中...';
          this.loading.show=true;
          this.$api.savePasswordQuestion(params).then(res=>{
            if ( res.result ) {
              this.$message.success('设置密保成功');
              this.userquestion[0].value = '';
              this.userquestion[1].value = '';
              this.userquestion[2].value = '';
              this.nextcheck();
            } else {
              this.remoteLogin(res);
            }
            this.loading.show=false;
          })
        }

      },
      //兼容
      placeholderSupport() {
        return 'placeholder' in document.createElement('input');
      },
      Noplaceholder(){
        if(!this.placeholderSupport()){   // 判断浏览器是否支持 placeholder
          $(function(){
            //默认遍历循环添加placeholder
            $('.input [placeholder]').each(function(){
              if(!$(this).val() && $(this).parent().find('.placeholder').length <= 0) {
                $(this).parent().prepend("<span class='placeholder' style='position: absolute;left: 74px;top:10px;color:#898b8e'>" + $(this).attr('placeholder') + "</span>");
              }
            })
            $('.placeholder').on('click',function () {
              $(this).hide();
              $(this).parent().find('input').focus();
            })
            $('[placeholder]').focus(function () {
              $(this).parent().find('span.placeholder').hide();
            })

            $('.input [placeholder]').blur(function(){
              if($(this).val()!=""){  //如果当前值不为空，隐藏placeholder
                $(this).parent().find('span.placeholder').hide();
              }else{
                $(this).parent().find('span.placeholder').show();
              }
            })
          });
        }
      },
      //验证码
      getGVerify(id){
        var vm = this;
        function GVerify(options) { //创建一个图形验证码对象，接收options对象为参数
          this.options = { //默认options参数值
            id: "", //容器Id
            canvasId: "verifyCanvas", //canvas的ID
            width: "100", //默认canvas宽度
            height: "30", //默认canvas高度
            type: "blend", //图形验证码默认类型blend:数字字母混合类型、number:纯数字、letter:纯字母
            number:4, //验证码个数
            code: ""
          }
          if(Object.prototype.toString.call(options) == "[object Object]"){//判断传入参数类型
            for(var i in options) { //根据传入的参数，修改默认参数值
              this.options[i] = options[i];
            }
          }else{
            this.options.id = options;
          }
          this.options.numArr = "0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9".split(",");
          this.options.letterArr = vm.getAllLetter();
          this._init();
          this.refresh();
        }
        GVerify.prototype = {
          /**版本号**/
          version: '1.0.0',

          /**初始化方法**/
          _init: function() {
            var con = document.getElementById(this.options.id);
            var canvas = document.createElement("canvas");
            /*this.options.width = con.offsetWidth > 0 ? con.offsetWidth : "100";
             this.options.height = con.offsetHeight > 0 ? con.offsetHeight : "30";*/
            canvas.id = this.options.canvasId;
            canvas.width = this.options.width;
            canvas.height = this.options.height;
            canvas.style.cursor = "pointer";
            canvas.innerHTML = "您的浏览器版本不支持canvas";
            con.appendChild(canvas);
            var parent = this;
            canvas.onclick = function(){
              parent.refresh();
            }
          },

          /**生成验证码**/
          refresh: function() {
            this.options.code = '';
            var canvas = document.getElementById(this.options.canvasId);
            if(canvas.getContext) {
              var ctx = canvas.getContext('2d');
            }
            ctx.textBaseline = "middle";

            ctx.fillStyle = vm.randomColor(240,241);
            ctx.fillRect(0, 0, this.options.width, this.options.height);

            if(this.options.type == "blend") { //判断验证码类型
              var txtArr = this.options.numArr.concat(this.options.letterArr);
            } else if(this.options.type == "number") {
              var txtArr = this.options.numArr;
            } else {
              var txtArr = this.options.letterArr;
            }

            for(var i = 1; i <= this.options.number; i++) {
              var txt = txtArr[vm.randomNum(0, txtArr.length)];
              this.options.code += txt;
              ctx.font = '35px SimHei';
              //ctx.font = randomNum(this.options.height/2, this.options.height) + 'px SimHei'; //随机生成字体大小
              ctx.fillStyle = vm.randomColor(100, 160); //随机生成字体颜色
              /* ctx.shadowOffsetX = randomNum(-3, 3);
               ctx.shadowOffsetY = randomNum(-3, 3);*/
              ctx.shadowBlur = vm.randomNum(-3, 3);
              ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
              var x = this.options.width / (this.options.number+1) * i - this.options.width / ((this.options.number+1)*2);
              var y = this.options.height / 2;
              var deg = vm.randomNum(-30, 30);
              /**设置旋转角度和坐标原点**/
              ctx.translate(x, y);
              ctx.rotate(deg * Math.PI / 180);
              ctx.fillText(txt, 0, 0);
              /**恢复旋转角度和坐标原点**/
              ctx.rotate(-deg * Math.PI / 180);
              ctx.translate(-x, -y);
            }
            /**绘制干扰线**/
            for(var i = 0; i < 4; i++) {
              ctx.strokeStyle = vm.randomColor(40, 180);
              ctx.beginPath();
              ctx.moveTo(vm.randomNum(0, this.options.width/2), vm.randomNum(0, this.options.height/2));
              ctx.lineTo(vm.randomNum(0, this.options.width/2), vm.randomNum(0, this.options.height));
              ctx.stroke();
            }
            /**绘制干扰点**/
            for(var i = 0; i < this.options.width/4; i++) {
              ctx.fillStyle = vm.randomColor(0, 255);
              ctx.beginPath();
              ctx.arc(vm.randomNum(0, this.options.width), vm.randomNum(0, this.options.height), 1, 0, 2 * Math.PI);
              ctx.fill();
            }
          },

          /**验证验证码**/
          validate: function(code){
            var verifyCode = code.toLowerCase();
            var v_code = this.options.code.toLowerCase();
            if(verifyCode == v_code){
              return true;
            }else{
              return false;
            }
          }
        }
        return new GVerify(id);
      },
      /**生成字母数组**/
      getAllLetter() {
        var letterStr = "a,b,c,d,e,f,g,h,i,j,k,m,n,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,U,V,W,X,Y,Z";
        return letterStr.split(",");
      },
      /**生成一个随机色**/
      randomColor(min, max){
        var r = this.randomNum(min, max);
        var g = this.randomNum(min, max);
        var b = this.randomNum(min, max);
        return "rgb(" + r + "," + g + "," + b + ")";
      },
      /**生成一个随机数**/
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      },
      updateCode(){
        this.CodeObj.refresh();
      },
      codeValidate(){
        if(this.CodeObj.validate(this.user.code)){
          return true;
        }else{
          this.updateCode();
          return false;
        }
      },

    },
    computed:{
      islogin(){
        return this.$store.getters.token;
      }
    }
  }
</script>
<style lang="scss" scoped>
  /*Chrome Firefox Opera Safari IE9+*/
  input:disabled{
    border: 1px solid #DDD;
    background-color: #F5F5F5;
    color:#ACA899;
  }
  /*IE8-*/
    input[disabled]{
      border: 1px solid #DDD;
      background-color: #F5F5F5;
      color:#ACA899;
    }
  /*IE6 Using Javascript to add CSS class "disabled"*/
  * html input.disabled{
    border: 1px solid #DDD;
    background-color: #F5F5F5;
    color:#ACA899;
  }
  .pt60{
    padding-top: 60px;
  }
  .bgcfff{
    background-color: #fff;
  }
  .index-getpwd{
    height: 700px;
    margin-top: 20px;
    .getpwd-top{
      height: 80px;
      padding-top: 25px;
      width: 100%;
      border-bottom: 1px solid #ebebeb;
      font-size: 14px;
      color:#909090;

      ul{
        width: 825px;
        margin: 0 auto;
      }
      li{
        /*margin: 0 10px;*/
        padding: 0 10px;
        height: 38px;
        width: 145px;
        float: left;
        text-align: left;
        .sucicon{
          float: left;
          width: 38px;
          height: 38px;
          margin-right: 12px;
          background: url('~assets/img/other/wwc.png') no-repeat;
        }
        .icon{
          float: left;
          width: 38px;
          height: 38px;
          background: url('~assets/img/other/wdd.png') no-repeat;
        }
        &.iscursor{
          cursor: pointer;
        }
        &.active{
          font-weight: bold;
          color:#43484a;

          .icon{
            background: url('~assets/img/other/dq.png') no-repeat;
          }
          .sucicon{
            background: url('~assets/img/other/wc.png') no-repeat;
          }
          &::after{
             content: '';
             display: block;
             position: relative;
             top: 15px;
             left: 0px;
             width: 165px;
             height: 2px;
             background-color: #1a95f2;
           }
        }
        .num{
          position: relative;
          color:#ffffff;
          height: 38px;
          line-height: 38px;
          left: -22px;
        }
        .tip-info{
          display: inline-block;
          position: relative;
          line-height: 38px;
          height: 38px;
        }
      }
    }
    .getpwd-content{
      .ctx_one{
        margin:80px 0 0 200px;
        width: 700px;
        height: 300px;


        p{
          position: relative;
          margin-bottom: 20px;
          width: 500px;

          input{
            width: 358px;
            height: 42px;
            padding-left: 10px;
            border: 1px solid #eeeeee;
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            border-radius: 3px;
            &.code{
               width: 150px;
             }
          }
          .codebox{
            display: inline-block;
            position: relative;
            top: 12px;
          }
          .updatecode{
            display: inline-block;
            height: 20px;
            line-height: 20px;
            margin-left: 10px;
            font-size: 12px;
            color:#1a95f2;
            border-bottom: 1px solid #1a95f2;
          }
        }
      }
      .ctx_two{
        margin: 0 auto;
        margin-top: 60px;
        width: 273px;
        p{
          position: relative;
          height: 31px;
          width: 100%;
          margin-bottom: 15px;
          &:hover .two_btn{
             border: 1px solid #1a95f2;
           }
          .two_btn{
            width: 273px;
            height: 31px;
            color:#909090;
            background-color: #fff;
            padding-left: 10px;
            font-size: 12px;
            border: 1px solid #eeeeee;
            text-align: left;
            outline: none;
            cursor: pointer;
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            border-radius: 3px;
            &::after{
               position: absolute;
               right: 4px;
               top: 0;
               line-height: 31px;
               color: #cccccc;
               font-size: 16px;
               font-weight: bold;
               transform: scaleX(0.5);
               content: '>';
             }
          }
          .call_server{
            position: absolute;
            right: 25px;
            top: 0;
            color:#1a95f2;
            font-size: 12px;
            padding-top: 5px;
            border-bottom: 1px solid #1a95f2;
            height: 20px;
            line-height: 20px;
          }
        }
      }
      .ctx_three{
        margin: 0 auto;
        margin-top: 40px;
        width: 423px;
        height: 500px;
        input{
          width: 358px;
          height: 42px;
          padding-left: 10px;
          border: 1px solid #eeeeee;
          -webkit-border-radius: 3px;
          -moz-border-radius: 3px;
          border-radius: 3px;
        }
        .question{
          margin-bottom: 35px;
          p{
            position: relative;
            width: 423px;
            margin-bottom: 15px;
            height: 42px;
            &.question{
              el-select{
                width: 373px;
              }
             }
          }
        }
        .telcode{
          p{
            position: relative;
            margin-bottom: 20px;
            .getcode{
              position: absolute;
              cursor: pointer;
              color:#1a95f2;
              font-size: 12px;
              top: 14px;
              right: 10px;
              &.success{
                cursor: not-allowed;
                color: #9c9c9c;
               }
            }
          }
        }
        .zijinpwd{
          p{
            position: relative;
          }
        }

      }

      .ctx_four{
        margin: 0 auto;
        margin-top: 40px;
        width: 423px;
        height: 500px;
      p{
        position: relative;
        margin-bottom: 20px;
      }

        input{
          width: 358px;
          height: 42px;
          padding-left: 10px;
          border: 1px solid #eeeeee;
          -webkit-border-radius: 3px;
          -moz-border-radius: 3px;
          border-radius: 3px;
        }
      }
      .ctx_five{
        margin: 0 auto;
        margin-top: 120px;
        width: 200px;
        height: 200px;
        text-align: center;
        .success{
          width: 109px;
          height: 109px;
        }
        p{
          font-size: 14px;
          color:#43484a;
          margin-top: 24px;
          a{
            color:#1a95f2;
            border-bottom: 1px solid #1a95f2;
          }
        }
      }

        /*公共的按钮样式*/
       .ctx_three_btn{
          margin-top: 35px;
          .reset{
            background-color: #fff;
            color:#43484a;
            margin-left: 160px;
            border: 1px solid #eeeeee;
            &:hover{
               background-color: #f9f9f9;
             }
          }
       }
      .info{
        display: inline-block;
        height: 31px;
        line-height: 31px;
        width: 60px;
        color:#43484a;
        font-size: 12px;
      }
      .btn{
        width: 96px;
        height: 31px;
        margin-left: 65px;
        color:#fff;
        background-color: #1a95f2;
        border: none;
        outline: none;
        cursor: pointer;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        &:hover{
         background-color: #1aa1ff;
       }
      }
    }
  }


</style>
