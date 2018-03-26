<template>
    <div v-loading="fullscreenLoading" class="message-container p15auto clearfix">
      <div class="message-left bz">
        <div class="search-box">
          <div>
            <input class="bdr bz" @keyup="leftsearch" type="text" placeholder="搜索" v-model="searchvalue">
            <span @click="leftsearch" class="search"></span>
          </div>
          <span @click="showaddbox" class="messageadd bz bdr"><i class="el-icon-plus"></i></span>
        </div>
        <div class="useritem-box">
          <ul class="useritem">
            <li v-show="leftarr.length>0" v-for="(item,index) in leftarr" @click="leftmessage(item,true)" :class="[{nuread:item.isNew==1},{active:talk_userobj.talkUserId==item.talkUserId}]">
              <div class="left-msg-t">
                <span class="fwb" v-text="formatLeftUserName(item,9)"></span>
                <i v-show="item.userType==1" class="isdaili isdailiup"></i>
                <span class="msg-time"> {{item.updateDate | formatafter_value(5)}}</span></div>
              <span class="left-msg" v-text="formatusername(item.message,18)"></span>
            </li>
          </ul>
        </div>
      </div>
      <div class="message-right">
        <div class="msg-r-content-box">
          <p class="this_uname bz"><span>{{talk_userobj.talkUserName}}</span><span v-show="talk_userobj.nickName" v-text="'('+talk_userobj.nickName+')'"></span><i v-show="talk_userobj.userType == 1" class="isdaili"></i></p>
          <div class="msg-r-content">
            <ul class="bz">
              <li v-for="item in messagearr" v-show="item.message">
                <p class="tac"><span class="msg-r-time" v-text="item.sendDate"></span></p>
                <p class="clearfix"><span v-bind:class="[item.sendUserId==userId ? 'fr' : 'fl', 'bd']" v-text="item.message"></span></p>
              </li>
            </ul>
          </div>
        </div>
        <div class="msg-send">
          <textarea class="textarea" name="" v-model="msgContent" @keyup.enter="message_send"></textarea>
          <button @click="message_send" class="xxzx-send" :class="{ishasmessage:msgContent.length>0}">发送</button>
        </div>
      </div>
      <div v-show="adduserbox" class="windowBox">
        <div class="adduserbox">
          <div class="add_u_left bz">
            <div>
              <input @keyup.enter="add_search" class="bdr bz" type="text" placeholder="搜索" v-model="add_searchuser">
              <span @click="add_search" class="search"></span>
            </div>
            <ul class="add_ul add_u_l_ul">
              <li @click="add_user(index,item)" v-for="(item,index) in add_user_arr">
                <span v-text="formatusername(item.userName,15,item.nickName)"></span>
                <span v-show="item.userType == 1" class="truedaili">代理</span>
                <span class="fr check" :class="{active:item.ischeck==1}"></span>
              </li>
            </ul>
          </div>
          <div class="add_u_right">
            <div @click="add_u_close" class="add_u_close"><span>+</span></div>
            <p class="add_u_r_top">已选</p>
            <ul class="add_ul add_u_r_ul">
              <li v-for="(item,index) in add_user_arr" v-show="item.ischeck == 1">
                <span v-text="formatusername(item.userName,15,item.nickName)">416461411(牛大发)</span>
                <span v-show="item.userType == 1" class="truedaili">代理</span>
                <span @click="del_add_user(index,item)" class="fr del"></span>
              </li>
            </ul>
            <div class="lubtn_group">
              <input @click="add_u_success" type="button" class="success" value="确定">
              <input @click="add_u_close" type="button" class="error" value="取消">
            </div>
          </div>
        </div>
      </div>

      <!-- 添加聊天box -->
      <el-dialog
        :title="'与 '+dialogTitle+' 聊天'"
        center
        :visible.sync="dialogVisible"
        width="500px"
        top="20vh"
        :before-close="handleCloseAddUser"
        @open="notPlaceholder">
        <div class="telcode">
          <p class="input1">
            <span class="info">内容：</span>
            <input maxlength="1000" v-model="addmsgContent" class="bz" placeholder="请输入聊天内容" type="text">
          </p>
          <div class="ctx_three_btn">
            <button class="btn reset" @click="handleCloseAddUser">取消</button>
            <button class="btn" type="button" @click="addUserSendMsg">发送</button>
          </div>
        </div>
      </el-dialog>
      <!--加载动画-->
      <div class="loading">
        <loading :show="loading.show" :text="loading.text"></loading>
      </div>
    </div>
</template>

<script>
  import utils from '@/common/js/utils';
  export default {
    data () {
      return {
        msg: '消息中心！',
        searchvalue:'',
        msgContent:'',
        addmsgContent:'',
        talkTimer:'',
        userId:this.$store.getters.userId,
        username:this.$store.getters.username,
        talk_userobj:{talkUserName:'',userType:'',talkUserId:'',nickName:''},
        adduserbox:false,
        dialogVisible:false,
        add_searchuser:'',
        addUserInfo:{},
        leftarr:[],
        messagearr:[],
        add_user_arr:[],
        loading:{
          show:false,
          text:'加载中...'
        },
        fullscreenLoading:true
      }
    },
    mounted(){
      /*
       *placeholder兼容ie9以下
       */

      if(!this.placeholderSupport()){   // 判断浏览器是否支持 placeholder
        $(document).ready(function(){
          //默认遍历循环添加placeholder
          $('.search-box [placeholder]').each(function(){
            $(this).parent().prepend("<span class='placeholder' style='position: absolute;left:20px;top:14px;z-index:99;color:#898b8e'>"+$(this).attr('placeholder')+"</span>");
          })
          $('.add_u_left [placeholder]').each(function(){
            $(this).parent().prepend("<span class='placeholder' style='position: absolute;left:25px;top:22px;z-index:99;color:#898b8e;font-weight:normal;'>"+$(this).attr('placeholder')+"</span>");
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
      this.gettalkList(this.leftmessage,0);
      if(this.talkTimer)clearInterval(this.talkTimer);
      this.talkTimer = setInterval(()=>{
        this.gettalkList();
        this.leftmessage(this.talk_userobj);
      },60000)
    },
    computed:{
      dialogTitle(){
        if(this.addUserInfo.nickName){
          return this.addUserInfo.userName+'('+this.addUserInfo.nickName+')';
        }else{
          return this.addUserInfo.userName;
        }
      }
    },

    methods:{
      handleCloseAddUser(done) {
        if(typeof done == 'function'){
          done();
        }
        this.dialogVisible =false;
        this.addmsgContent = '';
      },
      contains(arr,id){
        var i = arr.length;
        while (i--) {
          if (arr[i].id === id) {
            return true;
          }
        }
        return false;
      },
      placeholderSupport() {
        return 'placeholder' in document.createElement('input');
      },
      formatLeftUserName(item,num){
        let nickName = '';
        if(this.userId == item.sendUserId){
          nickName = item.reciverNickName
        }else{
          nickName = item.nickName;
        }
        let formetUser = this.formatusername(item.talkUserName,num,nickName)
        return formetUser;
      },
      formatusername(name,num,name1){
        if(!name)return;
        if(name1){
          if(name.length+name1.length>num){
            var length = name1.length >= 2 ? 2 : name1.length;
            if(name.length>=6){
                name = name.slice(0,6)+'..';
            }
            name =name +'('+ name1.slice(0,length)+'..)';
          }else{
              name = name +'('+ name1+')';
          }
          return name;
        }else{
          if(name.length>num){
            name = name.slice(0,num-1)+'..';
          }
          return name;
        }
      },
      leftmessage(item,type){
        //点击左侧li切换用户
        this.talk_userobj.talkUserName = item.talkUserName;
        this.talk_userobj.userType = item.userType;
        this.talk_userobj.talkUserId = item.talkUserId;
        if(this.userId == item.sendUserId){
          this.talk_userobj.nickName = item.reciverNickName
        }else{
          this.talk_userobj.nickName = item.nickName;
        }

        this.fullscreenLoading = true;
        this.$api.talkDetail({userId:this.$store.getters.userId,token:this.$store.getters.token,talkUserId:this.talk_userobj.talkUserId,talkUserName:this.talk_userobj.talkUserName}).then(res=>{
          this.fullscreenLoading = false;
          if(res.result){
            this.messagearr = res.data.items.reverse();
            this.$api.labelMsgRead({userId:this.$store.getters.userId,token:this.$store.getters.token,userIds:this.userId+','+this.talk_userobj.talkUserId}).then(res=>{
              if(res.result){
                if(type){
                  for (let i = 0; i <  this.leftarr.length; i++) {
                    if(this.leftarr[i].talkUserId == this.talk_userobj.talkUserId){
                      this.leftarr[i].isNew = 0;
                    }
                  }
                  this.$store.commit('updateMsgCount');
                }
                if(!$('.msg-r-content')[0]){clearInterval(this.talkTimer);return;};
                this.$nextTick(()=>{
                    let scrollHeight = $('.msg-r-content')[0].scrollHeight;
                    if(scrollHeight-0<=0){
                      scrollHeight = 0;
                    }
                  $('.msg-r-content').scrollTop(scrollHeight);
                })
              }else{
                this.remoteLogin(res);
              }
            })
          }else{
            this.remoteLogin(res);
          }
        });
//        this.$el.querySelector('.textarea').focus();
      },
      leftsearch(){
          //搜索左边用户
        if(!this.searchvalue){
          return;
        };
        let newArr = [];
        this.leftarr.forEach((item,index)=>{
          if(item.talkUserName.indexOf(this.searchvalue) > -1 || item.nickName.indexOf(this.searchvalue) > -1){
            newArr.push(item);
            this.leftarr.splice(index,1);
          }
        })
        this.leftarr = newArr.concat(this.leftarr)
      },
      showaddbox(){
          //添加用户按钮
        this.loading.text='获取中...';
        this.loading.show=true;
        this.$api.searchUserName({userId:this.$store.getters.userId,token:this.$store.getters.token,talkUserName:''}).then(res=>{
          if(res.result){
            this.adduserbox = true;
            for (let i = 0; i <  res.data.length; i++) {
              res.data[i].ischeck = 0;
            }
            this.add_user_arr = res.data;
          }else{
            this.remoteLogin(res);
          }
          this.loading.show=false;
        });
      },
      add_search(){
          //添加聊天搜索用户按钮(弹出框)
        if(!this.add_searchuser){
          return;
        };
        let newArr = [];
        this.add_user_arr.forEach((item,index)=>{
          if(item.userName.indexOf(this.add_searchuser) > -1 || item.nickName.indexOf(this.add_searchuser) > -1){
            newArr.push(item);
            this.add_user_arr.splice(index,1);
          }
        })

        this.add_user_arr = newArr.concat(this.add_user_arr)
      },
      add_user(index,item){
        this.addUserInfo =item;
        this.add_user_arr.forEach((item,index)=>{
          item.ischeck = 0;
        })
        this.add_user_arr[index].ischeck = this.add_user_arr[index].ischeck==1 ? 0 : 1;
      },
      del_add_user(index,item){
        this.add_user_arr[index].ischeck = 0;
        this.addUserInfo = {};
      },
      add_u_success(){
        //添加用户聊天确定按钮 弹出聊天box
        if(!this.addUserInfo.ischeck){this.$message.error('请选择一个用户！');return;}
        this.add_u_close();
        this.dialogVisible = true;
      },
      addUserSendMsg(){
        if(this.addmsgContent.length<=0){
          this.$message.warning('聊天内容不能为空！');
          return;
        }

        if(!this.checkAllNull(this.addmsgContent)){
          this.$message.warning('聊天内容不能为空！');
          return;
        }

        if(this.addmsgContent.length>=1000){
          this.$message.warning('聊天内容不能超过1000个字！');
          return;
        }
        this.loading.text='发送中...';
        this.loading.show=true;
        this.$api.sendMsg({
          userId: this.$store.getters.userId,
          token: this.$store.getters.token,
          talkUserId: this.addUserInfo.userId,
          msgContent: this.addmsgContent
        }).then(res => {
          if(res.result){
            this.loading.show=false;
            this.gettalkList(this.leftmessage);
            this.dialogVisible = false;
            this.addmsgContent = '';
          }else{
            this.remoteLogin(res);
          }
        })
      },
      add_u_close(){
        this.add_user_arr.forEach(function (item) {
          item.ischeck = 0;
        })
        this.adduserbox = false;
      },
      message_send(){
         if(this.msgContent.length<=0){
          this.$message.warning('聊天内容不能为空！');
          return;
        }

        if(!this.checkAllNull(this.msgContent)){
          this.$message.warning('聊天内容不能为空！');
          return;
        }

        if(this.msgContent.length>=1000){
          this.$message.warning('聊天内容不能超过1000个字！');
          return;
        }
        this.loading.text='发送中...';
        this.loading.show=true;
        this.$api.sendMsg({
          userId: this.$store.getters.userId,
          token: this.$store.getters.token,
          talkUserId: this.talk_userobj.talkUserId,
          msgContent: this.msgContent
        }).then(res => {
          if(res.result){
            var a = {
              id: '',
              message: this.msgContent,
              receiveUserId: this.talk_userobj.talkUserId,
              receiveUserName: this.talk_userobj.talkUserName,
              sendDate: utils.formatDate(new Date()),
              sendUserId: this.$store.getters.userId,
              sendUserName: this.$store.getters.username
            }
            this.messagearr.push(a);
            this.msgContent = '';
            this.loading.show=false;
            this.$nextTick(()=>{
              let scrollHeight = $('.msg-r-content')[0].scrollHeight;
              if(scrollHeight-0<=0){
                scrollHeight = 0;
              }
             $('.msg-r-content').scrollTop(scrollHeight);
           })
          }else{
            this.remoteLogin(res);
          }
        })
      },
      gettalkList(callback){
        this.$api.talkList({userId:this.$store.getters.userId,token:this.$store.getters.token}).then(res=>{
          if(res.result){
            this.leftarr = res.data.items;
            if(res.data.items.length<=0){this.fullscreenLoading = false;return;}
            if(callback) {
              callback(res.data.items[0],0);
//              this.loading.show = false;
              this.fullscreenLoading = false;
              if(this.$store.getters.userInfo.messageCount && this.$store.getters.userInfo.messageCount>0){
                this.$store.commit('updateMsgCount');
              }
            }
          }else{
            this.remoteLogin(res);
          }
        });
      },
      placeholderSupport() {
        return 'placeholder' in document.createElement('input');
      },
      notPlaceholder(){
        if (!this.placeholderSupport() ) {   // 判断浏览器是否支持 placeholder
          $(function () {
            //默认遍历循环添加placeholder
            $('.selectp [placeholder]').each(function(){
              if(!$(this).val() && $(this).parent().find('.placeholder').length <= 0) {
                $(this).parent().prepend("<span class='placeholder' style='position: absolute;left: 10px;top:8px;color:#898b8e;'>" + $(this).attr('placeholder') + "</span>");
              }
            })

            $('.input1 [placeholder]').each(function () {
              if(!$(this).val() && $(this).parent().find('.placeholder').length <= 0){
                $(this).parent().prepend("<span class='placeholder' style='position: absolute;left: 74px;top:10px;color:#898b8e'>" + $(this).attr('placeholder') + "</span>");
              }
            })
            $('.placeholder').on('click', function () {
              $(this).hide();
              $(this).parent().find('input').focus();
            })
            $('[placeholder]').focus(function () {
              $(this).parent().find('span.placeholder').hide();
            })

            $('.input1 [placeholder]').blur(function () {
              if ( $(this).val() != "" ) {  //如果当前值不为空，隐藏placeholder
                $(this).parent().find('span.placeholder').hide();
              } else {
                $(this).parent().find('span.placeholder').show();
              }
            })
          });
        }
      },
    },
    destroyed(){
      clearInterval(this.talkTimer);
    }
  }
</script>
<style lang="scss" scoped>
  .windowBox{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.1);
  }
  .p15auto{
    padding:0 15px 15px 15px;
  }
  .message-container{
    position: relative;
    width: 100%;
    margin-bottom: 20px;
    height: 650px;

  .telcode{
    p{
      position: relative;
      width:423px;
      margin-bottom: 15px;

    input{
      width: 378px;
      height: 42px;
      padding-left: 10px;
      border: 1px solid #eeeeee;
      -webkit-border-radius: 3px;
      -moz-border-radius: 3px;
      border-radius: 3px;
    }
  }


  .info{
    display: inline-block;
    height: 31px;
    line-height: 31px;
    width: 40px;
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
  /*公共的按钮样式*/
  .ctx_three_btn{
    margin-top: 25px;
  .reset{
    background-color: #fff;
    color:#43484a;
    margin-left: 90px;
    border: 1px solid #eeeeee;
  &:hover{
     background-color: #f9f9f9;
   }
  }
  }

  }



    .message-left{
      position: relative;
      float: left;
      width: 240px;
      background-color: #f6f6f6;
      min-height: 650px;

      .useritem-box{
        padding-top: 50px;
        height: 600px;
        ul{
          height: 600px;
          overflow: auto;
        }

        li{
          position: relative;
          cursor: pointer;
          padding-left: 10px;
          height: 68px;
          background-color: #f5f6f6;
          &:hover{
              background-color: #eeefef;
          }
          &.active{
              background-color: #e1e4e4;
           }
         &.nuread::after{
            position: absolute;
            right: 8px;
            top: 33px;
            content: '';
            width: 6px;
            height: 6px;
            background-color: red;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            border-radius: 50%;
          }
          .left-msg-t{
            height: 40px;
            line-height: 40px;
            .isdailiup{
              position: relative;
              top: 2px;
              left: 2px;
            }
            .msg-time{
              float: right;
              padding-right: 5px;
              color:#898b8e;
              text-align: right;
              font-size: 12px;
            }
          }
          .left-msg{
            color:#898b8e;
            font-size: 12px;
          }
        }
      }

      .search-box{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 50px;
        background-color: #f6f6f6;

        input{
          position: absolute;
          padding-left: 8px;
          top: 12px;
          left: 10px;
          font-size: 12px;
          color:#898b8e;
          background-color: #fff;
          width: 185px;
          height: 25px;
          &:focus{
             border: 1px solid #1a95f2;
           }
        }

        .search{
          position: absolute;
          cursor: pointer;
          right: 48px;
          top: 19px;
          background: url('~assets/img/user/search.png') no-repeat;
          width: 15px;
          height: 15px;
        }
        .bdr{
          border: 1px solid #eeeeee;
          -webkit-border-radius: 2px;
          -moz-border-radius: 2px;
          border-radius: 2px;
        }
        .messageadd{
          position: absolute;
          right: 12px;
          width: 25px;
          height: 25px;
          font-size: 12px;
          padding-top: 3px;
          text-align: center;
          color:#898b8e;
          cursor: pointer;
          background-color: #fff;
          top: 12px;
        }
      }
    }
    .message-right{
      float: left;
      width: 930px;
      height: 650px;
      .msg-r-content-box{
        width: 100%;
        height: 510px;
        border-bottom: 1px solid #eeeeee;
        .msg-r-content{
          width: 100%;
          height: 470px;
          overflow: auto;
        }

        .this_uname{
          width: 100%;
          padding-left: 20px;
          background-color: #f9f9f9;
          line-height: 40px;
          font-size: 14px;
          text-align: left;
          height: 40px;
          i{
            position: relative;
            top: 2px;
            left: 2px;
          }
        }
        ul{
          padding-top: 5px;
          padding-right:15px;
          padding-left: 25px;

          li{
            font-size: 12px;
            margin-bottom: 15px;
            display: block;
            width: 100%;
            .tac{  text-align: center;}
            p{
              height: auto;
            }
            span{
              -webkit-border-radius: 5px;
              -moz-border-radius: 5px;
              border-radius: 5px;
              display: inline-block;

              &.msg-r-time{
                 padding:2px 5px;
                 color:#ffffff;
                 margin-bottom: 5px;
                 background-color: #dddddd;

              }
              &.bd{
               position: relative;
               padding:5px 10px;
               max-width: 60%;
               text-align: left;
               line-height: 25px;
               border: 1px solid #dddddd;
               box-shadow: 0px 1px 5px 0px rgba(198,205,211,0.5);
               word-wrap:break-word;
              }
              &.fl::after{
                content: "";
                display: block;
                position: absolute;
                top: 13px;
                transform: rotate(45deg) skew(0,5deg);
                left: -5px;
                width: 7px;
                height: 7px;
                border: 1px solid #ddd;
                border-right: 1px solid transparent;
                border-top: 1px solid transparent;
                background-color: #fff;
              }
              &.fr::after{
               content: "";
               display: block;
               position: absolute;
               top: 13px;
               transform: rotate(45deg) skew(0,5deg);
               right: -5px;
               width: 7px;
               height: 7px;
               border: 1px solid #ddd;
               border-left: 1px solid transparent;
               border-bottom: 1px solid transparent;
               background-color: #fff;
               }
            }
          }
        }
      }
      .msg-send{
        position: relative;
        top: 2px;
        width: 100%;
        height:140px;
        .xxzx-send{
          position: absolute;
          bottom: 5px;
          right: 50px;
          padding: 0px 22px;
          height: 30px;
          line-height: 28px;
          background-color: #fff;
          outline:none;
          cursor: pointer;
          border: 1px solid #eeeeee;
          -webkit-border-radius: 2px;
          -moz-border-radius: 2px;
          border-radius: 2px;
          &.ishasmessage{
             background-color: #1a95f2;
             color:#ffffff;
           }
          &:hover{
             background-color: #1aa1ff;
             color:#ffffff;
           }
        }
        textarea{
          padding-top: 8px;
          padding-left: 10px;
          border:0;
          width: 920px;
          background-color:transparent;
          scrollbar-arrow-color:yellow;
          scrollbar-base-color:lightsalmon;
          overflow-x: hidden;
          overflow-y: auto;
          line-height: 20px;
          font-size: 14px;
          color: #898b8e;
          font-weight: 500;
          resize:none;
          height: 100px;
          outline:none;
        }
      }
    }

    .adduserbox{
      position: absolute;
      top: 150px;
      left: 50%;
      height: 483px;
      width: 545px;
      font-size: 14px;
      font-weight: bold;
      color:#43484a;
      box-shadow: 0px 0px 10px 0px rgba(198,205,211,0.5);
      transform: translate(-50%,0);
      background-color: #fff;

      .add_u_left{
        position: relative;
        float: left;
        width: 272px;
        height: 483px;
        /*padding: 20px 15px 40px 15px;*/
        border-right: 1px solid rgba(198,205,211,0.3);

        .search{
          position: absolute;
          cursor: pointer;
          right: 20px;
          top: 27px;

          background: url('~assets/img/user/search.png') no-repeat;
          width: 15px;
          height: 15px;
        }
        .bdr{
          height: 25px;
          width: 240px;
          margin-top: 20px;
          margin-left: 15px;
          padding-left: 10px;
          font-weight: normal;
          border: 1px solid #eeeeee;
          -webkit-border-radius: 2px;
          -moz-border-radius: 2px;
          border-radius: 2px;
          &:focus{
             border: 1px solid #1a95f2;
           }
        }
        .add_u_l_ul{
          height: 400px;
          li{
            cursor: pointer;
            &:hover{
               background-color: #eeeeee;
             }
             i{
               position: relative;
               left: 10px;
               width: 27px;
               height: 12px;
               margin: 0;
             }
            .check{
              display: inline-block;
              position: relative;
              top: 10px;
              width: 19px;
              height: 19px;
              background: url('~assets/img/user/check.png') no-repeat;
              &.active{
                 background: url('~assets/img/user/check1.png') no-repeat;
               }
            }
          }
        }

      }

    .add_ul{
      margin-top: 20px;
      width: 100%;
      overflow: auto;
      li{
        height: 40px;
        padding-left: 20px;
        padding-right: 20px;
        line-height: 40px;

        .truedaili{
          display: inline-block;
          position: relative;
          left: -10px;
          width: 54px;
          height: 26px;
          line-height: 24px;
          text-align: center;
          background-color: #1a95f2;
          color: #eeeeee;
          font-size: 18px;
          transform:scale(0.5);
          -ms-transform:scale(0.5); 	/* IE 9 */
          -moz-transform:scale(0.5); 	/* Firefox */
          -webkit-transform:scale(0.5); /* Safari 和 Chrome */
          -o-transform:scale(0.5);
          -webkit-border-radius: 5px;
          -moz-border-radius: 5px;
          border-radius: 5px;
        }
      }
    }
      .add_u_right{
        float: left;
        position: relative;
        width: 272px;
        height: 483px;
        .add_u_close{
          position: absolute;
          right: 0;
          top: 0;
          width: 24px;
          height: 24px;
          line-height: 24px;
          font-size: 18px;
          cursor: pointer;
          text-align: center;
          &:hover{
             background-color: #1a95f2;
             color: #fff;
           }
          span{
            display: inline-block;
            -webkit-transform:rotate(45deg);
            -moz-transform:rotate(45deg);
            -ms-transform:rotate(45deg);
            -o-transform:rotate(45deg);
            transform:rotate(45deg);
          }
        }
        .add_u_r_top{
          margin-top: 30px;
          margin-left: 20px;
          height: 25px;
          line-height: 25px;
          color:#898b8e;
          font-weight: normal;
        }
        .add_u_r_ul{
          height: 360px;
          .del{
            display: inline-block;
            position: relative;
            top: 12px;
            width: 16px;
            cursor: pointer;
            height: 16px;
            background: url('~assets/img/user/del.png') no-repeat;
          }

        }
        .lubtn_group{
          margin-top: 10px;
          input{
            float: right;
            margin-right: 20px;
            line-height: 28px;
            cursor: pointer;
            width: 75px;
            background-color: #fff;
            border: 1px solid #eeeeee;
            text-align: center;
            &.success{
              background-color: #1a95f2;
              color:#ffffff;
              &:hover{
                 background: #1aa1ff;
               }
            }
            &.error:hover{
               background: #efefef;
             }
          }
        }
      }
    }
  }
  ::-ms-clear,::-ms-reveal{display:none;}
</style>
