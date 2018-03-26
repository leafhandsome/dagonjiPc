<template>
  <div class="playsBall" v-model="balls">
    <ul>
      <li v-for="items in data">
        <div class="content-item">
          <p class="tit-badge"><span>{{items.name}}</span></p>
          <div class="ballsNum clearfix">
            <el-checkbox-group v-model="items.number" class="items-balls">
              <el-checkbox-button v-for="balls in items.numText" :label="balls" :key="balls" class="items-ball"><p @click="ballClick">{{balls}}</p></el-checkbox-button>
            </el-checkbox-group>
          </div>
          <div class="selBtn clearfix" v-if="showBtn">
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
  import Params from '../../../common/data/Param.json';
  export  default {
    props:['params'],
    data(){
      return{
        data:[
          {id:1,name:'选号',number:[],numText:Params.numlist,btnNumber:[],btnText:Params.btnlist,inputName:'manys'},
        ],
        count_zs :0,      //总注数
        responseData:{},  //返回结果
        showBtn : true,
        betInput:{},
      }
    },
    created(){
      let type = this.params.playType
      if(type == 20 ||type == 22 || type == 24 || type == 4030 || type == 4032 || type == 4034){
        this.showBtn = false;
      }
    },
    computed: {
      //计算投注的总注数
      balls(){
        let vm  =this;
        let len = 0;
        len = vm.data[0].number.length;
        //一字现
        if(vm.params.playType == 12 || vm.params.playType == 4010){
          if(len>0){
            vm.count_zs = len
          }else {
            vm.count_zs = 0
          }
          vm.betInput= {"all":vm.data[0].number} ;
        }
        //二字现 n*(n-1)/2
        if(vm.params.playType == 13 || vm.params.playType == 4011){
          if(len>1){
            vm.count_zs = len*(len-1)/2
          }else {
            vm.count_zs = 0
          }
          vm.betInput= {"all":vm.data[0].number} ;
        }
        //三字现 n*(n-1)*（n-2）/6
        if(vm.params.playType == 14 || vm.params.playType == 4012){
          if(len>2){
            vm.count_zs =len*(len-1) *(len-2)/6
          }else {
            vm.count_zs = 0
          }
          vm.betInput= {"all":vm.data[0].number} ;
        }
        //四字现 n*(n-1)*（n-2）（n-3）/24
        if(vm.params.playType == 15 || vm.params.playType == 4013){
          if(len>3){
            vm.count_zs =len*(len-1)*(len-2)*(len-3)/24;
          }else {
            vm.count_zs = 0
          }
          vm.betInput= {"all":vm.data[0].number} ;
        }
        //一定位全倒 n*4
        if(vm.params.playType == 16 || vm.params.playType == 4020){
          if(len>0){
            vm.count_zs =len*4
          }else {
            vm.count_zs = 0
          }
          vm.betInput= {"all":vm.data[0].number} ;
        }
        //二定位全倒 6*n*(n-1)
        if(vm.params.playType == 17 || vm.params.playType == 4021){
          if(len>1){
            vm.count_zs =6*len*(len-1)
          }else {
            vm.count_zs = 0
          }
          vm.betInput= {"all":vm.data[0].number} ;
        }
        //三定位全倒 4*n*(n-1)*(n-2)
        if(vm.params.playType == 18 || vm.params.playType == 4022){
          if(len>2){
            vm.count_zs =4*len*(len-1)*(len-2)
          }else {
            vm.count_zs = 0
          }
          vm.betInput= {"all":vm.data[0].number} ;
        }
        //四定位全倒 n*（n-1）*（n-2）*（n-3）
        if(vm.params.playType == 19 || vm.params.playType == 4023){
          if(len>3){
            vm.count_zs =len*(len-1)*(len-2)*(len-3)
          }else {
            vm.count_zs = 0
          }
          vm.betInput= {"all":vm.data[0].number} ;
        }
        //二字现双重 - 三字现三重
        if(vm.params.playType == 20 || vm.params.playType == 22 || vm.params.playType == 4030|| vm.params.playType == 4032){
          if(len>1){
            vm.data[0].number.shift();
            vm.count_zs = 1;
          }else if(len ==1){
            vm.count_zs = 1 ;
          }else {
            vm.count_zs = 0 ;
          }
          vm.betInput= {"manys":vm.data[0].number} ;
        }
        //四字现二双重
        if(vm.params.playType == 24 || vm.params.playType == 4034){
          if(len>2){
            vm.data[0].number.shift();
            vm.count_zs = 1;
          }else if(len ==2){
            vm.count_zs = 1 ;
          }else {
            vm.count_zs = 0 ;
          }
          vm.betInput= {"manys":vm.data[0].number} ;
        }
        //二定位双重全倒
        if(vm.params.playType == 26 || vm.params.playType == 4040){
          if(len>0){
            vm.count_zs =6*len
          }else {
            vm.count_zs = 0
          }
          vm.betInput= {"manys":vm.data[0].number} ;
        }
        //三定位三重全倒
        if(vm.params.playType == 28 || vm.params.playType == 4042){
          if(len>0){
            vm.count_zs =4 * len
          }else {
            vm.count_zs = 0
          }
          vm.betInput= {"manys":vm.data[0].number} ;
        }
        //四定位二双重全倒
        if(vm.params.playType == 30 || vm.params.playType == 4044){
          if(len>0){
            vm.count_zs = 3*len*(len -1)
          }else {
            vm.count_zs = 0
          }
          vm.betInput= {"manys":vm.data[0].number} ;
        }
        //一帆风顺，好事成双，三星报喜，四季发财
        if(vm.params.playType == 178 ||vm.params.playType == 179 ||vm.params.playType == 180 ||vm.params.playType == 181){
          if(len>0){
            vm.count_zs = len ;
          }else {
            vm.count_zs = 0
          }
          vm.betInput= {"all":vm.data[0].number} ;
        }
        //，珠1值，珠2值，
        if(vm.params.playType == 230 ||vm.params.playType == 240){
          if(len>0){
            vm.count_zs = len ;
          }else {
            vm.count_zs = 0
          }
          vm.betInput= {"manys":vm.data[0].number} ;
        }

        vm.responseData.count_zs   = vm.count_zs;
        vm.responseData.betInput   = vm.betInput;
        vm.responseData.betContent = {"选号":vm.data[0].number.sort().toString()};
        vm.clearNumber(vm.data);                   //清除选中号码
        if(vm.$store.getters.isAddOrder){
          vm.responseData.count_zs   = 0;
        }
        vm.$emit('responseData',vm.responseData);  //调用父组件的自定义事件，并传值
      }
    },
    methods:{
      ballClick(){
        let vm = this;
        for(var key in vm.data){
          vm.data[key].btnNumer = []
        }
      },
      btnClick(btnText,items){
        let vm = this;
        if(btnText=="全"){
          items.number = [0,1,2,3,4,5,6,7,8,9];
        }else if(btnText =="单"){
          items.number = [1,3,5,7,9];
        }
        else if(btnText =="双"){
          items.number = [0,2,4,6,8];
        }
        else if(btnText =="大"){
          items.number = [5,6,7,8,9];
        }
        else if(btnText =="小"){
          items.number = [0,1,2,3,4];
        }else{
          items.number =  [];
          return;
        }
      }
    }
  }

</script>

<style lang="scss" scoped>
  .playsBall{
    height:100px;
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
