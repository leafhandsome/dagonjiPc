<template>
  <div class="container">
      <!-- 时间 -->
      <el-row>
          <el-col :span='4'>
               <div class="block">
    <span class="demonstration">时间</span>
    <el-date-picker
      v-model="value1" @change='getstartDate' value-format='yyyy-MM-dd' :clearable="false"
      type="date"
      placeholder="选择日期"
      :picker-options="pickerOptions">
    </el-date-picker>
  </div>
  
  </el-col>
  <el-col :span='4'>
       <div class="block">
    <span class="demonstration">-</span>
    <el-date-picker
      v-model="value2"
      type="date"
      placeholder="选择日期"  @change='getendDate' value-format='yyyy-MM-dd' :clearable="false"
      :picker-options="pickerOptions1">
    </el-date-picker>
  </div>
 
  </el-col>
  <!-- 状态 -->
  <el-col :span='4'>
       <span class="demonstration">状态：</span>
    <el-select v-model="value" placeholder="请选择"  @change='getOrder'>
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  </el-col>
  <!-- 菜种 -->
   <el-col :span='4'  class="colleft">
       <span class="demonstration">彩种：</span>
    <el-select v-model="valueType"  @change='getType' placeholder="请选择">
    <el-option
      v-for="item in typeList" 
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  </el-col>
  <el-col :span='7' class="colleft">
       <span class="demonstration">期号：</span>
      <el-input v-model="input" placeholder="请输入期号"></el-input>
       <el-button type="primary" @click="fondgameNo">查询</el-button>
  </el-col>
  </el-row>
  <el-row class="timer">
        <el-col :span='2'> <el-button type="primary" @click="getyesToDate">昨天</el-button></el-col>
        <el-col :span='2'> <el-button type="primary" @click="getToDate">今天</el-button></el-col>
      <el-col :span='2'> <el-button type="primary" @click="getthrDate">近三天</el-button></el-col>
      <el-col :span='2'> <el-button type="primary" @click="onClickpicker">近一周</el-button></el-col>
      <el-col :span='2'> <el-button type="primary" @click="getmouthdate">近一个月</el-button></el-col>
  </el-row>
  <!-- 内容 -->
   <el-table
   max-height='500'
   height='500' v-loading="loading"
    :data="tableData"
     :row-class-name="tableRowClassName"
    stripe
     border
    style="width: 100%">
      <el-table-column
      align='center'
    width='100'
      prop="orderId"
      label="订单号">
    </el-table-column>
    <el-table-column
     align='center'
      prop="gameName"
      label="彩种"
      width="140">
    </el-table-column>
    <el-table-column
    align='center'
      prop="playType"
      label="玩法"
      width="140">
    </el-table-column>
    <el-table-column
     align='center'
    width='133'
      prop="gameNo"
      label="期号">
    </el-table-column>
     <el-table-column
     align='center'
    width='80'
      prop="chaseNo"
      label="追号">
    </el-table-column>
      <el-table-column
       align='center'
    width='140'
      prop="betDate"
      label="投注时间">
    </el-table-column>
      <el-table-column
       align='center'
    width='100'
      prop="betMoney"
      label="投注金额">
    </el-table-column>
      <el-table-column
       align='center'
    width='100'
      label="奖金"> <template slot-scope="props"><span :class="props.row.prizeMoney>0?'red':''"> {{props.row.prizeMoney}} </span></template>
    </el-table-column>
        <el-table-column 
         align='center'
      label="状态"> <template slot-scope="props"><span :class="props.row.prizeMoney>0?'red':''"> {{props.row.orderState}} </span></template>
    </el-table-column>
    <el-table-column label="操作"  align='center'>
      <template slot-scope="scope">
        <el-button
          size="mini" v-show="scope.row.orderCode==1"
          @click="handleNext(scope.$index, scope.row)">撤单</el-button>
      </template>
    </el-table-column>
        <el-table-column  align='center'  width='35' type="expand">
      <template slot-scope="props"   >
        <el-form label-position="left"  :row-class-name="tableRowClassName"  stripe border inline class="demo-table-expand">
          <table >
              <caption>剩余内容</caption>
          <tr>
              <th>投注注数</th>
              <th>投注单位</th>
              <th>投注倍数</th>
              <th>下注水位</th>
              <th>最多可赢</th>
              <th>开奖结果</th>
              <th>投注内容</th>
              </tr>
              <tr>
                  <td>{{ props.row.betCount }}</td>
                  <td>{{ props.row.moneyUnitStr }}</td>
                  <td>{{ props.row.betTimes }}</td>
                  <td>{{ props.row.orderWaterRate }}</td>
                  <td>{{ props.row.canWinMoney }}</td>
                  <td>{{ props.row.gameResult }}</td>
                  <td>{{ props.row.butInput }}</td>
                 
                  </tr>
     </table>        
        </el-form>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
   <div class="page">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            //日期禁用
               pickerOptions: {
                disabledDate:(time)=> {
                    if (time.getTime() > Date.now()) {
                        return true
                    } else if (time.getTime() + 3600 * 1000 * 24 * 30 < Date.now()) {
                        return true
                    } else if (this.value2 != "") {
                        return time.getTime() > Date.now() || time.getTime() >Date.parse(new Date(this.value2));
                    }
                },
            },
            pickerOptions1: {
                disabledDate:(time)=> {
                      return time.getTime() <Date.parse(new Date(this.value1)) || time.getTime() > Date.now();
                },
            },
            options:[],
            value: '',
            value1:  this.getNowFormatDate(),
            value2:  this.getNowFormatDate(),
            valueType:'',
            input: '',
            currentPage: 1,
            tableData: [],
            gameType:'',
            pageindex:1,
            pagesize:10,
            typeList:[],
            gameTypeList:[],
            total:0,
            loading:true,
            orderStatus:'',
        }
    },
    created() {
        this.getgame()
        this.getgameType()
        this.getorderlist()
    },
    activated(){
         this.getgame()
    },
    methods: {
      handleNext(index, row){
          this.$confirm('是否确认撤单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
             this.unitAjax('post','/api/lottery/cancelOrder',{orderId:row.orderId},res=>{
          if(res.result){
              this.$message({
                type: 'success',
                message: '撤单成功!'
              });
              this.$store.commit('set_safeMoney',parseFloat(this.$store.getters.safeMoney)+row.betMoney);
              this.getgame()
          }else{
            this.$message.error(res.msg)
          }
        })
        
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消撤单'
          });          
        });
     
      },
      getstartDate(){
          this.getgame()
      },
      getendDate(){
          this.getgame()
      },
        getOrder(value){
            this.orderStatus=value;
             this.getgame();
        },
        getType(value){
            this.gameType=value;
            this.getgame();
        },
        fondgameNo(){
           this.getgame()
        },
        getorderlist(){
            this.unitAjax('post','/api/userCenter/game/gameOrderStatusList',{},res=>{
             let arr=[{id:'',name:'全部'}]
            if (res.result) {
               this.options =arr.concat(res.data);
            }
            })
        },
         getgame() {
        let vm = this;
        let token = vm.getValue("token");
        let userId = vm.getValue("userId");
        if (token && userId) {
          let parmars = {
              pageIndex: vm.pageindex,
              pageSize : vm.pagesize,
              startDate: vm.value1,
              endDate  : vm.value2,
              gameType : vm.gameType,
              orderStatus:vm.orderStatus,
               gameNo:vm.input
          }
            vm.loading=true; 
          vm.unitAjax('post', '/api/userCenter/game/gameOrderListByPC', parmars, res=> {
                vm.loading=false; 
            if (res.result) {
             vm.tableData = res.data.items;  
             vm.total=res.data.totalItems;
         
            }else{
                 vm.$message.error(res.msg);
              if(res.operateCode == 100){
                setTimeout( ()=> {
                   vm.logOut()
                  },1000);
              }
            }
          });
        } else {
          setTimeout( ()=> {
                   vm.logOut()
                  },1000);
        }
      },
            //获取彩种列表
      getgameType() {
        let vm = this;
        let token = vm.getValue("token");
        let userId = vm.getValue("userId");
        if (token && userId) {
          vm.unitAjax('POST', '/api/userCenter/game/gameTypeList', {}, res=> {
              let arr=[{id:'',name:'全部'}]
            if (res.result) {
              vm.typeList =arr.concat(res.data);
              
            } else {
              if (res.operateCode == 100) {
                setTimeout( ()=> {
                   vm.logOut()
                  },1000);
              }
            }
          });
        } else {
           setTimeout( ()=> {
                   vm.logOut()
                  },1000);
        }
      },
        //获取一个月时间
        getmouthdate() {
            this.value1 = this.getMonthFormatDate()
            this.value2 = this.getNowFormatDate()
             this.getgame()
        },
        onClickpicker() {
            this.value1 = this.getsunFormatDate()
            this.value2 = this.getNowFormatDate()
             this.getgame()
        },
        getthrDate() {
            this.value1 = this.getshrFormatDate()
            this.value2 = this.getNowFormatDate()
             this.getgame()
        },
        getToDate(){
             this.value1 = this.getNowFormatDate()
             this.value2 = this.getNowFormatDate()
              this.getgame()
        },
           getyesToDate(){
             this.value1 = this.getYesToDate()
             this.value2 = this.getYesToDate()  
              this.getgame()  
        },
        // 控制表格的隔行变色
        tableRowClassName({ row, rowIndex }) {
            //    控制奇数和偶数行的颜色

            if (rowIndex % 2 == 0) {
                return 'warning-row';
            } else {
                return 'success-row';
            }
        },
        //页码
        handleSizeChange(currentpage) {
            // console.log(`每页 ${val} 条`);
            this.pagesize = currentpage;
            this.getgame();
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.pageindex = val;
            this.getgame()
        }
    }
}

</script>
<style lang="scss" scoped>
.container {
  padding-left: 20px;
  padding-bottom: 20px;
  margin-right: 20px;
  font-size: 12px;
  .el-table {
    margin-top: 23px;
  }
  .el-select {
    width: 140px;
  }
  .colleft{
      margin-left: 20px;
  }
  .el-date-editor {
    width: 351px;
  }
  .el-input__inner {
    width: 280px;
    height: 30px;
  }
  .el-input {
    width: 182px;
  }
  .el-button--primary {
    margin-left: 10px;
    height: 30px;
    line-height: 4px;
  }
  .el-input__suffix {
    background-color: #1a96f1;
  }
  .timer {
    margin-top: 10px;
  }
  //   隔行变色
  .el-table .warning-row {
    background: rgb(66, 150, 206);
  }

  .el-table .success-row {
    background: #e8f5fe;
  }
  .page {
    width: 60%;
    margin: 20px auto;
  }
  .el-date-editor {
    width: 150px;
  }
  .el-col-4 {
    width: 15.66667%;
  }
  .el-table__body-wrapper{
    overflow-y: auto;
  }
  //   展开详情
        table{

            border-collapse: collapse;
            caption{
                margin-bottom: 10px;
            }
            tr{
                text-align: center;
                th{
                     width: 166px;
                     height: 20px;
                     line-height: 20px;
                     background-color: white;
                     color: black
                }
                    td{
                    width: 166px;
                     height: 38px;
                    line-height: 38px;
                }
            }
        }
 
     table,table tr th, table tr td { border:1px solid #EEEEEE; }
}
</style>
