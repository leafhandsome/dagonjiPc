<template>
  <div class="playsBall" v-model="balls">
    <ul>
      <li v-for="items in data">
        <div class="content-item">
          <p class="tit-badge"><span>{{items.name}}</span></p>
          <div class="ballsNum clearfix">
            <el-checkbox-group v-model="items.number" class="items-balls">
              <el-checkbox-button v-for="balls in items.numText" :label="balls" :key="balls" class="items-ball"><p @click="ballClick(balls,items)">{{balls}}</p></el-checkbox-button>
            </el-checkbox-group>
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
          {id:1,name:'重号',number:[],numText:Params.numlist,btnNumber:[],btnText:Params.btnlist,inputName:'manys'},
          {id:2,name:'单号',number:[],numText:Params.numlist,btnNumber:[],btnText:Params.btnlist,inputName:'singles'},
        ],
        selChongValue:'',
        selDanValue :'',
        responseData:{},  //返回结果
        selRow:'',
        count_zs :0,
      }
    },
    computed: {
      //计算投注的总注数
      balls(){
        let vm  =this;
        if(vm.selRow==1){
          if(vm.contains(vm.data[1].number,vm.selChongValue)){
            vm.messges();
            vm.removeByValue(vm.data[0].number,vm.selChongValue);
          }else {
            vm.responseData.toast = false;
          }
        }else {
          if(vm.contains(vm.data[0].number,vm.selDanValue)){
            vm.messges();
            vm.removeByValue(vm.data[1].number,vm.selDanValue);
          }else {
            vm.responseData.toast = false;
          }
        }

        let chongLen = vm.data[0].number.length;
        let danLen   = vm.data[1].number.length;

        //三字现双重  //四字现三重   七星彩--4031 4035
        if(vm.params.playType == 21 || vm.params.playType == 25 || vm.params.playType == 4031 ||vm.params.playType == 4035) {
          for(var i=0;i<vm.data.length;i++){
            if(vm.data[i].number.length>1){
              vm.data[i].number.shift();
            }
          }
          if(chongLen>0 && danLen>0){
            vm.count_zs = 1
          }else {
            vm.count_zs =0;
          }
          //四字现一双重
        }else if(vm.params.playType == 23 || vm.params.playType == 4033){
          if(chongLen > 1){
            vm.data[0].number.shift();
          }
          if(danLen > 2){
            vm.data[1].number.shift();
          }
          if(chongLen>0 && danLen>1){
            vm.count_zs = 1
          }else {
            vm.count_zs =0;
          }
          //三定位双重全倒
        }else if(vm.params.playType == 27 || vm.params.playType == 4041){
          if(chongLen>9){
            vm.data[0].number.shift();
          }
          if(danLen>9){
            vm.data[1].number.shift();
          }
          if(chongLen>0 && danLen>0){
            vm.count_zs = 12 * chongLen * danLen
          }else {
            vm.count_zs =0;
          }
        }
        //四定位一双重全倒 a=6*c*d*（d-1）
        else if(vm.params.playType == 29 || vm.params.playType == 4043){
          if(chongLen>8){
            vm.data[0].number.shift();
          }
          if(danLen>9){
            vm.data[1].number.shift();
          }
          if(chongLen <= 8 && chongLen > 0 && danLen > 1 ){
            vm.count_zs = 6 * chongLen * danLen *(danLen-1)
          }else {
            vm.count_zs = 0;
          }
        }
        //四定位三重全倒
        else if(vm.params.playType == 31 || vm.params.playType == 4045){
          if(chongLen>0 && danLen>0){
            vm.count_zs = 4* chongLen * danLen
          }else {
            vm.count_zs =0;
          }
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
    methods:{
      ballClick(item,data){
        let vm = this;
        if(data.id == 1){
          vm.selChongValue = item;
          vm.selRow = 1;
          if(vm.contains(vm.data[1].number,item)){
            vm.removeByValue(data.number,item);
          }
        }else {
          vm.selRow = 2;
          vm.selDanValue = item;
          if(vm.contains(vm.data[0].number,item)){
            vm.removeByValue(data.number,item);

          }
        }
      },
//      btnClick(btnText,items){
//        let vm = this;
//        if(btnText=="全"){
//          items.number = [0,1,2,3,4,5,6,7,8,9];
//        }else if(btnText =="单"){
//          items.number = [1,3,5,7,9];
//        }
//        else if(btnText =="双"){
//          items.number = [0,2,4,6,8];
//        }
//        else if(btnText =="大"){
//          items.number = [5,6,7,8,9];
//        }
//        else if(btnText =="小"){
//          items.number = [0,1,2,3,4];
//        }else{
//          items.number =  [];
//          return;
//        }
//      }
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
    /*float: left;*/
    max-width:1000px;
    width: 1000px;
  }
  /*.selBtn{*/
    /*min-width:400px;*/
    /*margin-top:12px;*/
  /*}*/
  }
  }

</style>
