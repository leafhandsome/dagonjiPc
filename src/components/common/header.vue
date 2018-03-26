<template>
  <div class="dgj-container-fluid">
    <div id="header" @mouseenter="headerenter" @mouseleave="headerleave" class="top-flex">
      <div class="header">
        <ul class="left-nav">
          <li><a @click="$router.push({path:'/index/index'})" class="dgj-logo" href="javascript:;"><img src="~assets/img/index/logo.png" alt=""></a></li>
          <li><router-link to="/index/index">首页</router-link></li>
          <li>
            <router-link to="/betpage/1/1">彩票中心<i class="el-icon-caret-bottom"></i></router-link>
            <div class="top-flex-50">
              <ul class="dgj-container game-items">
                <li @mouseenter="updatebgImg(item,true,$event)" @mouseleave="updatebgImg(item,false,$event)" class="game-item" v-for="(item,index) in gameitems" @click="gobetGame(item)">
                  <a href="javascript:;" class="bz">
                    <img class="game-img" :src="item.img" alt="">
                    <p class="game-title" v-html="item.name"></p>
                    <p v-html="item.content"></p>
                  </a>
                  <div class="left-top-tips">
                    <p><span class="back" v-text="item.backPrize*100"></span><span class="percent">%</span></p>
                    <p class="Tips" v-text="item.backPrizeTips"></p>
                  </div>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <router-link to="/index/tyzx">体育在线<i class="el-icon-caret-bottom"></i></router-link>
            <div class="top-flex-50">
              <ul class="dgj-container game-items">
                <li @mouseenter="updatebgImg(item,true,$event)" @mouseleave="updatebgImg(item,false,$event)" class="game-item" v-for="(item,index) in sportitems">
                  <a @click="gotoSportitems(item)" href="javascript:;">
                    <img class="game-img" :src="item.img" alt="">
                    <p class="game-title" v-html="item.name"></p>
                    <p v-html="item.content"></p>
                  </a>
                  <div class="left-top-tips">
                    <p><span class="back" v-text="item.backWater*1000"></span><span class="percent">‰</span></p>
                    <p class="Tips" v-text="item.backWaterTips"></p>
                  </div>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <router-link to="/index/zrylc">真人娱乐城<i class="el-icon-caret-bottom"></i></router-link>
            <div class="top-flex-50">
              <ul class="dgj-container game-items">
                <li @mouseenter="updatebgImg(item,true,$event)" @mouseleave="updatebgImg(item,false,$event)" class="game-item" v-for="(item,index) in entitems">
                  <a @click="gotoSportitems(item)" href="javascript:;">
                    <img class="game-img" :src="item.img" alt="">
                    <p class="game-title" v-html="item.name"></p>
                    <p v-html="item.content"></p>
                  </a>
                  <div class="left-top-tips">
                    <p><span class="back" v-text="item.backWater*1000"></span><span class="percent">‰</span></p>
                    <p class="Tips" v-text="item.backWaterTips"></p>
                  </div>
                </li>
              </ul>
            </div>
          </li>
          <li v-if="false"><router-link to="/index/dzylc">电子娱乐城<i class="el-icon-caret-bottom"></i></router-link></li>
          <li v-if="false"><router-link to="/index/yhzx">优惠中心</router-link></li>
        </ul>
        <ul class="right-nav">
          <li v-if="!islogin"><router-link class="right-icon" to="/login">登录</router-link></li>
          <li v-if="!islogin"><router-link to="/register">注册</router-link></li>
          <li v-if="islogin" @mouseenter.stop='usershow("user")' @mouseleave='userhidden("user")'>
            <router-link class="user-home" to="/user">您好，<span class="user" v-text="formatusername(username)">威震天</span>
              <i class="isdaili" v-show="userType"></i>
              <i class="el-icon-arrow-down"></i>
            </router-link>
            <span v-show="messageCount>0" @click.stop="$router.push({path:'/user/xxzx'})" class="messageCount">{{messageCount}}</span>
            <transition name="opac">
              <div v-show="is_show.isu_show" class='index-users'>
              <div class="index-user">
                <ul :class="{nohowTeam:!userType}" class="user-items clearfix">
                  <li><a href="javascript:;" @click="$router.push({path:'/user/grzx'})"><img src="~assets/img/index/hover/grzx.png" alt=""><p>个人中心</p></a></li>
                  <li><a href="javascript:;" @click="$router.push({path:'/user/bbzx'})"><img src="~assets/img/index/hover/bbzx.png" alt=""><p v-text="userlist[0].menuName"></p></a></li>
                  <li v-if="userType"><a href="javascript:;" @click="$router.push({path:'/user/dlzx'})"><img src="~assets/img/index/hover/dlzx.png" alt=""><p v-text="userlist[1].menuName"></p></a></li>
                  <li>
                    <a href="javascript:;" @click="$router.push({path:'/user/xxzx'})">
                      <img src="~assets/img/index/hover/xxzx.png" alt=""><p v-text="userlist[2].menuName"></p>
                      <i v-show="messageCount>0" class="dgj-msgtips"></i>
                    </a>
                  </li>
                </ul>
                <div v-show="isplayGamesNearest" class="user-lastgame">
                  <p>最近游戏</p>
                  <span v-show="userindex!=1" @click="usergamepage('left')" class="poa poa_left"><i class="el-icon-arrow-left"></i></span>
                  <div class="game-box">
                    <ul class="lastgame clearfix">
                      <li @click="gobetGame(item)" v-for="item in lastgames" v-html="item.name">重庆时时彩</li>
                    </ul>
                  </div>
                  <span v-show="userindex!=all_userindex" @click="usergamepage('right')" class="poa poa_right"><i class="el-icon-arrow-right"></i></span>
                </div>
                <p class="logout" @click="logout">退出登录</p>
              </div>
            </div>
            </transition>
          </li>
          <li class="hidden-md" v-if="islogin">余额：<span class='usermoney' v-text="safeMoney">0</span></li>
          <li class="hidden-md" v-if="islogin"><router-link class="right-icon" :to="{path:'/user/grzx',query: {activeName: 'first'}}">充值</router-link></li>
          <li class="hidden-md" v-if="islogin"><router-link :to="{path:'/user/grzx',query: {activeName: 'second'}}" >提现</router-link></li>
          <li class="hidden-md" v-if="false"><router-link class="right-icon" :to="{path:'/user/grzx',query: {activeName: 'third'}}">转账</router-link></li>
          <li class="hidden-xs" v-if="islogin"  @mouseenter.self.stop='usershow("lsjl")' @mouseleave='userhidden("lsjl")'>
            <router-link to="/user/bbzx/gameRecord">历史记录</router-link>
            <transition name="opac">
              <div class="user_history bz" v-show="is_show.islsjl_show">
                <historytable v-bind:cancel="false" v-bind:orderList="userorderList"></historytable>
                <p class="user_history_more"><a class="bz" @click="$router.push({path:'/user/bbzx/gameRecord'})" href="javascript:;">查看更多</a></p>
              </div>
            </transition>
          </li>
          <li v-show="!islogin" class="index-ewm hidden-sm" @mouseenter='usershow("ewm")' @mouseleave='userhidden("ewm")'>
            <a href="javascript:;">
              <span class="dgj-ewm"></span>
              <span>手机大公鸡</span>
              <transition name="opac">
                <ul class="top-index-ewm clearfix" v-show="is_show.isewm_show">
                  <li class="clearfix">
                    <!--<img src="~assets/img/index/hover/hover_ewm_h5.png" alt="">-->
                    <canvas ref="canvas1" id="qrcodeIOS" width="150" height="150"></canvas>
                    <p>扫一扫，下载苹果版大公鸡</p>
                  </li>
                  <li class="clearfix">
                    <canvas ref="canvas2" id="qrcodeAndriod" width="150" height="150"></canvas>
                    <!--<img src="~assets/img/index/hover/hover_ewm_andriod.png" alt="">-->
                    <p>扫一扫，下载安卓版大公鸡</p>
                  </li>
                </ul>
              </transition>
            </a>
          </li>
          <li class="hidden-sm">
            <router-link class="index-xtgg" to="/index/xtgg">
              <span class="dgj-gg"></span>
              <span>公告</span>
              <em class="dgj-ggvalue" v-show="num_badge">new</em>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <img id="imgLogo" :src="logoSrc" hidden>
  </div>
</template>

<script>
  import historytable from '@/views/nav/history_table'
  import '@/common/js/jqueryqr';
  export default {
    name: 'comHeader',
    data () {
      return {
        Opac: 0.6,
        isdaili: true,
        userindex: 1,
        isanimetion: false,
        isplayGamesNearest: true,
        all_userindex: 1,
        userorderList: [],
        lastgames: [],
        userlist:[{menuName:'报表管理'},{menuName:'代理管理'},{menuName:'消息公告'}],
        is_show: {isu_show: false, isewm_show: false, islsjl_show: false},
        Timer: {user_Timer: null, ewm_Timer: null, lsjl_Timer: null},
        username: this.$store.getters.username,
        gameitems: [
          {
            id: 1,
            name: '重庆时时彩',
            gameType: '1',
            img: require('assets/img/index/hover/cqssc.png'),
            hoverimg: require('assets/img/index/hover/cqssc1.png'),
            content: '累计派奖100W',
            backPrize:0.98,
            backPrizeTips:'返奖率'
          },
/*          {
            id: 9,
            name: '北京快三',
            gameType: '101',
            img: require('assets/img/index/hover/bjks.png'),
            hoverimg: require('assets/img/index/hover/bjks1.png'),
            content: '累计派奖100W'
          },*/
          {
            id: 8,
            name: '腾讯分分彩',
            gameType: '7',
            img: require('assets/img/index/hover/txffc.png'),
            hoverimg: require('assets/img/index/hover/txffc1.png'),
            content: '累计派奖100W',
            backPrize:0.98,
            backPrizeTips:'返奖率'
          },
          {
            id: 28,
            name: '广东11选5',
            gameType: '501',
            img: require('assets/img/index/hover/11x5.png'),
            hoverimg: require('assets/img/index/hover/11x51.png'),
            content: '累计派奖100W',
            backPrize:0.98,
            backPrizeTips:'返奖率'
          },
          {
            id: 6,
            name: '七星彩',
            gameType: '6',
            img: require('assets/img/index/hover/qxc.png'),
            hoverimg: require('assets/img/index/hover/qxc1.png'),
            content: '累计派奖100W',
            backPrize:0.98,
            backPrizeTips:'返奖率'
          },
          {
            id: 5,
            name: '排列五',
            gameType: '5',
            img: require('assets/img/index/hover/plw.png'),
            hoverimg: require('assets/img/index/hover/plw1.png'),
            content: '累计派奖100W',
            backPrize:0.98,
            backPrizeTips:'返奖率'
          }
        ],
        sportitems: [
          {
            id: 1001,
            name: '亚洲体育',
            img: require('assets/img/index/hover/yzty.png'),
            hoverimg: require('assets/img/index/hover/yzty1.png'),
            content: '正在开发中',
            backWater:0.003,
            backWaterTips:'最高回水'
          },
          {
            id: 1002,
            name: '沙巴体育',
            img: require('assets/img/index/hover/sbty.png'),
            hoverimg: require('assets/img/index/hover/sbty1.png'),
            content: '正在开发中',
            backWater:0.003,
            backWaterTips:'最高回水'
          }
        ],
        entitems: [
          {
            id: 1001,
            name: 'AG',
            img: require('assets/img/index/hover/agyl.png'),
            hoverimg: require('assets/img/index/hover/agyl1.png'),
            content: '正在开发中',
            backWater:0.003,
            backWaterTips:'最高回水'
          },
          {
            id: 1002,
            name: 'GD娱乐',
            img: require('assets/img/index/hover/gdyl.png'),
            hoverimg: require('assets/img/index/hover/gdyl1.png'),
            content: '正在开发中',
            backWater:0.003,
            backWaterTips:'最高回水'
          },
          {
            id: 1003,
            name: '金碧',
            img: require('assets/img/index/hover/jbyl.png'),
            hoverimg: require('assets/img/index/hover/jbyl1.png'),
            content: '正在开发中',
            backWater:0.003,
            backWaterTips:'最高回水'
          }
        ],
        ewmCode: {downloadUrl: 'http://shengshicai.com/product.html', androidUrl: 'http://shengshicai.com/product.html', iosUrl: 'http://shengshicai.com/product.html'},
        logoSrc:require('assets/img/index/logoSrc.png')
      }
    },
    components: {historytable},
    mounted(){
      this.$el.querySelector('#header').style.background = 'rgba(13,18,22,1)';
      if ( this.$route.path === '/index/index' ) {
        window.addEventListener('scroll', this.handleScroll);
        this.$el.querySelector('#header').style.background = 'rgba(13,18,22,' + this.Opac + ')';
      }
      this.$api.homeiInit({}).then(res=>{
        if(res.result){
        this.$store.commit('set_initObj',res.data);
          this.ewmCode = res.data;
          this.$nextTick(function () {
            $("#qrcodeAndriod").erweima({
              fill: '#1a95f2',
              text:this.ewmCode.androidUrl,
              size: 150,
              mode: 4,
              image:$('#imgLogo')[0],
              minVersion: 6
            });
            $("#qrcodeIOS").erweima({
              fill: '#1a95f2',
              text:this.ewmCode.iosUrl,
              size: 150,
              mode: 4,
              image:$('#imgLogo')[0],
              minVersion: 6
            });
          })
        }else{
          this.remoteLogin(res);
        }
      })
      this.all_userindex = Math.ceil($('.lastgame li').length / 3);
      if ( this.$store.getters.token && this.$store.getters.userId ) {
        this.getUserIndex();
        this.playGamesNearest();
      }else{
        this.$store.commit('set_announcement_badge',false)
      }
    },
    computed:{
      num_badge(){
        return this.$store.getters.announcement_badge;
      },
      islogin(){
        return this.$store.getters.token;
      },
      messageCount(){
        return this.$store.getters.userInfo.messageCount>=100 ? 99 : this.$store.getters.userInfo.messageCount
      },
      safeMoney(){
          return parseFloat(this.$store.getters.userInfo.safeMoney).toFixed(3);
      },
      userType(){
        return this.$store.getters.userInfo.userType == 1 ? true : false;
      }
    },
    watch:{
      $route(to, from) {
        if(to.path == '/index/index'){
          window.addEventListener('scroll', this.handleScroll);
          this.$el.querySelector('#header').style.background = 'rgba(13,18,22,1)';
        }else{
          this.$el.querySelector('#header').style.background = 'rgba(13,18,22,1)';
          window.removeEventListener('scroll', this.handleScroll)
        }
      }
    },
    methods:{
      formatusername(name){
        if( name.length>5){
          name = name.slice(0,5)+ '…';
        }
        return name;
      },
      gotoSportitems(item){
        this.$message.info('正在加班开发中~');
      },
      gobetGame(item){
        this.$router.push({path: '/betpage/'+ item.id+'/' + item.gameType});
        let reg = /^\/betpage\/((?:[^\/]+?))\/((?:[^\/]+?))(?:\/(?=$))?$/i;
        if(reg.test(this.$route.fullPath)){
          location.reload();
        }
      },
      handleScroll(){
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        var topOpacity = 0.6;
        var Hscroll = 500;
        this.Opac = (scrollTop/ Hscroll) <= 1 ? scrollTop/ Hscroll : 1;
        this.Opac = topOpacity + this.Opac*0.4;
        this.$el.querySelector('#header').style.background = 'rgba(13,18,22,'+this.Opac+')';
      },
      headerenter(){
        if(this.$route.path=== '/index/index'){
          this.$el.querySelector('#header').style.background = 'rgba(13,18,22,1)';
        }
      },
      headerleave(){
        if(this.$route.path=== '/index/index'){
          this.$el.querySelector('#header').style.background = 'rgba(13,18,22,'+this.Opac+')';
        }

      }, updatebgImg(item, is, event){
        if(is){
            $(event.target).find('img').attr("src",
              item.hoverimg)
          } else{
            $(event.target).find('img').attr("src",item.img)
          }

      },
      usershow(type){
          if( type == 'user'){
            this.userlist = this.$store.getters.userInfo.userCenterMenusList
            if(this.Timer.user_Timer){
              clearTimeout(this.Timer.user_Timer);
            }
            this.is_show.isu_show = true;
          } else if ( type== 'ewm'){
          if(this.Timer.ewm_Timer){
            clearTimeout(this.Timer.ewm_Timer);
          }
          this.is_show.isewm_show = true;
        }else if( type == 'lsjl'){
            if(!this.is_show.islsjl_show){
              //hover请求数据,减少请求次数
              this.getOrderGame({pageSize:5}, data =>{
                this.userorderList = data;
              });
            }
            if(this.Timer.lsjl_Timer){
              clearTimeout
              (this.Timer.lsjl_Timer);
            }
            this.is_show.islsjl_show = true;

          }

      },
      userhidden(type){
        if(type== 'user' ){
          if(this.Timer.user_Timer){
            clearTimeout(this.Timer.user_Timer);
          }
          this.Timer.user_Timer = setTimeout(()=>{
            this.is_show.isu_show = false;
          },300);
        }else if (type== 'ewm') {
          if(this.Timer.ewm_Timer){
            clearTimeout(this.Timer.ewm_Timer);
          }
          this.Timer.ewm_Timer = setTimeout(()=>{
            this.is_show.isewm_show = false;
          },300);
        }else if( type== 'lsjl'){
          if(this.Timer.lsjl_Timer){
            clearTimeout(this.Timer.lsjl_Timer);
          }
          this.Timer.lsjl_Timer = setTimeout(()=>{
            this.is_show.islsjl_show = false;
          },300);
        }
      },
      usergamepage(type){
        if(this.isanimetion)return;
        this.is_show.isu_show = true;
        this.isanimetion = true;
        if(this.all_userindex<=1)return;
        if(type== 'left' ){
              //上一页
          if(this.userindex<=1)return;
          $('.lastgame').animate({'margin-left':-309*(this.userindex-2)},()=>{
            this.userindex--;
            this.isanimetion = false;
          });
        }else{
              //下一页
          if(this.userindex>=this.all_userindex) return;
          $('.lastgame').animate({'margin-left':-309*this.userindex},()=> {
            this.userindex++;
            this.isanimetion = false;
          })
        }
      },
      gotoxtgg(){
          this.$store.commit('set_announcement_badge',false)
          this.$router.push({path: '/index/xtgg'});
      },
      logout(){
        this.logOut();
      },
      playGamesNearest(){
        this.$api.playGamesNearest({userId:this.$store.getters.userId,token:this.$store.getters.token}).then(res => {
          if(res.result){
          if(!res.data){
              this.isplayGamesNearest = false;
            } else if(res.data.length > 0){
              this.isplayGamesNearest = true;
              this.lastgames = res.data;
              this.$nextTick(()=>{
                this.all_userindex = Math.ceil($('.lastgame li').length/3);
              })
            }
          } else{
            this.remoteLogin(res);
        }
        })
      },
      getUserIndex(){
        this.getUserInfo((data)=>{
          this.$store.commit('set_userInfo', data);
          this.$store.commit('set_safeMoney',data.safeMoney);
        })
      }
  }
  }
</script>
<style lang="scss" scoped>
  .top-flex{
    position: fixed;
    transform: translate3d(0,0,0);
    width: 100%;
    height: 58px;
    transition: all 0.3s;
    background: rgba(13,18,22,0.6);
    z-index: 2000;
    .header{
      width: 1400px;
      min-width: 1200px;
      height: 58px;
      margin: 0 auto;

      .left-nav{
        float: left;
        height: 100%;

        .dgj-logo{
          display: block;
          padding-left: 0;
        }
        .top-flex-50{
          display: none;
          position: fixed;
          top: 58px;
          left: 0;
          background: url('~assets/img/index/hover/bgc.png') repeat-x;
          height: 174px;
          width: 100%;
          .game-items{
            li{
              position: relative;
              float: left;
              width: 181px;
              height: 174px;
              text-align: center;
              &:hover{
                 background: url('~assets/img/index/hover/fjl98.png') no-repeat;
               }
              &:hover p{
                 color:#ffffff;
               }
               .left-top-tips{
                 position: absolute;
                 left: 8px;
                 top: 5px;
                 width: 60px;
                 font-size: 14px;
                 text-align: center;
                 transform:rotate(-45deg);
                 -ms-transform:rotate(-45deg); 	/* IE 9 */
                 -moz-transform:rotate(-45deg); 	/* Firefox */
                 -webkit-transform:rotate(-45deg); /* Safari 和 Chrome */
                 -o-transform:rotate(-45deg); 	/* Opera */
                  .back{
                    font-size: 32px;
                    color:#04161d !important;
                  }
                  .Tips{
                    position: relative;
                    left: -5px;
                    font-weight: bold;
                    color:#04161d !important;
                  }
                  .percent{
                    font-size: 12px;
                    color:#04161d !important;
                  }
               }
               a{
                 width: 100%;
               }
              .game-img{
                padding-top: 20px;
                width: 77px;
                height: 77px;
                margin: 0 auto;
              }
              .game-title{
                font-weight: bold;
                font-size: 14px;
              }
              p{
                font-weight: normal;
                height: 25px;
                line-height: 25px;
                font-size: 12px;
                color:#898b8e;
              }

            }
          }
        }

        &>li{
            height: 58px;
            line-height: 58px;
            float: left;
            i{

              font-size: 14px;
              color:#ffffff;
            }
            a{
              position: relative;
              font-size: 14px;
              font-weight: bold;
            }
            a.active{
              color:#1a95f2;
              font-size: 14px;
              font-weight: bold;
              &::after{
                content: "";
                display: block;
                position: absolute;
                bottom: 0px;
                left: 0px;
                width: 100%;
                height: 3px;
                background-color: #1a95f2;
              }

              i::before{
                color:#1a95f2;
              }
            }
          }
        &>li:hover .top-flex-50{
            display: block;
          }

        &>li:hover a{
            color:#1a95f2;
          }
        &>li:hover i{
            color:#1a95f2;
          }
      }
      .right-nav{
        position: absolute;
        right: 5px;
        top: 0;
        height: 50px;
        color:#fff;
        &>li{
            position: relative;
            height: 58px;
            line-height: 58px;
            font-size: 14px;
            float: left;
            .messageCount{
              position: relative;
              top: 0px;
              left: -10px;
              cursor: pointer;
              display: inline-block;
              padding:2px 3px 3px 3px;
              background-color: #ee524d;
              line-height: 12px;
              font-size: 12px;
              color:#fff;
              -webkit-border-radius: 10px;
              -moz-border-radius: 10px;
              border-radius: 10px;
            }
            &>a{
                font-size: 14px;
                font-weight: bold;

             }


            &:hover>a{
               color:#1a95f2;
               font-weight: bold;
             }
            &>a.user-home.active,.index-xtgg.active{
              position: relative;
              color:#1a95f2;
              font-weight: bold;
              font-size: 14px;

            }
            .index-xtgg.active{
              &::after{
                 content: "";
                 display: block;
                 position: absolute;
                 bottom: 0px;
                 left: 0;
                 width: 100%;
                 height: 3px;
                 background-color: #1a95f2;
               }
            }


            &:hover>a>a{
               color:#1a95f2;
             }
             /*顶部二维码*/
             .top-index-ewm{
               position: absolute;
               top: 65px;
               left: -180px;
               width: 340px;
               box-shadow: 0px 0px 2px 0px #cccccc;
               background-color: #fff;
               -webkit-border-radius: 3px;
               -moz-border-radius: 3px;
               border-radius: 3px;


                &::after{
                   content: "";
                   display: block;
                   position: absolute;
                   top: -7px;
                   left: 240px;
                   width: 0;
                   border-width: 0 5px 8px;
                   border-style: solid;
                   border-color: #fff transparent;
                 }


                &>li{
                  float: left;
                  width: 170px;
                  margin-top: 10px;
                  -webkit-box-sizing: border-box;
                  -moz-box-sizing: border-box;
                  box-sizing: border-box;
                  height: 180px;
                  text-align: center;
                  &:hover p{
                    color:#1a95f2;
                    font-weight: normal;
                   }
                  p{
                    position: relative;
                    top: -32px;
                    font-weight: normal;
                    text-align: center;
                    height: 35px;
                    line-height: 35px;
                    color:#43484a;
                    font-size: 12px;
                  }
                }



             }

            /*历史纪录*/
            .user_history{
              /*display: none;*/
              position:absolute;
              top: 64px;
              right: -50px;
              padding: 10px 12px 0 12px;
              width: 450px;
              line-height: 0;
              box-shadow: 0px 0px 2px 0px #cccccc;
              background-color: #fff;
              -webkit-border-radius: 2px;
              -moz-border-radius: 2px;
              border-radius: 2px;

              .user_history_more{
                width: 100%;
                height: 35px;
                line-height: 35px;
                text-align: center;
                &>a{
                  width: 100%;
                  font-size: 12px;
                  color:#43484a;
                  &:hover{
                    color:#1a95f2;
                   }
                }
              }

              &::after{
                 content: "";
                 display: block;
                 position: absolute;
                 top: -7px;
                 right:80px;
                 width: 0;
                 border-width: 0 5px 8px;
                 border-style: solid;
                 border-color: #fff transparent;
               }

            }
            /*user用户中心*/
            .index-users{
              position:absolute;
              top: 65px;
              left: 50%;
              transform: translate(-50%,0);
              width: 380px;
              color:#43484a;
              box-shadow: 0px 0px 2px 0px #cccccc;
              background-color: #fff;
              -webkit-border-radius: 3px;
              -moz-border-radius: 3px;
              border-radius: 3px;
             a{
               width: 100%;
               height: 100%;
               text-align: center;
               color:#43484a;
               font-size: 12px;
               -webkit-box-sizing: border-box;
               -moz-box-sizing: border-box;
               box-sizing: border-box;
             }

             .user-items{

               height: 105px;
               padding:0px 10px;
               text-align: center;
               -webkit-box-sizing: border-box;
               -moz-box-sizing: border-box;
               box-sizing: border-box;
               border-bottom: 1px solid #eee;

                &.nohowTeam{
                li{
                  height: 105px;
                  width: 120px;
                }
                }

                li{
                  position: relative;
                  height: 105px;
                  width: 90px;
                  float: left;
                  a{
                    padding-top: 15px;
                    &:hover{
                       color: #1a95f2;
                     }

                    img{
                      width: 31px;
                      height: 31px;
                    }

                    p{
                      line-height: 35px;
                      height: 35px;
                    }
                    .dgj-msgtips{
                      position: absolute;
                      top: 20px;
                      right: 15px;
                      width: 10px;
                      height: 10px;
                      -webkit-border-radius: 5px;
                      -moz-border-radius: 5px;
                      border-radius: 5px;
                      background-color: #ee524d;
                    }
                  }

                }
             }

              .user-lastgame{
                position: relative;
                border-bottom: 1px solid #eeeeee;
                height: 90px;
              &>p{
                  padding: 5px 0 10px 10px;
                  text-align: left;
                  height: 30px;
                  line-height: 30px;
                }
                .poa{
                  position: absolute;
                  top: 34px;
                  font-size: 23px;
                  width: 30px;
                  text-align: center;
                  height: 30px;
                  color:#1a95f2;
                  cursor: pointer;
                }
                .poa_left{
                  left: 8px;
                }
                .poa_right{
                  right: 8px;
                }

                .game-box{
                  width: 309px;
                  overflow: hidden;
                  height: 40px;
                  margin: 0 auto;

                  ul{
                    height: 45px;
                    width: 3000px;
                    margin-bottom: 15px;
                    display: inline-block;

                    li{
                      cursor: pointer;
                      float: left;
                      height: 30px;
                      width: 87px;
                      line-height: 28px;
                      text-align: center;
                      border: 1px solid #7f7f7f;
                      margin: 0 8px;
                      -webkit-border-radius: 5px;
                      -moz-border-radius: 5px;
                      border-radius: 5px;
                      -webkit-box-sizing: border-box;
                      -moz-box-sizing: border-box;
                      box-sizing: border-box;

                      &:hover{
                         color: #1a95f2;
                         border: 1px solid #1a95f2;
                       }

                     }

                  }

                }



              }

              .logout{
                width: 100%;
                text-align: center;
                cursor: pointer;
                height: 40px;
                line-height: 40px;
                font-size: 14px;
                &:hover{
                  color:#1a95f2;
                 }
              }

              &::after{
                 content: "";
                 display: block;
                 position: absolute;
                 top: -8px;
                 left: 170px;
                 width: 0;
                 border-width: 0 5px 8px;
                 border-style: solid;
                 border-color: #fff transparent;
               }
            }

            .user{
              margin-right: 3px;
            }

            a{
              padding:0 10px;
            }

            .pr4{
              padding-right: 4px;
            }

            .right-icon::before{
             content: '|';
              color:#fff;
              position: relative;
              left: 40px;
              top: -1px;

            }

            &.index-ewm:hover{
              .dgj-ewm{
                background: url('~assets/img/index/ewm_hover.png') no-repeat;
              }
            }
            .index-xtgg{
              position: relative;
              .dgj-ggvalue{
                position: absolute;
                line-height: 1;
                font-size: 12px;
                padding: 0 5px 4px;
                -webkit-border-radius: 10px;
                -moz-border-radius: 10px;
                border-radius: 10px;
                background-color: #ee524d;
                right: -25px;
                color:#fff;
                top: 5px;
              }
              &:hover .dgj-gg{
                 background: url('~assets/img/index/gg_hover.png') no-repeat;
               }
              &.active .dgj-gg{
                 background: url('~assets/img/index/gg_hover.png') no-repeat;
              }
            }

        }
        .dgj-ewm{
          display: inline-block;
          position: relative;
          top: 5px;
          width: 22px;
          height: 22px;
          background: url('~assets/img/index/ewm.png') no-repeat;
        }
        .dgj-gg{
          display: inline-block;
          position: relative;
          top: 5px;
          width: 22px;
          height: 22px;
          background: url('~assets/img/index/gonggao.png') no-repeat;
        }


      }
    }
    a{
      display: inline-block;
      height: 100%;
      padding: 0 15px;
      color:#fff;
      font-size: 12px;
      text-align: center;
    }
  }

  @media screen and (max-width:767px){
    .hidden-xs{
      display: none;
    }
  }
  @media screen and (max-width:1023px){
    .hidden-sm{
      display: none;
    }
  }

  @media screen and (max-width:1279px){
    .hidden-md{
      display: none;
    }
  }

  @media screen and (min-width:1400px){
    .header{
      position: relative;
    }
  }
</style>
