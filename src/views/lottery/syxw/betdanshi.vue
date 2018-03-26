<template>
  <div class="playsBall" v-model="balls">
    <ul>
      <li >
        <div class="content-item">
          <textarea class="form-control" v-model="content"  placeholder="输入框内输入或粘贴投注内容，每注请使用逗号','、竖号'|'或分号';'分隔开"></textarea>
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
        showToast:false,  //显示提示
        ToastText:'',     //提示内容
        ToastPosition: 'default',//提示位置;
        content:'',
      }
    },

    computed: {
      //计算投注的总注数
      balls(){
        let vm  =this;
        let itemcount = 0;
        let sscds = '';
        //前三直选单式
        if(vm.params.playType == 6001){
          let reg =  /(0[1-9]|1[01])(?!\1)(0[1-9]|1[01])(?!\1|\2)(0[1-9]|1[01])/g;
          sscds = vm.util_unique(vm.content.replace(/[^\d]/g, ''), reg,2);

          sscds = sscds.sort();
          if (sscds) {
            itemcount   = sscds.length;
            vm.count_zs = itemcount;
          }else {
            itemcount = 0
          }
        }
        //前三组选单式
        else if(vm.params.playType == 6003){
          let reg =  /(0[1-9]|1[01])(?!\1)(0[1-9]|1[01])(?!\1|\2)(0[1-9]|1[01])/g;
          sscds = vm.util_unique(vm.content.replace(/[^\d]/g, ''), reg);

          sscds = sscds.sort();
          if (sscds) {
            itemcount = sscds.length;
            vm.count_zs = itemcount;
          }else {
            itemcount = 0
          }
        }
        //前二直选单式
        else if(vm.params.playType == 6006){
          let reg =  /(0[1-9]|1[01])(?!\1)(0[1-9]|1[01])/g;
          sscds = vm.util_unique(vm.content.replace(/[^\d]/g, ''), reg,2);

          sscds = sscds.sort();
          if (sscds) {
            itemcount = sscds.length;
            vm.count_zs = itemcount;
          }else {
            itemcount = 0
          }
        }
        //前二组选单式
        else if(vm.params.playType == 6008){
          let reg =  /(0[1-9]|1[01])(?!\1)(0[1-9]|1[01])/g;
          sscds = vm.util_unique(vm.content.replace(/[^\d]/g, ''), reg);

          sscds = sscds.sort();
          if (sscds) {
            itemcount = sscds.length;
            vm.count_zs = itemcount;
          }else {
            itemcount = 0
          }
        }
        //任一中一单式
        else if(vm.params.playType == 6020){
          let reg =  /(0[1-9]|1[01])/g;
          sscds = vm.util_unique(vm.content.replace(/[^\d]/g, ''), reg, 2, true);

          sscds = sscds.sort();
          if (sscds) {
            itemcount = sscds.length;
            vm.count_zs = itemcount;
          }else {
            itemcount = 0
          }
        }
        //任二中二单式
        else if(vm.params.playType == 6021){
          let reg =  /(0[1-9]|1[01])(?!\1)(0[1-9]|1[01])/g;
          sscds = vm.util_unique(vm.content.replace(/[^\d]/g, ''), reg, 2, true);

          sscds = sscds.sort();
          if (sscds) {
            itemcount = sscds.length;
            vm.count_zs = itemcount;
          }else {
            itemcount = 0
          }
        }
        //任三中三单式
        else if(vm.params.playType == 6022){
          let reg =  /(0[1-9]|1[01])(?!\1)(0[1-9]|1[01])(?!\1|\2)(0[1-9]|1[01])/g;
          sscds = vm.util_unique(vm.content.replace(/[^\d]/g, ''), reg, 2, true);

          sscds = sscds.sort();
          if (sscds) {
            itemcount = sscds.length;
            vm.count_zs = itemcount;
          }else {
            itemcount = 0
          }
        }
        //任四中四单式
        else if(vm.params.playType == 6023){
          let reg =   /(0[1-9]|1[01])(?!\1)(0[1-9]|1[01])(?!\1|\2)(0[1-9]|1[01])(?!\1|\2|\3)(0[1-9]|1[01])/g;
          sscds = vm.util_unique(vm.content.replace(/[^\d]/g, ''), reg, 2, true);

          sscds = sscds.sort();
          if (sscds) {
            itemcount = sscds.length;
            vm.count_zs = itemcount;
          }else {
            itemcount = 0
          }
        }
        //任五中五单式
        else if(vm.params.playType == 6024){
          let reg =  /(0[1-9]|1[01])(?!\1)(0[1-9]|1[01])(?!\1|\2)(0[1-9]|1[01])(?!\1|\2|\3)(0[1-9]|1[01])(?!\1|\2|\3|\4)(0[1-9]|1[01])/g;
          sscds = vm.util_unique(vm.content.replace(/[^\d]/g, ''), reg, 2, true);

          sscds = sscds.sort();
          if (sscds) {
            itemcount = sscds.length;
            vm.count_zs = itemcount;
          }else {
            itemcount = 0
          }
        }
        //任六中五单式
        else if(vm.params.playType == 6025){
          let reg =  /(0[1-9]|1[01])(?!\1)(0[1-9]|1[01])(?!\1|\2)(0[1-9]|1[01])(?!\1|\2|\3)(0[1-9]|1[01])(?!\1|\2|\3|\4)(0[1-9]|1[01])(?!\1|\2|\3|\4|\5)(0[1-9]|1[01])/g;
          sscds = vm.util_unique(vm.content.replace(/[^\d]/g, ''), reg, 2, true);

          sscds = sscds.sort();
          if (sscds) {
            itemcount = sscds.length;
            vm.count_zs = itemcount;
          }else {
            itemcount = 0
          }
        }
        //任七中五单式
        else if(vm.params.playType == 6026){
          let reg =  /(0[1-9]|1[01])(?!\1)(0[1-9]|1[01])(?!\1|\2)(0[1-9]|1[01])(?!\1|\2|\3)(0[1-9]|1[01])(?!\1|\2|\3|\4)(0[1-9]|1[01])(?!\1|\2|\3|\4|\5)(0[1-9]|1[01])(?!\1|\2|\3|\4|\5|\6)(0[1-9]|1[01])/g;
          sscds = vm.util_unique(vm.content.replace(/[^\d]/g, ''), reg, 2, true);

          sscds = sscds.sort();
          if (sscds) {
            itemcount = sscds.length;
            vm.count_zs = itemcount;
          }else {
            itemcount = 0
          }
        }
        //任八中五单式
        else if(vm.params.playType == 6027){
          let reg =  /(0[1-9]|1[01])(?!\1)(0[1-9]|1[01])(?!\1|\2)(0[1-9]|1[01])(?!\1|\2|\3)(0[1-9]|1[01])(?!\1|\2|\3|\4)(0[1-9]|1[01])(?!\1|\2|\3|\4|\5)(0[1-9]|1[01])(?!\1|\2|\3|\4|\5|\6)(0[1-9]|1[01])(?!\1|\2|\3|\4|\5|\6|\7)(0[1-9]|1[01])/g;
          sscds = vm.util_unique(vm.content.replace(/[^\d]/g, ''), reg, 2, true);

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
