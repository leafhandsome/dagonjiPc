<template>
  <div class="resultRecord">
    <h3>历史开奖</h3>
    <div class="resultList">
      <table cellpadding="0" cellspacing="0" width="100%">
        <tr class="recordTitle">
          <td width="40%" align="center">期号</td>
          <td width="60%" align="center">号码</td>
        </tr>
        <tr v-for="(items,index) in resultList" :key="index" class="record">
          <td width="40%" align="center">{{items.gameNo}}</td>
          <td width="60%" align="center">
            <div class="haoma">
              <div class="drawBall">
                <p class="sprite" v-for="(item,index1) in items.openCode" :key="index1">{{item}}</p>
              </div>
              <div class="drawtext">
                <p>{{items.bigOrSmall}} |</p>
                <p>{{items.singleOrDouble}} |</p>
                <p>{{items.draganOrTiger}} |</p>
                <p>和值:{{items.sum}} </p>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <p class="more" @click="getMore">查看更多</p>
  </div>
</template>
<script>

  export  default {
    props:['params'],
    data(){
      return{
        show: true,
        roomId: '',
        roomName:'',
        loadingText:'加载中...',
        resultList:{},//开奖结果
        pageIndex:1,  //当前页码
        pageSize:10,  //没有显示条数
      }
    },
    created(){
      let vm = this;
      vm.getData();
    },
    methods:{
      getData(){
        let vm = this;
        let parmars = {
          roomId   : vm.params.roomId ,
          pageIndex: vm.pageIndex,
          pageSize : vm.pageSize
        }
        vm.unitAjax('POST','/api/lottery/gameMatchResultList',parmars,function (result) {
          if(result.result){
            let res = result.data.items;
            vm.pageIndex ++;
            if(res.length <= vm.pageSize){
              vm.resultList = res;
            }
          }
        });
      },
      getMore(){
        let vm = this;
        let parmars = {
            roomId   : vm.params.roomId ,
            pageIndex: vm.pageIndex,
            pageSize : vm.pageSize
        }
        vm.unitAjax('POST','/api/lottery/gameMatchResultList',parmars,function (result) {
          if(result.result){
            vm.show = true;
            let res = result.data.items;
            vm.resultList =  vm.resultList.concat(res);
            if(res.length < vm.pageSize){
              return false;
            }else{
              vm.pageIndex ++;
            }
          }
        });
      }
    },
  }

</script>

<style lang="scss" scoped>
  .resultRecord{
    h3{
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-bottom: 1px solid #EEEEEE;
    }
    .more{
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: #409EFF;
      cursor: pointer;
      border-top: 1px solid #EEEEEE;
    }
    .resultList{
      height: 350px;
      overflow-y: auto;
      .recordTitle{
        td{
          height: 30px;
          line-height: 30px;
          border-bottom: 1px solid #EEEEEE;
        }
      }
      .record{
        td{
          margin: 20px 0;
          height: auto;
          border-bottom: 1px solid #EEEEEE;
        }
        .haoma{
         padding:10px 0;
          .sprite{
            width: 32px;
            height: 32px;
            line-height:32px;
            font-size: 14px;
          }
          .drawtext{
            text-align: center;
            height:30px;
            line-height: 30px;
            p{
              color: #BFBFBF;
              text-align: center;
              display: inline-block;
            }
          }
          .drawBall{
            height: auto;
            padding: 5px 10px;
            p{
              margin: 0 5px;
            }
          }
        }
      }
    }
  }

</style>
