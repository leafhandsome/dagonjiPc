<template>
  <div class="container">
    <div class="top">
      <comHeader></comHeader>
    </div>
    <div class="main" >
     <div class="content">
         <div class="betheader">
           <div class="header-left">
             <img :src="showImgUrlPC">
             <p><label class="stiem-etiem">{{openTime}} ,返奖率</label> <label class="v-fd-var">{{returnRate}}%</label></p>
           </div>
           <div class="header-content" :class="openCodeLen>5?'center-code5':''">
             <p>第<label v-text="gameMatchList0.gameNo" class="t-gameno"></label> 期，离截止时间还有：</p>
              <div class="countdown">
                 <span>{{remaining}}</span>
           </div>
             <p class="cut-off" v-show='islockBtn'>最后{{lockTime}}秒停止投注</p>
           </div>
           <div class="header-right" :class="openCodeLen>5?'right-code5':''">
             <p>第<label v-text="gameMatchList1.gameNo" class="t-gameno"></label> 期，开奖结果</p>
             <div class="drawBall" v-if="!isopenCode">
               <p class="sprite"   v-for="(item,index) in gameMatchList1.openCode" :key="index" >{{item}}</p>
             </div>
             <div class="drawtext" v-if="!isopenCode">
               <p >{{gameMatchList1.bigOrSmall}} |</p>
               <p >{{gameMatchList1.singleOrDouble}} |</p>
               <p >{{gameMatchList1.draganOrTiger}} </p>
               <p >和值:{{gameMatchList1.sum}}</p>
             </div>
             <div class="awaitOpne" v-if="isopenCode">
               <p>正在开奖</p>
             </div>
           </div>
         </div>
         <div class="wrapper">
           <div class="sidebar">
             <el-menu
               :default-active="initSleGame"
               class="el-menu-vertical-demo"
               @select="selectGame">
               <el-submenu  v-for="(items,index) in gamesList" :index="items.id" :key="index" v-if="items.id!=3">
                 <template slot="title" >
                   <i><img :src=items.imgUrlPC></i>
                   <span>{{items.typeName}}</span>
                 </template>
                 <el-menu-item-group>
                   <el-menu-item v-for="(item,index1) in items.gameRoomList" :index="items.id +'-'+item.gameRoomId+'-'+item.gameType" :key="index1">{{item.gameRoomName}}</el-menu-item>
                 </el-menu-item-group>
               </el-submenu>
             </el-menu>
           </div>

           <div class="content-column">
             <!--玩法选择区start-->
             <div class="playsMain">
               <div class="plays-one clearfix">
                 <el-tabs @tab-click="firstTab">
                   <el-tab-pane :label="ones.name" v-for="(ones,one) in plays" :key="one">
                     <div class="plays-two clearfix">
                       <ul>
                         <li class="tab-item" v-for="(twos,two) in ones.childClassList" :key="two" @click="subnavfun(twos,two)" :class="firstNav==two?'selsubnav':''">{{twos.name}}</li>
                       </ul>
                     </div>
                     <div class="plays-btn">
                       <div class="plays-three clearfix" v-if="subNavId==threes.id" v-for="(threes,three) in ones.childClassList" :key="three">
                         <ul>
                           <li class="tab-item " v-for="(item,index) in threes.playList" :class="contains(selPlaysArr,item.playType)?'selItem':''" @click="selPlays(item)">{{item.playName}}</li>
                         </ul>
                       </div>
                     </div>
                   </el-tab-pane>
                 </el-tabs>
               </div>
             </div>
             <!--玩法说明strat-->
             <div class="playsMsg">
                 <el-tooltip class="item" effect="dark" placement="top-start">
                   <div slot="content">{{playsMsg}}</div>
                    <i class="el-icon-question"></i>
                 </el-tooltip>
                 <div class="msgTip">{{playsMsg}}</div>
                 <div class="msgWin">每注可赢：<label>{{totalmoney}}</label>元</div>
             </div>
             <!--玩法说明end-->
             <!--选择号码start-->
             <div v-if="!showDoubelPlay">
               <hdingwei  v-if="showBall.h_dingwei"  :params="paramsObj" @responseData="responseData"></hdingwei>
               <hxuanhao  v-if="showBall.h_xuanhao"  :params="paramsObj" @responseData="responseData"></hxuanhao>
               <hchongdan v-if="showBall.h_chongdan" :params="paramsObj" @responseData="responseData"></hchongdan>

               <!--官方玩法 start-->
               <gfdingwei1 v-if="showBall.gf_dingwei1" @responseData="responseData":params="paramsObj"></gfdingwei1>
               <gfdingwei2 v-if="showBall.gf_dingwei2" @responseData="responseData":params="paramsObj"></gfdingwei2>
               <gfdingwei3 v-if="showBall.gf_dingwei3" @responseData="responseData":params="paramsObj"></gfdingwei3>
               <gfdingwei4 v-if="showBall.gf_dingwei4" @responseData="responseData":params="paramsObj"></gfdingwei4>
               <gfdingwei5 v-if="showBall.gf_dingwei5" @responseData="responseData":params="paramsObj"></gfdingwei5>
               <gfdantuo   v-if="showBall.gf_dantuo"   @responseData="responseData":params="paramsObj"></gfdantuo>
               <gfdanshi   v-if="showBall.gf_danshi"   @responseData="responseData":params="paramsObj"></gfdanshi>
               <gfchongdan v-if="showBall.gf_chongdan" @responseData="responseData":params="paramsObj"></gfchongdan>
               <!--官方玩法 end-->

               <!--北京赛车-幸运飞艇 start-->
               <bjrangking v-if="showBall.bj_zhixuan" @responseData="responseData" :params="paramsObj"></bjrangking>
               <bjgyhezhi  v-if="showBall.bj_gyhezhi" @responseData="responseData" :params="paramsObj"></bjgyhezhi>
               <bjqianer   v-if="showBall.bj_qianer"  @responseData="responseData" :params="paramsObj"></bjqianer>
               <!--北京赛车-幸运飞艇 end-->

               <!--快乐十分 start-->
               <klsfdingweidan v-if="showBall.klsf_dingweidan" @responseData="responseData":params="paramsObj"></klsfdingweidan>
               <klsfzhixuan    v-if="showBall.klsf_zhixuan"    @responseData="responseData":params="paramsObj"></klsfzhixuan>
               <!--快乐十分 end-->

               <!--11选5 start-->
               <syxwzhixuan v-if="showBall.syxw_zhixuan" @responseData="responseData" :params="paramsObj"></syxwzhixuan>
               <syxwxuanhao v-if="showBall.syxw_xuanhao" @responseData="responseData" :params="paramsObj"></syxwxuanhao>
               <syxwdanshi  v-if="showBall.syxw_danshi"  @responseData="responseData" :params="paramsObj"></syxwdanshi>
               <syxwdantuo  v-if="showBall.syxw_dantuo"  @responseData="responseData" :params="paramsObj"></syxwdantuo>
               <syxwzhongwei v-if="showBall.syxw_zhongwei"@responseData="responseData":params="paramsObj"></syxwzhongwei>
               <!--11选5 end-->

             <!--选择号码end-->
             <div class="plyasOperate" v-if="!showDoubelPlay">
                 <!--水位-->
                <water @changWater="changWater" ></water>
                 <div class="multiple clearfix" >
                   <div class="multipleNum">
                     <span class="">下注倍数：</span><div class="m-inputNumber"><el-input-number v-model="inputNumber" size="small" :min="1" :max="9999"></el-input-number></div>
                   </div>
                   <div class="multipleUnit clearfix">
                     <el-radio-group v-model="unit"class="items-btns" size="small">
                       <el-radio-button v-for="(item,index) in units" :label="item" :key="index"></el-radio-button>
                     </el-radio-group>
                   </div>
                 </div>
               <div class="total clearfix">
                 <p>已选<span>{{countZS}}</span>注,共<span>{{totalSum}}</span>元</p>
               </div>
             </div>
           </div>
             <!--双面玩法start-->
             <div class="doublePlay" v-if="showDoubelPlay">
                <doubleplays :params="paramsObj" @resultData="doubleResult"></doubleplays>
             </div>
             <!--双面玩法start-->

             <!--选注订单去区start-->
             <div class="playsOrder">
               <div class="orderList clearfix">
                 <ul>
                   <li v-for="(item,index) in orderList" :key="index">
                     <p>{{item.playName}}</p>
                     <el-tooltip class="item" effect="dark" placement="top-start" v-if="item.betContent!=''">
                      <div slot="content">{{item.betContent}}</div>
                      <p class="w200">{{item.betContent}}</p>
                     </el-tooltip>
                      <p class="w200" v-if="item.betContent==''">{{item.betContent}}</p>
                      <p class="w50" v-text="orderWaterType==1?item.orderWater/20:item.orderWater"></p>
                      <p class="w50">{{item.countZS}}注</p>
                      <p class="w50">{{item.betTimes}}倍</p>
                      <p class="w200">￥<label v-text="item.countZS*item.betTimes"></label> {{item.moneyUnit}}</p>
                      <p class="w30 f17 orderClose" @click="deleteOrder(item)"><i class="el-icon-circle-close" title="删除"></i></p>
                   </li>
                 </ul>
               </div>
               <div class="orderBtnList clearfix">
                 <ul>
                   <li><p @click="addOrder" class="el-icon-plus">添加</p></li>
                   <li><p @click="clearOrder " class="el-icon-minus">清除</p></li>
                 </ul>
                 <!--<p>我要追号</p>-->
                 <p @click='buyOrder' class="buyBtn" :class="islockBtn?'lickBtn':''">立即投注</p>
               </div>
             </div>
           </div>
           <!--选注订单去区end-->
         </div>
     </div>
     <div class="rightside">
       <ul>
         <li>
           <div class="result">
           <el-popover ref="resultPopover" placement="right" width="400" trigger="hover" @show="showResult" @hide="hideResult">
             <result :params="paramsObj" v-if="showResultCon"></result>
           </el-popover>
           <el-row v-popover:resultPopover>
             <div class="resultbtn"><span><img src='../../assets/img/lottery/recent.png'></i>近期开奖</span></div>
           </el-row>
         </div>
         </li>
         <li @click="goTend">
           <div class="history">
             <div class="resultbtn"><span><img src='../../assets/img/lottery/history.png'></i>历史走势</span></div>
           </div>
         </li>
         <li>
           <div class="record">
             <el-popover ref="recordPopover" placement="right" width="580" trigger="hover" @show=showBetRecord @hide=hideBetRecord>
               <history v-bind:cancel="true"  v-bind:orderList='userorderList'></history>
             </el-popover>
           </div>
           <el-row v-popover:recordPopover>
             <div class="resultbtn"><span><img src='../../assets/img/lottery/betrecord.png'></i>投注记录</span></div>
           </el-row>
         </li>
       </ul>
      </div>
    </div>
    <!--加载动画-->
    <div class="loading">
      <loading :show="loading.show" :text="loading.text"></loading>
    </div>
    <div class="alert">
      <alert :settings="alertOptions"></alert>
    </div>
  </div>
</template>

<script>
import Params  from '../../common/data/Param.json';
import {mapState, mapMutations} from 'vuex'
import doubleplays from './doubleplays';
import result  from './result';
import history from '../nav/history_table'
import water   from './water';

import hdingwei from './hainan/dingwei';//海南玩法 定位
import hxuanhao   from './hainan/xuanhao';//海南玩法 选号
import hchongdan  from'./hainan/chongdan';//海南玩法 重单
import gfdingwei1 from './official/betdingwei1'//官方玩法 1排
import gfdingwei2 from './official/betdingwei2'//官方玩法 2排
import gfdingwei3 from './official/betdingwei3'//官方玩法 3排
import gfdingwei4 from './official/betdingwei4'//官方玩法 4排
import gfdingwei5 from './official/betdingwei5'//官方玩法 5排
import gfdantuo   from './official/betdantuo'  //官方玩法 胆拖
import gfdanshi   from './official/betdanshi'  //官方玩法 单式
import gfchongdan from './official/betchongdan'//官方玩法 重单
import bjrangking from './beijing/betzhixuan' //北京赛车直选
import bjqianer   from './beijing/betqianer'  //北京赛车前二直选
import bjgyhezhi  from './beijing/betgyhezhi' //北京赛车和值
import klsfdingweidan from './klsf/betdingweidan'//快乐十分 定位胆
import klsfzhixuan    from './klsf/betzhixuan'   //快乐十分 直选
import syxwzhixuan    from './syxw/betzhixuan' //11选5 直选
import syxwxuanhao    from './syxw/betrenxuan' //11选5 选号
import syxwdanshi     from './syxw/betdanshi'  //11选5 单式
import syxwdantuo     from './syxw/betdantuo'  //11选5 胆拖
import syxwzhongwei   from './syxw/betzhongwei'//11选5 中位

  export default {
    data () {
      return {
        plays:{},
        gamesList:{},
        activeName: 'first',
        firstNav:0,
        subNavId:0,
        backWater:0,
        inputNumber:1,
        gameId:1,
        gameType:"1",
        countZS:0,  //总注数
        total:0,
        betInput:'',//下注内容
        betContent:'',
        initSleGame:'1-1',
        selPlaysArr:[],
        showDoubelPlay:false,
        paramsObj:{},//玩法参数
        playsMsg:'', //玩法说明
        units:['元','角','分'],
        unit:'元',
        lockTime:0,
        countNum:'',
        openCodeLen:0,
        gameMatchList0:[],
        gameMatchList1:[],
        orderList:[],
        isopenCode   :false,//是否开奖
        showResultCon:false,
        islockBtn    :false,
        loading: {
          show: true,
          text: '加载中...'
        },
        alertOptions :{},
        userorderList:[],
        returnRate:'60',  //返奖率
        openTime  : '10:00-02:00',
        showImgUrlPC:'',// 彩种logo
        orderWaterType:'',
        showBall:{
          h_dingwei   :false,//海南玩法 定位
          h_xuanhao   :false,//海南玩法 选号
          h_chongdan  :false,//海南玩法 重单
          gf_dingwei1 :false,//官方玩法 1排
          gf_dingwei2 :false,//官方玩法 2排
          gf_dingwei3 :false,//官方玩法 3排
          gf_dingwei4 :false,//官方玩法 4排
          gf_dingwei5 :false,//官方玩法 5排
          gf_dantuo   :false,//官方玩法 胆拖
          gf_danshi   :false,//官方玩法 单式
          gf_chongdan :false,//官方玩法 重单
          bj_zhixuan  :false,
          bj_qianer   :false,
          bj_gyhezhi  :false,
          klsf_dingweidan:false,
          klsf_zhixuan   :false,
          syxw_zhixuan :false,
          syxw_xuanhao :false,
          syxw_danshi  :false,
          syxw_dantuo  :false,
          syxw_zhongwei:false,
        }
      }
    },
    created(){
      let vm = this;
          vm.gameId   = this.$route.params.gameId;
          vm.gameType = this.$route.params.gameType;
          vm.getGames();     //获取游戏列表
          vm.getPlaysList(); //获取玩法列表
          vm.gameMatches();  //获取最近三期结果
    },
    mounted(){
      let vm = this;
          vm.remainingTime(); //倒计时
    },
    destroyed(){
      clearInterval(this.timers);
    },
    computed:{
      //计算每注最多可赢数
      totalmoney(){
        let vm = this;
        //计算元单位
        if(vm.unit=="元"){
          return (vm.inputNumber * vm.backWater/2000 * vm.paramsObj.playOdds*1).toFixed(3);
          //计算角单位
        }else if(vm.unit=='角'){
          return (vm.inputNumber * vm.backWater/2000 * vm.paramsObj.playOdds*0.1).toFixed(3);
          //计算分单位
        }else if(vm.unit=='分'){
          return (vm.inputNumber * vm.backWater/2000 * vm.paramsObj.playOdds*0.01).toFixed(3);
        }else {
          return (vm.inputNumber * vm.backWater/2000 * vm.paramsObj.playOdds*1).toFixed(3);
        }
      },
      //计算投注总金额
      totalSum(){
        let vm = this;
        //计算元单位
        if(vm.unit=="元"){
          return (vm.countZS * vm.inputNumber * 1).toFixed(3);
          //计算角单位
        }else if(vm.unit=='角'){
          return (vm.countZS * vm.inputNumber * 0.1).toFixed(3);
          //计算分单位
        }else if(vm.unit=='分'){
          return (vm.countZS * vm.inputNumber * 0.01).toFixed(3);
        }else {
          return (vm.countZS * vm.inputNumber * 1).toFixed(3);
        }
      },

      //转换时间成分秒
      remaining (){
        let vm = this;
        //封盘停止受注
        if(vm.countNum <= vm.lockTime){
           vm.islockBtn = true;
        }
        if(vm.countNum >= 0){
          return vm.formatDuring(vm.countNum)
        }else {
           vm.gameMatches('next');
        }
      },
    },
    methods: {
      ...mapMutations([
        'GET_PLAYSOBJ',
      ]),
      //获取游戏前三期
      gameMatches (flag) {
        let vm = this;
        let lastGameId = vm.gameMatchList0.gameNo ;
          vm.loading.show = true;
          vm.alertOptions ={show:false}
          vm.unitAjax('POST', '/api/lottery/gameMatches', {"roomId": vm.gameId}, function (result) {
          vm.loading.show = false;
          if (result.result) {
            vm.gameMatchList0 = result.data.gameMatchList[0];
            vm.gameMatchList1 = result.data.gameMatchList[1];
            vm.openCodeLen    = result.data.gameMatchList[2].openCode.length;
            vm.countNum = vm.gameMatchList0.endTime;
            vm.lockTime = vm.gameMatchList0.lockTime;

            vm.returnRate = parseInt(result.data.returnRate*100);
            vm.openTime  = result.data.openTime;
            vm.showImgUrlPC = result.data.showImgUrlPC;

            vm.islockBtn= false;
            if(flag == 'next'){
              vm.nextMatche(vm.gameMatchList0,lastGameId);
            }
            if (vm.gameMatchList1.openCode.length <= 0) {
              vm.isopenCode = true;
              vm.timergetlist();
            }
          }else {
            clearInterval(vm.timer);
          }
        });
      },
      //获取下一期的期号
      nextMatche(obj,lastGameId){
        let vm = this;
        if(lastGameId){
          let tip = lastGameId +'期已截止，\n' + '当前为'+  obj.gameNo  +'期，\n' + '投注时请注意期号';
          vm.$message.warning(tip);
          //已经添加的所有订单，更改最新下注期号
          for(var i = 0; i<vm.orderList.length;i++){
            vm.orderList[i].gameNo =  obj.gameNo;
          }
        }else {
          vm.gameMatches('next');
        }
      },
      //计算时间 时间倒计时
      remainingTime () {
        let vm = this;
        clearInterval(vm.timer);
        vm.timer = setInterval(() => {
          vm.countNum--;
        }, 1000);
      },
      //定时获取开奖结果
      timergetlist () {
        let vm = this;
        vm.timers = setInterval(() => {
          if (vm.isopenCode) {
            vm.unitAjax('POST', '/api/lottery/gameMatches', {"roomId": vm.gameId}, function (result) {
              if (result.result) {
                vm.gameMatchList0 = result.data.gameMatchList[0];
                vm.gameMatchList1 = result.data.gameMatchList[1];
                vm.openCodeLen    = result.data.gameMatchList[2].openCode.length;
                if (result.data.roomStatus && result.data.roomStatus != 1) {
                  vm.$router.push('/');
                  return;
                }
                if (vm.gameMatchList1.openCode.length > 0) {
                  vm.isopenCode = false;
                  clearInterval(vm.timers);
                } else {
                  vm.isopenCode = true;
                }
              }
            });
          } else {
            clearInterval(vm.timers);
          }
        }, 10000);
      },
      //获取游戏列表
      getGames(){
        let vm = this;
        vm.loading.show = true;
        vm.unitAjax('POST','/api/gameCenter/lottery',{},function (result) {
          if(result.result){
            vm.gamesList = result.data.showTypeList;
            for(var i =0;i<vm.gamesList.length;i++){
              for (var j=0;j < vm.gamesList[i].gameRoomList.length;j++){
                if(vm.gamesList[i].gameRoomList[j].gameRoomId == vm.gameId){
                  vm.initSleGame = vm.gamesList[i].id + '-' + vm.gamesList[i].gameRoomList[j].gameRoomId+ '-' + vm.gamesList[i].gameRoomList[j].gameType;
                }
              }
            }
          }
          vm.loading.show = false;
        });
      },
      //获取游戏玩法
      getPlaysList(){
        let vm = this;
        vm.loading.show = true;
        vm.unitAjax('POST', '/api/lottery/playList', {"roomId": vm.gameId}, function (result) {
          if (result.result) {
            vm.orderWaterType = result.data.orderWaterType; //水位显示方式
            let tab = {index:0};
                result.data.playClassList.shift();
                vm.plays = result.data.playClassList;
                vm.firstTab(tab);
          }
          vm.loading.show = false;
        });
      },
      //选择游戏
      selectGame(key, keyPath){
        let vm = this;
        let path  = keyPath[1].split("-");
        if(path[1]==vm.gameId){
          return;
        }
        vm.firstNav = 0 ;
        vm.$router.push('/betpage/'+ path[1]+"/"+path[2]);
        location.reload();
     },
      //点击一级玩法
      firstTab(tab){
        let vm = this;
        let data = this.plays;
        for(var i = 0;i<data.length;i++){
          if(tab.index==i){
            let temp = data[i].childClassList[0];
            vm.firstNav = 0;
            vm.subNavId = temp.id;
            vm.selPlaysArr.shift();
            vm.selPlaysArr.push(temp.playList[0].playType);
            vm.selPlays(temp.playList[0]);
          }
        }
      },
      //选择二级菜单
      subnavfun (items,index) {
        let vm = this;
          vm.firstNav = index;
          vm.subNavId = items.id ;
          vm.selPlaysArr.shift();
          vm.selPlaysArr.push(items.playList[0].playType);
          vm.selPlays(items.playList[0]);
      },
      //选择玩法
      selPlays(item){
        let vm = this;
        let speed = 50;
            item.orderWaterType = vm.orderWaterType;
        vm.GET_PLAYSOBJ(item) ;
        vm.showDoubelPlay = true;
        vm.countZS = 0;
        if (vm.contains(Params.doubelPlayType, item.playType)) {
          vm.unit = '元';
          vm.showDoubelPlay = true;
          vm.backWater = item.maxUserWater;
        }else {

          //获取本地记录水位
          let localRate = parseInt(vm.getStroe('playType'+ item.playType));
          if(localRate){
            item.defaultWater = localRate;
          }

           vm.setStore('plasData',item);
           vm.hidePalyBall();
           vm.showDoubelPlay = false;

           //海南玩法 --定位
          if(vm.contains(Params.hdingwei, item.playType)){
            vm.showBall.h_dingwei = false;
            setTimeout(function () {
              vm.showBall.h_dingwei = true ;
            },speed);
          }
          //海南玩法 --选号
          else if(vm.contains(Params.xuanhaoType,item.playType)){
            vm.showBall.h_xuanhao = false;
            setTimeout(function () {
              vm.showBall.h_xuanhao = true ;
            },speed);
          }
          //海南玩法 --重单
          else if(vm.contains(Params.chongDanType,item.playType)){
            vm.showBall.h_chongdan = false;
            setTimeout(function () {
              vm.showBall.h_chongdan = true ;
            },speed);
          }
          //官方玩法  不定位
          else if(vm.contains(Params.gfdingwei1,item.playType)){
            vm.showBall.gf_dingwei1 = false;
            setTimeout(function () {
              vm.showBall.gf_dingwei1 = true ;
            },speed);
          }
          //官方玩法 定位胆  五星复式  五星组合
          else if(item.playType == 120 || item.playType == 40 || item.playType == 42){
            vm.showBall.gf_dingwei5 = false;
            setTimeout(function () {
              vm.showBall.gf_dingwei5 = true ;
            },speed);
          }
          //官方玩法 重 单
          else if(vm.contains(Params.gfchongdan,item.playType)){
            vm.showBall.gf_chongdan = false;
            setTimeout(function () {
              vm.showBall.gf_chongdan = true ;
            },speed);
          }
          //官方玩法 前四
          else if(item.playType == 50 || item.playType == 52){
            vm.showBall.gf_dingwei4 = false;
            setTimeout(function () {
              vm.showBall.gf_dingwei4 = true ;
            },speed);
          }
          //官方玩法 前三 后三
          else if(item.playType == 70 || item.playType == 90){
            vm.showBall.gf_dingwei3 = false;
            setTimeout(function () {
              vm.showBall.gf_dingwei3 = true ;
            },speed);
          }
          //官方玩法 前三组三胆拖   前三组六胆拖  后三组三胆拖   后三组六胆拖
          else if(item.playType == 73 || item.playType == 75 || item.playType == 93 || item.playType == 95){
            vm.showBall.gf_dantuo = false;
            setTimeout(function () {
              vm.showBall.gf_dantuo = true ;
            },speed);
          }
          //前二直选
          else if(item.playType == 100 ||item.playType == 110){
            vm.showBall.gf_dingwei2 = false;
            setTimeout(function () {
              vm.showBall.gf_dingwei2 = true ;
            },speed);
          }
          //五星单选，前四单选 ，前三单选， 前三组合  前二  前二直选
          else if(vm.contains(Params.gfdanshi,item.playType)){
            vm.showBall.gf_danshi = false;
            setTimeout(function () {
              vm.showBall.gf_danshi = true ;
            },speed);
          }

          //北京赛车直选
          else if(vm.contains(Params.bjRangking,item.playType)){
            vm.showBall.bj_zhixuan = false;
            setTimeout(function () {
              vm.showBall.bj_zhixuan = true ;
            },speed)
          }
          //北京赛车 前二直选 - 前三直选
          else if(item.playType == 3035 || item.playType == 3036){
            vm.showBall.bj_qianer = false;
            setTimeout(function () {
              vm.showBall.bj_qianer = true;
            },speed)
          }
          //北京赛车 冠亚和值 - 前三和值
          else if(item.playType == 3037 || item.playType == 3038){
            vm.getPlayOddsList(item.playType);
          }
          //快乐十分 定位胆
          else if(vm.contains(Params.klsfdingweidan,item.playType)){
            vm.showBall.klsf_dingweidan = false;
            setTimeout(function () {
              vm.showBall.klsf_dingweidan = true;
            },speed)
          }
          //快乐十分 选号
          else if(vm.contains(Params.klsfzhixuan,item.playType)){
            vm.showBall.klsf_zhixuan = false;
            setTimeout(function () {
              vm.showBall.klsf_zhixuan = true;
            },speed)
          }
          //11选5 直选
          else if(vm.contains(Params.syxwzhixuan,item.playType)){
            vm.showBall.syxw_zhixuan = true;
          }
          //11选5 选号
          else if(vm.contains(Params.syxwxuanhao,item.playType)){
            vm.showBall.syxw_xuanhao = true;
          }
          //11选5 单式
          else if(vm.contains(Params.syxwdanshi,item.playType)){
            vm.showBall.syxw_danshi = true;
          }
          //11选5 胆拖
          else if(vm.contains(Params.syxwdantuo,item.playType)){
            vm.showBall.syxw_dantuo = true;
          }
          //11选5 猜中位
          else if(item.playType == 6051){
            vm.getPlayOddsList(item.playType);
          }
          else {
            vm.$message('正在开发中。。。。');
          }
        }
        vm.paramsObj = item;
        vm.playsMsg = item.remark;
        vm.selPlaysArr.shift();
        vm.selPlaysArr.push(item.playType);
        console.log(item.playType);
      },
      //获取赔率
      getPlayOddsList(playType){
        let vm = this;
        let token  = vm.getValue("token");
        let userId = vm.getValue("userId");
        if(token && userId){
          let parmars = {
            "playType" :playType
          }
          vm.unitAjax('POST','/api/room/getPlayOddsList',parmars,function(result){
            if(result.result){
              vm.paramsObj.oddsList = result.data;
              //先获取赔率表，才能打开投注页面。
              if(playType=='1017') {
                vm.t_baozi = true;
              }
              //北京赛车 冠亚和，前三和
              else if(playType == 3037 || playType == 3038){
                vm.showBall.bj_gyhezhi   = false;
                setTimeout(function () {
                  vm.showBall.bj_gyhezhi = true;
                },100)
              }
              // 11选5 猜中位
              else if(playType == 6051){
                vm.showBall.syxw_zhongwei   = false;
                setTimeout(function () {
                  vm.showBall.syxw_zhongwei = true;
                },100)
              }
            }else {
              if (result.operateCode == 100) {  //登录状态过期了，清除token userId ,
                vm.remoteLogin(result);
              }
            }
          });
        }else {
          vm.goLogin();
        }
      },
      //选择号码返回来结果
      responseData(data){
        let vm = this;
        if(data){
          if(data.count_zs>0){
            vm.countZS  = data.count_zs;   //下注注数
          }else{
            vm.countZS  = 0;
          }
          vm.betInput   = data.betInput;
          vm.betContent = data.betContent;
        }
      },
      hidePalyBall(){
        let vm = this;
        for(var key in vm.showBall){
          vm.showBall[key] = false;
        }
      },
      //选择水位
      changWater(data){
        let vm  = this;
        vm.backWater = data.backWater;
      },
      changUnit(data,i){
        console.log(data,i)
      },
      // 获取历史开奖结果
      showResult(){
        let vm = this;
        vm.paramsObj.roomId = vm.gameId;
        vm.showResultCon = true;
      },
      //隐藏历史结果
      hideResult(){
        let vm  = this;
        vm.showResultCon = false;
      },
      showBetRecord(){
        let  vm = this;
        vm.getOrderGame(vm.gameType,data=>{
          vm.userorderList = data
        })
      },
      hideBetRecord(){},
      //双面玩法获取下注倍数
      doubleResult(data){
        let vm = this;
        if(data){
          vm.inputNumber = data
        }
      },
      //添加号码
      addOrder(){
        let vm = this;
        let item= {
          "roomId"    :vm.gameId,                   //房间id
          "gameNo"    :vm.gameMatchList0.gameNo,    //游戏id
          "playType"  :vm.paramsObj.playType,       //玩法id
          "betInput"  :vm.betInput,                 //下注内容
          "betContent":vm.betContent,
          "betTimes"  :vm.inputNumber,              //倍数
          "moneyUnit" :vm.unit,                     //单位
          "orderWater":vm.backWater,                //水位
          "playName"  :vm.paramsObj.playName,       //下注玩法
          "countZS"   :vm.countZS,                  //总注数
        }
        //双面玩法
        if(vm.contains(Params.doubelPlayType,vm.paramsObj.playType)){
          item.countZS    = 1;
          item.betInput   ='';
          item.betContent ='';
        }
        //没有选择号码的时候
        if(item.countZS==0){
          vm.$message.error('号码不完整，请重新选择!');
          return false;
        }
        let hasSameOrder = false;
        vm.$store.commit('set_isAddOrder', true);
        if(vm.orderList.length >0){
          for(var i =0;i<vm.orderList.length;i++){
            //检查订单内容是否一样。
            if(vm.orderList[i].playType == item.playType &&
               vm.orderList[i].moneyUnit == item.moneyUnit &&
               vm.orderList[i].orderWater == item.orderWater &&
               vm.orderList[i].playName == item.playName){

               var hasSameBalls = true;
               //检查下注号码是否一样
              if(vm.objForArr(vm.orderList[i].betInput).length == vm.objForArr(item.betInput).length) {
                for (var key in vm.orderList[i].betInput) {
                  if (item.betInput[key]) {
                    if (vm.orderList[i].betInput[key].toString().replace(/,/g, '') != item.betInput[key].toString().replace(/,/g, '')) {
                      hasSameBalls = false;
                    }
                  } else {
                    hasSameBalls = false;
                  }
                }
              }else {
                hasSameBalls = false;
              }

              if(item['bigCodes'] && vm.orderList[i].bigCodes) {
                if(hasSameBalls==true && item['bigCodes'] == vm.orderList[i].bigCodes){
                  hasSameOrder = true;
                } else {
                  hasSameOrder = false;
                }
              } else {
                hasSameOrder = hasSameBalls;
              }
              // 有一样的订单
              if(hasSameOrder == true) {
                let alertTip = '该投注已经存在，已直接为您加倍';
                    vm.orderList[i].betTimes += item.betTimes;
                if(vm.orderList[i].betTimes>9999){
                  alertTip = '投注倍数最大为9999倍'
                  vm.orderList[i].betTimes = 9999;
                }
                vm.$message.warning(alertTip);
                return false;
              }
            }
          }
          if(!hasSameOrder ){
            vm.orderList.push(item)
          }
        }else {
          vm.orderList.push(item)
        }
      },
      //删除订单
      deleteOrder(item){
        let vm = this;
            vm.removeByValue(vm.orderList,item);
      },
      //清除订单
      clearOrder(){
        let vm = this;
        vm.orderList = [] ;
      },
      //下注-下订单
      buyOrder(){
        let vm = this;
        if(vm.islockBtn){
          return false;
        }
        let token =  vm.getValue("token");
        let userId = vm.getValue("userId");
        if (token && userId) {
          //检查添加下单号码
          if (vm.orderList.length == 0) {
              vm.$message.error('请先添加号码');
            return false;
          }
        }else {
          vm.goLogin();
          return false;
        }
        vm.loading.show = true;
        vm.getProperty(vm.orderList[0], 0, function() {
          vm.loading.show = false;
        });
      },
      //发送下单请求
      getProperty(data, index,  callback) {
        let vm = this;
        if (vm.orderList.length == index) {
          return false;
        }
        let parmars = {
          "roomId": data.roomId,      //房间id
          "gameNo": data.gameNo,      //游戏id
          "playType": data.playType,  //玩法id
          "betInput": vm.betInput == "" ? data.betInput : JSON.stringify(data.betInput), //下注内容
          "betTimes": data.betTimes,  //倍数
          "moneyUnit": data.moneyUnit == "元" ? 1 : data.moneyUnit == '角' ? 2 : 3,       //单位
          "orderWater":data.orderWater,//水位
        };

        vm.unitAjax('POST', '/api/lottery/bet', parmars, function (result) {
          vm.loading.show = false;
          if(result.result){
              //记住下注水位
              let name = 'playType' + data.playType;
              let obj = data.orderWater;
              vm.removeStore(name);
              vm.setStore(name,obj);

              vm.$message.success('下注成功');
              vm.removeByValue(vm.orderList,data);
              vm.$store.commit('set_safeMoney',result.data.userSafeMoney);
              return vm.getProperty(vm.orderList[index],index, callback);
            } else {
            //登录状态过期了，清除token userId ,
              if (result.operateCode == 100) {
                vm.remoteLogin(result);
              } else if (result.msg.indexOf('对不起，您的余额不足') != -1) {
                vm.$message.error(result.msg+",请充值！");
              }else {
                vm.$message.error(result.msg);
              }
            }
        });
      },
      goTend(){
        let vm = this;
        vm.$router.push({path:'/public/trend/'+vm.gameId +"/"+vm.gameType});
      }
    },
    components:{
      result,
      history,
      water,
      doubleplays,
      //海南玩法
      hdingwei,
      hxuanhao,
      hchongdan,
      //官方玩法
      gfdingwei1,
      gfdingwei2,
      gfdingwei3,
      gfdingwei4,
      gfdingwei5,
      gfdantuo  ,
      gfdanshi  ,
      gfchongdan,
      //北京赛车-幸运飞艇
      bjrangking,
      bjqianer,
      bjgyhezhi,
      //快乐十分
      klsfdingweidan,
      klsfzhixuan,
      //11选5
      syxwzhixuan,
      syxwxuanhao,
      syxwdanshi,
      syxwdantuo,
      syxwzhongwei
    }
  }
</script>
<style lang="scss" scoped>
  .container{
    position: relative;
     /*background-color:#F2F6F9;*/
    .top{
      position: fixed;
      top:0;
      height: 70px;
      z-index: 99;
    }
    .main{
      position: relative;
      width: 1200px;
      height:1000px;
      margin: 0 auto;
      .content{
        margin-top: 70px;
        .betheader{
          width: 1200px;
          height:125px;
          background-color: #ffffff;
          .header-left{
            float: left;
            width: 224px;
            height:132px;
            text-align: center;
            img,p{
              margin-top: 10px;
            }
            p .v-fd-var{
              background: #FEB407;
              padding: 2px 6px;
              border-radius: 5px;
              font-size: 10px;
              color: #FFF;
              margin-bottom: 5px;
              font-weight: 800;
            }
            .stiem-etiem{
              font-weight: 800;
            }
          }
          .header-content{
            float: left;
            width: 550px;
            margin-left: 68px;
            padding-top: 10px;
            text-align: center;
            color: #43484A;
            .countdown{
              width: 305px;
              height: 65px;
              margin: 0 auto;
              margin-top: 11px;
              border-radius: 50px;
              background-color: #EDF7FE;
              line-height: 65px;
              span{
                font-size: 48px;
                font-weight: 800;
                color: #43484A;
              }
            }
            .cut-off{
              margin-top: 5px;
              color: red;
            }
            .t-gameno{
               color: #1a95f2;
               font-weight: 800;
              }
          }
          .center-code5{
            width: 410px;
          }
          .header-right{
            float: left;
            width: 350px;
            padding-top: 10px;
            text-align: center;
            color: #43484A;
            .drawBall{
              p{
                margin: 7px;
              }
              .sprite{
                width: 35px;
                height: 35px;
                line-height: 35px;
              }
            }
             .drawtext{
                text-align: center;
                height:30px;
                line-height: 30px;
                p{
                  text-align: center;
                  display: inline-block;
                }
             }
            .awaitOpne{
              padding-top: 20px;
              font-size: 28px;
            }
            .t-gameno{
              color: #1a95f2;
              font-weight: 800;
            }
          }
         .right-code5{
           width: 490px;
         }
        }
      }
      .wrapper{
        height:946px;
        margin-top: 10px;
        .sidebar{
          width: 224px;
          height:945px;
          overflow-y: auto;
          background-color: #ffffff;
          float: left;
          .el-col-12{
            width: 100%;
          }
        }
        .content-column{
          float: left;
          margin-left: 8px;
          width: 968px;
          height:946px;
          .playsMain{
            min-height: 150px;
            background-color: #ffffff;
          }
         .plyasOperate{
           height: 50px;
           background-color: #FFFFFF;
           .multiple{
             float: left;
             width: 370px;
             .multipleNum{
               width: 220px;
               float: left;
              span{
                float: left;
                display: block;
                width: 80px;
                line-height: 33px;
              }
             }
            .multipleUnit{
              float: left;
              width: 150px;
            }
           }
          .total{
            float: left;
            width: 160px;
            height: 33px;
            line-height: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            span{
              color: red;
              font-weight: 800;
            }
          }
         }

         .playsOrder{
           margin-top: 10px;
           padding: 10px;
           height: 303px;
           background-color: #ffffff;
           .orderList{
             float: left;
             width: 725px;
             height: 302px;
             padding: 0 20px;
             overflow-y: auto;
             background-color: #F7FCFF;

             p{
               float: left;
               width: 100px;
               height: 50px;
               line-height: 50px;
               overflow:hidden;
               text-overflow:ellipsis;
               white-space:nowrap
             }
             .w30{
               width: 30px;
               text-align: center;
             }
             .w50{
               width: 50px;
               text-align: center;
             }
             .w100{
               width: 100px;
               text-align: center;
             }
             .w200{
               width:200px;
               text-align: center;
             }
             .f17{
               font-size: 17px;
             }
             .orderClose{
               cursor:pointer;
             }
             ul li{
               height: 50px;
               line-height: 50px;
               border-bottom: 1px dashed #EAEAEA;
             }
           }
           .orderBtnList{
             float: left;
             width: 182px;
             height: auto;
             text-align: center;
             ul{
               li{
                 float: left;
                 width: 90px;
                 p{
                   width: 80px;
                 }
               }
             }
             p{
               width: 174px;
               height: 41px;
               display: block;
               line-height:41px;;
               margin: 10px ;
               border: 1px solid #dcdfe6;
               border-radius: 5px;
               cursor:pointer;
             }
             p:hover{
               border: 1px solid #1A95F2;
               color: #1A95F2;
             }
             .buyBtn{
               background-color:#1a95f2;
               color: #FFFFFF;
               clear: both;
             }
             .buyBtn:hover{
                color: #FFFFFF;
              }
             .lickBtn{
               cursor: not-allowed;
               background-color: #dcdfe6;
             }
            .lickBtn:hover{
              border: 1px solid #dcdfe6;
            }
           }
         }
        }
      }
      .rightside{
        position: absolute;
        width: 0;
        top:320px;
        right: -10px;
         ul li{ margin-top: 10px; cursor: pointer}
        .resultbtn{
          width: 41px;
          height: 120px;
          background-color: #ffffff;
          text-align: center;
          box-shadow: 0 2px 12px 0 rgba(0,0,0,0.05);
          padding-top: 3px;
          border-radius: 3px;
          span{
            display: block;
            width: 20px;
            height: 112px;
            margin: 10px auto;
            text-align: center;
            word-wrap: break-word;
          }
          img{
            margin-bottom: 5px;
          }
        }
      }
    }

    .plays-two {
      padding:2px 0 0 22px;
      ul {
        li{
          float: left;
          width: 80px;
          height: 30px;
          line-height: 30px;
        }
        .tab-item:hover{
          color: #409EFF;
          cursor:pointer;
        }
        .selsubnav{
          color: #409EFF;
        }
      }
    }
  .plays-three{
    width:950px;
    padding:8px 15px 0;
    ul {
      li{
        float: left;
        min-width: 50px;
        margin: 5px 10px;
        padding: 2px 5px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap
      }
      .selItem,.tab-item:hover{
          background-color: #409EFF;
          color: #ffffff;
          border-radius: 5px;
          cursor:pointer;
        }
      }
  }
  .playsMsg{
     margin-top:10px;
     height:50px;
     line-height: 50px;
     background-color: #ffffff;
      i{
        float: left;
        width: 28px;
        margin-top: 18px;
        margin-left:10px;
        text-align: center;
        cursor: pointer;
      }
      .msgTip{
        float: left;
        max-width: 650px;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        background:none;
        color: #606266;

      }
      .msgWin{
        float: right;
        text-align: right;
        padding-right: 10px;
       label{
         color: red;
         font-weight: 800;
       }
     }
   }
   .doublePlay{
     margin-top: 10px;
   }
  }
</style>
