<template>
  <div class="playsBall" v-model="balls">
    <ul>
      <li >
        <div class="content-item">
          <textarea class="form-control" v-model="content"  placeholder="请输入您要投注的号码,用逗号、空格或 ';' 分割开"></textarea>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props:['params'],
    data(){
      return {
        count_zs :0,      //总注数
        responseData:{},  //返回结果
        content:'',
      }
    },

    computed: {
      //计算投注的总注数
      balls(){
        let vm  =this;
        let itemcount = 0;
        let sscds = '';
        //五星单选
        if(vm.params.playType==41){
          let reg =  /\b[0-9]{5}\b/g;
          sscds = vm.util_unique(vm.content, reg);

          sscds = sscds.sort();
          if (sscds) {
            itemcount   = sscds.length;
            vm.count_zs = itemcount;
          }else {
            itemcount = 0
          }
        }
        //前四单选
        else if(vm.params.playType==51){
          let reg =  /\b[0-9]{4}\b/g;
          sscds = vm.util_unique(vm.content, reg);

          sscds = sscds.sort();
          if (sscds) {
            itemcount = sscds.length;
            vm.count_zs = itemcount;
          }else {
            itemcount = 0
          }
        }
        //前三单选 后三单选
        else if(vm.params.playType==71 || vm.params.playType==91){
          let reg =  /\b[0-9]{3}\b/g;
          sscds = vm.util_unique(vm.content, reg);

          sscds = sscds.sort();
          if (sscds) {
            itemcount = sscds.length;
            vm.count_zs = itemcount;
          }else {
            itemcount = 0
          }
        }
        //前三组合 后三组合
        else if(vm.params.playType==76 || vm.params.playType==96){
          let reg =  /\b[0-9]{3}\b/g;
          sscds = vm.util_unique(vm.content, reg,1,true,true);

          sscds = sscds.sort();
          if (sscds) {
            itemcount = sscds.length;
            vm.count_zs = itemcount;
          }else {
            itemcount = 0
          }
        }
         //前二直选
        else if(vm.params.playType == 101 ||vm.params.playType == 111){
          let reg = /\b[0-9]{2}\b/g;
          sscds = vm.util_unique(vm.content, reg);

          sscds = sscds.sort();
          if (sscds) {
            itemcount = sscds.length;
            vm.count_zs = itemcount;
          }else {
            itemcount = 0
          }
        }
        //前二组合
        else if(vm.params.playType == 103 ||vm.params.playType == 113){
          let reg = /\b([0-9])(?!\1)([0-9])\b/g;
          sscds = vm.util_unique(vm.content, reg,1,true);

          sscds = sscds.sort();
          if (sscds) {
            itemcount = sscds.length;
            vm.count_zs = itemcount;
          }else {
            itemcount = 0
          }
        }
        vm.responseData.betInput   = {"custom":vm.content};
        vm.responseData.betContent = {"单式":sscds.toString()};
        vm.responseData.count_zs   = vm.count_zs;
        vm.$emit('responseData',vm.responseData);  //调用父组件的自定义事件，并传值
      }
    },
  }
</script>

<style lang="scss" scoped>
  .playsBall {
    width: 100%;
    height: 250px;
    margin-top: 10px;
    background-color: #ffffff;
    ul {
      padding: 10px 20px;
    }
    .content-item textarea{
      resize: none;
      border: 1px solid #ddd;
      width: 98%;
      height: 200px;
      padding: 8px;
      font-size: 14px;
      color: #333;
    }
  }
</style>
