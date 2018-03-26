<template>
  <div class="playsBall" v-model="balls">
    <ul>
      <li v-for="items in data">
        <div class="content-item">
          <p class="tit-badge"><span>{{rankingName}}</span></p>
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
  export default {
    props:['params'],
    data(){
      return {
        count_zs :0,      //总注数
        responseData:{},  //返回结果
        betContent:{},
        betInput:{},
        data:[
          {number:[],numText:Params.bjnumlist,btnNumer:[],btnText:Params.btnlist,id:1},
        ],
        rankingName:''
      }
    },

    created(){
      let vm = this;
      let playType = vm.params.playType;
      if(playType == 3025){
        vm.rankingName = '冠军';
      }else if(playType == 3026){
        vm.rankingName = '亚军';
      }else if(playType == 3027){
        vm.rankingName = '季军';
      }else if(playType == 3028){
        vm.rankingName = '第四名';
      }else if(playType == 3029){
        vm.rankingName = '第五名';
      }else if(playType == 3030){
        vm.rankingName = '第六名';
      }else if(playType == 3031){
        vm.rankingName = '第七名';
      }else if(playType == 3032){
        vm.rankingName = '第八名';
      }else if(playType == 3033){
        vm.rankingName = '第九名';
      }else{
        vm.rankingName = '第十名';
      }
    },

    computed: {
      //计算投注的总注数
      balls(){
        let vm  =this;
        let numbers = [] ;
        let data = vm.data[0].number;
        vm.count_zs = data.length;

        vm.responseData.count_zs   = vm.count_zs;
        vm.responseData.betInput   = {"numbers":data.sort()} ;
        vm.responseData.betContent = data.sort().toString();
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

