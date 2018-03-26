<template>
  <div class="dgj-container-fluid bgc">
    <div class="dgj-banner">
      <div id="luv_slider" @mouseenter="carouselStop" @mouseleave="carouselStar">
        <div class="slider_scroll">
          <div class="slider_main">
            <div class="slider_img" v-for="item in carouselItems">
              <a class='slider_img_a' href="javascript:;">
                <img :src="item.imgUrl" :alt="item.title">
              </a>
            </div>
          </div>
        </div>
        <div class="slider_ctl">
          <span @click="slider_ctl_icon(index)" class="slider_ctl_icon" :index="index" :class="{current:isNow == index}" v-for="(item, index) in carouselItems"></span>
        </div>
        <div class="slider_ctl_np">
          <span @click="slider_ctl_np" class="slider_ctl_prev">
            <i class="el-icon-arrow-left"></i>
          </span>
          <span @click="slider_ctl_next" class="slider_ctl_next">
            <i class="el-icon-arrow-right"></i>
          </span>
        </div>
      </div>
    </div>
    <div class="dgj-container notice">
      <div @click="$router.push({path:'/index/xtgg'})" class="noticeMessage">
        <img class="noticeicon" src="~assets/img/index/gonggao.png" alt="">
        <span>公告：</span>
        <span v-show="initObj.noticeMessage" v-text="initObj.noticeMessage"></span>
      </div>
    </div>
    <div class="dgj-container index-content">
      <ul class="content-top clearfix">
        <li>
          <div class="c-t-tp">
            <ul class="clearfix">
              <li><img class="c-t-img" src="~assets/img/index/chongzhi.png" alt=""></li>
              <li class="pl20"><strong>充值</strong><p>到账时间</p></li>
              <li class="c-t-time">1秒</li>
            </ul>
          </div>
          <div class="c-t-tb">
            平台支持超过28家银行充值，可24小时在线充值。充值平均每笔到账时间为0.3秒，充值贴心不收手续费。
          </div>
        </li>
        <li>
          <div class="c-t-tp">
            <ul class="clearfix">
              <li><img class="c-t-img" src="~assets/img/index/tixian.png" alt=""></li>
              <li class="pl20"><strong>提现</strong><p>到账时间</p></li>
              <li class="c-t-time">9秒</li>
            </ul>
          </div>
          <div class="c-t-tb">
            平台拥有自主研发全自动审核及付款系统，提款平均每笔到账时间为9秒，提款极速到账，无需更多等待
          </div>
        </li>
        <li>
          <div class="c-t-tp">
            <ul class="clearfix">
              <li><img class="c-t-img" src="~assets/img/index/anquan.png" alt=""></li>
              <li class="pl20"><strong>安全</strong><p>加密算法</p></li>
              <li class="c-t-time">2048</li>
            </ul>
          </div>
          <div class="c-t-tb">
            采用最先进的数据加密技术。交易信息以不可解密方式传输和存储，即使外部入侵，数据也不可读，万无一失，固若金汤。
          </div>
        </li>
        <li>
          <div class="c-t-tp">
            <ul class="clearfix">
              <li><img class="c-t-img" src="~assets/img/index/wending.png" alt=""></li>
              <li class="pl20"><strong>稳定</strong><p>诚信经营</p></li>
              <li class="c-t-time" v-text="getOtherYear()+'年'"></li>
            </ul>
          </div>
          <div class="c-t-tb">
            口碑诚信为天，精挑细选业界顶尖平台，只为给您提供极致的用户体验。24小时在线客服, 让您如沐春风。
          </div>
        </li>
      </ul>
    </div>
    <div class="dgj-container-fluid index-content bgcfff">
      <ul class="dgj-container content-bottom clearfix">
        <li>
          <h2 class="c-b-top">
            合作合营
          </h2>
          <div class="c-b-ct">
            我们所提供的所有产品和服务, 是由菲律宾卡格扬河经济特区所授权和监管。选择我们, 您将拥有可靠的资金和优质的服务。
          </div>
          <div>
            <img src="~assets/img/index/hzhy.png" alt="">
          </div>
        </li>
        <li>
          <h2 class="c-b-top">
            全终端支持
          </h2>
          <div class="c-b-ct">
            我们的产品已经率先全面覆盖所有终端, 您可以通过下列链接访问我们的网站, 或者下载我们的移动端产品！
          </div>
          <div class="c-b-bt">
            <ul class="c-b-ct-bt clearfix">
              <li><a href="http://www.shengshicai.com/"><img src="~assets/img/index/pc.png" alt=""><span>PC</span></a></li>
              <li><a href="http://www.shengshicai.com/"><img src="~assets/img/index/android1.png" alt=""><span>安卓</span></a></li>
              <li><a href="http://www.shengshicai.com/"><img src="~assets/img/index/apple.png" alt=""><span>IOS</span></a></li>
              <li><a href="http://www.shengshicai.com/"><img src="~assets/img/index/h5.png" alt=""><span>H5</span></a></li>
            </ul>
          </div>
        </li>
        <li>
          <h2 class="c-b-top">
            推荐使用的浏览器
          </h2>
          <div class="c-b-ct">
            为了提供更好的用户体验, 建议您使用下列我们推荐的浏览器访问我们的网站。（点击下方图标下载对应浏览器）
          </div>
          <ul class="index-llq">
            <li><a target="_blank" rel="noopener noreferrer nofollow" href="https://www.baidu.com/link?url=_9mmUP_q1Y7BCx4nWuus59qsZsv3b9nwxONpXhJXCfvHEs1aKZ69duhtdIAvKy_nV4c5J_TZv8tVta1X2pQcX7hORTSML8zYsUyUphQ_FEq&wd=&eqid=a2485cf20000ca23000000065aa79c2c"><img src="~assets/img/index/chrome.png" alt=""></a></li>
            <li><a target="_blank" rel="noopener noreferrer nofollow" href="https://www.baidu.com/link?url=jomX7femCupdjrVCj3Tx0QSVfP-w404nrtNYAxj3HiCMJK4xEzslmNzdtZP7KzrAsVPizBJuLzmYfi4INTN9HhKZUlwHDoLg02AvjBD_vhq&wd=&eqid=ebf8cba40000c1a6000000065aa79c61"><img src="~assets/img/index/ff.png" alt=""></a></li>
            <li><a target="_blank" rel="noopener noreferrer nofollow"  href="https://www.baidu.com/link?url=PhIIaf0FvCNc3-PR-7nRuAg39FLMf8svOL2GmMTUjBE2if7ckItueIHT3Y2sSE4vJzzZDLSsyFUFg5eCYJaD7Zi88fNAslO3qjSPPmlTW0O&wd=&eqid=faee8bf60000d9cc000000065aa79c6e"><img src="~assets/img/index/ie.png" alt=""></a></li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="dgj-container index-bottom">
      <a href="##">
        <img src="~assets/img/index/hzsj.png" alt="">
      </a>
      <p>获得First Cagayan Leisure和Resort Corporation线上博彩执照认证。获得国际博弈机构IGC、GLI及BMM Testlabs权威认证。</p>
    </div>
    <comFooter></comFooter>
    <div class="index-flex dgj-container-fluid">
      <div class="index-flex-item index-left" @mouseenter="usershow('left')" @mouseleave="userhidden('left')">
        <img class="android" src="~assets/img/index/android.png" alt="">
        <img src="~assets/img/index/ios.png" alt="">
        <p>手机投注更便捷</p>
      </div>
      <transition name="left">
        <div class="dgj-container-fluid hover-left-flex" @mouseenter="usershow('left')" @mouseleave="userhidden('left')" v-show="is_show.isleft_show">
          <div class="left-flex">
            <div class="left-flex-bgc"></div>
            <ul class="left-flex-ul clearfix">
              <li>
                <canvas id="indexIOS" width="150" height="150"></canvas>
                <p><img src="~assets/img/index/hover/l_ios.png" alt=""><span>IOS</span></p>
              </li>
              <li>
                <canvas id="indexAnd" width="150" height="150"></canvas>
                <p><img src="~assets/img/index/hover/l_andriod.png" alt=""><span>安卓</span></p>
              </li>
              <li>
                <canvas id="indexH5" width="150" height="150"></canvas>
                <p><img src="~assets/img/index/hover/l_h5.png" alt=""><span>H5</span></p>
              </li>
            </ul>
            <p>扫一扫，移动投注更便捷</p>
            <div class="right-flex-bgc"></div>
          </div>

        </div>
      </transition>
      <!--v-bind:class="{scrollflex:istrue,noscrollflex:!istrue}"-->
      <ul class="index-flex-item index-right">
        <li>
          <a @mouseenter="usershow('right')" @mouseleave="userhidden('right')" href="javascript:;">
            <img src="~assets/img/index/weixin.png" alt="">
            <transition name="opac">
              <div class="right-flex" v-show="is_show.isright_show">
                <div id="indexWxService"></div>
                <p>微信扫一扫</p>
              </div>
            </transition>
          </a>
        </li>
        <el-tooltip class="item" effect="dark" content="我是QQ客服哦！" placement="left">
          <li><a :href="'tencent://message/?Menu=yes&uin='+initObj.qqServiceUrl+'& Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45'"><img src="~assets/img/index/qq.png" alt=""></a></li>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="我是在线客服哦！" placement="left">
          <li><a :href="initObj.serviceUrl"><img src="~assets/img/index/kefu.png" alt=""></a></li>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="点击我可以查看常见问题哦！" placement="left">
          <li><a @click="commonQuestions" href="javascript:;"><img src="~assets/img/index/lianxi.png" alt=""></a></li>
        </el-tooltip>
      </ul>
    </div>
  </div>
</template>

<script>
  import '@/common/js/jqueryqr';
  export default {
    data () {
      return {
        msg: '首页！',
        isactive: true,
        istrue:false,
        is_show:{isleft_show:false,isright_show:false},
        Timer:{left_Timer:null,right_Timer:null},
        ewmCode:{downloadUrl:'http://shengshicai.com/product.html',androidUrl:'http://shengshicai.com/product.html',iosUrl:'http://shengshicai.com/product.html',weiXinServiceUrl:'https://u.wechat.com/MIb51rhPTKNp_Z9nd-QhgXI'},
        logoSrc:require('assets/img/index/logoSrc.png'),
        noticeMessage:'平台拥有自主研发全自动审核及付款系统无需更多等待',
        isNow:0,
        is_click:false,
        timer:null,
        oneTimer:null,
        duration:4000,
        slider:null,
        slider_img:[],
        carouselItems:[],
        sliderW:1910
      }
    },
    mounted(){
      window.addEventListener('scroll',this.handleScroll);
      window.addEventListener('resize',this.windowResize);
      clearInterval(this.timer);
      clearInterval(this.oneTimer);
      this.$api.homeiInit({}).then(res=>{
        if(res.result){
          this.carouselItems = res.data.pcAdList;
          this.$nextTick()
            .then(() => {
              // DOM 更新了
              this.slider_img = this.$el.querySelectorAll('.slider_img');
              this.slider = this.$el.querySelector('#luv_slider');
              this.sliderW = this.slider.offsetWidth;
              this.canouseInit();
            })
        }else{
          this.remoteLogin(res);
        }
      })
    },
    computed:{
      initObj(){
        let temp = this.$store.getters.initObj;
        this.$nextTick(function () {
          $("#indexAnd").erweima({
            fill: '#000000',
            text:temp.androidUrl,
            size: 150,
            mode: 4,
            image:$('#imgLogo')[0],
            minVersion: 5
          });
          $("#indexIOS").erweima({
            fill: '#000000',
            text:temp.iosUrl,
            size: 150,
            mode: 4,
            image:$('#imgLogo')[0],
            minVersion: 5
          });
          $("#indexH5").erweima({
            fill: '#000000',
            text:temp.downloadUrl,
            size: 150,
            mode: 4,
            image:$('#imgLogo')[0],
            minVersion: 5
          });
          $("#indexWxService").erweima({
            fill: '#000000',
            text:temp.weiXinServiceUrl,
            size: 140,
            mode: 4,
            image:$('#imgLogo')[0],
            minVersion: 5
          });
        })
        return this.$store.getters.initObj;
      }
    },
    methods:{
      canouseInit(){
        for (var n = 0; n <  this.slider_img.length; n++) {
          this.slider_img[n].style.left =this.sliderW +'px';
        }
        this.slider_img[this.isNow].style.left =0 +'px';
        if(this.timer){clearInterval(this.timer);}
        this.timer = setInterval(() => {
          this.nextone();
        },this.duration);
      },
      slider_ctl_np(){
        if(this.is_click)return;
        this.is_click =true;
        let temp = this.isNow;
        this.isNow--;
        if(this.isNow<0){
          this.isNow=this.slider_img.length-1;
        }
        this.slider_img[this.isNow].style.left =-this.sliderW +'px';
        this.buffer(this.slider_img[this.isNow],{left:0},this.isClick)
        this.buffer(this.slider_img[temp],{left:this.sliderW},this.isClick);
      },
      slider_ctl_next(index){
        this.nextone(index);
      },
      slider_ctl_icon(index){
        if(this.is_click)return;
        if(index == this.isNow)return
        this.is_click =true;
        let temp = this.isNow;
        if(this.isNow>index){
          //点击了下边的左边
          this.isNow = index;
          this.slider_img[this.isNow].style.left =-this.sliderW +'px';
          this.buffer(this.slider_img[this.isNow],{left:0},this.isClick);
          this.buffer(this.slider_img[temp],{left:this.sliderW},this.isClick);
        }else if(this.isNow<index){
          //点击了下边的右边
          this.isNow = index;
          this.slider_img[this.isNow].style.left =this.sliderW +'px';
          this.buffer(this.slider_img[this.isNow],{left:0},this.isClick);
          this.buffer(this.slider_img[temp],{left:-this.sliderW},this.isClick);
        }
      },
      nextone(index){
        if(this.is_click)return;
        if(index == this.isNow)return;
        this.is_click =true;
        let temp = this.isNow;
        this.isNow++;
        if(this.isNow>this.slider_img.length-1){
          this.isNow=0;
        }
        this.slider_img[this.isNow].style.left =this.sliderW +'px';
        this.buffer(this.slider_img[this.isNow],{left:0},this.isClick)
        this.buffer(this.slider_img[temp],{left:-this.sliderW},this.isClick);
      },
      isClick(){
        this.is_click =false;
      },
      buffer(obj, data, fn) {
        $(obj).stop(true,true);
        $(obj).animate(data,600,fn);
      },
      carouselStar(){
        if(this.timer){clearInterval(this.timer);}
        this.timer =setInterval(() => {
          this.nextone();
        },this.duration);
      },
      carouselStop(){
        clearInterval(this.timer);
      },
      usershow(type){
        if(type=='left'){
          if(this.Timer.left_Timer){
            clearTimeout(this.Timer.left_Timer);
          }
          this.is_show.isleft_show = true;
        }else if(type=='right'){
          if(this.Timer.right_Timer){
            clearTimeout(this.Timer.right_Timer);
          }
          this.is_show.isright_show = true;
        }

      },
      userhidden(type){
        if(type=='left'){
          if(this.Timer.left_Timer){
            clearTimeout(this.Timer.left_Timer);
          }
          this.Timer.left_Timer = setTimeout(()=>{
            this.is_show.isleft_show = false;
        },300);
        }else if(type=='right'){
          if(this.Timer.right_Timer){
            clearTimeout(this.Timer.right_Timer);
          }
          this.Timer.right_Timer = setTimeout(()=>{
            this.is_show.isright_show = false;
        },300);
        }

      },
      handleScroll(){
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        var h= document.documentElement.clientHeight || document.body.clientHeight;
        this.istrue = h+scrollTop>=1089 ? true : false;
      },
      windowResize() {
        if(this.oneTimer){
          clearTimeout(this.oneTimer);
        }
        this.oneTimer = setTimeout(() => {
          this.slider_img = this.$el.querySelectorAll('.slider_img');
          this.slider = this.$el.querySelector('#luv_slider');
          this.sliderW = this.slider.offsetWidth;
          for (let n = 0; n <  this.slider_img.length; n++) {
            this.slider_img[n].style.left =this.sliderW +'px';
          }
          this.slider_img[this.isNow].style.left =0 +'px';
        },100)
      },
      getOtherYear(){
          let nowYear = new Date().getFullYear();
          return nowYear - 2012;
      },
      commonQuestions(){
          this.$message.success('正在开发中！有问题请联系客服。')
      }
    },

    destroyed(){
      // 导航离开该组件的对应路由时调用
      // 可以访问组件实例 `this`
      clearInterval(this.timer);
      clearInterval(this.oneTimer);
    }

  }
</script>
<style lang="scss" scoped>

  .pr{
    position: relative;
  }
  .dgj-banner{
    width: 100%;
    height: 717px;
  }
  .bgc{
    background-color: #fff;
  }
  .notice{
    position: absolute;
    top: 58px;
    left: 50%;
    width: 1200px;
    margin-left: -600px;
    height: 30px;
    overflow: hidden;
    z-index: 1000;
  }
  .noticeMessage{
    position: relative;
    line-height: 30px;
    height: 30px;
    font-size: 16px;
    /*color:#ff7c7c;*/
    color:#ffffff;
    /*color: #ff6b6a;*/
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    -webkit-animation: slideLeft 60s linear infinite;
    animation: slideLeft 60s linear infinite;
    .noticeicon{
      width: 20px;
      height: 20px;
    }
    &:hover{
       animation-play-state:paused;
       -webkit-animation-play-state:paused; /* Safari 和 Chrome */
    }
  }
  .bgcfff{
    background-color: #f4f4f4 !important;
  }
  .index-content{
    .content-top{
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      padding:90px 0;
      width: 100%;

      &>li{
        width: 240px;
        margin-right:80px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        float: left;

        &:nth-last-child(1){
           margin-right:0px;
         }
        &:hover .c-t-img{
           -webkit-transform: scale(1.2);
           -moz-transform: scale(1.2);
           -ms-transform: scale(1.2);
           -o-transform: scale(1.2);
           transform: scale(1.2);

         }
        .c-t-tp{

          .c-t-img{
            transition: all 0.5s;
            width: 48px;
            height: 48px;
          }

          li{
            float: left;
            font-size: 12px;
            color:#43484a;

            strong{
              font-size: 20px;
              font-weight: bold;
              line-height: 30px;
            }
            &.c-t-time{
               margin-left: 30px;
               font-size: 36px;
            }
          }
        }
        .c-t-tb{
          margin-top: 5px;
          font-size: 13px;
          color:#7f7f7f;
          line-height: 25px;
        }
      }

    }

    .content-bottom{
      padding:50px 0px;

      &>li{
          width: 350px;
          margin-right:75px;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          font-size: 13px;
          color:#7f7f7f;
          text-align: center;
          float: left;


          &:nth-last-child(1){
             margin-right:0px;
           }

          .c-b-top{
             text-align: center;
             font-size: 18px;
             font-weight: bold;
             color:#43484a;
             margin-bottom: 32px;
           }

          .c-b-ct{
            height: 90px;
            line-height: 20px;
           }
          .index-llq{
            li{
              display: inline-block;
              a{
                padding: 0 20px;
                img{
                  width: 27px;
                  height: 27px;
                }
              }
            }
          }
          .c-b-bt{
            width: 300px;
            margin: 0 auto;
            li{
              float: left;
              height: 35px;
              width: 60px;
              line-height: 35px;
              margin-right:15px;
              a{
                font-size: 14px;
                color:#7f7f7f;
                img{
                  margin-right: 5px;
                }
              }

            }
          }

        }
    }

  }

  .index-bottom{
    text-align: center;
    padding-top: 40px;

    p{
      height: 60px;
      font-size: 12px;
      line-height: 60px;
      color:#aeaeae;
    }
  }

  .index-flex{

    .index-flex-item{
      cursor: pointer;
      position: absolute;
      width: 38px;
      padding: 15px 0;
      z-index: 1000;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      background-color: #1a95f2;
    }
    .hover-left-flex{
      position: absolute;
      z-index: 999;
      top:780px;
      height: 220px;
      box-shadow: 0px 2px 10px 2px rgba(198,205,211,0.3);
      background-color: #fff;
      .left-flex-bgc{
        position: absolute;
        left: 15px;
        top: -90px;
        width: 305px;
        height: 320px;
        background: url('~assets/img/index/hover/phone1.png') no-repeat;
        -webkit-animation: bounce-down 1.8s 1.3s linear infinite alternate;
        animation: bounce-down 1.8s 1.3s linear infinite alternate;
      }
      .right-flex-bgc{
        position: absolute;
        right:90px;
        top: -40px;
        width: 305px;
        height: 320px;
        background: url('~assets/img/index/hover/phone2.png') no-repeat;
        -webkit-animation: bounce-down 1.8s 0.8s linear infinite alternate;
        animation: bounce-down 1.8s 0.8s linear infinite alternate;
      }
      .left-flex{
        position: relative;
        z-index: 1000;
        width: 1200px;
        margin: 0 auto;
        background-color: #fff;

        .left-flex-ul{
          width: 540px;
          margin: 0 auto;
          margin-top: 10px;
          &>li{
              height: 170px;
              padding-left: 15px;
              padding-right: 15px;
              float: left;
            p{
              position: relative;
              top: -15px;
              text-align: center;
              height: 30px;
              span{
                position: relative;
                top: 3px;
                margin-left: 3px;
                height: 30px;
                line-height: 30px;
                color: #515151;
                font-size: 16px;
              }
            }
           }
        }
        &>p{
          text-align: center;
          height: 30px;
          line-height: 30px;
          font-size: 16px;
          color:#9c9c9c;
        }
      }
    }
    .index-left{
      left: 20px;
      top:780px;
      &>img{
        width: 21px;
        height: 21px;
        position: relative;
        left: 8px;
        padding-bottom: 18px;
      }
      &>img.android{
        padding-bottom: 10px;
      }

      &>p{
        padding: 0 12px;
        font-size: 14px;
        color:#ffffff;
        line-height: 17px;

      }
    }

    .index-right{
      right:20px;
      top:780px;
      padding: 15px 0;

      &.scrollflex{
         position: fixed;
         bottom: 50px;
       }
       &.noscrollflex{
          position: absolute;
          top:780px;
        }

      .right-flex{
        position: absolute;
        right: 45px;
        top: -45%;
        width: 150px;
        height: 170px;
        text-align: center;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        box-shadow: 0px 0px 2px 0px #cccccc;
        background-color: #fff;
          #indexWxService{
            margin-top: 5px;
          }
        p{
          position: relative;
          top: -25px;
          text-align: center;
          color:#1a95f2;
          height: 30px;
          line-height: 30px;
        }

        &::after{
           content: "";
           display: block;
           position: absolute;
           top: 40px;
           right: -8px;
           width: 0;
           border-width: 5px 0px 5px 8px;
           border-style: solid;
           border-color:transparent #fff;
         }

      }

      a{
        position: relative;
        padding: 0 6px;
        line-height: 45px;
        img{
          width: 26px;
          height: 26px;
        }
      }

    }

  }
  @-webkit-keyframes bounce-down {
    0% {-webkit-transform: translateY(0px);}
    100% {-webkit-transform: translateY(15px);}
  }
  @keyframes bounce-down {
    0% {-webkit-transform: translateY(0px);}
    100% {-webkit-transform: translateY(15px);}
  }
  @-webkit-keyframes slideLeft {
    0% {  left: 50%;}
    100% {left: -70%;}
  }
  @keyframes slideLeft {
    0% {  left: 50%;}
    100% {left: -70%;}
  }
  @media screen and (max-width:1200px){
    .index-right{
      left: 1140px;
    }
  }
</style>
