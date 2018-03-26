<template>
  <div class="playsBall" v-model="balls">
    <ul>
      <li v-for="items in data">
        <div class="content-item">
          <p class="tit-badge"><span>{{items.name}}</span></p>
          <div class="ballsNum clearfix">
            <el-checkbox-group v-model="items.number" class="items-balls">
              <el-checkbox-button v-for="balls in items.numText" :label="balls" :key="balls" class="items-ball" ><p @click="ballClick(items)">{{balls}}</p></el-checkbox-button>
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
  import Params  from '../../../common/data/Param.json';
  export  default {
    props:['params'],
    data(){
      return{
        data:[
          {id:1,name:'万位',number:[],numText:Params.numlist,btnNumber:[],btnText:Params.btnlist,inputName:'thousands'},
          {id:2,name:'千位',number:[],numText:Params.numlist,btnNumber:[],btnText:Params.btnlist,inputName:'hundrs'},
          {id:3,name:'百位',number:[],numText:Params.numlist,btnNumber:[],btnText:Params.btnlist,inputName:'tens'},
          {id:4,name:'十位',number:[],numText:Params.numlist,btnNumber:[],btnText:Params.btnlist,inputName:'ones'},
          {id:5,name:'个位',number:[],numText:Params.numlist,btnNumber:[],btnText:Params.btnlist,inputName:'specials'}
        ],
        betInput:{},
        betContent:{},
        count_zs :0,      //总注数
        responseData:{},  //返回结果,
        selNum :[],
      }
    },
    created(){
      let vm = this;
      let type = vm.params.playType ;
      if(type==4000 ||type==4001 ||type==4002 ||type==4003){
        vm.data=[
          {id:1,name:'千位',number:[],numText:Params.numlist,btnNumer:[],btnText:Params.btnlist,inputName:'thousands'},
          {id:2,name:'百位',number:[],numText:Params.numlist,btnNumer:[],btnText:Params.btnlist,inputName:'hundrs'},
          {id:3,name:'十位',number:[],numText:Params.numlist,btnNumer:[],btnText:Params.btnlist,inputName:'tens'},
          {id:4,name:'个位',number:[],numText:Params.numlist,btnNumer:[],btnText:Params.btnlist,inputName:'ones'},
        ],
          vm.row =4;
      }
    },
    computed: {
      //计算投注的总注数
      balls(){
        let vm  = this;
        let selcount = vm.selNum.length;
        vm.count_zs = 0 ;
        //一定位
        if(vm.params.playType==8 || vm.params.playType==4000) {
          vm.betInput = {};
          vm.betContent = {};
          for (var key in vm.data) {
            let len = vm.data[key].number.length;
            if (len > 0 ) {
              vm.betInput[vm.data[key].inputName] = vm.data[key].number;
              vm.betContent[vm.data[key].name] = vm.data[key].number.sort().toString();
              vm.count_zs = len
            }
          }
          //二定位
        }else if(vm.params.playType==9 || vm.params.playType==4001 && selcount==2){
          let count =0;
          vm.betInput = {};
          vm.betContent = {};
          vm.count_zs =1;
          for (var key in vm.data) {
            let len = vm.data[key].number.length;
            if (len > 0) {
              count++;
              vm.count_zs*= len;
              vm.betInput[vm.data[key].inputName] = vm.data[key].number;
              vm.betContent[vm.data[key].name] = vm.data[key].number.sort().toString();
            }
          }
          if(count!=2){
            vm.count_zs =0;
          }
          //三定位
        }else if(vm.params.playType==10 || vm.params.playType==4002 && selcount==3){
          let count =0;
          vm.betInput = {};
          vm.betContent = {};
          vm.count_zs =1;
          for (var key in vm.data) {
            let len = vm.data[key].number.length;
            if (len > 0) {
              count++;
              vm.count_zs*= len;
              vm.betInput[vm.data[key].inputName] = vm.data[key].number;
              vm.betContent[vm.data[key].name] = vm.data[key].number.sort().toString();
            }
          }
          if(count!=3){
            vm.count_zs =0;
          }
          //四定位
        }else if(vm.params.playType == 11 || vm.params.playType==4003 && selcount==4) {
          let count = 0;
          vm.betInput = {};
          vm.betContent = {};
          vm.count_zs = 1;
          for (var key in vm.data) {
            let len = vm.data[key].number.length;
            if (len > 0) {
              count++;
              vm.count_zs *= len;
              vm.betInput[vm.data[key].inputName] = vm.data[key].number;
              vm.betContent[vm.data[key].name] = vm.data[key].number.sort().toString();
            }
          }
          if (count != 4) {
            vm.count_zs = 0;
          }
        }
        vm.responseData.betInput   = vm.betInput;
        vm.responseData.betContent = vm.betContent;
        vm.responseData.count_zs   = vm.count_zs;
        vm.clearNumber(vm.data);                   //清除选中号码
        if(vm.$store.getters.isAddOrder){
          vm.responseData.count_zs   = 0;
        }
        vm.$emit('responseData',vm.responseData);  //调用父组件的自定义事件，并传值
      }
    },
    methods:{
      addBall(){
        let vm = this;
        for(var key in vm.data){
          //一定位
          if(vm.params.playType==8 || vm.params.playType==4000){
            if(vm.data[key].id!=vm.selNum[0]){
              vm.data[key].number = []
            }
          }
          //二定位
          else if(vm.params.playType==9 || vm.params.playType==4001){
            if(vm.data[key].id!=vm.selNum[0] && vm.data[key].id!=vm.selNum[1]){
              vm.data[key].number = []
            }
          }
          //三定位
          else if(vm.params.playType==10 || vm.params.playType==4002){
            if(vm.data[key].id!=vm.selNum[0] && vm.data[key].id!=vm.selNum[1] && vm.data[key].id!=vm.selNum[2]){
              vm.data[key].number = []
            }
          }
          //四定位
          else if(vm.params.playType==11 || vm.params.playType==4003){
            if(vm.data[key].id!=vm.selNum[0] && vm.data[key].id!=vm.selNum[1] && vm.data[key].id!=vm.selNum[2] && vm.data[key].id!=vm.selNum[3]){
              vm.data[key].number = []
            }
          }
        }
      },
      //选择号码
      selBall(items){
        let vm = this;
        if(vm.contains(vm.selNum,items.id)){
          vm.removeByValue(items.id);
        }
        else {
          vm.selNum.push(items.id);
        }
        //一定位
        if(vm.params.playType == 8 || vm.params.playType==4000){
          if(vm.selNum.length>1){
            vm.selNum.shift();
          }
        }
        //二定位
        else if(vm.params.playType == 9 || vm.params.playType==4001){
          if(vm.selNum.length>2){
            vm.selNum.shift();
          }
        }
        //三定位
        else if(vm.params.playType == 10 || vm.params.playType==4002){
          if(vm.selNum.length>3){
            vm.selNum.shift();
          }
        }
        //四定位
        else if(vm.params.playType == 11 || vm.params.playType==4003){
          if(vm.selNum.length>4){
            vm.selNum.shift();
          }
        }
      },
      ballClick(items){
        let vm = this;
        vm.selBall(items);
        vm.addBall();
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
        vm.selBall(items);
        vm.addBall();
      }
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
