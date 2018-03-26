<template>
  <div class="container clearfix pt65 pb20">
    <div v-show="!loading.show">
      <div>
        <div class="trend-t-left">
          <el-select  v-on:change="getchange" v-model="value7" placeholder="请选择">
            <el-option-group
              class="trend-select"
              v-for="group in options"
              :key="group.typeName"
              :label="group.typeName"
              :disabled="group.disabled">
              <el-option
                v-for="item in group.gameRoomList"
                :key="item.gameRoomId"
                :label="item.gameRoomName"
                :value="item"
                :disabled="item.disabled">
              </el-option>
            </el-option-group>
          </el-select>
        </div>
        <div></div>
        <div class="trend-t-right">
          <el-checkbox v-model="isshow_yilou" label="遗漏" border></el-checkbox>
          <el-checkbox class="mr20" v-model="istrendcanvas" label="折线" border></el-checkbox>
          <el-radio @change="getExpiration(30)" v-model="radio7" label="1" border>最近30期</el-radio>
          <el-radio @change="getExpiration(50)" v-model="radio7" label="2" border>最近50期</el-radio>
          <el-button @click="gotobetpage" class="ml20" type="primary">返回游戏</el-button>
        </div>
      </div>
      <table v-if="prizenum"  class="trend">
        <tr class="trend-title fwb">
          <td class="w110" rowspan="2">期号</td>
          <td class="w70" rowspan="2">开奖号码</td>
          <td class="w30" rowspan="2">单双</td>
          <td class="w30" rowspan="2">大小</td>
          <td class="w30" rowspan="2">龙虎</td>
          <td class="w30" rowspan="2">和值</td>
          <td v-if="numTime>=5">万位</td>
          <td v-if="numTime>=4">千位</td>
          <td>百位</td>
          <td>十位</td>
          <td>个位</td>
        </tr>
        <tr class="trend-title">
          <td v-for="items in numTime" >
            <ul class="numTime">
              <li :class="[{w10p:prizenum.length==10},{w11p:prizenum.length==11},{w6p:prizenum.length==6}]" v-for="item in prizenum" v-text="item"></li>
            </ul>
          </td>
        </tr>
        <tr class="trend-tr">
          <td class="w110">
            <ul class="num-title">
              <li v-for="(gameItem,index) in data"><span v-text="gameItem.gameNo"></span></li>
            </ul>
          </td>
          <td class="w70">
            <ul class="num-title fwb">
              <li v-for="(gameItem,index) in data"><span class="fc3" v-text="gameItem.openCode.toString()"></span></li>
            </ul>
          </td>
          <td class="w30">
            <ul class="trend-two">
              <li class="w30" v-for="(items,index) in data"><span class="" v-text="items.singleOrDouble"></span></li>
            </ul>
          </td>
          <td class="w30">
            <ul class="trend-two">
              <li class="w30" v-for="(items,index) in data"><span class="" v-text="items.bigOrSmall"></span></li>
            </ul>
          </td>
          <td class="w30">
            <ul class="trend-two">
              <li class="w30" v-for="(items,index) in data"><span class="" v-text="items.draganOrTiger"></span></li>
            </ul>
          </td>
          <td class="w30">
            <ul class="trend-two">
              <li class="w30" v-for="(items,index) in data"><span class="" v-text="items.sum"></span></li>
            </ul>
          </td>
          <td v-if="numTime>=5">
            <ul class="trend-one">
              <li v-for="(items,index) in getshowArr(5)">
                <ul class="trend-two clearfix">
                  <li v-for="item in items" :class="[{ w10p: prizenum.length == 10 }, { w11p : prizenum.length==11},{ w6p : prizenum.length==6},{active:item.isshow}]">
                    <span v-if="!item.isshow" :class="{istrue_opac:!isshow_yilou}" v-text="item.num"></span>
                    <span v-if="item.isshow" v-text="item.isnum"></span>
                  </li>
                </ul>
              </li>
            </ul>
          </td>
          <td v-if="numTime>=4">
            <ul class="trend-one">
              <li v-for="(items,index) in getshowArr(4)">
                <ul class="trend-two clearfix">
                  <li v-for="item in items" :class="[{ w10p: prizenum.length == 10 }, { w11p : prizenum.length==11},{ w6p : prizenum.length==6},{active:item.isshow}]">
                    <span v-if="!item.isshow" :class="{istrue_opac:!isshow_yilou}" v-text="item.num"></span>
                    <span v-if="item.isshow" v-text="item.isnum"></span>
                  </li>
                </ul>
              </li>
            </ul>
          </td>
          <td>
            <ul class="trend-one">
              <li v-for="(items,index) in getshowArr(3)">
                <ul class="trend-two clearfix">
                  <li v-for="item in items" :class="[{ w10p: prizenum.length == 10 }, { w11p : prizenum.length==11},{ w6p : prizenum.length==6},{active:item.isshow}]">
                    <span v-if="!item.isshow" :class="{istrue_opac:!isshow_yilou}" v-text="item.num"></span>
                    <span v-if="item.isshow" v-text="item.isnum"></span>
                  </li>
                </ul>
              </li>
            </ul>
          </td>
          <td>
            <ul class="trend-one">
              <li v-for="(items,index) in getshowArr(2)">
                <ul class="trend-two clearfix">
                  <li v-for="item in items" :class="[{ w10p: prizenum.length == 10 }, { w11p : prizenum.length==11},{ w6p : prizenum.length==6}, {active:item.isshow}]">
                    <span v-if="!item.isshow" :class="{istrue_opac:!isshow_yilou}" v-text="item.num"></span>
                    <span v-if="item.isshow" v-text="item.isnum"></span>
                  </li>
                </ul>
              </li>
            </ul>
          </td>
          <td>
            <ul class="trend-one">
              <li v-for="(items,index) in getshowArr(1)">
                <ul class="trend-two clearfix">
                  <li v-for="item in items" :class="[{ w10p: prizenum.length == 10 }, { w11p : prizenum.length==11},{ w6p : prizenum.length==6}, {active:item.isshow}]">
                    <span v-if="!item.isshow" :class="{istrue_opac:!isshow_yilou}" v-text="item.num"></span>
                    <span v-if="item.isshow" v-text="item.isnum"></span>
                  </li>
                </ul>
              </li>
            </ul>
          </td>


        </tr>
        <tr class="trend-title">
          <td colspan="2" class="w110">出现总次数</td>
          <td class="w30" colspan="4">-</td>
          <td v-for="items in getAllNum(numTime,1)">
            <ul class="numTime">
              <li :class="[{w10p:prizenum.length==10},{w11p:prizenum.length==11},{w6p:prizenum.length==6}]" v-for="item in items" v-text="item"></li>
            </ul>
          </td>

        </tr>
        <tr class="trend-title">
          <td colspan="2" class="w110">最大连出值</td>
          <td class="w30">
            <ul class="numTime">
              <li class="w15" v-text="getContinuityCheck(getOtherNum('singleOrDouble'),'单')"></li>
              <li class="w15" v-text="getContinuityCheck(getOtherNum('singleOrDouble'),'双')"></li>
            </ul>
          </td>
          <td class="w30">
            <ul class="numTime">
              <li class="w15" v-text="getContinuityCheck(getOtherNum('bigOrSmall'),'大')"></li>
              <li class="w15" v-text="getContinuityCheck(getOtherNum('bigOrSmall'),'小')"></li>
            </ul>
          </td>
          <td class="w30">-</td>
          <td class="w30">-</td>
          <td v-for="items in getAllNum(numTime,2)">
            <ul class="numTime">
              <li :class="[{w10p:prizenum.length==10},{w11p:prizenum.length==11},{w6p:prizenum.length==6}]" v-for="item in items" v-text="item"></li>
            </ul>
          </td>

        </tr>
        <tr  class="trend-title">
          <td colspan="2" class="w110">最大遗漏值</td>
          <td class="w30" colspan="4">-</td>
          <td v-for="items in getAllNum(numTime,3)">
            <ul class="numTime">
              <li :class="[{w10p:prizenum.length==10},{w11p:prizenum.length==11},{w6p:prizenum.length==6}]" v-for="item in items" v-text="item"></li>
            </ul>
          </td>

        </tr>
        <tr class="trend-title">
          <td class="w110 fwb" rowspan="2">期号</td>
          <td class="w70 fwb" rowspan="2">开奖号码</td>
          <td class="w30 fwb" rowspan="2">单双</td>
          <td class="w30 fwb" rowspan="2">大小</td>
          <td class="w30 fwb" rowspan="2">龙虎</td>
          <td class="w30 fwb" rowspan="2">和值</td>
          <td v-for="items in numTime">
            <ul class="numTime">
              <li :class="[{ w10p: prizenum.length == 10 }, { w11p : prizenum.length==11},{ w6p : prizenum.length==6}]" v-for="item in prizenum" v-text="item"></li>
            </ul>
          </td>
        </tr>
        <tr class="trend-title fwb">
          <td v-if="numTime>=5">万位</td>
          <td v-if="numTime>=4">千位</td>
          <td>百位</td>
          <td>十位</td>
          <td>个位</td>
        </tr>
      </table>
      <trend-mathches30 v-if="prizenum" v-show="istrendcanvas && expiration==30" ref="can" class="mathche" :showNum="betpageLength" :data="data" :num="numTime"></trend-mathches30>
      <trend-mathches50 v-if="prizenum" v-show="istrendcanvas && expiration==50" ref="can" class="mathche" :showNum="betpageLength" :data="data" :num="numTime"></trend-mathches50>
    </div>
    <!--加载动画-->
    <div class="loading">
      <loading :show="loading.show" :text="loading.text"></loading>
    </div>
  </div>
</template>
<script>
  import trendMathches30 from './trendMathches30'
  import trendMathches50 from './trendMathches50'
  export default {
    data () {
      return {
        msg: '大公鸡走势图！',
        numTime: 5,
        expiration: 30,
        radio7: '1',
        istrendcanvas: true,
        isshowTrend:true,
        isshow_yilou: true,
        options: [
          {
            "imgUrl": "http://shengshicai.f3322.net:9096/upload/images/201711/e080f3ea-6c4b-4e7c-a482-808b7346c8fd.png",
            "typeName": "官方时时彩",
            "gameRoomList": [
              {"gameRoomId": 1,
                "gameRoomName": "重庆时时彩",
                "imgUrl": "http://shengshicai.f3322.net:9096/upload/images/201712/0d4ba029-f783-4410-9978-19c7ba5c3fb2.png",
                "gameType": 1
              }, {
                "gameRoomId": 3,
                "gameRoomName": "新疆时时彩",
                "imgUrl": "http://shengshicai.f3322.net:9096/upload/images/201712/1d2bd4c4-a2c3-4789-8793-b360400abd19.png",
                "gameType": 3
              }, {
                "gameRoomId": 4,
                "gameRoomName": "黑龙江时时彩",
                "imgUrl": "http://shengshicai.f3322.net:9096/upload/images/201712/fc9841e5-500f-4bc9-8527-fa07e1755537.png",
                "gameType": 4
              }, {
                "gameRoomId": 2,
                "gameRoomName": "天津时时彩",
                "imgUrl": "http://shengshicai.f3322.net:9096/upload/images/201712/75e57e6c-58fa-463a-b989-d6e0f1770a1b.png",
                "gameType": 2
              }, {
                "gameRoomId": 8,
                "gameRoomName": "腾讯分分彩",
                "imgUrl": "http://shengshicai.f3322.net:9096/upload/images/201712/4b26ee45-5a22-41c6-9088-04fbf7a0d9bf.png",
                "gameType": 7
              }, {
                "gameRoomId": 26,
                "gameRoomName": "云南时时彩",
                "imgUrl": "http://shengshicai.f3322.net:9096/upload/images/201801/801e9b57-9b65-4499-a9b9-045f74a1e625.png",
                "gameType": 8
              }],
            "id": "2"
          },
          {
            "imgUrl": "http://shengshicai.f3322.net:9096/upload/images/201712/e28c7aa0-af0d-4f74-82fb-c757776dfcfe.png",
            "typeName": "低频彩",
            "gameRoomList": [{
              "gameRoomId": 6,
              "gameRoomName": "七星彩",
              "imgUrl": "http://shengshicai.f3322.net:9096/upload/images/201712/20f8c2f1-23a2-4874-a6a7-35940de8e323.png",
              "gameType": 6
            }, {
              "gameRoomId": 5,
              "gameRoomName": "排列五",
              "imgUrl": "http://shengshicai.f3322.net:9096/upload/images/201712/2fb51e6b-c9a7-4c75-8c18-e2ec3440e215.png",
              "gameType": 5
            }],
            "id": "6"
          },
          {
            "imgUrl": "http://shengshicai.f3322.net:9096/upload/images/201712/00b306d5-187a-4bd5-a968-fa13e70467c8.png",
            "typeName": "快三",
            "disabled":true,
            "gameRoomList": [{
              "gameRoomId": 9,
              "gameRoomName": "北京快三",
              "imgUrl": "http://shengshicai.f3322.net:9096/upload/images/201712/46377aff-342c-4cd3-a3d9-eb50f9e87e6e.png",
              "gameType": 101
            }, {
              "gameRoomId": 13,
              "gameRoomName": "北京骰宝",
              "imgUrl": "http://shengshicai.f3322.net:9096/upload/images/201712/39f4c75c-c3e8-47e6-948b-db2e18166e9c.png",
              "gameType": 201
            }, {
              "gameRoomId": 10,
              "gameRoomName": "吉林快三",
              "imgUrl": "http://shengshicai.f3322.net:9096/upload/images/201712/002feaf6-73aa-43a9-9597-c953ed07ee49.png",
              "gameType": 102
            }, {
              "gameRoomId": 16,
              "gameRoomName": "吉林骰宝",
              "imgUrl": "http://shengshicai.f3322.net:9096/upload/images/201712/ab1effe7-d3c1-42f4-b1c3-f7305a826e2e.png",
              "gameType": 202
            }, {
              "gameRoomId": 11,
              "gameRoomName": "广西快三",
              "imgUrl": "http://shengshicai.f3322.net:9096/upload/images/201712/e5f5a45c-8962-4d03-a298-cce1cfd5e455.png",
              "gameType": 105
            }, {
              "gameRoomId": 17,
              "gameRoomName": "内蒙古快三",
              "imgUrl": "http://shengshicai.f3322.net:9096/upload/images/201801/6df6990d-7be2-4e15-8f94-f7f6a7846e37.png",
              "gameType": 106
            }, {
              "gameRoomId": 18,
              "gameRoomName": "内蒙古骰宝",
              "imgUrl": "http://shengshicai.f3322.net:9096/upload/images/201801/fc37cb51-87b7-4add-93eb-29bbcbc50dde.png",
              "gameType": 206
            }, {
              "gameRoomId": 24,
              "gameRoomName": "广西骰宝",
              "imgUrl": "http://shengshicai.f3322.net:9096/upload/images/201801/75d07616-84ef-4148-9746-c7b5bd02e1ca.png",
              "gameType": 205
            }],
            "id": "3"
          },
          {
            "imgUrl": "http://shengshicai.f3322.net:9096/upload/images/201712/127d057a-991e-4351-8199-5545644f6e0b.png",
            "typeName": "北京赛车",
            "disabled":true,
            "gameRoomList": [{
              "gameRoomId": 15,
              "gameRoomName": "北京赛车",
              "imgUrl": "http://shengshicai.f3322.net:9096/upload/images/201712/520766d9-dcc9-4faa-8baa-cd5b386d5692.png",
              "gameType": 301
            }, {
              "gameRoomId": 27,
              "gameRoomName": "幸运飞艇",
              "imgUrl": "http://shengshicai.f3322.net:9096/upload/images/201801/d15549e6-c02a-45b9-8930-0b99ee69d870.png",
              "gameType": 302
            }],
            "id": "4"
          },
          {
            "imgUrl": "http://shengshicai.f3322.net:9096/upload/images/201802/7fcbfe76-0398-47b2-9570-a93434867d29.png",
            "typeName": "快乐十分",
            "disabled":true,
            "gameRoomList": [{
              "gameRoomId": 19,
              "gameRoomName": "广东快乐十分",
              "imgUrl": "http://shengshicai.f3322.net:9096/upload/images/201802/d9c0a5bc-da4c-446b-8b26-46cca632d9fd.png",
              "gameType": 401
            }, {
              "gameRoomId": 22,
              "gameRoomName": "湖南快乐十分",
              "imgUrl": "http://shengshicai.f3322.net:9096/upload/images/201802/a83224ca-be02-4ced-a546-cd4d4faeec96.png",
              "gameType": 402
            }, {
              "gameRoomId": 23,
              "gameRoomName": "重庆快乐十分",
              "imgUrl": "http://shengshicai.f3322.net:9096/upload/images/201802/1f63c98a-1e49-46e9-84b0-245ed87bf846.png",
              "gameType": 403
            }],
            "id": "8"
          },
          {
            "imgUrl": "http://shengshicai.f3322.net:9096/upload/images/201802/fe50d230-7e63-4cc6-bb22-f3bc9bb10873.png",
            "typeName": "11选5",
            "gameRoomList": [
              {
                "gameRoomId": 28,
                "gameRoomName": "广东11选5",
                "imgUrl": "http://shengshicai.f3322.net:9096/upload/images/201802/9d234102-ed4b-446d-bdc1-85bef5afc174.png",
                "gameType": 501
              },
              {
                "gameRoomId": 29,
                "gameRoomName": "江苏11选5",
                "gameType": 502,
                "imgUrl": "http://shengshicai.f3322.net:9096/upload/images/201803/d25f3ea7-dec2-4fd2-ba56-a87872d605ce.png"
              },{
                "gameRoomId": 30,
                "gameRoomName": "江西11选5",
                "gameType": 503,
                "imgUrl": "http://shengshicai.f3322.net:9096/upload/images/201803/ff174c2e-ce12-4be0-9664-6a07048fb47c.png"
              }
            ],
            "id": "9"
          }],
        value7: '大公鸡走势图',
        prizenum:[0,1,2,3,4,5,6,7,8,9],
        betpageLength:10,
        data: [],
        gameId:1,
        gameType:1,
        loading:{
          show:false,
          text:'加载中...'
        },
        betpage:{six:[9,10,11,13,16,17,18,24],ten:[1,2,3,4,5,6,8,26],eleven:[28,29,30]},
        prizeAll:{ten:[0,1,2,3,4,5,6,7,8,9],six:[1,2,3,4,5,6],eleven:[1,2,3,4,5,6,7,8,9,10,11]},
      }
    },
    mounted(){
      this.gameId  = this.$route.params.gameId;
      this.gameType  = this.$route.params.gameType;
      this.prizenum = this.getprizeNum(this.gameId);
      this.value7 = this.getGameName(this.options,this.gameId);

      this.getMathches(this.gameId,this.expiration);
    },
    methods:{
      getprizeNum(gameId){
        let objkey = 'ten';
        if(!gameId)return;
        let hasGame = false;
        for ( let key in this.betpage) {
          for (var i = 0; i <  this.betpage[key].length; i++) {
            if(gameId == this.betpage[key][i]){
              objkey = key;
              hasGame = true;
              break;
            }
          }
        }
        if(!hasGame){
          this.$message.warning('该彩种暂时没有走势分析，敬请期待！');
          return hasGame;
        }
        return this.prizeAll[objkey];
      },
      getMathches(gameId,expiration){
        this.loading.text='加载中...';
        this.loading.show=true;
        if(!this.getprizeNum(this.gameId)){
          this.loading.show = false;
          return;
        }
        this.betpageLength = this.getprizeNum(this.gameId).length;
        this.$api.gameMatchResultList({"roomId": gameId, "pageSize": expiration}).then(res => {
          if ( res.result ) {
            if(res.data.items.length<=0){
              this.loading.show=false;
              this.data = [];
              return;
            }
            this.data = res.data.items;

            this.getAllOtherTimeNum(this.getOtherNum('singleOrDouble'),'单');
            this.getAllOtherTimeNum(this.getOtherNum('bigOrSmall'),'大');
            /*this.data = [
             {
             bigOrSmall: "大",
             draganOrTiger: "龙",
             gameNo: "2018028",
             gameType: 6,
             openCode: [9,1,8,0],
             openDate: "2018-03-13 20:30:00",
             singleOrDouble: "单",
             sum: 27},
             {
             bigOrSmall: "大",
             draganOrTiger: "龙",
             gameNo: "2018028",
             gameType: 6,
             openCode: [9,3,1,2],
             openDate: "2018-03-13 20:30:00",
             singleOrDouble: "单",
             sum: 27},
             {
             bigOrSmall: "大",
             draganOrTiger: "龙",
             gameNo: "2018028",
             gameType: 6,
             openCode: [0,3,1,2],
             openDate: "2018-03-13 20:30:00",
             singleOrDouble: "单",
             sum: 27},
             {
             bigOrSmall: "大",
             draganOrTiger: "龙",
             gameNo: "2018028",
             gameType: 6,
             openCode: [5,3,8,9],
             openDate: "2018-03-13 20:30:00",
             singleOrDouble: "单",
             sum: 27}
             ,{
             bigOrSmall: "大",
             draganOrTiger: "龙",
             gameNo: "2018028",
             gameType: 6,
             openCode: [7,6,3,1],
             openDate: "2018-03-13 20:30:00",
             singleOrDouble: "单",
             sum: 27},
             {
             bigOrSmall: "大",
             draganOrTiger: "龙",
             gameNo: "2018028",
             gameType: 6,
             openCode: [0,9,0,2],
             openDate: "2018-03-13 20:30:00",
             singleOrDouble: "单",
             sum: 27},
             {
             bigOrSmall: "大",
             draganOrTiger: "龙",
             gameNo: "2018028",
             gameType: 6,
             openCode: [0,9,4,2],
             openDate: "2018-03-13 20:30:00",
             singleOrDouble: "单",
             sum: 27}
             ]*/
            this.numTime = this.data[0].openCode.length;
          } else {
            this.remoteLogin(res);
          }
          this.loading.show=false;
        })
      },
      gotobetpage(){
        this.$router.push({path:'/betpage/'+this.gameId+'/'+this.gameType});
      },
      //获取各个位数数组
      getnum(num){
        if(this.numTime<num)return [];
        let numdata = [];
        for ( let i = 0; i < this.data.length; i++ ) {
          numdata.push(this.data[i].openCode[this.numTime - num]);
        }
        return numdata;
      },
      //获取各个位数数组
      getOtherNum(type){
        let numdata = [];
        for ( let i = 0; i < this.data.length; i++ ) {
          numdata.push(this.data[i][type]);
        }
        return numdata;
      },
      getAllOtherTimeNum(data,type){
        let numdata = [0,0]
        for (var i = 0; i <  data.length; i++) {
          if(data[i]==type){
            numdata[0]++;
          }else{
            numdata[1]++;
          }
        }
        return numdata;
      },
      getchange(){
        if ( this.gameId == this.value7.gameRoomId ) {
          this.$message.warning('您选择的彩种（' + this.value7.gameRoomName + '）是当前彩种！')
          this.value7 = this.value7.gameRoomName;
          return;
        }
        this.gameId = this.value7.gameRoomId;
        this.gameType = this.value7.gameType;
        this.prizenum = this.getprizeNum(this.gameId);
        this.value7 = this.value7.gameRoomName;
        this.$router.push('/public/trend/'+ this.gameId+"/"+this.gameType);
        this.getMathches(this.gameId,this.expiration);
      },
      getExpiration(num){
        this.expiration = num;
        this.getMathches(this.gameId,this.expiration);
      },
      //展示图表数组
      getshowArr(num){
        if(this.loading.show){return [];}
        //位数数组
        if(this.numTime<num){return [];}
        let arrNum = this.getnum(num);
        let newArr = [];
        let arr = [{num: 0, isshow: false,isnum:0}, {num: 0, isshow: false,isnum:0}, {num: 0, isshow: false,isnum:0}, {num: 0, isshow: false,isnum:0}, {num: 0, isshow: false,isnum:0}, {num: 0, isshow: false,isnum:0}, {num: 0, isshow: false,isnum:0}, {num: 0, isshow: false,isnum:0}, {num: 0, isshow: false,isnum:0}, {num: 0, isshow: false,isnum:0},{num: 0, isshow: false,isnum:0}];
        arr = arr.slice(0,this.prizenum.length);
        for ( let i = arrNum.length - 1; i >= 0; i-- ) {

          let temp = [{num: 0, isshow: false,isnum:0}, {num: 0, isshow: false,isnum:0}, {num: 0, isshow: false,isnum:0}, {num: 0, isshow: false,isnum:0}, {num: 0, isshow: false,isnum:0}, {num: 0, isshow: false,isnum:0}, {num: 0, isshow: false,isnum:0}, {num: 0, isshow: false,isnum:0}, {num: 0, isshow: false,isnum:0}, {num: 0, isshow: false,isnum:0},{num: 0, isshow: false,isnum:0}];
          temp = temp.slice(0,this.prizenum.length);

          for ( let j = 0; j < arr.length; j++ ) {
            arr[j].num++;
            arr[j].isshow = false;
            arr[j].isnum = 0;
          }
          for ( let k = arrNum.length; k >= i; k-- ) {
            if (arrNum[i] == arrNum[k]){
              if(this.betpageLength==6 || this.betpageLength==11){
                arr[arrNum[i]-1].num = 0;
                arr[arrNum[i]-1].isnum = arrNum[k];
                arr[arrNum[i]-1].isshow = true;
              }else{
                arr[arrNum[i]].num = 0;
                arr[arrNum[i]].isnum = arrNum[k];
                arr[arrNum[i]].isshow = true;
              }
            }
          }
          for ( let j = 0; j < arr.length; j++ ) {
            temp[j].num = arr[j].num;
            temp[j].isshow = arr[j].isshow;
            if ( arr[j].isshow ) {
              temp[j].isnum = arr[j].isnum;
            }
          }
          newArr.unshift(temp);
        }
        return newArr;
      },
      //出现所有的总次数
      getAllNum(num, type){
        let newArr = [];
        switch ( type ) {
          //出现总次数
          case 1:
            for ( let i = 0; i < num; i++ ) {
              newArr.push(this.getAllTimeNum(num-i));
            }
            break;
          //最大连出值
          case 2:
            for ( let i = 0; i < num; i++ ) {
              newArr.push(this.getContinuityNum(num-i));
            }

            break;
          //最大遗漏值
          case 3:
            for ( let i = 0; i < num; i++ ) {
              newArr.push(this.getMaximalNum(num-i));
            }
            break;
          default:
            console.log('10001');
        }
        return newArr;
      },
      //出现总次数
      getAllTimeNum(num){
        if(this.numTime<num)return [];
        let arrNum = this.getnum(num);
        let newArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        newArr = newArr.slice(0,this.betpageLength);
        for ( let i = 0; i < arrNum.length; i++ ) {
          if(this.betpageLength==6 || this.betpageLength==11){
            newArr[arrNum[i]-1]++;
          }else{
            newArr[arrNum[i]]++;
          }
        }
        return newArr;
      },
      //连续出现的最大次数
      getContinuityNum(num){
        if(this.numTime<num)return [];
        let arrNum = this.getnum(num);
        let newArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        newArr = newArr.slice(0,this.betpageLength);
        for ( let i = 0; i < newArr.length; i++ ) {
          newArr[i] = this.getContinuityCheck(arrNum,this.prizenum[i])
        }
        return newArr;
      },
      //相隔最大的次数
      getMaximalNum(num){
        let arrNum = this.getshowArr(num);
        let newArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        newArr = newArr.slice(0,this.betpageLength);
        for ( let i = 0; i < arrNum.length; i++ ) {
          let temparr = arrNum[i];
          for ( let j = 0; j < temparr.length; j++ ) {
            let item = temparr[j];
            if ( newArr[j] <= item.num ) {
              newArr[j] = item.num;
            }
          }
        }
        return newArr;
      },
      //计算某个数字连续出现的次数
      getContinuityCheck(test, c){
        if ( Object.prototype.toString.call(test) != '[object Array]' )return;
        let j = 0;
        let max = 0;
        for(let i = 0;i<test.length;i++){
          if ( test[i] == c ) {
            j++;
          } else {
            if ( j > max ) {
              max = j;
            }
            j = 0;
          }
        }
        if(j>max) max = j ;
        return max;
      },
      //找到gamename
      getGameName(option,gameId){
        let gameName = '';
        for (let i = 0; i <  option.length; i++) {
          for (var j = 0; j <  option[i].gameRoomList.length; j++) {
            let item = option[i].gameRoomList[j];
            if(item.gameRoomId == gameId){
              gameName = item.gameRoomName;
              break;
            }
          }
        }
        return gameName;
      }
    },
    components: {trendMathches30,trendMathches50}
  }
</script>
<style lang="scss" scoped>
  .mathche {
    position: absolute;
    top: 120px;
    left: 0;
    z-index: 998;
  }

  .pt65 {
    padding-top: 65px;
  }

  .w110 {
    width: 120px;
  }

  .w70 {
    width: 80px;
  }
  .w30{
    width: 30px;
  }
  .w15{
    width: 15px;
  }
  li.w10p{
    width: 10%;
  }
  li.w11p{
    width: 9.09%;
  }
  li.w6p{
    width: 16.66%;
  }

  .container {
    position: relative;
    font-size: 12px;
    background-color: #fff;
    margin: 0 auto;
    width: 1400px;

  .trend-t-left {
    float: left;
    padding: 10px 0px;
  }

  .trend-t-right {
    float: right;
    padding: 10px;
  }

  .trend {
    border-collapse: collapse;
    text-align: center;
    width: 1400px;

  .trend-title {
    background-color: #409EFF;
    width: 100%;
  .w10p{
    width: 10%;
  }
  &
  >
  td {
    font-size: 14px;
    color: #ffffff;
    border-color: #eeeeee;
    border-style: solid;
    border-width: 0px 1px 1px 0px;
    padding: 8px 0px;
  }

  }
  .trend-tr {
    background-color: #fff;
  &
  >
  td {
    border-color: #dddddd;
    border-width: 0px 1px 0px 1px;
    border-style: solid;
  }

  .trend-one {
    width: 100%;

  &
  >
  li {
    width: 100%;
  }

  }
  .trend-two {
    width: 100%;
  &>li {
      float: left;
      padding: 6px 0;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;

  span {
    display: inline-block;
    width: 100%;
    height: 100%;
    width: 18px;
    color: #666666;
    text-align: center;
    height: 18px;
    line-height: 18px;
  }
  .istrue_opac{
    visibility:hidden;
  }

  }
  .active {

  span {
    position: relative;
    z-index: 999;
    color: #ffffff;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    background-color: #409EFF;
  }

  }
  }
  }
  .numTime {
    width: 100%;

  li {
    float: left;
    font-size: 12px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  }
  .num-title {
    width: 100%;

  li {
    padding: 6px 0;

  span {
    display: inline-block;
    width: 100%;
    height: 100%;
    text-align: center;
    height: 18px;
    line-height: 18px;
  }

  }
  }
  }
  }
</style>
