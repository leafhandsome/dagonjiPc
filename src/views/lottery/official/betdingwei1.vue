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
  export default {
    props:['params'],
    data(){
      return {
        count_zs :0,      //总注数
        responseData:{},  //返回结果
        betInput:{},
        showBtn : true,
        data:[
          {name:'选号',number:[],numText:Params.numlist,btnNumer:[],btnText:Params.btnlist,id:1},
        ],
      }
    },
    created(){
      let type = this.params.playType
      if(type == 77){
        this.showBtn = false;
      }
    },
    computed: {
      //计算投注的总注数
      balls(){
        let vm  =this;
        let len = 0;
        len = vm.data[0].number.length;
        //前三一码，中三一码，后三一码，五星一码
        if(vm.params.playType == 130 || vm.params.playType == 131 ||vm.params.playType == 132 ||vm.params.playType == 133){
          if(len>0){
            vm.count_zs = len
          }else {
            vm.count_zs = 0
          }
          vm.betInput= {"all":vm.data[0].number} ;
        }
        //五星二码计重 n*(n-1)/2
        else if(vm.params.playType == 134 ||vm.params.playType == 136){
          if(len>1){
            vm.count_zs = len*(len-1)/2
          }else {
            vm.count_zs = 0
          }
          vm.betInput= {"all":vm.data[0].number} ;
        }
         //五星三码计重 n*(n-1)*(n-2)/6
        else if(vm.params.playType == 135 || vm.params.playType == 137){
          if(len>2){
            vm.count_zs = len*(len-1)*(len-2)/6
          }else {
            vm.count_zs = 0
          }
          vm.betInput= {"all":vm.data[0].number};
        }
        //五星组选120 n*(n-1) *(n-2) *(n-3) *(n-4)/120
        else if(vm.params.playType == 43){
          if(len>4){
            vm.count_zs = len*(len-1) *(len-2) *(len-3) *(len-4)/120
          }else {
            vm.count_zs = 0
          }
          vm.betInput= {"all":vm.data[0].number};
        }
        //前四组选24 n*(n-1) *(n-2) *(n-3)/24
        else if(vm.params.playType == 53){
          if(len>3){
            vm.count_zs = len*(len-1) *(len-2) *(len-3)/24
          }else {
            vm.count_zs = 0
          }
          vm.betInput= {"all":vm.data[0].number};
        }
        //前四组选6 n*(n-1) *(n-2) *(n-3)/24
        else if(vm.params.playType == 55){
          if(len>1){
            vm.count_zs = len*(len-1) /2;
          }else {
            vm.count_zs = 0
          }
          vm.betInput= {"all":vm.data[0].number};
        }
        //前三组三 后三组三 n*(n-1)
        else if(vm.params.playType == 72 || vm.params.playType == 92){
          if(len>1){
            vm.count_zs = len*(len-1);
          }else {
            vm.count_zs = 0
          }
          vm.betInput= {"all":vm.data[0].number};
        }
        //前三组六  后三组六n*(n-1)*(n-2) /6
        else if(vm.params.playType == 74 || vm.params.playType == 94){
          if(len>2){
            vm.count_zs = len*(len-1)*(len-2) /6
          }else {
            vm.count_zs = 0
          }
          vm.betInput= {"all":vm.data[0].number};
        }
        //前三组选包胆 后三组选包胆
        else if(vm.params.playType == 77 || vm.params.playType == 97){
          if(len>1){
            vm.data[0].number.shift();
          }
          len = vm.data[0].number.length;
          if(len>0 && len == 1){
            vm.count_zs = 54 ;
          }else {
            vm.count_zs = 0 ;
          }
          vm.betInput= {"all":vm.data[0].number};
        }

        //前三跨度 后三跨度
        else if(vm.params.playType == 78 || vm.params.playType == 98){
          if(len>0){
            let nums = vm.data[0].number;
            let total = 0;
            for(var key in nums){
              if(nums[key]==0){
                total += 10;
              }else if(nums[key]==1 || nums[key]==9){
                total += 54;
              }else if(nums[key]==2 || nums[key]==8){
                total += 96;
              }else if(nums[key]==3 || nums[key]==7){
                total += 126;
              }else if(nums[key]==4 || nums[key]==6){
                total += 144;
              }else {
                total += 150;
              }
            }
            vm.count_zs = total ;
          }else {
            vm.count_zs = 0
          }
          vm.betInput= {"all":vm.data[0].number};
        }
        //前二跨度
        else if(vm.params.playType == 104 ||vm.params.playType == 114){
          if(len>0){
            let nums = vm.data[0].number;
            let total = 0;
            for(var key in nums){
              if(nums[key]==0){
                total += 10;
              }else if(nums[key]==1){
                total += 18;
              }else if(nums[key]==2){
                total += 16;
              }else if(nums[key]==3){
                total += 14;
              }else if(nums[key]==4){
                total += 12;
              }else if(nums[key]==5){
                total += 10;
              }else if(nums[key]==6){
                total += 8;
              }else if(nums[key]==7){
                total += 6;
              }else if(nums[key]==8){
                total += 4;
              }else{
                total += 2;
              }
            }
            vm.count_zs = total ;
          }else {
            vm.count_zs = 0
          }
          vm.betInput= {"all":vm.data[0].number};
        }
        //前二组合复式  n*(n-1)/2
        else if(vm.params.playType == 102 ||vm.params.playType == 112){
          if(len>1){
            vm.count_zs = len*(len-1)/2
          }else {
            vm.count_zs = 0
          }
          vm.betInput= {"all":vm.data[0].number};
        }else {

        }
        vm.responseData.betContent = {"选号":vm.data[0].number.toString()};
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
          items.number = [];
        }
      },
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
