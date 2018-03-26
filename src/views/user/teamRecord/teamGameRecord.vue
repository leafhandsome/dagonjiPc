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
     <el-col :span='4.5'>
       <div class="userpadding">
       <span class="demonstration">彩种：</span>
    <el-select v-model="valueType"  @change='getType' placeholder="请选择">
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
    
      <el-col :span='5'>  <span class="demonstration">期号：</span>
      <el-input v-model="input" placeholder="请输入期号"></el-input></el-col>
         <el-col :span='7'>

       <span class="demonstration">用户：</span>
      <el-input v-model="username" placeholder="请输入账户或昵称"></el-input>
       <el-button type="primary" @click="fondusername">查询</el-button>

  </el-col>
        <el-col :span='2'> <el-button type="primary" @click="getyesToDate">昨天</el-button></el-col>
      <el-col :span='2'> <el-button type="primary" @click="getToDate">今天</el-button></el-col>
      <el-col :span='2'> <el-button type="primary" @click="getthrDate">近三天</el-button></el-col>
      <el-col :span='2'> <el-button type="primary" @click="onClickpicker">近一周</el-button></el-col>
      <el-col :span='2'> <el-button type="primary" @click="getmouthdate">近一个月</el-button></el-col>
  </el-row>
  <!-- 内容 -->
   <el-table
   max-height='500'  height='500' v-loading="loading"
    :data="tableData"
     :row-class-name="tableRowClassName" @expand-change='cellClick' :row-key="getRowKeys" :expand-row-keys="expands"
    stripe
     border
    style="width: 100%">
    <el-table-column width='180' align='center' label="用户" >
        <template slot-scope="scope" >{{scope.row.userName}} <span v-show="scope.row.nickName">({{scope.row.nickName}})</span>
        </template>
    </el-table-column>
    <el-table-column
    align='center'
      label="返点"
      width="60"> <template slot-scope="scope" >{{scope.row.waterRate}}% </template>
    </el-table-column>
    <el-table-column
     align='center'
    width='80'
      prop="userType"
      label="用户类型">
    </el-table-column>
     <el-table-column
      align='center'
    width='95'
      prop="gameType"
      label="游戏">
    </el-table-column>
      <el-table-column
       align='center'
    width='95'
      prop="playType"
      label="玩法">
    </el-table-column>
        <el-table-column
       align='center'
    width='110'
      prop="gameNo"
      label="期号">
    </el-table-column>
      <el-table-column
       align='center'
    width='80'
      prop="betMoney"
      label="投注金额">
    </el-table-column>
      <el-table-column
       align='center'
    width='80'
      prop="betPrizeMoney"
      label="奖金">
    </el-table-column>
        <el-table-column
         align='center'
           width='80'
      prop="sendRebateMoney"
      label="返点金额">
    </el-table-column>
        <el-table-column
 align='center'
   width='80'
      prop="realMoney"
      label="返奖金额">
    </el-table-column>
       <el-table-column
       align='center'
    width='80'
      prop="rebateMoney"
      label="返利金额">
    </el-table-column>
       <el-table-column
       align='center'
    width='95'
      prop="orderState"
      label="状态">
    </el-table-column >
        <el-table-column width='40' align='center'  type="expand" >
      <template slot-scope="props">
        <el-form label-position="left"  :row-class-name="tableRowClassName"  stripe border inline class="demo-table-expand">
          <table>
              <caption>剩余内容</caption>
          <tr>
              <th>订单编号</th>
              <th>投注时间</th>
              <th>返奖</th>
              <th>返利</th>
              <th>投注倍数</th>
              <th>投注注数</th>
              <th>投注单位</th>
              <th>下注水位</th>
              <th>最多可赢</th>
              <th>开奖结果</th>
              <th>投注内容</th>
              </tr>
              <tr>
                  <td>{{ props.row.orderSn }}</td>
                  <td>{{teamdetail.betDate}}</td>
                  <td>{{Math.round(teamdetail.reAward*100)}}%</td>
                  <td>{{Math.round(teamdetail.rebate*100)}}%</td>
                  <td>{{teamdetail.betTimes}}</td>
                  <td>{{teamdetail.betCount}}</td>
                  <td>{{teamdetail.moneyUnitStr}}</td>
                  <td>{{teamdetail.orderWater}}%</td>
                  <td>{{teamdetail.canWinMoney}}</td>
                  <td>{{teamdetail.bigOrSmall}}{{teamdetail.singleOrDouble}}{{teamdetail.draganOrTiger}}{{teamdetail.sum}}<br>{{teamdetail.openCode}}</td>
                  <td>{{teamdetail.betInput}}</td>
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
                      return time.getTime() <Date.parse(new Date(this.value1))|| time.getTime() > Date.now();
                },
            },
             // 获取row的key值
        getRowKeys(row) {
            return row.orderSn;
        },
        // 要展开的行，数值的元素是row的key值
        expands: [],
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
            value2:  this.getNowFormatDate(),
            input: '',
            nextVal:'1',//下级关系
            currentPage: 1,
            tableData: [],
             total:0,
            loading:true,
            pageindex:1,
            pagesize:10,
            typeList:[],
            valueType:'',
            username:'',
            teamdetail:{},
        }
    },
    created() {
        this.getlist()
        this.getgameType()
        this.getUserTypelist()
       
        // if(this.teamdetail.length=0){
        //     this.teamdetail=JSON.parse(localStorage.data)
        //      console.log(this.teamdetail)
        // }else{}
    },
    methods: {

      //详情
          cellClick(row){
             this.expands = [];
            this.expands.push(row.orderSn);
              // if(this.getStroe(row.orderSn)){
              //   //  console.log(this.teamdetail)
              //   for(let key in this.teamdetail){
              //     if(this.teamdetail.indexOf(this.getStroe(row.orderSn)) != -1){
              //        this.teamdetail.push(JSON.parse(this.getStroe(row.orderSn)))
              //     }else{
              //     }
              //   }
              //     // console.log(this.teamdetail)
              // }else{
                // this.setStore('orderSn',row.orderSn);
                // console.log(this.getStroe('orderSn'),row.orderSn)
                // if(this.getStroe('orderSn')){if(this.getStroe('orderSn')==row.orderSn){
                //     return;
                // }else{
                    this.getdetail(row)
                // }}else{
                //    this.getdetail(row)
                // }
                
              
              // }
          },
          getdetail(row){
              this.loading=true;
                     this.unitAjax('post','/api/agent/teamPlayLog/detail',{orderSn:row.orderSn},res=>{
                       this.loading=false;
               if(res.result){
                 this.teamdetail=res.data;
                //  console.log(54)
                //  if(this.teamdetail.length>0){   for(let key in this.teamdetail){
                //       // console.log(typeof(this.teamdetail[key]),typeof( res.data))
                //   if(JSON.stringify(this.teamdetail[key])==JSON.stringify( res.data)){
                //     // console.log(212)
                //      return;
                //   }else{
                //     this.teamdetail.push(res.data);
                //     this.setStore('orderSn',row.orderSn);
                //   }
                // }}else{
                //    this.teamdetail.push(res.data)
                // }
                
                //   this.teamdetail.push(res.data);
                // this.setStore(row.orderSn,res.data)
               }else{
                     this.$message.error(res.msg);
              if(res.operateCode == 100){
                setTimeout( ()=> {
                   this.logOut()
                  },1000);
              }
               }
             })
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
          let parmars = {
              pageIndex: vm.pageindex,
              pageSize : vm.pagesize,
              startDate: vm.value1,
              endDate  : vm.value2,
              daiLiType:vm.nextVal,
              gameType:vm.valueType,
              userName:vm.username,
              userType:vm.value,
              gameNo:vm.input,
          }
           vm.loading=true;
          vm.unitAjax('post', '/api/agent/teamPlayLog/list', parmars, res=> {
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
                //获取彩种列表
      getgameType() {
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
    },
    // beforeDestroy(){
    //    localStorage.clear();
    // }
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
