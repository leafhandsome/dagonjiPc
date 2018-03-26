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
  const  numlist = ["01","02","03","04","05","06","07","08","09","10","11"]
  const  btnlist = ['全','大','小','双','单','清'];
  export default {
    props:['params'],
    data(){
      return {
        count_zs :0,      //总注数
        responseData:{},  //返回结果
        betInput:{},
        showBtn : true,
        data:[
          {name:'选号',number:[],numText:numlist,btnNumer:[],btnText:btnlist,id:1},
        ],
      }
    },
    computed: {
      //计算投注的总注数
      balls(){
        let vm  =this;
        let len = 0;
        len = vm.data[0].number.length;

        //前三组选复式
        if(vm.params.playType == 6002){
          if(len>2){
            vm.count_zs = len*(len-1)*(len-2)/6;
          }else {
            vm.count_zs = 0
          }
          vm.betInput= {"all":vm.data[0].number} ;
        }
        //前二组选复式
        else if(vm.params.playType == 6007){
          if(len>1){
            vm.count_zs = len*(len-1)/2;
          }else {
            vm.count_zs = 0
          }
          vm.betInput= {"all":vm.data[0].number} ;
        }
        //不定位 任一中一
       else if(vm.params.playType == 6010 || vm.params.playType == 6012 ){
          if(len>0){
            vm.count_zs = len
          }else {
            vm.count_zs = 0
          }
          vm.betInput= {"all":vm.data[0].number} ;
        }
        //任二中二 n*(n-1)/2
        else if(vm.params.playType == 6013 ){
          if(len>1){
            vm.count_zs = len*(len-1)/2
          }else {
            vm.count_zs = 0
          }
          vm.betInput= {"all":vm.data[0].number} ;
        }
         //任三中三 n*(n-1)*(n-2)/6
        else if(vm.params.playType == 6014){
          if(len>2){
            vm.count_zs = len*(len-1)*(len-2)/6
          }else {
            vm.count_zs = 0
          }
          vm.betInput= {"all":vm.data[0].number};
        }
        //任四中四 n*(n-1) *(n-2) *(n-3)/24
        else if(vm.params.playType == 6015){
          if(len>3){
            vm.count_zs = len*(len-1) *(len-2) *(len-3)/24
          }else {
            vm.count_zs = 0
          }
          vm.betInput= {"all":vm.data[0].number};
        }
        //任五中五 n*(n-1) *(n-2) *(n-3) *(n-4)/120
        else if(vm.params.playType == 6016){
          if(len>4){
            vm.count_zs = len*(len-1) *(len-2) *(len-3) *(len-4)/120
          }else {
            vm.count_zs = 0
          }
          vm.betInput= {"all":vm.data[0].number};
        }
        //任六中五 n*(n-1)*(n-2)*(n-3)*(n-4)*(n-5)/720
        else if(vm.params.playType == 6017){
          if(len>5){
            vm.count_zs = len*(len-1) *(len-2) *(len-3) *(len-4)*(len-5)/720
          }else {
            vm.count_zs = 0
          }
          vm.betInput= {"all":vm.data[0].number};
        }
        //任七中五 n*(n-1)*(n-2)*(n-3)*(n-4)*(n-5)*(n-6)/5040
        else if(vm.params.playType == 6018){
          if(len>6){
            vm.count_zs = len*(len-1) *(len-2) *(len-3) *(len-4)*(len-5)*(len-6)/5040
          }else {
            vm.count_zs = 0
          }
          vm.betInput= {"all":vm.data[0].number};
        }
        //任八中五 n*(n-1)*(n-2)*(n-3)*(n-4)*(n-5)*(n-6)*(n-7)/40320
        else if(vm.params.playType == 6019){
          if(len>7){
            vm.count_zs = len*(len-1) *(len-2) *(len-3) *(len-4)*(len-5)*(len-6)*(len-7)/40320
          }else {
            vm.count_zs = 0
          }
          vm.betInput= {"all":vm.data[0].number};
        }
        else {

        }
        vm.responseData.betContent = {"选号":vm.data[0].number.sort().toString()};
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
          items.number = ["01","02","03","04","05","06","07","08","09","10","11"];
        }else if(btnText =="单"){
          items.number = ["01","03","05","07","09","11"];
        }
        else if(btnText =="双"){
          items.number = ["02","04","06","08","10"];
        }
        else if(btnText =="大"){
          items.number = ["06","07","08","09","10","11"];
        }
        else if(btnText =="小"){
          items.number = ["01","02","03","04","05"];
        }else{
          items.number = [];
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .playsBall{
    height:150px;
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
