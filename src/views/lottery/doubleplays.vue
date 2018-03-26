<template>
  <div class="plyasOperate" v-model="balls">
    <div class="speedButton">
      <el-button class="btn" size="small" v-for="(item,index) in speedButtonVal" :key="index" @click="selButton(item)">{{item}}</el-button>
    </div>
    <div class="multiple clearfix" >
      <div class="multipleNum">
        <span class="">下注倍数：</span><div class="m-inputNumber"><el-input-number v-model="inputNumber" size="small" :min="1" :max="9999"></el-input-number></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
     return{
       inputNumber:0,
       speedButtonVal:[5,20,100,500,1000]
     }
    },
    computed:{
      balls(){
        let vm = this;
        vm.$emit('resultData',vm.inputNumber);  //调用父组件的自定义事件，并传值
      }
    },
    methods:{
      selButton(val){
        let vm  = this;
        vm.inputNumber += val;
      },
    },
  }

</script>
<style lang="scss" scoped>
  .plyasOperate{
    height: 65px;
    width: auto;
    background-color: #FFFFFF;
  .speedButton{
    float: left;
    width: 320px;
    height: 50px;
    padding-left: 22px;
    line-height: 50px;
  }
  .multiple{
    float: left;
    width: 220px;
    .multipleNum{
      float: left;
      width: 220px;
      margin-top:10px;
      span{
        float: left;
        display: block;
        width: 80px;
        line-height: 33px;
      }
    }
  .multipleUnit{
    float: left;
    width: 150px;
  }
  }
  .total{
    float: right;
    width: 160px;
    text-align: center;
    line-height: 33px;
    margin-top:10px;
    span{
      color: red;
    }
  }
  }

</style>
