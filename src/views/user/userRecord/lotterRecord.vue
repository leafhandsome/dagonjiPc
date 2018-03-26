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
      v-model="value2" @change='getendDate' value-format='yyyy-MM-dd' :clearable="false"
      type="date"
      placeholder="选择日期"
      :picker-options="pickerOptions1">
    </el-date-picker>
  </div>
 
  </el-col >
<!-- <el-col :span='2'>
 <el-button type="primary">查询</el-button>
</el-col> -->
         <el-col :span='2'> <el-button type="primary" @click="getyesToDate">昨天</el-button></el-col>
         <el-col :span='2'> <el-button type="primary" @click="getToDate">今天</el-button></el-col>
      <el-col :span='2' > <el-button type="primary" @click="getthrDate">近三天</el-button></el-col>
      <el-col :span='2' > <el-button type="primary" @click="onClickpicker">近一周</el-button></el-col>
      <el-col :span='2' > <el-button type="primary" @click="getmouthdate">近一个月</el-button></el-col>

</el-row>
  <!-- 内容 -->
   <el-table
   max-height='500'   v-loading="loading"
    :data="tableData"
     :row-class-name="tableRowClassName" :cell-style='fun'
    stripe
     border  
    style="width: 100%">
    <el-table-column
     align='center'    width='180'
      prop="dayTime"
      label="日期" >
    </el-table-column>
      <el-table-column
       align='center'
    width='140'
      prop="betMoney"
      label="消费">
    </el-table-column>
       <el-table-column
        align='center'
    width='140'
      prop="cancelMoney"
      label="撤单退款">
    </el-table-column>
       <el-table-column
        align='center'
    width='140'
      prop="rebateMoney"
      label="返利">
    </el-table-column>
     <el-table-column
        align='center'
    width='140'
      prop="awardMoney"
      label="返奖">
    </el-table-column>
     <el-table-column
        align='center'
    width='140'
      prop="rebateSelf"
      label="回水">
    </el-table-column>
           <el-table-column
            align='center'
    width='140'
      prop="prizeMoney"
      label="中奖">
    </el-table-column>
        <el-table-column
     align='center'  width="140"
      label="总盈亏"> <template slot-scope="props"><label :class="props.row.winMoney>0?'red':'green'"> <span :class="props.row.winMoney==0?'black':''">{{props.row.winMoney}}  </span></label> </template>
    </el-table-column>
  </el-table> 
          <table v-if="tableData.length>0">
              <tr class="tableTr">
                  <td>总计</td>
                  <td>{{parseFloat(reportsum.sumBetMoney).toFixed(3)}}</td>
                  <td>{{parseFloat(reportsum.sumCancelMoney).toFixed(3)}}</td>
                  <td>{{parseFloat(reportsum.sumRebateMoney).toFixed(3)}}</td>
                  <td>{{parseFloat(reportsum.sumAwardMoney).toFixed(3)}}</td>
                  <td>{{parseFloat(reportsum.sumRebateSelf).toFixed(3)}}</td>
                  <td>{{parseFloat(reportsum.sumPrizeMoney).toFixed(3)}}</td>
                  <td :class="parseFloat(reportsum.sumWinMoney).toFixed(3)>0?'red':'green'"><span :class="parseFloat(reportsum.sumWinMoney).toFixed(3)==0?'black':''">{{parseFloat(reportsum.sumWinMoney).toFixed(3)}}</span></td>
                
                  </tr>
     </table> 
  <!-- 分页 -->
   <!-- <div class="page">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div> -->
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
            value: '',
            value1:  this.getNowFormatDate(),
            value2:  this.getNowFormatDate(),
            input: '',
            currentPage: 1,
            tableData: [],
            loading:true,
            tableHeight:500,
            reportsum:{}
            // total:0,
            // pageindex:1,
            // pagesize:10,
        }
    },
    created() {
       this.getlist()
    },
    methods: {
         fun({row, column, rowIndex, columnIndex}){
          if(row.winMoney&&columnIndex==6){
            row.winMoney=parseFloat(row.winMoney.toFixed(3))
          }
      },
     getstartDate(){
          this.getlist()
      },
      getendDate(){
          this.getlist()
      },
          getlist() {
        let vm = this;
        let height=0;
        let token = vm.getValue("token");
        let userId = vm.getValue("userId");
        if (token && userId) {
          let parmars = {
              // pageIndex: vm.pageindex,
              // pageSize : vm.pagesize,
              startDate: vm.value1,
              endDate  : vm.value2,
          }
            vm.loading=true; 
          vm.unitAjax('post', '/api/userCenter/lotteryReport/report', parmars, res=> {
              vm.loading=false; 
            if (res.result) {
             vm.tableData = res.data.items;  
             vm.total=res.data.totalItems;
             vm.reportsum=res.data
            //  setTimeout(() => {
            //       console.log(document.getElementsByClassName('el-table__row').length)
            //      height=(document.getElementsByTagName('td')[0].offsetHeight)*(document.getElementsByClassName('el-table__row').length+2)
            //           this.tableHeight=height>0?height+5:500;
            //  }, 20);
          
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
        //获取一个月时间
        getmouthdate() {
            this.value1 = this.getMonthFormatDate()
            this.value2 = this.getNowFormatDate()
             this.getlist()
        },
        onClickpicker() {
            this.value1 = this.getsunFormatDate()
            this.value2 = this.getNowFormatDate()
             this.getlist()
        },
        getthrDate() {
            this.value1 = this.getshrFormatDate()
            this.value2 = this.getNowFormatDate()
             this.getlist()
        },
           getToDate(){
             this.value1 = this.getNowFormatDate()
             this.value2 = this.getNowFormatDate()
              this.getlist()
        },
          getyesToDate(){
             this.value1 = this.getYesToDate()
             this.value2 = this.getYesToDate() 
              this.getlist()   
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
        // handleSizeChange(currentpage) {
        //     // console.log(`每页 ${val} 条`);
        //     this.pagesize = currentpage;
        //    this.getlist()
        // },
        // handleCurrentChange(val) {
        //     // console.log(`当前页: ${val}`);
        //     this.pageindex = val;
        //      this.getlist()
        // }
    }
}

</script>
<style lang="scss" scoped>
.container {
  padding-left: 20px;
  padding-bottom: 20px;
  margin-right: 20px;
  font-size: 12px;
  height: 645px;
  .el-table {
    margin-top: 23px;
  }
  .el-select {
    width: 120px;
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
    .red{
    color: red;
  }
  .green{
    color: #27c127;
  }
  .black{
    color:#333333;
  }
    table{
    border-collapse: collapse;
  }
  .tableTr{
    width: 100%;
    height: 38px;
    background-color: #FAFAFA;
    border-top: none;
    border-bottom:1px solid #EBEEF5;
     text-align: center;
      td{
        border-right:1px solid #EBEEF5;
      }
      :nth-child(1){
        width: 177px;
      }
        :nth-child(2){
        width: 137px;
      }
        :nth-child(3){
        width: 137px;
      }
        :nth-child(4){
        width: 137px;
      } 
       :nth-child(5){
        width: 137px;
      }
        :nth-child(6){
        width: 137px;
      }  :nth-child(7){
        width: 137px;
      }  :nth-child(8){
         width: 137px;
      } 
  }
}
</style>
