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
      placeholder="选择日期"  @change='getstartDate' value-format='yyyy-MM-dd' :clearable="false"
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
    <el-select v-model="nextVal" placeholder="请选择"  @change='getNextAll'>
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
    <el-select v-model="value" placeholder="请选择"  @change='getUserAll'>
    <el-option
      v-for="item in options"
       :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  </div>
  </el-col>
  
  <el-col :span='7'>
        <div class="userpadding">
       <span class="demonstration">用户：</span>
      <el-input v-model="username" placeholder="请输入账户或昵称"></el-input>
       <el-button type="primary" @click="fondusername">查询</el-button>
        </div>
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
  <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item ><span @click="getback('','first')">首页</span></el-breadcrumb-item>
  <el-breadcrumb-item  v-for="(item,index) in arr" :key="index"><span @click="getback(item.userId,index)">{{item.userName}}</span> </el-breadcrumb-item>

</el-breadcrumb>
   <el-table
   max-height='440'  v-loading="loading" 
    :data="tableData"
     :row-class-name="tableRowClassName"
    stripe
     border :cell-style='fun'
    
    style="width: 100%">
    <el-table-column
     align='center'
      label="用户"
      width="160">
       <template slot-scope="props">{{props.row.userName}} <span v-show="props.row.remarkName&&props.row.remarkName!='null'">({{props.row.remarkName}})</span>
        </template>
    </el-table-column>
    <el-table-column
    align='center'
      label="用户类型"
      width="50">
        <template slot-scope="props">{{props.row.userType==1?'代理':'会员'}}
        </template>
    </el-table-column>
    <el-table-column
     align='center'
    width='83'
      prop="betMoney"
      label="消费">
    </el-table-column>
     <el-table-column
     align='center'
    width='83'
      prop="cancelMoney"
      label="撤单退款">
    </el-table-column>
     <el-table-column
      align='center'
    width='83'
      prop="sendRebateMoney"
      label="回水">
    </el-table-column>
      <el-table-column
       align='center'
    width='83'
      prop="betPrizeMoney"
      label="中奖">
    </el-table-column>
      <el-table-column
       align='center'
    width='83'
      prop="realMoney"
      label="返奖">
    </el-table-column>
      <el-table-column
       align='center'
    width='83'
      prop="rebateMoney"
      label="返利">
    </el-table-column>
  
        <el-table-column
         align='center'
           width='83'
      prop="payMoney"
      label="充值">
    </el-table-column>
        <el-table-column
         align='center'
           width='83'
      prop="cashMoney"
      label="提现">
    </el-table-column>
        <el-table-column
         align='center'
           width='83'   
      label="总盈亏"> <template slot-scope="props"><label :class="props.row.allWinMoney>0?'red':'green'"> <span :class="props.row.allWinMoney==0?'black':''">{{props.row.allWinMoney}}  </span></label> </template>
     
    </el-table-column>
<el-table-column label="操作" width='203' align='center'>
      <template slot-scope="scope" >
        <el-button
          size="mini"  v-show="scope.row.userType==1&&scope.row.childCount!==0"
          @click="handleNext(scope.$index, scope.row)">下级({{scope.row.childCount}})</el-button>
        <!-- <el-button v-show="index"
          size="mini"
          type="primary"
          @click="handleBack(scope.$index, scope.row)">返回({{index}})</el-button> -->
      </template>
    </el-table-column>
  </el-table> 
            <table>
              <tr class="tableTr">
                  <td>总计</td>
                  <td></td>
                  <td>{{teamreportsum.betMoney}}</td>
                  <td>{{teamreportsum.cancelMoney}}</td>
                  <td>{{teamreportsum.sendRebateMoney}}</td>
                  <td>{{teamreportsum.betPrizeMoney}}</td>
                  <td>{{teamreportsum.realMoney}}</td>
                  <td>{{teamreportsum.rebateMoney}}</td>
                  <td>{{teamreportsum.payMoney}}</td>
                  <td>{{teamreportsum.cashMoney}}</td>
                  <td :class="parseFloat(teamreportsum.allWinMoney).toFixed(3)>0?'red':'green'"><span :class="parseFloat(teamreportsum.allWinMoney).toFixed(3)==0?'black':''">{{parseFloat(teamreportsum.allWinMoney).toFixed(3)}}</span></td>
                  <td></td>
                  </tr>
     </table> 
  <!-- 分页 -->
   <div class="page">
    <el-pagination type="flex"  justify="center"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 50,100]"
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
              options: [],
             options2: [{
                    "id": "1",
                    "name": "直接下级"
                },
                {
                    "id": "2",
                    "name": "所有下级"
                },{
                    "id": "0",
                    "name": "全部"
                }],
            value: '',
            value1:  this.getNowFormatDate(),
            value2:  this.getNowFormatDate(),
            username: '',
            currentPage: 1,
            index:0,
            tableData: [],
             total:0,
            loading:true,
            pageindex:1,
            pagesize:10,
            nextVal:'1',
            childUserId:'',
            tableHeight:500,
            name:'返回',
            arr:[],
            current:0,
            teamreportsum:{}
        }
    },
    created() {
        this.getlist()
        this.getUserTypelist()
    },
    mounted(){
     
    },
    methods: {
      getback(value,current){
      //  if( JSON.parse(this.getStroe('list')).userId==value){
      //     this.childUserId=value;
      //  }
        let length=this.arr.length;
        this.current=current=='first'?0:current+1;
          this.arr.splice(this.current,length)
          this.childUserId=value;
        this.getlist()
      },
      fun({row, column, rowIndex, columnIndex}){
        // if(columnIndex==9){
        //   if(row.allWinMoney>0){
        //     this.style.color='red'
        //   }
        // }
          if(row.allWinMoney&&columnIndex==9){
            row.allWinMoney=parseFloat(row.allWinMoney.toFixed(3))
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
           // 下级
           handleNext(index, row) {
            //   let id=0;
            //   id=document.getElementsByClassName('back')[this.current].innerText
            //  if(this.current){
            //         this.childUserId=id;
            //       this.getlist()
            //       this.current++;
            //  }else{
                        if(this.arr.length>0){
                    for(let key in this.arr){
                if(this.arr[key].userId==row.userId){
                    return ;
                }else{
                    this.arr.push({ userId:row.userId, userName:row.userName,childCount:row.childCount});
                }
              }
              }else{
                this.arr=[{ userId:row.userId, userName:row.userName,childCount:row.childCount}];
              }
              
              //  this.index++;
                // this.setValue({ name:'childUserId'+this.index, value:row.userId});
                this.childUserId=row.userId;
              this.getlist()
            //  }
      },
          //   返回
      handleBack(index, row) {
        this.index--;
        // this.arr=this.getValue('arr');
        this.arr.pop()
        //  this.setValue({ name:'arr', value:this.arr});
        this.childUserId=this.getValue('childUserId'+this.index);
         this.getlist()
      },
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
         getNextAll(value){
             this.nextVal=value;
            this.getlist();
        },
         getlist() {
        let vm = this;
        let height=0;
        let token = vm.getValue("token");
        let userId = vm.getValue("userId");
        if (token && userId) {
          let parmars = {
              pageIndex: vm.pageindex,
              pageSize : vm.pagesize,
              startDate: vm.value1,
              endDate  : vm.value2,
              daiLiType:vm.nextVal,
              userType:vm.value,
              userName:vm.username,
              childUserId:vm.childUserId,
          }
           vm.loading=true;
          vm.unitAjax('post', '/api/agent/teamReport/list', parmars, res=> {
             vm.loading=false;
            if (res.result) {
             vm.tableData = res.data.pageInfo.items;  
             vm.total=res.data.pageInfo.totalItems;
             vm.teamreportsum=res.data.reportSum
            //  setTimeout(() => {
            //           height=(document.getElementsByTagName('td')[0].offsetHeight)*(document.getElementsByClassName('el-table__row').length+2)
            //           this.tableHeight=height>0?height+25:500;
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
  height: 645px;
  position: relative;
  .userpadding{
      margin-left: 30px;
  }
  .el-table {
    margin-top: 8px;
  }
  .el-breadcrumb{
    margin-top: 15px;
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
    width: 1160px;
    position: absolute;
    bottom: 30px;
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
        width: 157px;
      }
        :nth-child(2){
        width: 47px;
      }
        :nth-child(3){
        width: 80px;
      }
        :nth-child(4){
        width: 80px;
      } 
       :nth-child(5){
        width: 80px;
      }
        :nth-child(6){
        width: 80px;
      }  :nth-child(7){
        width: 80px;
      }  :nth-child(8){
        width: 80px;
      }  :nth-child(9){
        width: 80px;
      }  :nth-child(10){
        width: 80px;
      }  :nth-child(11){
        width: 80px;
      }  :nth-child(12){
        width: 200px;
      }
  }
}
</style>
