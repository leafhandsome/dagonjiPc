<template>
  <div class="container" @click="showUrl=false" @keydown="getkeydown">
      <div class="accout"><span  :class="showType?'accout-center active':'accout-center'" @click="handType">普通开户</span>|<span :class="showType?'accout-link':'accout-link active'" @click="handLink">链接开户</span></div>
      <!-- 普通开户 -->
      <div class="putong" v-show="showType">
      <div class="zhanghu">账户类型<span :class="userType==1?'z-active daili':'daili'" @click="handuserType(1)">代理</span ><span :class="userType==2?'z-active':''" @click="handuserType(2)">会员</span></div>
      <el-row>
          <el-col :span='8' :offset='7'>
  
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
  <el-form-item label="账户" prop="username">
    <el-input type="text" v-model="ruleForm2.username" auto-complete="off" placeholder="请输入账户"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="请输入密码"></el-input>
  </el-form-item>
  <el-form-item label="昵称" prop="nickname" >
    <el-input v-model="ruleForm2.nickname" auto-complete="off" placeholder="请输入昵称(选填)"></el-input>
  </el-form-item>
    <div class="rebateSet">
    <span class="demonstration">返点设置</span>
    <el-slider v-model="value1" :format-tooltip="formatTooltip" :max='max'></el-slider>
    <span class="rebateColor">{{min/10}}%</span> <span class="rebateColor rebateval">{{value1/10}}%</span><span class="fr rebateColor">{{max/10}}%</span>
  </div>
      <div class="rebateSet reTop">
    <span class="demonstration">返奖设置</span>
    <el-slider v-model="value2" ></el-slider>
     <span class="rebateColor">返利：{{value2}}%</span><span class="fr rebateColor">返奖：{{100-value2}}%</span>
  </div>
  <el-form-item>
    <el-button class="primary reTop" style="margin-left: -34px;width: 113%;" type="primary" @click="getaccount('ruleForm2')">开户</el-button>
    <el-button v-show="false" @click="resetForm('ruleForm2')">重置</el-button>
  </el-form-item>
</el-form>
</el-col>
</el-row>
<div class="row-line"></div>
<div class="erweima clearfix" v-show="linkshow">
    <div class="app">
        <div class="title">App下载地址及二维码</div>
        <div class="photo">
              <div id="container">
                        <canvas ref="canvas"  width="400" height="400"></canvas>
             </div>
        </div>
        <div class="www"><span class="">{{downloadUrl}}</span>  <el-button type="primary" size='mini' plain  v-clipboard:copy="downloadUrl"
     v-clipboard:success="onCopy"
     v-clipboard:error="onError">复制</el-button></div>
    </div>
    <div class="fl col-line"></div>
     <div class="h5">
        <div class="title">H5跳转地址及二维码</div>
        <div class="photo">
             <div id="containerH5">
                        <canvas ref="canvas"  width="400" height="400"></canvas>
             </div>
        </div>
        <div class="www"><span v-text="h5Url"></span> <el-button type="primary" size='mini' plain  v-clipboard:copy="h5Url"
     v-clipboard:success="onCopy"
     v-clipboard:error="onError">复制</el-button></div>
    </div>
</div>
</div>
<!-- 链接开户 -->
  <div class="link" v-show="!showType">
      <div class="zhanghu">账户类型<span :class="acount==1?'z-active daili':'daili'" @click="handacount(1)">代理</span ><span :class="acount==2?'z-active':''" @click="handacount(2)">会员</span></div>
      <el-row>
          <el-col :span='8' :offset='7'>
              
    <div class="rebateSet">
    <span class="demonstration">返点设置</span>
    <el-slider v-model="value3" :format-tooltip="formatTooltip" :max='max' :min='min'></el-slider>
    <span class="rebateColor">{{min/10}}%</span><span class="rebateColor rebateval">{{value3/10}}%</span><span class="fr rebateColor">{{max/10}}%</span>
  </div>
      <div class="rebateSet reTop">
    <span class="demonstration">返奖设置</span>
    <el-slider v-model="value4" ></el-slider>
     <span class="rebateColor">返利：{{value4}}%</span><span class="fr rebateColor">返奖：{{100-value4}}%</span>
  </div>
  <div class="rebateSet reTop">
      <span class="fl bz"> 备注</span>
    <el-input class="fr beizhu" v-model="input" placeholder="请输入备注(选填)" :maxlength='20'></el-input>
  </div>
    <el-button class="primary linkreTop" type="primary" @click="getlink('ruleForm2')">开户</el-button>
</el-col>
</el-row>
<div class="line"></div>
<div class="hostory">历史链接</div>

   <el-table
   max-height='500'
    :data="tableData"
     :row-class-name="tableRowClassName"
    stripe
     border
    style="width: 100%">
    <el-table-column
     align='center'
      label="类型"
      width="50">   <template slot-scope="props">{{props.row.userType==1?'代理':'会员'}} </template>
    </el-table-column>
    <el-table-column
    align='center'
      label="返点"
      width="70"> <template slot-scope="props">{{props.row.userRate}} %</template>
    </el-table-column>
    <el-table-column
     align='center'
    width='150'
      label="返奖"> <template slot-scope="props">返利{{Math.round((1-props.row.reAward)*100)}}%、返奖{{Math.round(props.row.reAward*100)}} %</template>
    </el-table-column>
     <el-table-column
      align='center'  
      prop="spreadUrl"
      label="链接">
    </el-table-column>
      <el-table-column
       align='center'
    width='150'
      prop="createDate"
      label="创建时间">
    </el-table-column>
<el-table-column label="操作"   width='290' align='center'>
      <template slot-scope="scope">
          
        <el-button
          size="mini"
          @click.stop="handleNext(scope.$index, scope.row)">二维码推广</el-button>
            <el-button
          size="mini" v-clipboard:copy="scope.row.spreadUrl"  v-clipboard:success="onCopy"  v-clipboard:error="onError"
        >推广链接</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleBack(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
<!-- 推广二维码 -->
                <div class="erweimaUrl" v-show="showUrl" @click.stop="showUrl=true">
                    <div class="erweimaTitle">分享二维码<span @click.stop="showUrl=false"></span> </div>
                 <div id="containerUrl">
                        <canvas ref="canvas"  width="400" height="400"></canvas>
                    </div>
                 
                    <!-- <div class="erweima-url"><span class="url" id="biao1">{{hostryUrl}}</span><el-button type="primary" size='mini' plain @click="copyUrl2">复制</el-button></div>  -->
               </div>
          
  </div>
</template>
<script>
import '../../../common/js/jqueryqr';
// import {clipboard} from '../../../common/js/clipboard';
export default {
    // comments:{
    //     clipboard
    // },
    data() {
        var validateusername = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('用户名不能为空'));
            }else if(!/^[a-zA-Z0-9]{5,20}$/.test(value)){
                 return callback(new Error('请输入5-20个字母和数字'));
            } else {   
                callback();
            }
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            }else if(!/^[a-zA-Z0-9]{6,20}$/.test(value)){
                 return callback(new Error('请输入6-20个字母和数字'));
            }
             else {   
                callback();
            }
        };
        var checknickname = (rule, value, callback) => {
          
         if (/^[\u4e00-\u9fa5a-zA-Z0-9_]{0,5}$/.test(value)||value==null) {
               callback();
            } else {
                  callback(new Error('昵称长度为1-5个中文、字母、数字'));
            }
        };
        return {
            showType:true,
            userType:1,
            acount: 1,
            value1:0,
             value2: 100,
            value3:0,
             value4: 100,
             max:130,
             min:50,
             input:'',
             showUrl:false,
             downloadUrl:'',
             h5Url:'',
             hostryUrl:'',
             linkshow:false,
            ruleForm2: {
                username: '',
                pass: '',
                nickname: ''
            },
            rules2: {
                 username: [
                    { validator: validateusername, trigger: 'blur' }
                ],
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
               
                nickname: [
                    { validator: checknickname, trigger: 'blur' }
                ]
            },
            // 历史记录
               tableData: []
        }
    },
    mounted(){
        // let vm=this; 
        // document.getElementById('acunt').onkeydown=function (e) {
        //     if(e.keyCode==13){
        //         if(vm.showType){
        //              vm.getaccount('ruleForm2')   
        //         }else{
        //             vm.getlink()
        //         }
               
        //     }
        // }
    },
    created () {
      this.getlist()
    },
      activated(){
         this.resetForm('ruleForm2')
         this.linkshow=false
    },
    methods: {
        getkeydown(e){
                if(e.keyCode==13){
                if(this.showType){
                     this.getaccount('ruleForm2')   
                }else{
                    this.getlink()
                }
               
            }
        },
        // 复制
           onCopy: function (e) {
                  this.$message({
                    message: '复制成功！',
                    type: 'success'
                    });     
            },
            onError: function (e) {
            this.$message.error('复制失败！')
            },
              getaccount(formName){
             this.$refs[formName].validate((valid) => {
        if ( valid ) {      
            let vm=this;
            let params={
                userType:vm.userType,
                userRate:vm.value1/10,
                remarkName:vm.ruleForm2.nickname,
                rebate:vm.value2,
                userName:vm.ruleForm2.username,
                password:vm.ruleForm2.pass
            }
            this.unitAjax('post','/api/agent/accountCenter/regUser',params,res=>{
            if(res.result){
                   this.$message({
                    message: '恭喜您，开户成功！',
                    type: 'success'
                    });
                     this.value2=100;
                    this.value1=this.max;
                    this.resetForm('ruleForm2')
                   this.linkshow=true;
            }else{
                  vm.$message.error(res.msg);
                        if(res.operateCode == 100){
                            setTimeout( ()=> {
                             vm.logOut()
                            },1000);
                        }
            }
            })
            } else {
            return false;
            }
        });
        },
        getlink(){
            let vm=this;
            let params={
                userType:vm.acount,
                userRate:vm.value3/10,
                remark:vm.input,
                rebate:vm.value4
            }
            this.unitAjax('post','/api/agent/accountCenter/createSpreadUrl',params,res=>{
            if(res.result){
                   this.$message({
                    message: '恭喜您，开户成功！',
                    type: 'success'
                    });
                    this.value4=100;
                    this.value3=this.max;
                    this.input='';
                   this.getlist() 
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
        geterweima(){
              let vm = this;
            $("#container").erweima({
                fill: 'black',
                text: vm.downloadUrl,
                size: 200,
                mode: 0,
                minVersion: 10
            });
        },
        geterweimaH5(){
            let vm=this;
                  $("#containerH5").erweima({
                fill: 'black',
                text: vm.h5Url,
                size: 200,
                mode: 0,
                minVersion: 10
            });  
        },
        handType(){
            this.showType=true    
        },
        handLink(){
            this.showType=false
        },
        formatTooltip(val) {
        return val / 10;
      },
   
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        getlist(){
            let vm=this;
             this.unitAjax('post','/api/agent/accountCenter/index',{},res=>{
                 if(res.result){
                      this.tableData=res.data.urlListItems;
                      this.downloadUrl=res.data.downloadUrl;
                      this.h5Url=res.data.h5Url;
                      this.min = Math.round(res.data.minUserRate *10);
                    this.value3  =  Math.round(res.data.maxUserRate * 10);
                    this.value1  =  Math.round(res.data.maxUserRate * 10);
                     this.max=Math.round(res.data.maxUserRate*10);
                      if(this.downloadUrl){
                          this.geterweima() 
                      }
                      if(this.h5Url){
                          this.geterweimaH5() 
                      }
                      
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
       // 二维码推广
           handleNext(index, row) {
             let vm = this;
            $("#containerUrl").erweima({
                fill: 'black',
                text: row.spreadUrl,
                size: 200,
                mode: 0,
                minVersion: 10
            });
                vm.showUrl=true;
                vm.hostryUrl=row.spreadUrl
            },
  
    //   删除
      handleBack(index, row) {
                  this.$confirm('是否确认删除链接?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         this.unitAjax('post','/api/agent/accountCenter/deleteSpreadUrl',{id:row.id},res=>{
            if(res.result){
                   this.$message({
                    message: '删除成功！',
                    type: 'success'
                    });
                   this.getlist() 
            }else{
                  vm.$message.error(res.msg);
                        if(res.operateCode == 100){
                            setTimeout( ()=> {
                             vm.logOut()
                            },1000);
                        }
            }
        })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
       
      },
    //账户类型
    handuserType(userType){
        this.userType=userType;
    },
    handacount(acount) {
        this.acount = acount
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
}
}
</script>
<style lang="scss" scoped>
.container {
  padding: 0 30px 30px;
  .el-slider__runway{
      height: 4px;
  }
 .erweimaUrl{
     position: fixed;
     top: 40%;
     left: 50%;
     width: 500px;
     text-align: center;
     border: 1px solid #a1a1a1;
     background-color: white;
     transform: translate(-50%);
     z-index: 10000;
     padding: 30px 0;
     border-radius: 5px;
     .erweimaTitle{
         height: 30px;
         line-height: 30px;
         border-bottom: 1px solid #a1a1a1;
         font-weight: 700;
          position: relative;
         span::after{
             content:'+';
             display: block;
            position: absolute;
             width: 20px;
             height: 20px;
             top: -30px;
             right: 0;
             font-size: 30px;
             text-align: center;
             line-height: 30px;
            //  border: 2px solid #a1a1a1; 
            //  border-radius: 50%;
             color: #a1a1a1;
             transform: rotate(45deg);
             cursor: pointer;   
         }
     }
 }
  .accout {
    color: #a1a1a1;
    .active {
      color: #1a95f2;
    }
    .accout-center {
      padding-right: 10px;
      cursor: pointer;
    }
    .accout-link {
      padding-left: 10px;
       cursor: pointer;
    }
  }
  .zhanghu {
      width: 350px;
      margin: 30px auto;
    height: 23px;
    line-height: 23px;
 
    font-size: 12px;
    color: #43484a;
    span {
      display: inline-block;
      width: 52px;
      height: 100%;
      text-align: center;
      border-radius: 5px;
      margin-left: 5px;
      cursor: pointer;
    }
    .z-active {
      background-color: #1a95f2;
      color: white;
    }
    .daili {
      margin-left: 20px;
    }
  }
  .primary{
      width: 100%;
       font-size: 17px;
  }
  .rebateSet{
      float:right;
      width: 83%;
      .rebateColor{
          color:#666; 
      }
     .rebateval{
         margin-left: 120px;
     }
  }
  .reTop{
      margin-top:30px; 
     
  }

  .linkreTop{
      width: 83%;
      margin-left: 17%;
      margin-top: 30px;
  }
  .el-form-item__content{
      margin-left: 0px;
  }
   .beizhu{
          width: 88%;
          background-color: #FAFAFA;
      }
      .bz{
          height: 30px;
          line-height: 30px;
      }
    //   历史记录
      .link{
          .line{
              background-color: #F2F6F9;
              height: 3px;
              margin-top: 50px
          }
          .hostory{
              height: 50px;
              line-height: 50px;
          }
      }
    //   二维码
      .putong{
          .erweima{
              width: 900px;
              margin: 0 auto;
              margin-top: 70px;
              text-align: center;
              .app{
                  float: left;
                //   margin-right: 100px;
                  width: 48%;
                  margin: 0 auto;
                  .photo{
                      height: 200px;
                  }
                  .www{
                      font-size: 12px;
                  }
              }
              .col-line{
                  height: 200px;
                  margin-top: 20px;
                   border-right: 1px solid #BFBFBF;
              }
                 .h5{
                  float: left;
                //   margin-left: 100px;
                    width: 48%;
                     margin: 0 auto;
                  .photo{
                      height: 200px;
                  }
                   .www{
                      font-size: 12px;
                  }
              }
          }
      }
}
</style>
