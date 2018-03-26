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
  export default {
    props:['params'],
    data(){
      return {
        count_zs :0,      //总注数
        danNum:[],
        selDanValue:'',
        selTuoValue :'',
        responseData:{},  //返回结果
        data:[
          {name:'胆码',number:[],numText:Params.numlist,btnText:Params.btnlist,id:1},
          {name:'拖码',number:[],numText:Params.numlist,btnText:Params.btnlist,id:2},
        ],
        selRow:'',
      }
    },

    computed: {
      //计算投注的总注数
      balls(){
        let vm  =this;
        if(vm.selRow==1){
          if(vm.contains(vm.data[1].number,vm.selDanValue)){
            vm.messges();
            vm.removeByValue(vm.data[0].number,vm.selDanValue);
          }
        }else {
          if(vm.contains(vm.data[0].number,vm.selTuoValue)){
            vm.messges();
            vm.removeByValue(vm.data[1].number,vm.selTuoValue);
          }
        }

        let danLen   = vm.data[0].number.length;
        let tuoLen   = vm.data[1].number.length;
        //前三组三胆拖 后三组三胆拖
        if(vm.params.playType == 73 || vm.params.playType == 93 ){
          if(danLen>1){
            vm.data[0].number.shift();
          }
            if(danLen>0 && tuoLen>0){
              vm.count_zs = danLen * tuoLen * 2 ;
            }else {
              vm.count_zs =0;
            }
          }
        //前三组六胆拖 后三组六胆拖
        else if(vm.params.playType == 75 || vm.params.playType == 75 ){
          if(danLen>2){
            vm.data[0].number.shift();
          }
          if(danLen>0 && tuoLen>0){
            if(danLen==1){
              vm.count_zs = tuoLen*(tuoLen-1)/2
            }else {
              vm.count_zs = tuoLen;
            }
          }else {
            vm.count_zs =0;
          }
      }

        vm.responseData.betInput   ={"manys":vm.data[0].number,"singles":vm.data[1].number};
        vm.responseData.betContent = {"胆码":vm.data[0].number.sort().toString(),"拖码":vm.data[1].number.sort().toString()};
        vm.responseData.count_zs   = vm.count_zs;
        vm.clearNumber(vm.data);                   //清除选中号码
        if(vm.$store.getters.isAddOrder){
          vm.responseData.count_zs   = 0;
        }
        vm.$emit('responseData',vm.responseData);  //调用父组件的自定义事件，并传值
      }
    },

    methods: {
      ballClick(item,data){
        let vm = this;
        if(data.id == 1){
          vm.selDanValue = item;
          vm.selRow = 1;
          if(vm.contains(vm.data[1].number,item)){
            vm.removeByValue(data.number,item);
          }
        }else {
          vm.selRow = 2;
          vm.selTuoValue = item;
          if(vm.contains(vm.data[0].number,item)){
            vm.removeByValue(data.number,item);

          }
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
    /*float: left;*/
    max-width:1000px;
    width: 1000px;
  }
  /*.selBtn{*/
  /*min-width:400px;*/
  /*margin-top: 12px;*/
  /*}*/
  }
  }

</style>
