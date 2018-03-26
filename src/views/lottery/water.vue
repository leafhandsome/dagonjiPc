<template>
  <div class="waterSlider clearfix"v-model="main">
    <span>下注水位：</span><div class="range"><el-slider  :min='minWater' :max='maxWater' :step="1" v-model="rangeValue" :show-tooltip="false"></el-slider></div><span class="waterValue">{{waterValue}}/{{selfRate}}</span>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
export default {
  data(){
    return {
      rangeValue:0, //默认水位
      minWater: 0,  //最小水位
      maxWater: 0,  //最大水位
      maxUserWater:0,//用户最大水位
    }
   },

  computed:{
    main(){
      let vm = this;
      vm.rangeValue   = parseInt(vm.playsObj.defaultWater);
      vm.minWater     = vm.playsObj.minWater;
      vm.maxWater     = vm.playsObj.maxWater > vm.playsObj.maxUserWater ? vm.playsObj.maxUserWater : vm.playsObj.maxWater;
      vm.maxUserWater = vm.playsObj.maxUserWater;
    },
    waterValue () {
      let vm = this;
      let waterType = vm.playsObj.orderWaterType;
      let data = {
        backWater:vm.rangeValue
      }
      vm.$emit('changWater',data);  //调用父组件的自定义事件，并传值
      return waterType == 1?(vm.rangeValue/20).toFixed(1):vm.rangeValue;
    },
    selfRate(){
      let  vm  = this;
      var temp = vm.maxUserWater - vm.rangeValue;
      if(temp <= 0)
        return 0 + "%";
        return (temp / 20).toFixed(1) + "%";
    },
    ...mapState([
      'playsObj'
    ]),
  },
  methods:{

  }
}
</script>

<style lang="scss" scoped>
  .waterSlider{
    float: left;
    padding-left: 22px;
    width: 400px;
  span{
    float: left;
    display: block;
    width: 80px;
    line-height: 33px;
  }
  .range{
    float: left;
    width: 230px;
  }
  .waterValue{
    float: left;
    width: 70px;
    margin-left: 15px;
    display: block;
    line-height: 33px;
    text-align: center;
  }
  }
</style>
