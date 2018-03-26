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
  const  numlist = ["01","02","03","04","05","06","07","08","09","10","11"]
  const  btnlist = ['全','单','双','大','小','清'];
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
          {name:'胆码',number:[],numText:numlist,btnText:btnlist,id:1},
          {name:'拖码',number:[],numText:numlist,btnText:btnlist,id:2},
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
        //前二组选胆拖 任二中二胆拖
        if(vm.params.playType == 6009 ||vm.params.playType == 6028){
          if(danLen>1){
            vm.data[0].number.shift();
          }
            if(danLen>0 && tuoLen>0){
              vm.count_zs = danLen * tuoLen * 2 ;
            }else {
              vm.count_zs =0;
            }
          }
        //前三组选胆拖 任三中三胆拖
        else if(vm.params.playType == 6004 || vm.params.playType == 6029){
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
      //任四中四胆拖
        else if(vm.params.playType == 6030){
          if(danLen>3){
            vm.data[0].number.shift();
          }
          if(danLen>0 && tuoLen>0){
            if(danLen==1){
              vm.count_zs = tuoLen*(tuoLen-1)*(tuoLen-2)/6
            }else if(danLen == 2){
              vm.count_zs = tuoLen*(tuoLen-1)/2
            }
            else {
              vm.count_zs = tuoLen;
            }
          }else {
            vm.count_zs =0;
          }
        }
        //任五中五胆拖
        else if(vm.params.playType == 6031){
          if(danLen>4){
            vm.data[0].number.shift();
          }
          if(danLen>0 && tuoLen>0){
            if(danLen==1){
              vm.count_zs = tuoLen*(tuoLen-1)*(tuoLen-2)*(tuoLen-3)/24
            }else if(danLen == 2){
              vm.count_zs = tuoLen*(tuoLen-1)*(tuoLen-2)/6
            }else if(danLen == 3){
              vm.count_zs = tuoLen*(tuoLen-1)/2
            }
            else {
              vm.count_zs = tuoLen;
            }
          }else {
            vm.count_zs =0;
          }
        }
        //任六中五胆拖
        else if(vm.params.playType == 6032){
          if(danLen>5){
            vm.data[0].number.shift();
          }
          if(danLen>0 && tuoLen>0){
            if(danLen==1){
              vm.count_zs = tuoLen*(tuoLen-1)*(tuoLen-2)*(tuoLen-3)*(tuoLen-4)/120
            }else if(danLen == 2){
              vm.count_zs = tuoLen*(tuoLen-1)*(tuoLen-2)*(tuoLen-3)/24
            }else if(danLen == 3){
              vm.count_zs = tuoLen*(tuoLen-1)*(tuoLen-2)/6
            }else if(danLen == 4){
              vm.count_zs = tuoLen*(tuoLen-1)/2
            }
            else {
              vm.count_zs = tuoLen;
            }
          }else {
            vm.count_zs =0;
          }
        }
        //任七中五胆拖
        else if(vm.params.playType == 6033){
          if(danLen>6){
            vm.data[0].number.shift();
          }
          if(danLen>0 && tuoLen>0){
            if(danLen==1){
              vm.count_zs = tuoLen*(tuoLen-1)*(tuoLen-2)*(tuoLen-3)*(tuoLen-4)*(tuoLen-5)/720
            }else if(danLen == 2){
              vm.count_zs = tuoLen*(tuoLen-1)*(tuoLen-2)*(tuoLen-3)*(tuoLen-4)/120
            }else if(danLen == 3){
              vm.count_zs = tuoLen*(tuoLen-1)*(tuoLen-2)*(tuoLen-3)/24
            }else if(danLen == 4){
              vm.count_zs = tuoLen*(tuoLen-1)*(tuoLen-2)/6
            }else if(danLen == 5){
              vm.count_zs = tuoLen*(tuoLen-1)/2
            }
            else {
              vm.count_zs = tuoLen;
            }
          }else {
            vm.count_zs =0;
          }
        }
        //任八中五胆拖
        else if(vm.params.playType == 6034){
          if(danLen>7){
            vm.data[0].number.shift();
          }
          if(danLen>0 && tuoLen>0){
            if(danLen==1){
              vm.count_zs = tuoLen*(tuoLen-1)*(tuoLen-2)*(tuoLen-3)*(tuoLen-4)*(tuoLen-5)*(tuoLen-6)/5040
            }else if(danLen == 2){
              vm.count_zs = tuoLen*(tuoLen-1)*(tuoLen-2)*(tuoLen-3)*(tuoLen-4)*(tuoLen-5)/720
            }else if(danLen == 3){
              vm.count_zs = tuoLen*(tuoLen-1)*(tuoLen-2)*(tuoLen-3)*(tuoLen-4)/120
            }else if(danLen == 4){
              vm.count_zs = tuoLen*(tuoLen-1)*(tuoLen-2)*(tuoLen-3)/24
            }else if(danLen == 5){
              vm.count_zs = tuoLen*(tuoLen-1)*(tuoLen-2)/6
            }else if(danLen == 6){
              vm.count_zs = tuoLen*(tuoLen-1)/2
            }
            else {
              vm.count_zs = tuoLen;
            }
          }else {
            vm.count_zs =0;
          }
        }

        vm.responseData.betInput   = {"no1":vm.data[0].number,"no2":vm.data[1].number};
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
  /*margin-top: 20px;*/
  /*}*/
  }
  }
</style>
