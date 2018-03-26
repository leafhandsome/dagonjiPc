<template>
  <div class="playsBall" v-model="balls">
    <ul>
      <li v-for="items in data">
        <div class="content-item">
          <p class="tit-badge"><span>{{items.name}}</span></p>
          <div class="ballsNum clearfix">
            <el-checkbox-group v-model="items.number" class="items-balls">
              <el-checkbox-button v-for="balls in items.numText" :label="balls" :key="balls" class="items-ball"><p>{{balls}}</p></el-checkbox-button>
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
        count_zs :0,      //总注数
        selChongValue:'',
        selDanValue :'',
        responseData:{},  //返回结果
        betContent:{},
        data:[
          {name:'重号',number:[],numText:Params.numlist,btnNumer:[],btnText:Params.btnlist,id:1},
          {name:'单号',number:[],numText:Params.numlist,btnNumer:[],btnText:Params.btnlist,id:2},
        ],
        selRow:'',
      }
    },
    created(){
      let vm = this;
      let type = vm.params.playType;
      if(type==47){
        vm.data[0].name = '三重号';
        vm.data[1].name = '二重号';
      }
    },


    computed: {
      //计算投注的总注数
      balls(){
        let vm  =this;
        let equalLen = 0;
        let chongLen = vm.data[0].number.length;
        let danLen   = vm.data[1].number.length;

        for(var key in vm.data[0].number){
          for(var key1 in vm.data[1].number ){
            if(vm.data[0].number[key] == vm.data[1].number[key1]){
              equalLen++;
            }
          }
        }

        //五星组选60 c*d*(d-1)*(d-2)/6-dc*(d-1)*(d-2)/2
        if(vm.params.playType == 44){
          if(chongLen>0 && danLen>2){
            vm.count_zs = chongLen*danLen*(danLen-1)*(danLen-2)/6-equalLen*(danLen-1)*(danLen-2)/2;
          }else {
            vm.count_zs = 0;
          }
        }
        //五星组选30 c*(c-1)/2d-dc[c*(c-1)/2-(c-1)*(c-2)/2];当c<=2,a=d-dc;
        else if(vm.params.playType == 45){
          if(chongLen>1 && danLen>0){
            if(danLen!=1 || equalLen!=1){
              if(chongLen >2) {
                vm.count_zs = chongLen*(chongLen-1)/2*danLen-equalLen*[chongLen*(chongLen-1)/2-(chongLen-1)*(chongLen-2)/2]
              }else {
               vm.count_zs = danLen-equalLen
              }
            }else {
              vm.count_zs =0;
            }
          }else {
            vm.count_zs =0;
          }
        }
        //五星组选20 c*d*(d-1)/2-dc*(d-1)
        else if(vm.params.playType == 46){
          if(chongLen>0 && danLen>1){
            vm.count_zs =  chongLen * danLen*(danLen-1)/2-equalLen*(danLen-1);
          }else {
            vm.count_zs =0;
          }
        }
        //五星组选10 a=c*d-dc
        else if(vm.params.playType == 47){
          if(chongLen>0 && danLen>0){
            vm.count_zs =chongLen * danLen - equalLen;
          }else {
            vm.count_zs =0;
          }
        }
        //五星组选5 a=c*d-dc
        else if(vm.params.playType == 48){
          if(chongLen>0 && danLen>0){
            vm.count_zs =chongLen * danLen - equalLen;
          }else {
            vm.count_zs =0;
          }
        }
        //前四组选12 c*d*(d-1)/2-dc*(d-1)
        else if(vm.params.playType == 54){
          if(chongLen>0 && danLen>1){
            vm.count_zs =  chongLen * danLen * (danLen-1)/2-equalLen*(danLen-1);
          }else {
            vm.count_zs =0;
          }
        }
        //前四组选4 c*d-dc
        else if(vm.params.playType == 56){
          if(chongLen>0 && danLen>0){
            vm.count_zs = chongLen * danLen - equalLen;
          }else {
            vm.count_zs =0;
          }
        } else {
        }

        vm.responseData.count_zs   = vm.count_zs;
        vm.responseData.betInput   = {"manys":vm.data[0].number,"singles":vm.data[1].number};
        vm.responseData.betContent = {"重号":vm.data[0].number.sort().toString(),"单号":vm.data[1].number.sort().toString()};
        vm.clearNumber(vm.data);                   //清除选中号码
        if(vm.$store.getters.isAddOrder){
          vm.responseData.count_zs   = 0;
        }
        vm.$emit('responseData',vm.responseData);  //调用父组件的自定义事件，并传值
      }
    },

    methods: {
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
