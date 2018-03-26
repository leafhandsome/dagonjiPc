<template>
  <div class="container">
      <!-- 时间 -->
      <el-row>
          <el-col :span='4'>
               <div class="block">
    <span class="demonstration">时间</span>
    <el-date-picker
      v-model="value1"
      type="date"
      placeholder="选择日期" @change='getstartDate' value-format='yyyy-MM-dd' :clearable="false"
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
       <span class="demonstration">下级关系：</span>
    <el-select v-model="nextVal" placeholder="请选择"  @change='getNextAll' >
    <el-option
      v-for="item in options2"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  </el-col>
  <!-- 菜种 -->
  
   <el-col :span='4.5'>
       <div class="userpadding">
       <span class="demonstration">用户类型：</span>
    <el-select v-model="value" placeholder="请选择" @change='getUserAll'>
    <el-option
       v-for="item in options"
       :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  </div>
  </el-col>
     <el-col :span='4.5'>
       <div class="userpadding">
       <span class="demonstration">彩种：</span>
    <el-select  v-model="valueType" placeholder="请选择" @change='getType'>
    <el-option
       v-for="item in typeList"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  </div>
  </el-col>

  </el-row>
  <el-row class="timer">
    
      <el-col :span='5'>  <span class="demonstration">订单号：</span>
      <el-input v-model="input" placeholder="请输入订单号"></el-input>
      </el-col>
         <el-col :span='8'>
     <div class="userpadding">
       <span class="demonstration">用户：</span>
      <el-input v-model="username" placeholder="请输入账户或昵称" ></el-input>
       <el-button type="primary"  @click="fondusername">查询</el-button>
    </div>
  </el-col>
        <el-col :span='2'> <el-button type="primary" @click="getyesToDate">昨天</el-button></el-col>
         <el-col :span='2'> <el-button type="primary" @click="getToDate">今天</el-button></el-col> 
      <el-col :span='2'> <el-button type="primary" @click="getthrDate">近三天</el-button></el-col>
      <el-col :span='2'> <el-button type="primary" @click="onClickpicker">近一周</el-button></el-col>
      <el-col :span='2'> <el-button type="primary" @click="getmouthdate">近一个月</el-button></el-col>
  </el-row>
  <!-- 内容 -->
   <el-table
   max-height='500' height='500' v-loading="loading"
    :data="tableData"
     :row-class-name="tableRowClassName"
    stripe
     border
    style="width: 100%">
    <el-table-column
     align='center'
      prop="orderSn"
      label="返点编号"
      width="100">
    </el-table-column>
    <el-table-column
    align='center'
      label="用户"
      width="160">
      <template slot-scope="props">{{props.row.userName}} <span v-if="props.row.nickName">({{props.row.nickName}})</span>
        </template>
    </el-table-column>
    <el-table-column
     align='center'
    width='70'
      label="返点">
       <template slot-scope="props">{{props.row.waterRate}} <span v-if="props.row.waterRate">%</span>
        </template>
    </el-table-column>
     <el-table-column
      align='center'
    width='50'
      prop="userType"
      label="用户类型">
    </el-table-column>
      <el-table-column
       align='center'
    width='150'
      prop="betDate"
      label="下注时间">
    </el-table-column>
      <el-table-column
       align='center'
    width='100'
      prop="gameType"
      label="彩种">
    </el-table-column>
      <el-table-column
       align='center'
    width='100'
      prop="playType"
      label="玩法">
    </el-table-column>
        <el-table-column
         align='center' 
      prop="gameNo"
      label="期号">
    </el-table-column>
        <el-table-column
         align='center'  width='80'
      prop="name"
      label="投注金额">
    </el-table-column>    <el-table-column
         align='center'  width='80'
      prop="rebateMoney"
      label="返利金额">
    </el-table-column>
        <el-table-column
 align='center'  width='80'
      prop="realMoney"
      label="返奖金额">
    </el-table-column>
        <el-table-column  align='center'  width='35' type="expand">
      <template slot-scope="props"   >
        <el-form label-position="left"  :row-class-name="tableRowClassName"  stripe border inline class="demo-table-expand">
          <table >
              <caption>剩余内容</caption>
          <tr>
              <th>中奖金额</th>
              <th>返奖</th>
              <th>返利</th>
              </tr>
              <tr>
                  <td>{{ props.row.name }}</td>
                  <td>5416546</td>
                  <td>5416546</td>
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
             options: [],
             options2: [{
                    "id": "1",
                    "name": "直接下级"
                },
                {
                    "id": "2",
                    "name": "所有下级"
                }],
            value: '',
            value1:  this.getNowFormatDate(),
            value2: this.getNowFormatDate(),
            username: '',
            input:'',
            currentPage: 1,
            tableData: [],
                 total:0,
            loading:true,
            pageindex:1,
            pagesize:10,
            nextVal:'1',
            valueType:'',
            typeList:[],
        }
    },
    
    created() {
            this.getlist()
            this.getRebateType()
            this.getUserTypelist()
    },
    methods: {
             fondusername(){
             this.getlist()
        },
        getstartDate(){
          this.getlist()
        },
        getendDate(){
            this.getlist()
        },
           getUserAll(value){
             this.value=value;
            this.getlist();
        },
          getType(value){
            this.valueType=value;
            this.getlist();
        },
        getNextAll(value){
             this.nextVal=value;
            this.getlist();
        },
         getlist() {
        let vm = this;
        let token = vm.getValue("token");
        let userId = vm.getValue("userId");
        if (token && userId) {
           vm.loading=true; 
          let parmars = {
              pageIndex: vm.pageindex,
              pageSize : vm.pagesize,
              startDate: vm.value1,
              endDate  : vm.value2,
              daiLiType:vm.nextVal,
              gameType:vm.valueType,
              userName:vm.username,
          }
          vm.unitAjax('post', '/api/agent/teamRebateLog/list', parmars, res=> {
              vm.loading=false;
            if (res.result) {
             vm.tableData = res.data.pageInfo.items;  
             vm.total=res.data.pageInfo.totalItems;
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
             getUserTypelist(){
            let vm=this;
            this.unitAjax('post','/api/agent/member/userTypeList',{},res=>{
             let arr=[{id:'',name:'全部'}]
            if (res.result) {
              vm.options =arr.concat(res.data);
                }else{
                vm.$message.error(res.msg);
              if(res.operateCode == 100){
                setTimeout( ()=> {
                   vm.logOut()
                  },1000);
              }
                }
            })
        },
           getRebateType() {
        let vm = this;
        let token = vm.getValue("token");
        let userId = vm.getValue("userId");
        if (token && userId) {
          vm.unitAjax('POST', '/api/agent/teamPlayLog/gameTypeMap', {}, res=> {
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
  .userpadding{
      margin-left: 30px;
  }
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
  //   展开详情
        table{
            margin: 0 auto;
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
