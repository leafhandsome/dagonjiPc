<template>
  <div class="history_table">
    <el-table
      size="mini"
      :data="orderList"
      style="width: 100%"
      stripe
    >
      <el-table-column
        v-if="!cancel"
        prop="gameName"
        align="center"
        label="彩种"
        min-width="90">
      </el-table-column>
      <el-table-column
        v-if="cancel"
        prop="playType"
        align="center"
        label="玩法"
        min-width="80">
      </el-table-column>
      <el-table-column
        prop="gameNo"
        label="期号"
        align="center"
        min-width="110">
      </el-table-column>
      <el-table-column
        prop="betMoney"
        label="投注金额"
        align="center"
        min-width="70">
      </el-table-column>
      <el-table-column
        align="center"
        label="奖金"
        min-width="80">
        <template slot-scope="scope">
          <p style="color:#ff655b;" v-if="scope.row.prizeMoney>0" v-text="scope.row.prizeMoney"></p>
          <p v-if="scope.row.prizeMoney<=0" v-text="scope.row.prizeMoney"></p>
        </template>
      </el-table-column>
      <el-table-column
        v-if="cancel"
        align="center"
        label="状态"
        min-width="60">
        <template slot-scope="scope">
          <p style="color:#ff655b;" v-if="scope.row.prizeMoney>0" v-text="scope.row.orderState"></p>
          <p v-if="scope.row.prizeMoney<=0" v-text="scope.row.orderState"></p>
        </template>
      </el-table-column>
      <el-table-column
        v-if="!cancel"
        align="center"
        label="状态"
        min-width="70">
        <template slot-scope="scope">
          <el-popover  trigger="hover" placement="right">
            <div  class="lu-popoper">
              <p>玩法: {{ scope.row.playType }}</p>
              <p>最高可赢: {{ scope.row.winMoney }}</p>
            </div>
            <div style="cursor: pointer;" slot="reference" class="name-wrapper">
              <p style="color:#F56C6C;" v-if="scope.row.prizeMoney>0" v-text="scope.row.orderState"></p>
              <p v-if="scope.row.prizeMoney<=0" v-text="scope.row.orderState"></p>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        v-if="cancel"
        align="center"
        label="操作"
        width="80">
        <template slot-scope="scope">
        <span
          v-if="scope.row.orderCode==1"
          style="cursor: pointer; color:#1a95f2"
          @click="gotocancel(scope.$index,scope.row)">
          撤单
        </span>
        <span
            v-if="scope.row.orderCode==4"
            style="color:#F56C6C">
          已撤单
        </span>
        </template>
      </el-table-column>
    </el-table>
    <!--加载动画-->
    <div class="loading">
      <loading :show="loading.show" :text="loading.text"></loading>
    </div>
  </div>

</template>

<script>
  export default {
    methods: {
      gotocancel(index,item){
        this.$confirm('是否取消该订单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading.show = true;
          if(!this.$store.getters.token || !this.$store.getters.userId){this.$message.success('请登录后再操作，谢谢!');;return;};
          let params = {userId: this.$store.getters.userId, token: this.$store.getters.token,orderId:item.orderId};
          this.$api.cancelOrder(params).then(res=>{
           if(res.result){
            let safeMoney = this.$store.getters.safeMoney;
            safeMoney = safeMoney - 0 + item.betMoney;
            this.$store.commit('set_safeMoney', safeMoney)
            this.$message.success('撤单成功!');
            item.orderState = '已取消';
            item.orderCode = 4;
            }else{
              this.remoteLogin(res);
            }
            this.loading.show = false;
          });
        }).catch(() => {
            this.$message({
            type: 'info',
            message: '撤单取消！'
          });
      });
       return;

      },
      tableRowClassName({row, rowIndex}) {

        if (rowIndex%2 === 1) {
          if(row.prizeMoney>0){
              return 'row-one prize-row'
          }else{
              return 'row-one'
          }
        } else if (rowIndex%2 === 0) {
          if(row.prizeMoney>0){
            return 'row-two prize-row'
          }else{
            return 'row-one'
          }
        }
        return '';
      }
    },
    props: {
      orderList: {
        type: Array,
        default: () => [] // es6的箭头函数
      },
      cancel:{
        type:Boolean,
        default:()=>false
      }
    },
    mounted(){

    },
    data(){
      return {
        item:[{
            betDate: "2018-03-01 11:07:42",
            betMoney: 3,
            chaseNo: "",
            gameName: "重庆时时彩",
            gameNo: "20180301031",
            mainType: 1,
            orderCode: 3,
            orderId: 26282,
            orderState: "已发奖",
            orderType: 0,
            playType: "定位胆",
            prizeMoney: 0
          }],
        loading:{
          show:false,
          text:'加载中...'
        }
      }
    }
  }
</script>
<style lang="scss">

  .history_table{
  .el-table--mini td, .el-table--mini th {
    padding: 3px 0;
  }
  .el-table{
  .row-one{
    background: #d1eafc;
  }
  .row-two {
    background: #e8f4fe;
  }
  .el-table__row.prize-row{
    background: #ff7c7c;
  }
  .el-table__row{
  tr:hover{
    background-color: #0c1016;
  }
  }
  }
  .has-gutter{
  tr{
    height: 30px;
    line-height: 30px;
  th{
    background-color: #1a95f2;
  .cell{
    color:#ffffff;
  }
  }
  }
  }
  }

</style>
