<template>
  <div class="playsBall" v-model="balls" >
    <div class="content-item">
      <div class="ballsNum clearfix">
        <ul>
          <li v-for="(item,index) in data" @click="select(item.value)" >
            <div class="bet-btn bet-name sprite" :class="contains(selarr,item.value)?'sel-btn':''" >
              <p class="">{{item.value}}</p>
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
        data:[
          {name:3,value:'03',pl:''},
          {name:4,value:'04',pl:''},
          {name:5,value:'05',pl:''},
          {name:6,value:'06',pl:''},
          {name:7,value:'07',pl:''},
          {name:8,value:'08',pl:''},
          {name:9,value:'09',pl:''},
        ]
      }
    },
    created(){
      let vm = this;
      let res = vm.params.oddsList;

      for(var key in res){
        for(var key1 in vm.data){
          if(res[key].code == vm.data[key1].value){
            vm.data[key1].pl = res[key].showOdds
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
        vm.responseData.betInput = {"all":vm.selarr.sort()};
        vm.responseData.betContent = vm.selarr.sort().toString();
        vm.$emit('responseData',vm.responseData);  //调用父组件的自定义事件，并传值
      },
    }
  }
</script>

<style lang="scss" scoped>
  .playsBall{
    height: 100px;
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
