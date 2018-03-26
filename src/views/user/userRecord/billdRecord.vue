<template>
  <div class="container">
      <!-- 时间 -->
      <el-row>
          <el-col :span='4'>
               <div class="block">
    <span class="demonstration">时间</span>
    <el-date-picker
      v-model="value1"  @change='getstartDate' value-format='yyyy-MM-dd' :clearable="false"
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
  </el-col >
     <el-col :span='5'  class="colleft">
       <span class="demonstration">类型：</span>
    <el-select v-model="valueType"  @change='getType' placeholder="请选择">
    <el-option
      v-for="item in typeList" 
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  </el-col>
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
   max-height='500'  height='500' v-loading="loading"
    :data="tableData"
     :row-class-name="tableRowClassName"
    stripe
     border
    style="width: 100%">
    <el-table-column
     align='center'
      prop="id"
      label="账变编号"
      width="150">
    </el-table-column>
    <el-table-column
     align='center'
      prop="createDate"
      label="时间"
      width="150">
    </el-table-column>
    <el-table-column
     align='center'
    width='130'
      label="类型">  <template slot-scope="props"><span :class="props.row.changeType=='奖金中奖'?'red':''"> {{props.row.changeType}} </span></template>
    </el-table-column>
     <el-table-column class="red"
      align='center'
    width='130'
      label="金额"> <template slot-scope="props"><span :class="props.row.changeMoney>0?'red':'green'">{{props.row.changeMoney}}</span></template>
    </el-table-column>
      <el-table-column
       align='center'
    width='130'
      prop="beforeMoney"
      label="账变前">
    </el-table-column>
      <el-table-column
       align='center'
    width='130'
      prop="afterMoney"
      label="账变后">
    </el-table-column>
      <el-table-column
     align='center'
      prop="remark"
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
      :page-size="pagesize"
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
           typeList:[],
            value: '',
            value1:  this.getNowFormatDate(),
            value2:  this.getNowFormatDate(),
            input: '',
            currentPage: 1,
            pagesize:10,
            pageindex:1,
            total:0,
            tableData: [],
            loading:true,
            typeList:[],
            valueType:'',
        }
    },
    created() {
              this.getlist()
              this.getTypeList()
    },
    methods: {
        getType(value){
            this.valueType=value;
            this.getlist();
        },
          getstartDate(){
          this.getlist()
        },
        getendDate(){
            this.getlist()
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
            getlist() {
        let vm = this;
        let token = vm.getValue("token");
        let userId = vm.getValue("userId");
        if (token && userId) {
          let parmars = {
              pageIndex: vm.pageindex,
              pageSize : vm.pagesize,
              startDate: vm.value1,
              endDate  : vm.value2,
              changeType:vm.valueType,
          }
            vm.loading=true; 
          vm.unitAjax('post', '/api/userCenter/charge/moneyChangeLog', parmars, res=> {
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
      getTypeList() {
        let vm = this;
        let token = vm.getValue("token");
        let userId = vm.getValue("userId");
        if (token && userId) {
          vm.unitAjax('POST', '/api/agent/accountLog/changeTypeMap', {}, res=> {
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
            this.getlist();
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.pageindex = val;
            this.getlist()
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
   .red{
    color: red;
  }
  .green{
    color: #27c127;
  }
  .black{
    color:#333333;
  }
  .el-table {
    margin-top: 23px;
  }
  .el-select {
    width: 150px;
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
}
</style>
