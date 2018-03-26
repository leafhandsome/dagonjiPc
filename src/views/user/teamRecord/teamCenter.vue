<template>
  <div class="container">
      <div class="title clearfix">
      <div class="moddle"><div class="header">团队人数</div><div class="number">{{sumObj.userCount}}</div></div>
      <div class="moddle"><div class="header">代理人数</div><div class="number">{{sumObj.daiLiCount}}</div></div>
      <div class="moddle"><div class="header">会员人数</div><div class="number">{{sumObj.huiYuanCount}}</div></div>
      <div class="moddle"><div class="header">团队余额</div><div class="number last">{{sumObj.safeMoney}}</div></div>
      </div>
      <div class="row-line">
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
      placeholder="选择日期"  @change='getendDate' value-format='yyyy-MM-dd' :clearable="false"
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
      <div class="table">
          <table v-loading="loading">
          <tr>
              <th>总盈亏</th>
              <th>返点</th>
              <th>投注</th>
              <th>中奖</th>
              <th>充值</th>
              <th>提现</th>
              <th>新增代理</th>
              <th>新增会员</th>
              </tr>
              <tr>
                  <td>{{dayObj.winMoney}}</td>
                  <td>{{dayObj.rebateMoney}}</td>
                  <td>{{dayObj.betMoney}}</td>
                  <td>{{dayObj.prizeMoney}}</td>
                  <td>{{dayObj.payMoney}}</td>
                  <td>{{dayObj.cashMoney}}</td>
                  <td>{{dayObj.daiLiCount}}</td>
                  <td>{{dayObj.huiYuanCount}}</td>
                  </tr>
     </table>
      </div>
      </div>
  </div>
</template>
<script>
    export default {
        data (){
            return{
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
                value1: this.getNowFormatDate(),
                value2: this.getNowFormatDate(),
                loading:true,
                dayObj:{},
                sumObj:{},
            }
        },
        created () {
          this.getlist()  
        },
        methods: {
         getstartDate(){
          this.getlist()
        },
        getendDate(){
            this.getlist()
        },
         getlist() {
        let vm = this;
         
        let token = vm.getValue("token");
        let userId = vm.getValue("userId");
        if (token && userId) {
          let parmars = {
              startDate: vm.value1,
              endDate  : vm.value2,
          }
            vm.loading=true; 
          vm.unitAjax('post', '/api/agent/daiLiCenter/detail', parmars, res=> {
                 vm.loading=false; 
            if (res.result) {
             vm.dayObj = res.data.day;  
             vm.sumObj = res.data.sum;  
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
        }
    }
</script>
<style lang="scss" scoped>
.container{
      color: #43484a;
    font-size: 12px;
    background-color: #F2F7F8;
    margin-bottom: 300px;
      .el-date-editor {
    width: 150px;
  }
   .el-button--primary {
    margin-left: 10px;
    height: 30px;
    line-height: 4px;
  }
    .el-col-4 {
    width: 15.66667%;
  }
  .row-line{
     margin-top: 6px; 
     background-color: white;
     padding:20px ;
  }
    .title{
        padding:0 20px 28px;
        background-color: white;
        .moddle{
            // width: 188px;
            height: 60px;
            float: left;
            padding:0 50px;
        .number{
            font:700 36px '微软雅黑'; 
            position: relative;
            &::after{
                content:'';
                height: 15px;
                border-right: 1px solid #E3E3E3;
                position: absolute;
                right: -50px;
                top: 50%;
                transform: translateY(-50%)
            }   
        }
        .last{
                 &::after{
                content:'';
                border:none;
            }  
        }
    }
    }
    .table{
      padding: 20px 0;
        table{
            border-collapse: collapse;
            tr{
                text-align: center;
                th{
                     width: 166px;
                     height: 28px;
                     line-height: 28px;
                }
                    td{
                    width: 166px;
                    height: 70px;
                    font:700 24px '微软雅黑';
                    height: 70px;
                    line-height: 70px;
                }
            }
        }
    }
     table,table tr th, table tr td { border:1px solid #EEEEEE; }
      
}
</style>
