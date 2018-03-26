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
  import Params  from '../../../common/data/Param.json';
  export default {
    props:['params'],
    data(){
      return {
        count_zs  :0,     //总注数
        responseData:{},  //返回结果,
        betInput  :{},
        betContent:{},
        type:false,
        data :[
          {id:1,name:'冠军',number:[],numText:Params.bjnumlist,btnNumer:[],btnText:Params.btnlist,inputName:'no1'},
          {id:2,name:'亚军',number:[],numText:Params.bjnumlist,btnNumer:[],btnText:Params.btnlist,inputName:'no2'},
          ],
      }
    },
    created(){
      let vm = this;
      if(vm.params.playType == 3036){
        vm.type = true;
        vm.data = [
          {id:1,name:'冠军',number:[],numText:Params.bjnumlist,btnNumer:[],btnText:Params.btnlist,inputName:'no1'},
          {id:2,name:'亚军',number:[],numText:Params.bjnumlist,btnNumer:[],btnText:Params.btnlist,inputName:'no2'},
          {id:3,name:'季军',number:[],numText:Params.bjnumlist,btnNumer:[],btnText:Params.btnlist,inputName:'no3'},
        ];
      }
    },
    computed: {
      //计算投注的总注数
      balls(){
        let vm  = this;
        //前二直选
        if(vm.params.playType == 3035){
          let repetionLen = 0;
          let number1  = vm.data[0].number;
          let number2  = vm.data[1].number;
          let selNum   = [[],[]];
          vm.betInput = {};
          vm.betContent = {};
          if(number1.length!= 0 && number2.length!= 0 ){
            vm.count_zs = 1;
            repetionLen = (vm.filterData(number1,number2)).length;
            for (var key in vm.data) {
              let len = vm.data[key].number.length;
              if (len > 0) {
                vm.count_zs *= len;
              }
              vm.betInput[vm.data[key].inputName] = vm.data[key].number.sort()
              vm.betContent[vm.data[key].name] = vm.data[key].number.sort().toString();
            }
            vm.count_zs = vm.count_zs  -  repetionLen;
          }else {
            vm.count_zs = 0;
          }
        }
        //前三直选
        else {
          let all = [] ;
          let selNum   = [[],[],[]];
          let number1 = vm.data[0].number;
          let number2 = vm.data[1].number;
          let number3 = vm.data[2].number;
          if(number1.length!= 0 && number2.length!= 0 && number3.length!= 0){
            for(var i=0;i<number1.length;i++){
              for(var j=0;j<number2.length;j++){
                for(var k=0;k<number3.length;k++){
                  if (number1[i] == number2[j] || number1[i] == number3[k] || number2[j] == number3[k]){
                    continue;
                  }
                  all.push(number1[i]);
                  all.push(number2[j]);
                  all.push(number3[k]);
                }
              }
            }
            vm.count_zs = all.length / 3;

            vm.betInput = {};
            vm.betContent = {};
            for(var i =0;i<3;i++){
              vm.betInput[vm.data[i].inputName] = vm.data[i].number.sort()
              vm.betContent[vm.data[i].name] = vm.data[i].number.sort().toString();
            }
          }else {
            vm.count_zs = 0;
          }
        }
        vm.responseData.count_zs   = vm.count_zs;
        vm.responseData.betInput   = vm.betInput;
        vm.responseData.betContent = vm.betContent;
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
          items.number = ["01","02","03","04","05","06","07","08","09","10"];
        }else if(btnText =="单"){
          items.number = ["01","03","05","07","09"];
        }
        else if(btnText =="双"){
          items.number = ["02","04","06","08","10"];
        }
        else if(btnText =="大"){
          items.number = ["06","07","08","09","10"];
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
