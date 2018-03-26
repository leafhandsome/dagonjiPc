<template>
  <div class="playsBall" v-model="balls">
    <ul>
      <li v-for="items in data">
        <div class="content-item">
          <p class="tit-badge"><span>{{items.name}}</span></p>
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
  import Params from '../../../common/data/Param.json';
  export default {
    props:['params'],
    data(){
      return {
        count_zs :0,      //总注数
        responseData:{},  //返回结果,
        betInput:{},
        betContent:{},
        data:[
          {id:1,name:'万位',number:[],numText:Params.numlist,btnNumer:[],btnText:Params.btnlist,inputName:'thousands'},
          {id:2,name:'千位',number:[],numText:Params.numlist,btnNumer:[],btnText:Params.btnlist,inputName:'hundrs'},
          {id:3,name:'百位',number:[],numText:Params.numlist,btnNumer:[],btnText:Params.btnlist,inputName:'tens'},
          {id:4,name:'十位',number:[],numText:Params.numlist,btnNumer:[],btnText:Params.btnlist,inputName:'ones'},
          {id:5,name:'个位',number:[],numText:Params.numlist,btnNumer:[],btnText:Params.btnlist,inputName:'specials'}
          ],
      }
    },
    computed: {
      //计算投注的总注数
      balls(){
        let vm  = this;
        vm.count_zs = 0 ;
        vm.betInput = {};
        vm.betContent = {};
        //定位胆
        if(vm.params.playType == 120 ) {
          for (var key in vm.data) {
            let len = vm.data[key].number.length;
            if (len > 0) {
              vm.count_zs += len;
              vm.betInput[vm.data[key].inputName] = vm.data[key].number;
              vm.betContent[vm.data[key].name] = vm.data[key].number.sort().toString();
            }

          }
        }
        //五星复式
        else if(vm.params.playType == 40){
          let count       = 0;
              vm.count_zs = 1;
          for (var key in vm.data) {
            let len = vm.data[key].number.length;
            if (len > 0) {
              count ++
              vm.count_zs *= len;
              vm.betInput[vm.data[key].inputName] = vm.data[key].number;
              vm.betContent[vm.data[key].name] = vm.data[key].number.sort().toString();
            }
          }
          if (count != 5) {
            vm.count_zs = 0;
          }
        }
        //五星组合
        else if(vm.params.playType == 42){
          let count       = 0;
              vm.count_zs = 5;
          for (var key in vm.data) {
            let len = vm.data[key].number.length;
            if (len > 0) {
              count ++
              vm.count_zs *= len;
              vm.betInput[vm.data[key].inputName] = vm.data[key].number;
              vm.betContent[vm.data[key].name] = vm.data[key].number.sort().toString();
            }
          }
          if (count != 5) {
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

    methods: {
      //点击快捷选择
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
