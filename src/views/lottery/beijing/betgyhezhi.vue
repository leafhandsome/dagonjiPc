<template>
  <div class="playsBall" v-model="balls" >
    <div class="content-item">
      <div class="ballsNum clearfix">
        <ul>
          <li v-for="(item,index) in data" @click="select(item.value)" >
            <div class="bet-btn bet-name sprite" :class="contains(selarr,item.value)?'sel-btn':''" >
              <p class="">{{item.name}}</p>
            </div>
            <p class="f20 bet-odds">{{item.pl}}</p>
          </li >
        </ul>
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    props:['params'],
    data(){
      return {
        selarr:[],
        count_zs :0,      //总注数
        responseData:{},  //返回结果
        betContent:{},
        data:[
          {name:3,value:'3',pl:''},
          {name:4,value:'4',pl:''},
          {name:5,value:'5',pl:''},
          {name:6,value:'6',pl:''},
          {name:7,value:'7',pl:''},
          {name:8,value:'8',pl:''},
          {name:9,value:'9',pl:''},
          {name:10,value:'10',pl:''},
          {name:11,value:'11',pl:''},
          {name:12,value:'12',pl:''},
          {name:13,value:'13',pl:''},
          {name:14,value:'14',pl:''},
          {name:15,value:'15',pl:''},
          {name:16,value:'16',pl:''},
          {name:17,value:'17',pl:''},
          {name:18,value:'18',pl:''},
          {name:19,value:'19',pl:''},
        ]
      }
    },
    created(){
      let vm = this;
      let res = vm.params.oddsList;
      //前三和
      if(vm.params.playType == 3038){
        vm.data = [
          {name:6,value:'6',pl:''},
          {name:7,value:'7',pl:''},
          {name:8,value:'8',pl:''},
          {name:9,value:'9',pl:''},
          {name:10,value:'10',pl:''},
          {name:11,value:'11',pl:''},
          {name:12,value:'12',pl:''},
          {name:13,value:'13',pl:''},
          {name:14,value:'14',pl:''},
          {name:15,value:'15',pl:''},
          {name:16,value:'16',pl:''},
          {name:17,value:'17',pl:''},
          {name:18,value:'18',pl:''},
          {name:19,value:'19',pl:''},
          {name:20,value:'20',pl:''},
          {name:21,value:'21',pl:''},
          {name:22,value:'22',pl:''},
          {name:23,value:'23',pl:''},
          {name:24,value:'24',pl:''},
          {name:25,value:'25',pl:''},
          {name:26,value:'26',pl:''},
          {name:27,value:'27',pl:''},
        ]
      }

      for(var key in res){
        for(var key1 in vm.data){
          if(res[key].code == vm.data[key1].value){
            vm.data[key1].pl = res[key].showOdds;
          }
        }
      }
    },
    computed: {
      balls(){
        let vm = this;
        if(vm.$store.getters.isAddOrder){
          vm.selarr = [];
          vm.responseData.count_zs  = 0
          vm.$emit('responseData',vm.responseData);  //调用父组件的自定义事件，并传值
          vm.$store.commit('set_isAddOrder', false);
        }
      }
    },

    methods: {
      select(val){
        let vm = this;
        vm.betContent = {};
        vm.betInput   = {};
        if(vm.contains(vm.selarr,val)){
          var res = vm.removeByValue(vm.selarr,val);
          vm.selarr = res ;
        }else{
          vm.selarr.push(val);
        }
        let arrlen = vm.selarr.length;
        if(arrlen>0){
          vm.responseData.count_zs  = arrlen
        }else{
          vm.responseData.count_zs  = 0
        }
        vm.responseData.betInput = {"numbers":vm.selarr.sort()};
        vm.responseData.betContent = vm.selarr.sort().toString();
        vm.$emit('responseData',vm.responseData);  //调用父组件的自定义事件，并传值
      },
    }
  }
</script>

<style lang="scss" scoped>
  .playsBall{
    height: 180px;
    margin-top: 10px;
    background-color: #ffffff;
  ul{
    padding: 10px 20px;
  }
  .content-item{
    padding: 4px 8px;
  .ballsNum{
    float: left;
    max-width:900px;
    ul li{
      float: left;
      cursor: pointer;
      margin:5px 15px;
      .bet-name{
        width: 42px;
        height: 42px;
        line-height:42px;
        &:hover{
           background-image: url('../../../assets/img/lottery/selball.png');
           color: #ffffff;
         }
      }
      .bet-odds{
        text-align: center;
        font-size: 12px;
      }
      .sel-btn{
        background-image: url('../../../assets/img/lottery/selball.png');
        color: #ffffff;
      }
    }
  }
  }
  }
</style>
