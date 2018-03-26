<template>
  <div class="playsBall" v-model="balls">
    <ul>
      <li v-for="items in data">
        <div class="content-item">
          <p class="tit-badge"><span>{{dingweiName}}</span></p>
          <div class="ballsNum clearfix">
            <el-checkbox-group v-model="items.number" class="items-balls">
              <el-checkbox-button v-for="balls in items.numText" :label="balls" :key="balls" class="items-ball" ><p>{{balls}}</p></el-checkbox-button>
            </el-checkbox-group>
          </div>
          <div class="selBtn clearfix">
            <el-radio-group v-model="items.btnNumber"class="items-btns">
              <el-radio-button v-for="(item,index) in items.btnText" :label="item" :key="index" class="items-btn" ><p @click="btnClick(item,items)">{{item}}</p></el-radio-button>
            </el-radio-group>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  const  numlist = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20"];
  const  btnlist = ['全','大','小','双','单','清'];
  export default {
    props:['params'],
    data(){
      return {
        count_zs :0,      //总注数
        backWater :0,     //返回水位
        responseData:{},  //返回结果
        betInput:{},
        data:[
          {name:'定位胆1',number:[],numText:numlist,btnNumer:[],btnText:btnlist,id:1},
        ],
        dingweiName:''
      }
    },
    created(){
      let vm = this;
      let playType = vm.params.playType;
      console.log(playType)
      if(playType == 5000){
        vm.dingweiName = '定位胆1';
      }else if(playType == 5001){
        vm.dingweiName = '定位胆2';
      }else if(playType == 5002){
        vm.dingweiName = '定位胆3';
      }else if(playType == 5003){
        vm.dingweiName = '定位胆4';
      }else if(playType == 5004){
        vm.dingweiName = '定位胆5';
      }else if(playType == 5005){
        vm.dingweiName = '定位胆6';
      }else if(playType == 5006){
        vm.dingweiName = '定位胆7';
      }else if(playType ==5007){
        vm.dingweiName = '定位胆8';
      }else {
        vm.dingweiName = '号码';
      }
    },
    computed: {
      //计算投注的总注数
      balls(){
        let vm  =this;
        let numLen= vm.data[0].number.length;

        //任选二
        if(vm.params.playType == 5010){
          if(numLen>1){
            vm.count_zs = numLen*(numLen-1)/2;
          }else {
            vm.count_zs =0
          }
        }
        //任选三
        else if(vm.params.playType == 5013){
          if(numLen>2){
            vm.count_zs = numLen*(numLen-1)*(numLen-2)/6;
          }else {
            vm.count_zs =0
          }
        }
        //任选四
        else if(vm.params.playType == 5018){
          if(numLen>3){
            vm.count_zs = numLen * (numLen-1) * (numLen-2) * (numLen-3)/24;
          }else {
            vm.count_zs =0
          }
        }
        //任选五
        else if(vm.params.playType == 5019){
          if(numLen>4){
            vm.count_zs = numLen*(numLen-1)*(numLen-2)*(numLen-3)*(numLen-4)/120;
          }else {
            vm.count_zs = 0;
          }
          //选二连组
        }else if(vm.params.playType == 5012){
          if(numLen>1){
            vm.count_zs = numLen*(numLen-1)/2 ;
          }else {
            vm.count_zs = 0 ;
          }
        }
        //选三前组
        else if(vm.params.playType == 5016){
          if(numLen>2){
            vm.count_zs = numLen*(numLen-1) * (numLen-2)/6
          }else {
            vm.count_zs = 0 ;
          }
        }
        //选三后组
        else if(vm.params.playType == 5017){
          if(numLen>2){
            vm.count_zs = numLen*(numLen-1) * (numLen-2)/6
          }else {
            vm.count_zs = 0 ;
          }
        }
        else {
          //定位胆
          vm.count_zs = numLen
        }

        vm.betInput= {"all":vm.data[0].number};

        vm.responseData.betContent = vm.data[0].number.sort().toString();
        vm.responseData.count_zs   = vm.count_zs;
        vm.responseData.betInput   = vm.betInput;
        vm.clearNumber(vm.data);                   //清除选中号码
        if(vm.$store.getters.isAddOrder){
          vm.responseData.count_zs   = 0;
        }
        vm.$emit('responseData',vm.responseData);  //调用父组件的自定义事件，并传值
      }
    },

    methods: {
      ballClick(){
        let vm = this;
        for(var key in vm.data){
          vm.data[key].btnNumer = []
        }
      },
      btnClick(btnText,items){
        let vm = this;
        if(btnText=="全"){
          items.number = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20"];
        }else if(btnText =="单"){
          items.number = ["01","03","05","07","09","11","13","15","17","19"];
        }
        else if(btnText =="双"){
          items.number = ["02","04","06","08","10","12","14","16","18","20"];
        }
        else if(btnText =="大"){
          items.number = ["11","12","13","14","15","16","17","18","19","20"];
        }
        else if(btnText =="小"){
          items.number = ["01","02","03","04","05","06","07","08","09","10"];
        }else{
          items.number = [];
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .playsBall{
    height: auto;
    margin-top: 10px;
    background-color: #ffffff;
  ul{
    padding: 10px 20px;
  }
  .content-item{
    padding: 4px 8px;
  .tit-badge{
    float: left;
    width: 60px;
    height: 40px;
    line-height: 40px;
  span{
    display: block;
    margin-top: 15px;
    padding: 2px 0;
    width: 50px;
    height: 20px;
    line-height: 20px;
    font-size: 13px;
    text-align: center;
    background:rgb(11,175,236);
    border-radius: 0 100px 100px 0;
    color: #fff;
  }
  }
  .ballsNum{
    float: left;
    max-width:620px;
    width: 620px;
  }
  .selBtn{
    min-width:400px;
    margin-top: 12px;
  }
  }
  }
</style>
