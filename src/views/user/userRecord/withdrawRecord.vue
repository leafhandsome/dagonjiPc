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
      placeholder="选择日期" @change='getendDate' value-format='yyyy-MM-dd' :clearable="false"
      :picker-options="pickerOptions1">
    </el-date-picker>
  </div>
 
  </el-col>
  <!-- 状态 -->
  <el-col :span='4.5'>
       <span class="demonstration">状态：</span>
    <el-select v-model="valueType" placeholder="请选择" @change="getType">
    <el-option
      v-for="item in typeList"
      :key="item.value"
      :label="item.name"
      :value="item.value">
    </el-option>
  </el-select>
  </el-col>
  <!-- 菜种 -->
   <el-col :span='5' class="colleft">
       <span class="demonstration">方式：</span>
    <el-select v-model="value" placeholder="请选择"  @change="wichType">
    <el-option
      v-for="item in wichList"
      :key="item.cashFlag"
      :label="item.showName"
      :value="item.cashFlag">
    </el-option>
  </el-select>
  </el-col>
  <!-- <el-col :span='2'>
       <el-button type="primary">查询</el-button>
  </el-col> -->
  <el-col :span='2'> <el-button type="primary" @click="getyesToDate">昨天</el-button></el-col>
    <el-col :span='2'> <el-button type="primary" @click="getToDate">今天</el-button></el-col>
   <el-col :span='2'> <el-button type="primary" @click="getthrDate">近三天</el-button></el-col>
      <el-col :span='2'> <el-button class="toDate" type="primary" @click="onClickpicker">近一周</el-button></el-col>
      <el-col :span='2'> <el-button  class="toDate" type="primary" @click="getmouthdate">近一个月</el-button></el-col>
  </el-row>
 
  <!-- 内容 -->
   <el-table
   max-height='500' height='500' v-loading="loading"
    :data="tableData"
     :row-class-name="tableRowClassName" :cell-style='fun'
    stripe
     border
    style="width: 100%">
    <el-table-column
     align='center'
      prop="id"
      label="订单号"
      width="100">
    </el-table-column>
    <el-table-column
     align='center'
      label="提现方式"
      width="180">   <template slot-scope="props">{{props.row.cashFlagName}}-{{props.row.cashFlagName=='支付宝'?tousername(props.row.cashAccount.split(',')[1])+' '+(props.row.cashAccount.split(',')[0].toString()).slice(-4):props.row.cashAccount.split(',')[0]+' '+(props.row.cashAccount.split(',')[1].toString()).slice(-4)}}  </template>
    </el-table-column>
    <el-table-column
     align='center'
    width='100'
      prop="cashMoney"
      label="提现金额">
    </el-table-column>
     <el-table-column
      align='center'
    width='100'
      prop="serviceMoney"
      label="手续费">
    </el-table-column>
      <el-table-column
       align='center'
    width='100'
      prop="reallyMoney"
      label="到账金额">
    </el-table-column>
      <el-table-column
       align='center'
    width='145'
      prop="createDate"
      label="提现时间">
    </el-table-column>
      <el-table-column
       align='center'
    width='180'
      label="状态"><template slot-scope="props">{{props.row.cashStatus}} <a :href="serviceUrl" class="lianxi" v-show="props.row.cashStatus!='已打款'"> 联系客服</a> </template>
    </el-table-column>
        <el-table-column
         align='center'
      label="备注"> 

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
                      return time.getTime() < Date.parse(new Date(this.value1)) || time.getTime() > Date.now();
                },
            },
            value: '',
            value1:  this.getNowFormatDate(),
            value2: this.getNowFormatDate(),
            input: '',
            valueType:'',
            currentPage: 1,
            typeList:[],
            wichList:[],
            tableData: [],
            pageindex:1,
            pagesize:10,
            cashFlag:'',
            cashStatus:'',
            total:0,
            loading:true,
        }
    },
    created() {
        this.getgameType()
        this.getwichType()
        this.getwithdrawRecord()
    },
    computed:{
    serviceUrl(){
      return this.$store.getters.serviceUrl;
      }
    },
    methods: {
       fun({row, column, rowIndex, columnIndex}){
          if(columnIndex==2){
            let Account=row.cashAccount.split(',')[0].toString()
            if(Account.indexOf('@')){
              row.cashAccount=Account.split('@')[0]+','+row.cashAccount.split(',')[1]
            }
          }
      },
        getstartDate(){
          this.getwithdrawRecord()
      },
      getendDate(){
          this.getwithdrawRecord()
      },
        wichType(value){
             this.cashFlag=value;
           this.getwithdrawRecord()
        },
        getType(value){
           this.cashStatus=value;
           this.getwithdrawRecord()
        },
        getwithdrawRecord() {
        let vm = this;
        let token = vm.getValue("token");
        let userId = vm.getValue("userId");
        if (token && userId) {
          let parmars = {
              pageIndex: vm.pageindex,
              pageSize : vm.pagesize,
              startDate: vm.value1,
              endDate  : vm.value2,
              cashState: vm.cashStatus,
              cashFlag:vm.cashFlag,
          }
            vm.loading=true; 
          vm.unitAjax('post', '/api/userCenter/cash/cashLogPC', parmars, function (res) {
             vm.loading=false
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
          getwichType() {
        let vm = this;
        let token = vm.getValue("token");
        let userId = vm.getValue("userId");
        if (token && userId) {
          vm.unitAjax('POST', '/api/userCenter/cash/cashTypeList', {}, res=> {
              let arr=[{cashFlag:'',showName:'全部'}]
            if (res.result) {
              vm.wichList =arr.concat(res.data);
              
            } else {
             this.$message.error(res.msg)
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
            //获取彩种列表
      getgameType() {
        let vm = this;
        let token = vm.getValue("token");
        let userId = vm.getValue("userId");
        if (token && userId) {
          vm.unitAjax('POST', '/api/userCenter/cash/cashStateList', {}, res=> {
              let arr=[{value:'',name:'全部'}]
            if (res.result) {
              vm.typeList =arr.concat(res.data);
              
            } else {
            this.$message.error(res.msg)
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
             this.getwithdrawRecord()
        },
        onClickpicker() {
            this.value1 = this.getsunFormatDate()
            this.value2 = this.getNowFormatDate()
             this.getwithdrawRecord()
        },
        getthrDate() {
            this.value1 = this.getshrFormatDate()
            this.value2 = this.getNowFormatDate()
             this.getwithdrawRecord()
        },
          getToDate(){
             this.value1 = this.getNowFormatDate()
             this.value2 = this.getNowFormatDate()
              this.getwithdrawRecord()
        },
          getyesToDate(){
             this.value1 = this.getYesToDate()
             this.value2 = this.getYesToDate()   
              this.getwithdrawRecord() 
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
            this.getwithdrawRecord()
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.pageindex = val;
             this.getwithdrawRecord()
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
  .toDate{
      margin-top: 20px;
  }
  .el-table {
    margin-top: 23px;
  }
  .el-select {
    width: 150px;
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
  .lianxi{
    margin-left: 5px;
    cursor: pointer;
    color: #4584F5;
  }
}
</style>
