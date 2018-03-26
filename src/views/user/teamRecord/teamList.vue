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
    <el-select  v-model="nextVal" placeholder="请选择"  @change='getNextAll'>
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
       <el-button type="primary"  @click="fondusername">查询</el-button>
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
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item ><span @click="getback('','first')">首页</span></el-breadcrumb-item>
  <el-breadcrumb-item  v-for="(item,index) in arr" :key="index"><span @click="getback(item.userId,index)">{{item.userName}}</span> </el-breadcrumb-item>

</el-breadcrumb>
  <!-- 内容 -->
   <el-table
   max-height='500' height='500' v-loading="loading"
    :data="tableData"
     :row-class-name="tableRowClassName"
    stripe
     border
    style="width: 100%">
    <el-table-column
    class-name='col-height'
     align='center'
      label="用户"
      width="200">
       <template slot-scope="props">{{props.row.userName}} <span v-if="props.row.remarkName">({{props.row.remarkName}})</span>
        </template>
    </el-table-column>
    <el-table-column
    align='center'
      label="用户类型"
      width="100">
      <template slot-scope="props">{{props.row.userType==1?'代理':'会员'}}
        </template>
    </el-table-column>
    <el-table-column
     align='center'
    width='120'
      prop="safeMoney"
      label="账户余额">
    </el-table-column>
     <el-table-column
      align='center'
    width='120'
      label="返点">
       <template slot-scope="props">{{props.row.userRate}} <span v-if="props.row.userRate">%</span>
        </template>
    </el-table-column>
      <el-table-column
       align='center'
    width='120'
      label="返奖">
       <template slot-scope="props">{{Math.round(props.row.reAward*100)}} <span v-if="props.row.reAward">%</span>
        </template>
    </el-table-column>
      <el-table-column
       align='center'
    width='120'
      label="返利">
       <template slot-scope="props">{{Math.round(props.row.rebate*100)}} <span v-if="props.row.rebate">%</span>
        </template>
    </el-table-column>
      <el-table-column
       align='center'
    width='160'
      prop="lastLoginDate"
      label="最后上线时间">
    </el-table-column>
    <el-table-column label="操作"  align='center'>
      <template slot-scope="scope">
        <el-button
          size="mini" v-show="scope.row.userType==1&&scope.row.childCount!==0"
          @click="handleNext(scope.$index, scope.row)">下级({{scope.row.childCount}})</el-button>
            <el-button v-if="flog"
          size="mini"
          @click="setNext(scope.$index, scope.row)">管理</el-button>
        <!-- <el-button v-show="index"
          size="mini"
          type="primary"
          @click="handleBack(scope.$index, scope.row)">返回({{index}})</el-button> -->
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
  <!-- 管理下级 --> 
                <el-dialog
                    title="下级管理"
                    center
                    :visible.sync="dialogVisible5"
                    width="600px"
                    :before-close="handleClose">
                    <div class="with-name clearfix"> 
                        <div class="teamnext">账户：{{memberObj.userName}}<label class="label">账户余额：{{memberObj.safeMoney}}</label></div>
                        <div class="teamnext" v-show="memberObj.userType==1">团队余额：{{memberObj.teamSafeMoney}}<label  class="label">团队人数：{{memberObj.childCount}}</label></div>
                     
                  </div>
                   <div class="rebateSet"> 
                        <span>昵称：</span>  <input class="input" type="text" v-model="remarkName" placeholder="请输入昵称(选填)"  @focus="fsError" :maxlength="5">
                       
                   </div>
                     <div class="rebateSet">
                        <span class="demonstration">返点设置</span>
                        <el-slider v-model="value3" :format-tooltip="formatTooltip" :max='max' :min='min' @change='getslider' :disabled='max==min?true:false'></el-slider>
                   <span class="fl rebateColor">{{min/10}}%</span> <span class="rebateColor rebateval">{{value3/10}}%</span><span class="fr rebateColor">{{max/10}}%</span>
                    </div>
                        <div class="rebateSet reTop">
                        <span class="demonstration">返奖设置</span>
                        <el-slider v-model="value4" ></el-slider>
                        <span class="rebateColor">返利：{{value4}}%</span><span class="fr rebateColor">返奖：{{100-value4}}%</span>
                    </div>
                    <p class="err">{{err}}</p>
                    <span slot="footer" class="dialog-footer">
                        <el-button size='mini' @click="unsave">取 消</el-button>
                        <el-button type="primary" size='mini' @click="saveFun(memberObj.id)">保存</el-button>
                    </span>
                 </el-dialog>  
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
            value2:  this.getNowFormatDate(),
            value3:0,//返点
            value4:0,
            max:130,
            min:30,
            username: '',
            currentPage: 1,
            dialogVisible5:false,
            index:0,
            tableData: [],
            total:0,
            loading:true,
            pageindex:1,
            pagesize:10,
            nextVal:'1',
            parentUserId:'',
            memberObj:{},
            remarkName:'',
            err:'',
            current:0,
            arr:[],
            flog:true,
        }
    },
    created() {
        this.getlist()
         this.getUserTypelist()
    },
    methods: {
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
        // 保存下级管理
        saveFun(id){
              if(this.remarkName==null){
                        this.remarkName=''
                  }
                  let vm=this;
                let parmars = {
                    id:id,
                    remarkName:this.remarkName,
                    userRate:this.value3/10,
                    rebate:this.value4,
                 }
             if(/^[\u4e00-\u9fa5a-zA-Z0-9_]{0,5}$/.test(this.remarkName)){     
            this.unitAjax('post','/api/agent/member/modifyMember',parmars,res=>{
                if(res.result){
                    this.$message({
                        message: '修改成功！',
                        type: 'success'
                        });
                     this.dialogVisible5=false; 
                      this.err='';
                      this.remarkName='';
                      this.getlist()  
                }else{
                   this.err= res.msg;
                    if(res.operateCode == 100){
                        setTimeout( ()=> {
                        vm.logOut()
                        },1000);
                    }
                }
            })    
        }else{
            this.err='请输入昵称0-5位'
        }
        },
        getslider(value){
            if(isNaN(value)){
                this.value3=this.min;
            }    
        },
        unsave(){
           this. dialogVisible5 = false;
            this.err='';
             this.remarkName='';
        },
        fsError(){
            this.err=''
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                this.err='';
             this.remarkName='';
                })
                .catch(_ => { });

        },
            formatTooltip(val) {
                return val / 10;
            },
  
    //   管理
       setNext(index, row) {
        this.dialogVisible5=true;
         this.remarkName=row.remarkName   
        this.unitAjax('post','/api/agent/member/memberDetail',{id:row.id},res=>{
            if(res.result){
                this.memberObj=res.data;
                    //  if(res.data.userRate == res.data.maxUserRate){
                    //     this.min = res.data.userRate *10;
                    // }else {
                       
                    // } 
                    this.min = Math.round(res.data.userRate *10);
                    this.value3  =  Math.round(res.data.userRate * 10);
                    this.value4=Math.round(res.data.rebate * 100);
                     this.max=Math.round(res.data.maxUserRate*10);
                     
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
           getback(value,current){
      //  if( JSON.parse(this.getStroe('list')).userId==value){
      //     this.childUserId=value;
      //  }
        this.flog= current=='first'?true:false;
        let length=this.arr.length;
        this.current=current=='first'?0:current+1;
          this.arr.splice(this.current,length)
          this.parentUserId=value;
        this.getlist()
      },
            // 下级
           handleNext(index, row) {
               if(this.arr.length>0){
                    for(let key in this.arr){
                if(this.arr[key].userId==row.id){
                    return ;
                }else{
                    this.arr.push({ userId:row.id, userName:row.userName,childCount:row.childCount});
                }
              }
              }else{
                this.arr=[{ userId:row.id, userName:row.userName,childCount:row.childCount}];
              }
        // this.index++;
        //  this.setValue({ name:'parentUserId'+this.index, value:row.userId,})
        this.flog=false;
        this.parentUserId=row.id;
         this.getlist()
      },
    //   返回
    //   handleBack(index, row) {
    //     this.index--;
    //      this.parentUserId=this.getValue('childUserId'+this.index);
    //      this.getlist()
    //   },
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
        
        let token = vm.getValue("token");
        let userId = vm.getValue("userId");
        if (token && userId) {
          let parmars = {
              pageIndex: vm.pageindex,
              pageSize : vm.pagesize,
              startDate: vm.value1,
              endDate  : vm.value2,
              level:vm.nextVal,
              userType:vm.value,
              parentUserId:vm.parentUserId,
              searchName:vm.username,
          }
           vm.loading=true;
          vm.unitAjax('post', '/api/agent/member/memberListByPC', parmars, res=> {
                 vm.loading=false; 
            if (res.result) {
             vm.tableData = res.data.pageInfo.items;  
             vm.total=res.data.pageInfo.totalItems;
            }else{
                 vm.$message.error(res.msg);
                   vm.loading=false;
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
            this.loading=true; 
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
//   .col-height{
//       padding:5px 0;
//       background-color: black;
//   }
    .err{
        padding-left: 118px;
        color: red;
        height: 28px;
        line-height: 28px
    }
  .userpadding{
      margin-left: 30px;
  }
  .with-name{
      margin-bottom: 30px;
      text-align: center;
      border-bottom:1px solid rgb(215, 216, 217);
      .teamnext{
          display: inline-block;
          margin-right: 20px;
      }
      .label{
          padding-left: 20px;
      }
  }
  .rebateSet{
      width: 300px;
      margin: 15px auto;
        .rebateval{
         margin-left: 115px;
     }
      input{
          border: 1px solid rgb(215, 216, 217);
          height: 28px;
          line-height: 28px;
          padding-left: 10px;
          width: 240px;
      }
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
