<template>
    <div class="container clearfix" @click="iconShow=false">
      <div class="header clearfix">
        <div class="title fl">
          <div class="logo fl"><img src="../../../../assets/img/user/user.png" alt=""></div>
          <div class="user fl">
             <div class="username" v-if="!userInfo.nickName">欢迎您</div>
             <el-tooltip class="item" effect="dark" :content="userInfo.nickName" placement="top" v-if="userInfo.nickName">
            <div class="username" >欢迎您,{{userInfo.nickName}}</div>
            </el-tooltip>
            <div class="user-z">{{userInfo.userName}}</div>
            <div class="user-nick">
              <el-button type="text" @click="dialogVisible = true">修改昵称</el-button>
            </div>
            <el-dialog
              title="修改昵称"
              center
              :visible.sync="dialogVisible"
              width="370px"
              :before-close="handleCloseName">
              <span>昵称：</span> <input class="input" type="text" placeholder="请输入您要修改的昵称" v-model="nickName" @focus="focusNickName" onkeyup="this.value=this.value.replace(/\s+/g,'')" :maxlength='20'>
                <p class="nickNameError">{{nickNameError}}</p>
              <span slot="footer" class="dialog-footer">
                      <!-- <el-button size='mini' @click="dialogVisible = false">取 消</el-button> -->
                      <el-button type="primary" size='mini' @click="dialog">确 定</el-button>
                  </span>
            </el-dialog>
            <div class="user-lotter">彩票返点：<span class="lotterRebate">{{userInfo.userRate}}</span></div>
          </div>
        </div>
        <div class="usermoney fl">
          <div class="money fl">
            <div class="money-title">账户余额</div>
            <div class="money-num">￥{{parseFloat(userInfo.safeMoney).toFixed(3)}}</div>
          </div>
          <div class="line-col fl"></div>
          <div class="with-money fl">

            <div class="money-title">可提现余额 &nbsp;<i class="el-icon-question" @click="dialogVisible2 = true"></i></div>
            <el-dialog
              center
              :visible.sync="dialogVisible2"
              width="400px">
              <span>{{userInfo.cashExplain}}</span>
              <span slot="footer" class="dialog-footer">
                      <el-button type="primary" size='mini' @click="dialogVisible2 = false">确定</el-button>
                  </span>
            </el-dialog>
            <div class="money-num">￥{{parseInt(userInfo.canCashMoney)}}</div>
          </div>
        </div>
      </div>
      <div class="set">
              <div class="set-title">设置</div>
              <ul>
                  <li @click="dialogVisible4=true"><img src="../../../../assets/img/user/mobile.png" alt=""><p>手机</p><span v-show="!bindmobile.localbind"></span></li>
                 <!--<li><img src="../../../../assets/img/user/vote.png" alt=""><p>支付宝</p></li>-->
                  <li @click="dialogVisible6=true"><img src="../../../../assets/img/user/weixi.png" alt=""><p>微信</p><span v-show="bindweixin.isbindweixin"></span></li>
                   <!--<li><img src="../../../../assets/img/user/bank.png" alt=""><p>银行卡</p></li>-->
                  <li @click="dialogVisible1=true"><img src="../../../../assets/img/user/moneypwd.png" alt=""><p>资金密码</p><span v-show="!bindmoneypwd.isbind"></span></li>
                  <li @click="bindPwdSend"><img src="../../../../assets/img/user/question.png" alt=""><p>密保</p><span v-show="!bindpwdsend.localbind"></span></li>
                  <li @click="dialogVisible7 = true"><img src="../../../../assets/img/user/password.png" alt=""><p>登录密码</p></li>
                  <li @click="prizeTips"><img src="../../../../assets/img/user/tishi.png" alt=""><p>中奖提示</p></li>
                <li>
                  <canvas ref="canvas" id="qrcode1" width="120" height="120"></canvas>
                </li>
              </ul>
      </div>
      <div class="pay">
           <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="充值" name="first" >
                  <div  v-if="payList.length>0">
                  <div class="pay-select">
                           <el-radio-group v-model="radio2" @change='changeValue'>
                             <div class="paylist">
                          <el-radio class="paymentList"  v-for="(item,index) in payList" :key="index"  :label="index" v-show="item.payTypeStatus==1"><img :src="item.payIcon" alt="">{{item.payName}}<span v-show="item.remark">({{item.remark}})</span></el-radio>
                              </div>
                          </el-radio-group>
                     </div>
                    <div class="pay-content clearfix" v-show="showpayment">
                        <div class="content-left fl" @keydown="getpayKeydown">
                            <span>充值金额：<input v-bind="{placeholder:'请输入充值金额('+minPayMoney+'-'+maxPayMoney+')元'}" v-model="payMoneyNum" autofocus onkeyup="value=value.replace(/[^\d]/g,'') "
                               ></span>
                              <div class="margin">
                                  <el-button  size="mini" plain @click="changeMoney(50)">50</el-button>
                                  <el-button  size="mini" plain @click="changeMoney(100)">100</el-button>
                                  <el-button  size="mini" plain @click="changeMoney(500)">500</el-button>
                                  <el-button  size="mini" plain @click="changeMoney(1000)">1000</el-button>
                              </div>
                               <div class="summit"> <el-button type="primary submit-w" size="mini" @click="paymoney">确定</el-button></div>
                        </div>
                        <!-- 二维码部分 -->
                        <div class="content-right fl" v-show="showErweima">
                              <div class="title">请使用{{payment}}扫一扫支付</div>
                              <div class="erweima">
                                <div id="payErweima">
                              <canvas ref="canvas"  width="400" height="400"></canvas>
                              </div>
                              </div>
                              <div class="tag-money">面值：{{money}}元</div>
                              <div class="tips">Tips:若需要充值其他金额，请在右边的输入框输入充值金额</div>
                                <el-button size='mini' type="primary" class="paystaus" @click="getpayStatus">充值状态</el-button>
                        </div>
                    </div>
                    <!-- 快捷支付 -->
                    <div class="paySelected" v-show="paySelected">
                                 <div class="form-size">
                            <el-form :model="formbank" status-icon :rules="rulesbank" center ref="formbank" class="demo-ruleForm">
                           <el-form-item label="充值金额：" prop="money"  :label-width="formPayWidth">
                              <el-input type="number" v-model="formbank.money" auto-complete="off" v-bind="{placeholder:'请输入充值金额('+minPayMoney+'-'+maxPayMoney+')元'}" class="forminput"></el-input>
                          </el-form-item>
                            <el-form-item label="选择银行：" :label-width="formPayWidth"  prop="bank">
                          <el-select v-model="formbank.bank" placeholder="请选择" class="forminput">
                              <el-option v-for="(item,index) in banklist" :key="index" :label="item.bankName"  :value="item.bankCode"></el-option>
                          </el-select>
                          </el-form-item>
                          <el-form-item label="银行卡号：" prop="banknumber" :label-width="formPayWidth">
                              <el-input type='number' v-model="formbank.banknumber" auto-complete="off" placeholder="请输入银行卡号" class="forminput"></el-input>
                          </el-form-item>
                        <el-form-item label="持卡人：" prop="bankUserName" :label-width="formPayWidth">
                              <el-input v-model="formbank.bankUserName" auto-complete="off" placeholder="请输入持卡人姓名" class="forminput"></el-input>
                          </el-form-item>
                            <el-form-item label="预留号码：" prop="tel" :label-width="formPayWidth" class="paybank-header">
                              <el-input  type="number" v-model="formbank.tel" auto-complete="off" placeholder="请输入预留号码" class="forminput"></el-input>
                              <div class="paybankcode">
                                   <span @click="getbankmobile" v-show="showkuaijie" class="getcode">获取验证码</span>
                                   <span v-show="!showkuaijie" :class="{success:!showkuaijie}" class="getcode">{{countkuaijie}}s秒后重新获取</span>
                                </div>

                          </el-form-item>
                                  <el-form-item label="验证码：" prop="bankCode" :label-width="formPayWidth" >
                              <el-input type="number" v-model="formbank.bankCode" auto-complete="off" placeholder="请输入验证码" class="forminput"></el-input>
                          </el-form-item>
                      </el-form>
                       <div slot="footer" class="dialog-footer clearMoney">
                         <el-button size='mini' @click="resetForm('formbank')">清除记录</el-button>
                          <el-button size='mini' type="primary" class="clearmargin" @click="submitPayForm('formbank')">充值</el-button>
                      </div>
                      </div>
                         <div class="bankMoney">
                         <el-radio-group  v-model="radio5" size="medium" @change='changePayMoney'>
                                   <div class="spce">
                                  <el-radio-button id="minspace" label="50" ></el-radio-button>
                                  </div>
                                  <div class="spce">
                                  <el-radio-button label="100"></el-radio-button>
                                  </div>
                                  <div class="spce">
                                  <el-radio-button label="500"></el-radio-button>
                                     </div>
                                  <div class="spce">
                                  <el-radio-button label="1000"></el-radio-button>
                                     </div>
                                  </el-radio-group>
                              </div>
                    </div>
                    </div>
                  <!-- 充值成功 -->
                  <!-- <div class="paysucess" v-show="paysuccess">
                        <div class="sucessImg"><img src="../../../../assets/img/user/88.png" alt=""></div>
                        <div class="sucessFont">充值成功，<span @click="loat">点击刷新({{curent}}s)</span></div>
                  </div> -->
            </el-tab-pane>
            <!-- 提现 -->
           <el-tab-pane label="提现" name="second">
               <div class="wich">
               <div class="wich-title">提现方式：</div>
               <ul class="clearfix">
                  <div v-show="aliPayIsOpen">
                   <li v-if="hasBindAlipayAccount&&aliPayCashItem" @click="wSelected('ali',aliPayCashItem)" >
                     <div v-bind:class=" i=='ali'?'w-active wClass':'wClass'"> </div>
                       <img src="../../../../assets/img/user/支付宝.png" alt="">
                         <i v-show="iconShow" class="el-icon-error" @click="getremovecard('ali')"></i>
                   <div class="even" v-if="aliPayCashItem.alipayRealName">
                         <p>{{tousername(aliPayCashItem.alipayRealName)}}</p><p>{{tozhifubao(aliPayCashItem.alipayAccount)}}</p>
                   </div>

                 </li>
                      <li v-if="!hasBindAlipayAccount" @click="dialogVisible5=true">
                       <img src="../../../../assets/img/user/支付宝.png" alt="">

                   <div class="even binding">
                        绑定支付宝
                   </div>
                  </li>
                 </div>
                   <li v-if="userInfo.hasBindBank" v-show="bankCardIsOpen"  v-for="(item,index) in wList" :key="index" @click="wSelected(index,item)" >
                     <div v-bind:class=" i==index?'w-active wClass':'wClass'"></div>
                        <img src="../../../../assets/img/user/bankimg.png" alt="">
                       <!-- <img v-bind="{src:'../../../../assets/img/user/'+'item.bankName'+'.png'}" alt=""> -->
                       <i v-show="iconShow" class="el-icon-error" @click="getremovecard(item.userBankId)"></i>
                       <div class="even">
                         <p>{{item.bankName}}</p><p >{{tobank(item.bankNo)}}</p>
                        </div>

                 </li>

                   <li class="add"  @click="addcar" v-if="wList.length<5">
                        <img src="../../../../assets/img/user/add.png" alt="">
                        <span>添加银行卡</span>
                 </li>
                   <li class="add removecolor" @click.stop="removeCard" v-if="(userInfo.hasBindBank&&bankCardIsOpen)||(aliPayIsOpen&&hasBindAlipayAccount)">
                        <img src="../../../../assets/img/user/remove.png" alt="">
                        <span>解绑</span>
                 </li>
               </ul>
                    <el-dialog title="添加银行卡" :visible.sync="dialogVisible3" center  width="400px" :before-close="handleCloseAddcar">
                        <div class="form-size" @keydown="getbankkeydown">
                            <el-form :model="form" status-icon :rules="rules" ref="form" class="demo-ruleForm">
                           <el-form-item label="真实姓名" prop="name"  :label-width="formLabelWidth"  v-if="!userInfo.realName">
                              <el-input type="text" v-model="form.name" auto-complete="off" placeholder="请输入真实姓名" class="forminput" onkeyup="this.children[0].value=this.children[0].value.replace(/\s+/g,'')"></el-input>
                          </el-form-item>
                             <el-form-item label="真实姓名" :label-width="formLabelWidth"  v-if="userInfo.realName">
                                <el-input type="text" v-model="userInfo.realName" auto-complete="off" readonly placeholder="请输入真实姓名" class="forminput"></el-input>
                          </el-form-item>

                          <el-form-item label="所属地区" :label-width="formLabelWidth" prop="adress"  auto-complete="off">
                            <el-cascader
                                   expand-trigger="hover"  :props="props"
                                :options="options"
                                v-model="selectedOptions2"
                                @change="handleChangeAdr">
                              </el-cascader>
                              </el-form-item>
                            <el-form-item label="所属银行" :label-width="formLabelWidth" prop="bank"  auto-complete="off">
                          <el-select v-model="form.bank" placeholder="请选择" class="forminput" @change="getuserbank">
                              <el-option v-for="(item,index) in addbanklist" :key="index" :label="item.bankName" :value="item"></el-option>

                          </el-select>
                          </el-form-item>
                          <el-form-item label="开户网点" prop="bankname" :label-width="formLabelWidth" >
                              <el-input type="text" v-model="form.bankname" auto-complete="off"  placeholder="请输入开户网点(选填)" class="forminput"
                              onkeyup="this.children[0].value=this.children[0].value.replace(/\s+/g,'')"></el-input>
                          </el-form-item>
                          <el-form-item label="银行卡号" prop="banknum" :label-width="formLabelWidth">
                              <el-input v-model="form.banknum" auto-complete="off" onkeyup="this.children[0].value = this.children[0].value.replace(/[\s]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');"
                                 placeholder="请输入银行卡号" class="forminput" :maxlength="24"></el-input>
                          </el-form-item>
                        <el-form-item label="再次输入" prop="banknumagin" :label-width="formLabelWidth">
                              <el-input v-model="form.banknumagin" auto-complete="off"  placeholder="请再次输入银行卡号" class="forminput"
                               onkeyup="this.children[0].value = this.children[0].value.replace(/[\s]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');" :maxlength="24"></el-input>
                          </el-form-item>
                            <el-form-item label="资金密码" prop="pass" :label-width="formLabelWidth">
                              <el-input  type="password" v-model="form.pass" auto-complete="off" placeholder="请输入资金密码" class="forminput" :maxlength="20"></el-input>
                          </el-form-item>
                      </el-form>
                      </div>
                      <div slot="footer" class="dialog-footer">
                         <el-button size='mini' @click="resetForm('form')">重置</el-button>
                          <el-button size='mini' type="primary"  @click="submitForm('form')">确 定</el-button>
                      </div>
                      </el-dialog>
                <div class="trans" @keydown="getwithdrawsKeydown"><span>提现金额：<input v-model="CashMoney"
                 v-bind="{placeholder:'请输入提现金额('+(parseInt(minCashMoney)<parseInt(userInfo.canCashMoney)?parseInt(minCashMoney):parseInt(userInfo.canCashMoney))+'-'+(parseInt(userInfo.canCashMoney)>parseInt(maxCashMoney)?parseInt(maxCashMoney):parseInt(userInfo.canCashMoney))+')元'}"
               onkeyup="value=value.replace(/[^\d]/g,'') "></span>
                <el-button type="primary submit" size="mini" @click="GetcashMoney">确定</el-button></div>
              <div class="tip tip-bottom">(&nbsp;可提现金额：{{parseInt(userInfo.canCashMoney)}}元，<span @click="getallCashMoney">全部提现</span>&nbsp;)</div>
               </div>
           </el-tab-pane>
           <!-- 转账 -->
          <el-tab-pane label="转账" name="third">
            <div @keydown="gettransKeydown">
              <div class="trans"><span>收款账户：<input type="text" placeholder="请输入收款账号" v-model="transferName" :maxlength='20'></span></div>
              <div class="trans"><span>转账金额：<input placeholder="请输入转账金额" v-model="transMoney"
                onkeyup="value=value.replace(/[^\d]/g,'') "  onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))"></span></div>
              <div class="tip">(&nbsp;可转账金额：{{parseInt(userInfo.canCashMoney)}}元，<span @click="getalltransMoney">全部转账</span>&nbsp;)</div>
              <div class="summit transTop"> <el-button type="primary submit-w" size="mini" @click="getTranfer">确定</el-button></div>
              </div>
          </el-tab-pane>

          </el-tabs>
      </div>

      <!-- 绑定手机 -->
      <el-dialog
        title="绑定手机"
        center
        :title="bindmobile.title"
        :visible.sync="dialogVisible4"
        width="500px"
        top="20vh"
        :before-close="handleCloseMobile"
        @open="notPlaceholder">
        <div v-show="bindmobile.isbindmobile==0" class="telcode">
          <p class="input1">
            <span class="info">手机号：</span>
            <input v-model="bindmobile.tel" class="bz" placeholder="请输入绑定手机号" type="text">
          </p>
          <p class="input1">
            <span class="info">验证码：</span>
            <input v-model="bindmobile.code" class="bz" placeholder="请输入验证码" type="text">
            <span @click="getmobileCode(1)" v-show="getCodeItems[1].show" class="getcode">获取验证码</span>
            <span v-show="!getCodeItems[1].show" :class="{success:!getCodeItems[1].show}" class="getcode">{{getCodeItems[1].Count}}s秒后重新获取</span>
          </p>
          <div class="ctx_three_btn">
            <button class="btn reset" @click="handleCloseMobile">取消</button>
            <button class="btn" type="button" @click="bindMobile('add')">绑定</button>
          </div>
        </div>
        <div v-show="bindmobile.isbindmobile==1" class="telcode isbindtel">
          <p class="w450">你已绑定手机</p>
          <p class="tel w450" v-text="filtertel(bindmobile.tel)"></p>
          <div class="ctx_three_btn">
            <button class="btn reset" @click="handleCloseMobile">取消</button>
            <button class="btn" type="button" @click="bindmobileCheckthree">更换</button>
          </div>
        </div>
        <div v-show="bindmobile.isbindmobile==2" class="telcode">
          <p class="input1">
            <span class="info">新手机号：</span>
            <input v-model="bindmobile.newMobile" class="bz" placeholder="请输入新手机号" type="text">
          </p>
          <p class="input1">
            <span class="info">验证码：</span>
            <input v-model="bindmobile.newsmsCode" class="bz" placeholder="请输入新手机验证码" type="text">
            <span @click="getmobileCode(2)" v-show="getCodeItems[2].show" class="getcode">获取新手机验证码</span>
            <span v-show="!getCodeItems[2].show" :class="{success:!getCodeItems[2].show}" class="getcode">{{getCodeItems[2].Count}}s秒后重新获取</span>
          </p>
          <div class="ctx_three_btn">
            <button class="btn reset" @click="handleCloseMobile">取消</button>
            <button class="btn" type="button" @click="bindMobile('update')">绑定</button>
          </div>
        </div>
        <div v-show="bindmobile.isbindmobile==3" class="telcode">
          <p class="input1">
            <span class="info">资金密码：</span>
            <input v-model="bindmobile.accountPwd" class="bz" placeholder="请输入资金密码" type="password">
          </p>
          <div class="ctx_three_btn">
            <button class="btn reset" @click="handleCloseMobile">取消</button>
            <button class="btn" type="button" @click="bindMobile('check')">确认</button>
          </div>
        </div>
      </el-dialog>
      <!-- 绑定微信 -->
      <el-dialog
        title="绑定微信"
        center
        :visible.sync="dialogVisible6"
        width="500px"
        top="20vh"
        :before-close="handleClose"
        @open="notPlaceholder">
        <div v-show="!bindweixin.isbindweixin" class="telcode">
          <p class="ewmweixin ct w450">
            <canvas ref="canvas" id="qrcode" width="160" height="160"></canvas>
          </p>
          <p class="ct w450 removemb">打开微信扫一扫</p>
          <p class="ct w450">（正在开发中）</p>
        </div>
        <div v-show="bindweixin.isbindweixin" class="telcode isbindtel">
          <p class="w450">你已绑定微信</p>
          <div class="ctx_three_btn">
            <button class="btn reset" @click="dialogVisible6 = false">取消</button>
            <button class="btn" type="button" @click="bindWeixin('remove')">解绑</button>
          </div>
        </div>
      </el-dialog>
      <!-- 设置或修改资金密码 -->
      <el-dialog
        :title="bindmoneypwd.title"
        center
        :visible.sync="dialogVisible1"
        width="500px"
        top="20vh"
        :before-close="handleCloseMoneypwd"
        @open="notPlaceholder">
        <div v-show="bindmoneypwd.isbind==false">
          <div class="telcode">
            <p class="input1">
              <span class="info">登录密码：</span>
              <input v-model="bindmoneypwd.loginPwd" class="bz" placeholder="请输入登录密码" type="password">
            </p>
            <p class="input1">
              <span class="info">新密码：</span>
              <input v-model="bindmoneypwd.newPwd" class="bz" placeholder="请输入新的资金密码" type="password">
            </p>
            <p class="input1">
              <span class="info">确认密码：</span>
              <input v-model="bindmoneypwd.confirmPwd" class="bz" placeholder="请再次输入新的资金密码" type="password">
            </p>
            <div class="ctx_three_btn">
              <button class="btn reset" @click="handleCloseMoneypwd">取消</button>
              <button class="btn" type="button" @click="bindMoneypwd">提交</button>
            </div>
          </div>
        </div>
        <div v-show="bindmoneypwd.isbind==true">
          <div class="telcode">
            <p class="input1">
              <span class="info">原密码：</span>
              <input v-model="bindmoneypwd.oldPwd" class="bz" placeholder="请输入原来的资金密码" type="password">
            </p>
            <p class="input1">
              <span class="info">新密码：</span>
              <input v-model="bindmoneypwd.newPwd" class="bz" placeholder="请输入新的资金密码" type="password">
            </p>
            <p class="input1">
              <span class="info">确认密码：</span>
              <input v-model="bindmoneypwd.confirmPwd" class="bz" placeholder="请再次输入新的资金密码" type="password">
            </p>
            <p class="getzijpwd"><span @click="$router.push({path:'/public/getmoneypwd'})">忘记资金密码</span></p>
            <div class="ctx_three_btn">
              <button class="btn reset" @click="handleCloseMoneypwd">取消</button>
              <button class="btn" type="button" @click="bindMoneypwd">修改</button>
            </div>
          </div>
        </div>
      </el-dialog>
      <!-- 修改登录密码 -->
      <el-dialog
        title="修改登录密码"
        center
        :visible.sync="dialogVisible7"
        width="500px"
        top="20vh"
        :before-close="handleCloseLoginpwd"
        @open="notPlaceholder">
        <div class="telcode">
          <p class="input1">
            <span class="info">原密码：</span>
            <input v-model="bindloginpwd.oldPwd" class="bz" placeholder="请输入原来的登录密码" type="password">
          </p>
          <p class="input1">
            <span class="info">新密码：</span>
            <input v-model="bindloginpwd.newPwd" class="bz" placeholder="请输入新的登录密码" type="password">
          </p>
          <p class="input1">
            <span class="info">确认密码：</span>
            <input v-model="bindloginpwd.confirmPwd" class="bz" placeholder="请再次输入新的登录密码" type="password">
          </p>
          <p class="getzijpwd"><span @click="$router.push({path:'/public/getloginpwd'})">忘记登录密码</span></p>
          <div class="ctx_three_btn">
            <button class="btn reset" @click="handleCloseLoginpwd">取消</button>
            <button class="btn" type="button" @click="bindLoginpwd">修改</button>
          </div>
        </div>
      </el-dialog>
      <!-- 密保设置 -->
      <el-dialog
        :title="bindpwdsend.title"
        center
        :visible.sync="dialogVisible8"
        width="500px"
        top="20vh"
        :before-close="handleCloseQuestion"
        @open="notPlaceholder">
        <div v-show="bindpwdsend.isbind==0" class="telcode">
          <div class="question" v-for="(questionitem,index) in userquestion" :key='index'>
            <p class="selectp">
              <span class="info" v-text="questionitem.tips+'：'">问题一：</span>
              <el-select v-model="questionitem.question" placeholder="请选择" disabled>
              </el-select>
            </p>
            <p class="input1">
              <span class="info">答案：</span>
              <input v-model="questionitem.value" class="bz" :placeholder="questionitem.placeholder" type="text">
            </p>
          </div>
          <div class="ctx_three_btn">
            <button class="btn reset" @click="handleCloseQuestion">取消</button>
            <button class="btn" type="button" @click="SetPwdQuestion">设置</button>
          </div>
        </div>
        <div v-show="bindpwdsend.isbind==1" class="telcode isbindtel">
          <p class="w450">你已设置密保</p>
          <p class="getzijpwd"><span @click="$router.push({path:'/public/getQuestionPwd'})">忘记密保</span></p>
          <div class="ctx_three_btn">
            <button class="btn reset" @click="handleCloseQuestion">取消</button>
            <button class="btn" type="button" @click="gocheckQuestionPwdAround">修改密保</button>
          </div>
        </div>
        <div v-show="bindpwdsend.isbind==2" class="telcode isbindtel">
          <div class="question" v-for="(questionitem,index) in userquestion" :key='index'>
            <p class="selectp">
              <span class="info" v-text="questionitem.tips+'：'">问题一：</span>
              <el-select v-model="questionitem.question" placeholder="请选择" disabled>
              </el-select>
            </p>
            <p class="input1">
              <span class="info">答案：</span>
              <input v-model="questionitem.value" class="bz" :placeholder="questionitem.placeholder" type="text">
            </p>
          </div>
          <p class="getzijpwd"><span @click="$router.push({path:'/public/getQuestionPwd'})">忘记密保</span></p>
          <div class="ctx_three_btn">
            <button class="btn reset" @click="handleCloseQuestion">取消</button>
            <button class="btn" type="button" @click="checkQuestionPwd">验证密保</button>
          </div>
        </div>
      </el-dialog>
      <!-- 绑定支付宝 -->
      <el-dialog
      title="绑定支付宝"
      center
      :visible.sync="dialogVisible5"
      width="450px"
      :before-close="handleCloseBinding">
      <div @keydown="getkeydownzhifu">
      <div class="with-name" v-if="!userInfo.realName"> <span>真实姓名：</span>  <input class="input" type="text" placeholder="请输入真实姓名" v-model="realName" @focus="fsBindzhifu"></div>
      <div class="with-name" v-if="userInfo.realName"> <span>真实姓名：</span>  <input class="input" type="text"  v-model="userInfo.realName" readonly></div>
      <div class="with-name">
          <span>支付宝账号：</span>  <input class="input" type="text" placeholder="请输入支付宝账号" v-model="alipayName" @focus="fsBindzhifu" :maxlength="20">

      </div>
      <div class="with-name">
          <span>资金密码：</span>  <input class="input" type="password" placeholder="请输入资金密码" v-model="alipayPwd" @focus="fsBindzhifu" :maxlength="20">

      </div>
       </div>
      <div class="bindz-err">{{binderror}}</div>
      <span slot="footer" class="dialog-footer">
          <el-button size='mini' @click="falseBind">取 消</el-button>
          <el-button type="primary" size='mini' @click="bindVoid">确 定</el-button>
      </span>

      </el-dialog>
      <!-- 验证资金密码 -->
      <el-dialog
      title="请输入资金密码"
      center
      :visible.sync="dialogVisible9"
      width="450px"
      :before-close="handleClosezijin">
      <div class="with-name">
          <span>资金密码：</span>  <input class="input" type="password" placeholder="请输入资金密码" v-model="accountPassword">

      </div>
      <span slot="footer" class="dialog-footer">
          <el-button size='mini' @click="getnoAcount">取 消</el-button>
          <el-button type="primary" size='mini' @click="getcashAccountPassword">确 定</el-button>
      </span>
      </el-dialog>
      <!-- 提现验证是否绑定资金密码和绑定手机弹窗 -->
      <el-dialog
      :title="title"
      center
      :visible.sync="dialogVisible10"
      width="450px"
      :before-close="handleClose">
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" size='mini' @click="gotobind">确 定</el-button>
      </span>
      </el-dialog>
      <el-dialog
      title="请先绑定手机再提现"
      center
      :visible.sync="dialogVisible11"
      width="450px"
      :before-close="handleClose">
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" size='mini' @click="gotobindmobile">确 定</el-button>
      </span>
      </el-dialog>

      <!--加载动画-->
      <div class="loading">
        <loading :show="loading.show" :text="loading.text"></loading>
      </div>
    </div>
</template>

<script>
const TIME_COUNT = 60;
import '../../../../common/js/jqueryqr';
import QRCode from 'qrcode'
export default {
  data() {
    var validatename = (rule, value, callback) => {
      if ( !value ) {
        return callback(new Error('真实姓名不能为空'));
      } else if ( !/^[\u4e00-\u9fa5a-zA-Z0-9_]{1,5}$/.test(value)) {
        return callback(new Error('只能输入中文、英文、数字1-5位'));
      } else {
        callback();
      }
    };
    var validatebanknumagin = (rule, value, callback) => {
      if ( value === '' ) {
        callback(new Error('请再次输入银行卡号'));
      } else if ( this.Trim(value,'g') !== this.Trim(this.form.banknum,'g') ) {
        callback(new Error('两次输入银行卡号不一致!'));
      } else {
        callback();
      }
    };
    var validatepass = (rule, value, callback) => {
      if ( value === '' ) {
        callback(new Error('请输入资金密码'));
      } else if ( !/^[a-zA-Z0-9]{6,20}$/.test(value) ) {
        return callback(new Error('请输入6-20个字母和数字'));
      } else {
        callback();
      }
    };
      var validatemoney = (rule, value, callback) => {
      if ( value === '' ) {
        callback(new Error('请输入金额'));
      }else if( value <this.minPayMoney){
         callback(new Error('充值金额不能小于'+this.minPayMoney));
      }else if(value >this.maxPayMoney){
          callback(new Error('充值金额不能大于'+this.maxPayMoney));
      } else {
        callback();
      }
    };
       var validatetel = (rule, value, callback) => {
      if ( value === '' ) {
        callback(new Error('请输入手机号码'));
      }if( !/^1\d{10}$/.test(value)){
          callback(new Error('请输入正确的手机号码'));
      } else {
        callback();
      }
    };
        var validatebankCode = (rule, value, callback) => {
      if ( value === '' ) {
        callback(new Error('请输入验证码'));
      } else {
        callback();
      }
    };
            var bankUserName = (rule, value, callback) => {
      if ( value === '' ) {
        callback(new Error('请输入持卡人姓名'));
      }if (!/^[\u4e00-\u9fa5a-zA-Z0-9_]{1,5}$/.test(value)){
           return callback(new Error('只能输入中文、英文、数字1-5位'));
      } else {
        callback();
      }
    };
              var banknumber = (rule, value, callback) => {
      if ( value === '' ) {
        callback(new Error('请输入银行卡号'));
      }if (!/^[0-9]{16,20}$/.test(this.Trim(value,'g'))){
           return callback(new Error('请输入银行卡号16-20位'));
      } else {
        if (this.form.banknumagin !== '') {
            this.$refs.form.validateField('banknumagin');
          }
        callback();
      }
    };
    var bank = (rule, value, callback) => {
      if ( value === '' ) {
        callback(new Error('请选择银行'));
      } else {
        callback();
      }
    };
     var adress = (rule, value, callback) => {
      if ( this.selectedOptions2.length>0 ) {
        callback();
      } else{
        callback(new Error('请选择地区'));
      }
    };
    return {
      title:'',
      nickNameError:'',
      activeName: 'first',
      radio2:0,
      radio4: '',
      radio5:'',
      showErweima: false,
      iconShow: false,
      paySelected:false,
      showpayment:true,
      payment:'支付宝',
      hasBindAlipayAccount:false,
      hasBindBank:false,
      paymentEn:'',
      payMoneyNum:'',
      payList:[],
      realName:'',//真实姓名
      nickName:'',
      maxPayMoney:'',//最大充值金额
      minPayMoney:'',//最小充值金额
      curent:3,
      banklist:[],
      wList: [],
      i: 0,
      u_id:'',
      flog:'',
      bankid:'',//删除银行卡的id
      bankCardCashList:'',
      //添加银行卡
        options: [],
          props: {
          value: 'label',
        },
       addbanklist:[],
       selectedOptions2:[],
      dialogVisible: false,
      dialogVisible2: false,
      dialogVisible3: false,
      dialogVisible1: false,//设置资金密码弹框
      dialogVisible4: false,//绑定手机号
      dialogVisible5: false,//绑定支付宝弹窗
      dialogVisible6: false,//绑定微信弹窗
      dialogVisible7: false,//修改登录密码弹窗
      dialogVisible8: false,//设置密保弹窗
      dialogVisible9: false,//资金密码验证弹窗
      dialogVisible10: false,//绑定手机再提现验证弹窗
      dialogVisible11: false,//绑定手机再提现验证弹窗
      bindmobile: {
        title:'设置手机号码',
        accountPwd:'',
        tel: '',
        code: '',
        newMobile:'',
        newsmsCode:'',
        localbind:true,
        isbindmobile: 1 //是否绑定手机号 0未绑定 1已绑定 2修改手机号 3验证资金密码
      },
      bindweixin: {
        isbindweixin: false, //是否绑定微信号
        code:''
      },
      bindmoneypwd: {
        isbind:true,//false没有绑定 true已绑定
        title:'设置资金密码',
        loginPwd:'',
        oldPwd: '',
        newPwd: '',
        confirmPwd: ''
      },
      bindloginpwd: { //修改登录密码
        isbind:true,
        oldPwd: '',
        newPwd: '',
        confirmPwd: ''
      },
      userquestion: [
        {tips: '问题一', question: '', value: '', placeholder: '请输入问题的答案'},
        {tips: '问题二', question: '', value: '', placeholder: '请输入问题的答案'},
        {tips: '问题三', question: '', value: '', placeholder: '请输入问题的答案'}],
      bindpwdsend: {
        title:'密保设置',
        isbind: true, //是否设置密保 0 未设置 1 已设置 2密保验证 3从新设置密保
        localbind:true //是否设置密保
      },
      loading:{
        show:false,
        text:'加载中...'
      },
      getCodeItems:[{show:true,Timer:'',Count:''},{show:true,Timer:'',Count:''},{show:true,Timer:'',Count:''}],
      shownew: {old:true,new:true,now:true},
      timernew:{oldTimer:'',nowTimer:'',newTimer:''},
      countnew: {oldCount:'',nowCount:'',newCount:''},
      count: '',
      timer: null,
       showkuaijie: true,
      countkuaijie: '',
      form: {
        name: '',
        region: '',
        bankname: '',
        banknum: '',
        delivery: false,
        type: [],
        bank:'',
        banknumagin: '',
        pass: '',
        bankProvince:'',
        bankCity:'',
        userbankName:'',
      },
      //绑定支付宝
      realName:'',
      alipayName:'',
      alipayPwd:'',
      binderror:'',
      transMoney:'',//转账金额
      transferName:'',
      //提现相关
      aliPayCashItem:{},//支付宝
       aliPayIsOpen:false,
       bankCardIsOpen:false,
       minCashMoney:0,
       maxCashMoney:0,
       CashMoney:'',
       userBankId:'',
       //chongz
        extraInfo:'',
        money:'',
        accountPassword:'',
        payorderSn:'',//充值订单号
        paycaifubao_quickpay_page:false,//快捷网页支付
      //快捷支付
      formbank: {
        money: '',
        bank: '',
        bankUserName: '',
        banknumber: '',
        tel:'',
        bankCode:'',
        delivery: false,
        type: [],
      },
      formLabelWidth: '80px',
      formPayWidth:'120px',
      rules: {
        name: [
          {validator: validatename, trigger: 'blur'}
        ],
        banknum: [
          {validator: banknumber, trigger: 'blur'}
        ],
        banknumagin: [
          {validator: validatebanknumagin, trigger: 'blur'}
        ],
           bank: [
           { validator: bank, trigger: 'change' }
        ],
        pass: [
          {validator: validatepass, trigger: 'blur'}
        ],
        adress:[ { validator: adress, trigger: 'change' }]
      },
          rulesbank: {
        money: [
          {validator: validatemoney, trigger: 'blur'}
        ],
        tel: [
          {validator: validatetel, trigger: 'blur'}
        ],
         bankCode: [
          {validator: validatebankCode, trigger: 'blur'}
        ],
        bankUserName: [
          {validator: bankUserName, trigger: 'blur'}
        ],
        banknumber: [
          {validator: banknumber, trigger: 'blur'}
        ],
          bank: [
           { validator: bank, trigger: 'change' }
        ],
      }
    }
  },
  created () {
    this.paylist()
    // this.getbankList()
    this.getwithdraws()
    this.getneedBindPhone()
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo;
    }
    },
  mounted(){
    this.nickName=this.userInfo.nickName;
    this.$api.setUpAll({userId: this.$store.getters.userId,
      token: this.$store.getters.token}).then(res=>{
      if ( res.result ) {
        //手机
        if(res.data.hasBindPhone){
          this.bindmobile.isbindmobile = 1;
        }else{
          this.bindmobile.isbindmobile = 0;
        }
        this.bindmobile.localbind = res.data.hasBindPhone;
        this.bindmobile.tel = res.data.mobile;
        //微信code
        this.bindweixin.code = res.data.weiXinCode;
        //资金密码
        this.bindmoneypwd.isbind = res.data.hasCreateAccountPwd;
        //密保
        if(res.data.hasSetPwdQuestion){
          this.bindpwdsend.isbind = 1;
        }else{
          this.bindpwdsend.isbind = 0;
        }
        this.bindpwdsend.localbind = res.data.hasSetPwdQuestion;
        //支付宝
        this.hasBindAlipayAccount = res.data.hasBindAlipayAccount;
        //银行卡
        this.hasBindBank = res.data.hasBindBank;
        if(!this.bindmoneypwd.isbind){
          this.bindmoneypwd.title ='设置资金密码';
        }else{
          this.bindmoneypwd.title ='修改资金密码';
        }
      }else{
        this.remoteLogin(res);
      }
    })

    if(this.$route.query.activeName){
      this.activeName = this.$route.query.activeName;
      if(this.$route.query.activeName=="second"){
      this.u_id=1
       }
    }
  },
  watch:{
    '$route'(to){
      if(to.query.activeName){
        this.activeName = to.query.activeName;
      }
    }
  },
  methods: {
    //查看充值状态
    getpayStatus(){
      this.loading.show=true;
        this.unitAjax('post','/api/userCenter/charge/getChargeOrderStatus',{orderSn:this.payorderSn},res=>{
          this.loading.show=false;
          if(res.result){
              if(res.data.status==3){
                 this.$message({
                            message: '充值成功！',
                            type: 'success'
                          });
                location.reload()
              }else{
                this.$message.error(res.data.statusStr)
              }
          }else{
                 this.$message.error(res.msg)
                if (res.operateCode == 100) {
                setTimeout( ()=> {
                   this.logOut()
                    },1000);
              }
          }
        })
    },
      //充值二维码
        geterweima() {
      let vm = this;
      $("#payErweima").erweima({
        fill: 'black',
        text:vm.extraInfo,
        size: 150,
        mode: 0,
        minVersion: 10
      });

    },
       Trim(str,is_global)
        {    var result;
            result = str.replace(/(^\s+)|(\s+$)/g,"");
            if(is_global.toLowerCase()=="g")
            {
                result = result.replace(/\s/g,"");
             }
            return result;
        },
    //限制输入金额
      checkNum(value){
        var str = value;
        var len1 = str.substr(0,1);
        var len2 = str.substr(1,1);
        //如果第一位是0，第二位不是点，就用数字把点替换掉
        if(str.length > 1 && len1==0 && len2 != '.'){
            str = str.substr(1,1);
        }
        // if(/^\d*\.{0,1}\d{0,1}$/.test(str)){
        //   console.log(123)
        // }
        //第一位不能是.
        if(len1=='.'){
            str = '';
        }
        //限制只能输入一个小数点
        if(str.indexOf(".")!=-1){
            var str_=str.substr(str.indexOf(".")+1);
            //限制只能输入一个小数点
            if(str_.indexOf(".")!=-1){
                str=str.substr(0,str.indexOf(".")+str_.indexOf(".")+1);
            }
        }
        return str;
    },
      checkBlus(){
        let value=String(this.payMoneyNum)
      this.payMoneyNum = checkNum(value);
      },
      checkCashBlus(){
        this.CashMoney= checkNum(this.CashMoney.toString());
      },
    //银行卡列表
    getbankList(){
      this.loading.show=true;
        this.unitAjax('post','/api/userCenter/charge/caifubaoQuickBankList',{},res=>{
         this.loading.show=false;
          if(res.result){
             this.banklist=res.data;
          }else{
              this.$message.error(res.msg)
                if (res.operateCode == 100) {
                setTimeout( ()=> {
                    this.logOut()
                   },1000);
              }
          }

        })
    },

    //移除银行卡
    getremovecard(value){
        this.bankid=value;
        this.dialogVisible9=true;
    },
  getwithdrawsKeydown(e){
      if(e.keyCode==13){
        this.GetcashMoney()
      }
  },
   //提现
   GetcashMoney(){
         if(this.userInfo.mobile==''&&this.needBindPhone){
             this.dialogVisible11=true;
        }else
         if(this.userInfo.hasAccountPwd==false){
             this.dialogVisible10=true;
         }else if(!this.userInfo.hasBindBank&&!this.hasBindAlipayAccount){this.$message.error('请先绑定支付宝或银行卡再提现')}
         else{
            if(parseInt(this.CashMoney)>=parseInt(this.minCashMoney)&&parseInt(this.CashMoney)<=parseInt(this.maxCashMoney)&&parseInt(this.userInfo.canCashMoney)!=0){
             this.flog=2;
         this.dialogVisible9 = true;

      } else {
         if(parseInt(this.CashMoney)>parseInt(this.maxCashMoney)){
           this.$message.error('提现金额超出限额')
         }else if(parseInt(this.CashMoney)>parseInt(this.userInfo.canCashMoney)||parseInt(this.userInfo.canCashMoney)==0){
           this.$message.error('提现余额不足')
         }else if(parseInt(this.CashMoney)<parseInt(this.minCashMoney)){
            this.$message.error('提现金额必须大于'+this.minCashMoney)
         }else if(this.CashMoney==''||this.CashMoney==null){
            this.$message.error('请输入提现金额')
         }else{
            this.$message.error('error')
         }
      }
         }

   },
   gettransKeydown(e){
      if(e.keyCode==13){
        this.getTranfer()
      }
   },
         //转账
    getTranfer(){
       if(this.userInfo.hasAccountPwd==false){
             this.dialogVisible10=true;
         }else{
              if (/^[a-zA-Z0-9_-]{5,20}$/.test(this.transferName) && parseInt(this.transMoney) <=parseInt(this.userInfo.canCashMoney)&&parseInt(this.transMoney)!=0) {
           this.dialogVisible9=true;
        } else {
          if (!/^[a-zA-Z0-9_-]{5,20}$/.test(this.transferName)) {
            this.$message.error('请输入账号英文字母或数字5-20位');
          } else if (parseInt(this.transMoney) > parseInt(this.userInfo.canCashMoney)||parseInt(this.userInfo.canCashMoney)==0) {
             this.$message.error('转账余额不足');
          }else if(parseInt(this.transMoney) == 0){
            this.$message.error('转账金额不能为零');
          }else if(this.transMoney==''){
               this.$message.error('请输入转账金额');
          }

        }
         }


    },
    // 取消
    getnoAcount(){
        this.accountPassword='';
        // this.transferName='';
        // this.transMoney='';
        // this.CashMoney='';
        this.dialogVisible9=false;
    } ,
      //快捷支付
      //快捷支付-手机验证
    getbankmobile(){
      let params={
          bankCode:this.formbank.bank,
          money:this.formbank.money,
          bankAccount:this.formbank.banknumber,
          bankUserName:this.formbank.bankUserName,
          bankPhone:this.formbank.tel,
      }
      this.unitAjax('post','/api/userCenter/charge/caifubaoQuickPay',params,res=>{
        if(res.result){
                   //倒计时
          if ( !this.timerkuaijie ) {
            this.countkuaijie = TIME_COUNT;
            this.showkuaijie = false;
            this.timerkuaijie = setInterval(() => {
              if ( this.countkuaijie > 0 && this.countkuaijie <= TIME_COUNT ) {
                this.countkuaijie--;
              } else {
                this.showkuaijie = true;
                clearInterval(this.timerkuaijie);
                this.timerkuaijie = null;
              }
            }, 1000)
          }
        }else{
                 this.$message.error(res.msg)
                           if (res.operateCode == 100) {
                            setTimeout( ()=> {
                            this.logOut()
                          },1000);
                          }
        }
      })

    },
    changePayMoney(value){
        this.formbank.money=value;
    },
    getcashAccountPassword(){

        if(/^[a-zA-Z0-9_-]{6,20}$/.test(this.accountPassword)){
           //提现
            if(this.u_id==1){
               if(this.flog==1){
                 if(this.bankid=='ali'){
                   //删除支付宝
                  this.loading.show=true;
                       this.unitAjax("post", '/api/userCenter/setUp/deleteAlipayAccount',{accountPwd:this.accountPassword},res=>{
                        this.loading.show=false;
                          if (res.result) {
                        this.$message({
                            message: '解绑成功！',
                            type: 'success'
                          });
                          this.accountPassword='';
                          this.dialogVisible9=false;
                          this.hasBindAlipayAccount=false;
                           this.i=0;
                         this.getwithdraws();

                      } else {
                        this.$message.error(res.msg)
                           if (res.operateCode == 100) {
                            setTimeout( ()=> {
                              this.logOut()
                            },1000);
                          }
                      }
                  })
                 }else{
                                 //删除银行卡
                 this.loading.show=true;
               this.unitAjax("post", '/api/userCenter/setUp/deleteUserBank',{userBankId:this.bankid,accountPwd:this.accountPassword},res=>{
                 this.loading.show=false;
                          if (res.result) {
                        this.$message({
                            message: '删除成功！',
                            type: 'success'
                          });
                          this.accountPassword='';
                          this.dialogVisible9=false;
                          this.i=0;
                          this.getwithdraws();
                          setTimeout(() => {
                            if(this.bankCardCashList==null){
                            this.userInfo.hasBindBank=false;
                          }
                          }, 200);

                      } else {
                        this.$message.error(res.msg)
                           if (res.operateCode == 100) {
                             setTimeout( ()=> {
                            this.logOut()
                          },1000);
                          }
                      }
                  })
                 }

            }else if(this.flog==2){
                         // 支付宝提现
               if(this.i=='ali'){
                 this.loading.show=true;
           this.unitAjax('post', '/api/userCenter/cash/createAlipayCashOrder', {cashMoney:this.CashMoney,accountPwd:this.accountPassword}, res => {
             this.loading.show=false;
             if(res.result){
                 this.$message({
                  message: '恭喜你，提现成功！',
                  type: 'success'
                });
                this.accountPassword='';
                this.CashMoney='';
                this.dialogVisible9=false;
                location.reload();
             }else{
               this.$message.error(res.msg)
                if (res.operateCode == 100) {
                setTimeout( ()=> {
                    this.logOut()
                   },1000);
              }
             }

      })
      }else{
        //银行卡提现
                this.loading.show=true;
                 this.unitAjax('post', '/api/userCenter/cash/createBankCashOrder', {userBankId:this.userBankId,cashMoney:this.CashMoney,accountPwd:this.accountPassword}, res => {
                  this.loading.show=false;
             if(res.result){
                 this.$message({
                  message: '恭喜你，提现成功！',
                  type: 'success'
                });
                 this.accountPassword='';
                this.CashMoney='';
                this.dialogVisible9=false;
                 location.reload();
             }else{
               this.$message.error(res.msg)
                if (res.operateCode == 100) {
                setTimeout( ()=> {
                    this.logOut()
                   },1000);
              }
             }

            })
          }
            }

          }else if(this.u_id==2){
                  //转账
                 this.loading.show=true;
                     this.unitAjax("post", '/api/userCenter/transfer/tranMoney', { toUserName: this.transferName, tranMoney: this.transMoney, accountPwd: this.accountPassword }, res => {
                       this.loading.show=false;
                      if (res.result) {
                        this.$message({
                            message: '恭喜你，转账成功！',
                            type: 'success'
                          });
                          this.accountPassword='';
                          this.tranMoney='';
                          this.dialogVisible9=false;
                          location.reload();
                      } else {
                        this.$message.error(res.msg)
                           if (res.operateCode == 100) {
                            setTimeout( ()=> {
                            this.logOut()
                          },1000);
                          }
                      }
                    });
          }
        }else{
          this.$message.error('请输入资金密码英文字母或数字6-20位')

      }


    },
    getkeydownzhifu(e){
        if(e.keyCode==13){
          this.bindVoid()
        }
    },
    //绑定支付宝
    bindVoid(){
          if(this.userInfo.realName){
            this.realName=this.userInfo.realName;
          }
             if ((/^[\u4e00-\u9fa5a-zA-Z0-9_]{1,5}$/.test(this.realName)) && this.alipayName.length>=5&&(!/[\u4e00-\u9fa5]/.test(this.alipayName))&&(/^[a-zA-Z0-9_-]{6,20}$/.test(this.alipayPwd))) {
               this.loading.show=true;
        this.unitAjax('post', '/api/userCenter/setUp/bindAlipay',
          { alipayAccount: this.alipayName, realName: this.realName, accountPwd: this.alipayPwd }, res => {
           this.loading.show=false;
            if (res.result) {

              this.dialogVisible5=false;
              this.hasBindAlipayAccount=true;
              // this.aliPayCashItem.alipayAccount=this.alipayName;
               this.userInfo.realName=res.data.realName;
               this.alipayName='';
                this.alipayPwd='';
               this.getwithdraws()
            }else{
             this.binderror=res.msg
            }
          })
      }else{
        if(!/^[\u4e00-\u9fa5a-zA-Z0-9_]{1,5}$/.test(this.realName)){
           this.binderror='请输入真实姓名中文、英文、数字1-5位'
        }else if(/[\u4e00-\u9fa5]/.test(this.alipayName)){
           this.binderror='支付宝账号不能为中文'
        }else if(this.alipayName.length<5){
             this.binderror='请输入支付宝账号5-20位'
        }else if(!/^[a-zA-Z0-9_-]{6,20}$/.test(this.alipayPwd)){
                this.binderror='请输入资金密码中文、英文、数字6-20位'
        }

      }
    },
    fsBindzhifu(){
        this.binderror=''
    },
    //过滤手机号码
    filtertel(tel){
      return tel.slice(0, 3) + '****' + tel.slice(7, 11)
    },
    // 发送手机验证码
    getmobileCode(index) {
      //倒计时
      let item =this.getCodeItems[index];
      let params = {
        userId: this.$store.getters.userId,
        token: this.$store.getters.token,
        mobile: this.bindmobile.tel,
      };
      if(index==1){
        if(!this.check_tel(this.bindmobile.tel)){this.$message.error('请输入正确的手机号码！');return;};
        params.mobile=this.bindmobile.tel;
      }else if(index==2){
        if(!this.check_tel(this.bindmobile.newMobile)){this.$message.error('请输入正确的手机号码！');return;}
        params.mobile=this.bindmobile.newMobile;
      }
      this.loading.text='获取中...';
      this.loading.show=true;
      this.$api.sendBindPhoneSmsCode(params).then(res=>{
        if(res.result){
          this.$message.success('验证码发送成功');
          if ( !item.Timer ) {
            item.Count = TIME_COUNT;
            item.show = false;
            item.Timer = setInterval(() => {
              if ( item.Count > 0 && item.Count <= TIME_COUNT ) {
                item.Count--;
              } else {
                item.show = true;
                clearInterval(item.Timer);
                item.Timer = null;
              }
            }, 1000)
          }
        }else{
          this.remoteLogin(res);
        }
        this.loading.show=false;
      })

    },
    //绑定手机
    bindMobile(type) {

      if ( type == 'add' ) {
        if(!this.check_tel(this.bindmobile.tel)){this.$message.error('请输入正确的手机号码！');return;}
        if(this.bindmobile.code.length<=0){this.$message.error('请填写短信验证码！');return;}
        let params = {
          userId: this.$store.getters.userId,
          token: this.$store.getters.token,
          mobile: this.bindmobile.tel,
          smsCode: this.bindmobile.code
        };

        this.loading.text='绑定中...';
        this.loading.show=true;
        this.$api.bindPhone(params).then(res => {
          if(res.result){
            this.$message.success('已成功绑定手机号');
            this.bindmobile.isbindmobile = 1;
            this.bindmobile.localbind = true;
            this.dialogVisible4 = false;
             //绑定手机后更新数据
            this.getUserInfo((data)=>{
              this.$store.commit('set_userInfo', data);
            });

          }else{
            this.remoteLogin(res);
          }
          this.loading.show=false;
          this.bindmobile.code = '';
        })

      } else if(type=='check'){

        if(this.bindmobile.accountPwd.length<=0){this.$message.error('资金密码不能为空！');return;}
        this.loading.text='验证中...';
        this.loading.show=true;
        this.$api.validFindPwdAccountPwd({userName:this.$store.getters.username,accountPwd:this.bindmobile.accountPwd}).then(res=>{
          if(res.result){
            this.$message.success('验证成功');
            this.bindmobile.title='设置新手机号码';

            this.bindmobile.isbindmobile = 2;
          }else{
            this.remoteLogin(res);
          }
          this.bindmobile.accountPwd = '';
          this.loading.show=false;
          });
      }else if(type=='update'){
        if(!this.check_tel(this.bindmobile.newMobile)){this.$message.error('请输入正确的手机号码！');return;}
        if(this.bindmobile.newsmsCode.length<=0){this.$message.error('请输入验证码！');return;}
        let params = {
          userId: this.$store.getters.userId,
          token: this.$store.getters.token,
          mobile: this.bindmobile.newMobile,
          smsCode: this.bindmobile.newsmsCode
        };
        this.loading.text='修改中...';
        this.loading.show=true;
        this.$api.bindPhone(params).then(res => {
          if(res.result){
            this.bindmobile.title='设置手机号码';
            this.$message.success('已成功绑定手机号');
            this.bindmobile.tel = this.bindmobile.newMobile;
            this.bindmobile.isbindmobile = 1;
            this.dialogVisible4 = false;
          }else{
            this.remoteLogin(res);
          }
          this.loading.show=false;
          this.bindmobile.newsmsCode = '';
        })
      }
    },
    bindmobileCheckthree(){
        if(!this.bindmoneypwd.isbind){
          this.dialogVisible4 = false;
          this.dialogVisible1 = true;
          this.$message.error('您未设置资金密码，请先设置资金密码！');
          return;
        }
        this.bindmobile.isbindmobile=3;
        this.bindmobile.title='资金密码验证';
    },
    //绑定微信
    bindWeixin(type) {

      if ( type = 'remove' ) {
        this.bindweixin.isbindweixin = false;
      }
    },
    //修改资金密码
    rulePwd(){
      if(!this.bindmoneypwd.newPwd){this.$message.error('请输入资金密码');return false;}
      if(!this.bindmoneypwd.confirmPwd){this.$message.error('请再次输入资金密码');return false;}
      if(!this.check_pwd(this.bindmoneypwd.newPwd)){this.$message.error('请输入6-20位的数字/字母的资金密码！');return false;}
      if(this.bindmoneypwd.newPwd != this.bindmoneypwd.confirmPwd){this.$message.error('请输入一致的资金密码');return false;}
      return true;
    },
    bindMoneypwd(){

        if(this.bindmoneypwd.isbind==false){
            //设置资金密码
          if(!this.bindmoneypwd.loginPwd){this.$message.error('请输入登录密码');return;}
          if(!this.rulePwd())return;

          let params = {
            userId: this.$store.getters.userId,
            token: this.$store.getters.token,
            loginPwd: this.bindmoneypwd.loginPwd,
            newPwd: this.bindmoneypwd.newPwd,
            confirmPwd: this.bindmoneypwd.confirmPwd
          }
          this.loading.text='设置中...';
          this.loading.show=true;
          this.$api.createAccountPwd(params).then(res=>{
            if(res.result){
              this.$message.success('资金密码设置成功');
              this.bindmoneypwd.isbind=true;
              this.bindmoneypwd.title ='修改资金密码';
              this.dialogVisible1 = false;
              this.bindmoneypwd.loginPwd = '';
              this.bindmoneypwd.newPwd = '';
              this.bindmoneypwd.confirmPwd = '';
              //设置资金密码后更新数据
              this.getUserInfo((data)=>{
                this.$store.commit('set_userInfo', data);
              });
            }else{
              this.remoteLogin(res);
            }

            this.loading.show=false;
          })

        }else if(this.bindmoneypwd.isbind==true){
            //修改资金密码
          if(!this.bindmoneypwd.oldPwd){this.$message.error('请输入原资金密码');return;}
          if(!this.rulePwd())return;
          let params = {
            userId: this.$store.getters.userId,
            token: this.$store.getters.token,
            oldPwd: this.bindmoneypwd.oldPwd,
            newPwd: this.bindmoneypwd.newPwd,
            confirmPwd: this.bindmoneypwd.confirmPwd
          }
          this.loading.text='修改中...';
          this.loading.show=true;
          this.$api.editAccountPwd(params).then(res=>{
            if(res.result){
              this.$message.success('资金密码修改成功');
              this.bindmoneypwd.isbind=true;
              this.bindmoneypwd.title ='修改资金密码';
              this.dialogVisible1 = false;
              this.bindmoneypwd.oldPwd = '';
              this.bindmoneypwd.newPwd = '';
              this.bindmoneypwd.confirmPwd = '';
            }else{
              this.remoteLogin(res);
            }
            this.loading.show=false;
          })
        }

    },
    //修改登录密码
    bindLoginpwd(){
      if(!this.bindloginpwd.oldPwd){this.$message.error('请输入原登录密码');return;}
      if(!this.bindloginpwd.newPwd){this.$message.error('请输入新登录密码');return;}
      if(!this.bindloginpwd.confirmPwd){this.$message.error('请再次输入新登录密码');return;}
      if(!this.check_pwd(this.bindloginpwd.newPwd)){this.$message.error('请输入6-20位的数字/字母的登录密码！');return;}
      if(!this.check_pwd(this.bindloginpwd.confirmPwd)){this.$message.error('请输入6-20位的数字/字母的登录密码！');return;}
      if(this.bindloginpwd.newPwd != this.bindloginpwd.confirmPwd){this.$message.error('请输入一致的登录密码');return;}

      let params ={
        userId: this.$store.getters.userId,
        token: this.$store.getters.token,
        oldPwd: this.bindloginpwd.oldPwd,
        newPwd: this.bindloginpwd.newPwd,
        confirmPwd: this.bindloginpwd.confirmPwd
      }
      this.loading.text='修改中...';
      this.loading.show=true;
      this.$api.changeLoginPwd(params).then(res=>{
        if(res.result){
          this.clearAllCookie();
          this.$store.commit('clearAll');
          this.$message.success('密码修改成功,请重新登录');
          this.$router.push({path:'/login'})
          this.dialogVisible7 = false;
          this.bindloginpwd.oldPwd = '';
          this.bindloginpwd.newPwd = '';
          this.bindloginpwd.confirmPwd = '';
        }else{
          this.remoteLogin(res);
        }

        this.loading.show=false;
      })
    },
    //设置密保
    bindPwdSend(){
      this.dialogVisible8 = true;
      if(!this.bindpwdsend.isbind){
        this.getPasswordQuestions();
      }
    },
    getPasswordQuestions(){
      this.loading.text='获取中...';
      this.loading.show=true;
      this.$api.getPasswordQuestions({userId:this.$store.getters.userId,token:this.$store.getters.token}).then(res=>{
        if(res.result){
          this.userquestion.forEach((item,index)=>{
            item.question = res.data[index];
          })
        }else{
          this.remoteLogin(res);
        }
        this.loading.show=false;
      })
    },
    SetPwdQuestion(){
      let isnext = true;
      for (let i = 0; i <  this.userquestion.length; i++) {
        if(!this.userquestion[i].value){
          this.$message.error(this.userquestion[i].tips+'不能为空！');
          isnext = false;
          break;
        }
        if(!this.checkNull(this.userquestion[i].value)){
          this.$message.warning(this.userquestion[i].tips+'不能有空格！');
          isnext = false;
          break;
        }
      }

      if(isnext){
        let params = {
          userId:this.$store.getters.userId,
          token:this.$store.getters.token,
          question1:this.userquestion[0].question,
          question2:this.userquestion[1].question,
          question3:this.userquestion[2].question,
          answer1:this.userquestion[0].value,
          answer2:this.userquestion[1].value,
          answer3:this.userquestion[2].value,
        }
        this.loading.text='设置中...';
        this.loading.show=true;
        this.$api.savePasswordQuestion(params).then(res=>{

          if ( res.result ) {
            this.$message.success('设置密保成功');
            this.userquestion[0].value = '';
            this.userquestion[1].value = '';
            this.userquestion[2].value = '';
            this.bindpwdsend.isbind = 1;
          } else {
            this.remoteLogin(res);
          }

          this.dialogVisible8 = false;
          this.loading.show=false;
        })
      }

    },
    //验证密保
    gocheckQuestionPwdAround(){
      this.getPasswordQuestions();
      this.bindpwdsend.title='密保验证';
      this.bindpwdsend.isbind=2;
    },
    checkQuestionPwd(){

      let isnext = true;
      for (let i = 0; i <  this.userquestion.length; i++) {
        if(!this.userquestion[i].value){
          this.$message.error(this.userquestion[i].tips+'不能为空！');
          isnext = false;
          break;
        }
        if(!this.checkNull(this.userquestion[i].value)){
          this.$message.warning(this.userquestion[i].tips+'不能有空格！');
          isnext = false;
          break;
        }
      }
      if(isnext){
        this.loading.text='验证中...';
        this.loading.show=true;
        let params = {
          userName:this.$store.getters.username,
          answer1:this.userquestion[0].value,
          answer2:this.userquestion[1].value,
          answer3:this.userquestion[2].value,
        }
        this.$api.checkPwdQuestion(params).then(res=>{
          if(res.result){
            this.bindpwdsend.title='密保重设';
            this.$message.success('密保验证成功!');
            this.userquestion[0].value = '';
            this.userquestion[1].value = '';
            this.userquestion[2].value = '';
            this.bindpwdsend.isbind=0;
          }else{
            this.remoteLogin(res);
          };

          this.loading.show=false;
        })
      }

    },
    //中奖提示
    prizeTips(){
      this.$message.warning('中奖提示正在拼命开发中');
    },
    //验证资金密码
    moneyPwd() {

    },
    //解绑
    removeCard() {
      this.iconShow = true;
      this.flog=1;
    },
    addcar(){
      this.dialogVisible3=true;
        this.getaddbank()
    },
    //添加银行卡列表和地区
    getaddbank(){
      this.loading.show=true;
        this.unitAjax('post','/api/userCenter/setUp/addUserBank',{},res=>{
         this.loading.show=false;
          if(res.result){
              this.addbanklist=res.data.bankModels;
               let obj=res.data.provinceCityItemModels
              for(var o in obj){
                let objCity=obj[o].cityModels
                  obj[o]["label"] = obj[o]["province"];
                  obj[o]["children"] = obj[o]["cityModels"];
                  delete obj[o]["province"];
                  delete obj[o]["cityModels"];
                    for(var key in objCity){
                  objCity[key]["label"] = objCity[key]["city"];
                  delete objCity[key]["city"];
                }
             }
              this.options=obj
          }else{
             this.$message.error(res.msg)
               if (res.operateCode == 100) {
                setTimeout( ()=> {
                    this.logOut()
                   },1000);
              }
          }
        })
    },

    handleChangeAdr(value){
        this.form.bankProvince=value[0];
        this.form.bankCity=value[1];
    },
    getuserbank(value){
      this.form.bank=value.bankName
     this.form.userbankName=value.bankName;
     this.form.bankCode=value.bankCode;
    },
    getbankkeydown(e){
        if(e.keyCode==13){
          this.submitForm('form')
        }
    },
    //添加银行卡
    submitForm(formName) {

      this.$refs[formName].validate((valid) => {
        if ( valid) {
          if(this.userInfo.realName){
           this.form.name=this.userInfo.realName
          }
          let params= { bankName:this.form.userbankName, branchName: this.Trim(this.form.bankname,'g') , bankNo: this.form.banknum, realName: this.form.name, accountPwd: this.form.pass,
           bankCode: this.form.bankCode,bankProvince:this.form.bankProvince,bankCity:this.form.bankCity}
           this.loading.show=true;
            this.unitAjax('post', '/api/userCenter/setUp/saveUserBank',params , res => {
              this.loading.show=false;
            if (res.result) {
                this.$message({
                  message: '恭喜你，添加成功！',
                  type: 'success'
                });
                this.resetForm('form');
                this.userInfo.hasBindBank=true;
                this.userInfo.realName=res.data.realName;
                this.i=0;
                 this.getwithdraws();
             this.dialogVisible3=false;

            } else {
              this.$message.error(res.msg)
                if (res.operateCode == 100) {
               setTimeout( ()=> {
                    this.logOut()
                   },1000);
              }
            }
          })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
     this.selectedOptions2=[]
    },
    // 修改昵称
    dialog() {
      this.nickName=this.nickName.replace(/\s+/g,'')
              if (/^[\u4e00-\u9fa5a-zA-Z0-9_]{1,20}$/.test(this.nickName) && this.nickName !== '') {
                this.unitAjax('post', '/api/userCenter/setUp/editNickName', { nickName: this.nickName }, res => {

                    if (res.result) {
                         this.dialogVisible = false;
                        this.nickNameError =''
                          this.$message({
                            message: '修改成功！',
                            type: 'success'
                          });
                          this.userInfo.nickName=this.nickName;
                    } else {
                            this.err = res.msg;
                        if (res.operateCode == 100) {
                          setTimeout( ()=> {
                            this.logOut()
                          },1000);
                        }
                    }
                })
            } else {
                if(this.nickName == ''){
                this.nickNameError ='昵称不能为空'
                }else if(!/^[\u4e00-\u9fa5a-zA-Z0-9_]{1,20}$/.test(this.nickName)){
                  this.nickNameError='只能输入中文、数字、字母,1-20位。'
                }

            }

    },
    focusNickName(){
      this.nickNameError=''
    },
    handleClosezijin(done){
       done();
         this.accountPassword='';
        // this.transferName='';
        // this.transMoney='';
        // this.CashMoney='';
    },
       handleCloseAddcar(done){
       done();
         this.resetForm('form')
    },
       handleCloseBinding(done){
       done();
         this.realName='';
         this.alipayName='';
         this.alipayPwd='';
          this.binderror=''
    },
        handleCloseName(done){
       done();
         this.nickName=this.userInfo.nickName;
         this.nickNameError=''
    },
    falseBind(){
          this.realName='';
         this.alipayName='';
         this.alipayPwd='';
         this.binderror='';
         this.dialogVisible5=false;
    },
    handleCloseMobile(done){
      if(typeof done == 'function'){
        done();
      }
      this.dialogVisible4 = false;
      this.bindmobile.title = '设置手机号码';
      this.bindmobile.code = '';
      this.bindmobile.accountPwd = '';
      this.bindmobile.newMobile = '';
      this.bindmobile.newsmsCode = '';
      if(this.bindmobile.localbind){
        this.bindmobile.isbindmobile = 1;
      }else{
        this.bindmobile.isbindmobile = 0;
        this.bindmobile.tel = '';

      }
    },
    handleCloseMoneypwd(done){
      if(typeof done == 'function'){
        done();
      }
      this.dialogVisible1 = false;
      this.bindmoneypwd.loginPwd = '';
      this.bindmoneypwd.title = '设置资金密码';
      this.bindmoneypwd.oldPwd = '';
      this.bindmoneypwd.newPwd = '';
      this.bindmoneypwd.confirmPwd = '';
    },
    handleCloseLoginpwd(done){
      if(typeof done == 'function'){
        done();
      }
      this.dialogVisible7 = false;
      this.bindloginpwd.oldPwd = '';
      this.bindloginpwd.newPwd = '';
      this.bindloginpwd.confirmPwd = '';
    },
    handleCloseQuestion(done){
      if(typeof done == 'function'){
        done();
      }
      this.dialogVisible8 = false;
      this.userquestion[0].value = '';
      this.userquestion[1].value = '';
      this.userquestion[2].value = '';
      this.bindpwdsend.title = '密保设置';
      if(this.bindpwdsend.localbind){
        this.bindpwdsend.isbind = 1;
      }else{
        this.bindpwdsend.isbind = 0;
      }
    },
    handleClose(done) {
      done();
      /*this.$confirm('确认关闭？')
       .then(_ => {
       done();
       })
       .catch(_ => { });*/
    },
    // 提现方式选择
    wSelected(index,aliPayCashItem) {
      this.i = index;
      this.minCashMoney=aliPayCashItem.minCashMoney;
      this.maxCashMoney=aliPayCashItem.maxCashMoney;
        this.userBankId=aliPayCashItem.userBankId
    },
    //是否需要绑定手机再提现
    getneedBindPhone(){
             this.unitAjax('post', '/api/userCenter/cash/cashTypeList', {}, res => {
        if (res.result) {
          this.needBindPhone = res.data[0].needBindPhone;

        } else {
          this.$message.error(res.msg)
                if (res.operateCode == 100) {
               setTimeout( ()=> {
                    this.logOut()
                   },1000);
              }
        }

      })
    },
    handleClick(tab, event) {
      this.u_id=tab.index;
      if(tab.index==1||this.activeName=='second'){
          this.title='请先设置资金密码再提现';
          this.$route.query.activeName='second'
        if(this.userInfo.mobile==''&&this.needBindPhone){
             this.dialogVisible11=true;
        }else
         if(this.userInfo.hasAccountPwd==false){
            this.dialogVisible10=true;
         }
      }else{
         this.title='请先设置资金密码再转账';
           this.$route.query.activeName='first'
      }
    },
    gotobind(){
        this.dialogVisible10=false;
        this.dialogVisible1=true;
    },
    gotobindmobile(){
       this.dialogVisible11=false;
        this.dialogVisible4=true;
    },
    getwithdraws(){
     this.loading.show=true;
        this.unitAjax('post','/api/userCenter/cash/cashList',{},res=>{
        this.loading.show=false;
          if(res.result){
              this.aliPayCashItem=res.data.aliPayCashItem;
              this.aliPayIsOpen=res.data.aliPayIsOpen;
              this.bankCardIsOpen=res.data.bankCardIsOpen;
              this.canCashMoney=res.data.canCashMoney;
              if(res.data.bankCardCashList){
                this.bankCardCashList=res.data.bankCardCashList;
                this.wList=res.data.bankCardCashList;
             this.userBankId=res.data.bankCardCashList[0].userBankId;
                 this.minCashMoney=res.data.bankCardCashList[0].minCashMoney;
              this.maxCashMoney=res.data.bankCardCashList[0].maxCashMoney;
              }else{
                this.bankCardCashList=[];
                this.userInfo.hasBindBank=false;
                if(this.aliPayCashItem){
                  this.wSelected('ali',this.aliPayCashItem)
                }else{
                   this.hasBindAlipayAccount=false;
                }

              }

          }else{
            this.remoteLogin(res);
          }
        })
    },
    getallCashMoney(){
      this.CashMoney=parseInt(this.canCashMoney);
    },
    getalltransMoney(){
      this.transMoney=parseInt(this.canCashMoney)
    },

    //充值方式
    paylist(){
      this.loading.show=true;
        this.unitAjax('post','/api/userCenter/charge/list',{},res=>{
          this.loading.show=false;
          if(res.result){
               this.payList=res.data;
               this.radio2=0
                 this.minPayMoney=this.payList[0].minMoney;
             this.maxPayMoney=this.payList[0].maxMoney;
               this.payment=this.payList[0].payName;
              this.paymentEn=this.payList[0].payFlag;
              if(this.payList[0].payFlag=='caifubao_quickpay_page'){
                 this.paycaifubao_quickpay_page=true
              }else{
                 this.paycaifubao_quickpay_page=false
              }

        //  for(var key in this.payList){
        //    if(this.payList[key].remark){
        //      this.radio2=parseFloat(key)
        //       this.minPayMoney=this.payList[key].minMoney;
        //      this.maxPayMoney=this.payList[key].maxMoney;
        //        this.payment=this.payList[key].payName;
        //       this.paymentEn=this.payList[key].payFlag;
        //       }
        //     }
          }else{
             this.$message.error(res.msg)
                if (res.operateCode == 100) {
               setTimeout( ()=> {
                    this.logOut()
                   },1000);
              }
          }
        })
    },
    changeValue(index) {
      if(index){
         this.showErweima=false;
         this.payMoneyNum='';
      }
      if(this.payList[index].payFlag=='caifubao_quickpay'){
        this.paySelected=true;
          this.showpayment=false;
          this.paycaifubao_quickpay_page=false;
      }else if(this.payList[index].payFlag=='alipay_code'||this.payList[index].payFlag=='weixin_code'||this.payList[index].payFlag=='qq_code'){
          this.showpayment=true;
           this.paySelected=false;
           this.paycaifubao_quickpay_page=false;
        }else if(this.payList[index].payFlag=='caifubao_quickpay_page'){
           this.showpayment=true;
           this.paySelected=false;
           this.paycaifubao_quickpay_page=true;
        }
        else{
          this.showpayment=false;
          this.paySelected=false;
          this.paycaifubao_quickpay_page=false;
      }
       this.payment=this.payList[index].payName;
      this.paymentEn=this.payList[index].payFlag;
      this.minPayMoney=this.payList[index].minMoney;
      this.maxPayMoney=this.payList[index].maxMoney;
    },

    // 选择筹码
    changeMoney(value) {
      if(this.payMoneyNum){
         this.payMoneyNum=value+parseFloat(this.payMoneyNum);
      }else{
        this.payMoneyNum=value;
      }

    },
    //刷新
    // loat(){
    //    location.reload()
    // },
    getpayKeydown(e){
      if(e.keyCode==13){
        this.paymoney()
      }
    },
    //充值
    paymoney(){
      if(this.payMoneyNum>=this.minPayMoney||this.payFlag<=this.maxPayMoney){
            if(this.paycaifubao_quickpay_page){
              this.loading.show=true;
                this.unitAjax('post','/api/userCenter/charge/quickPagePay',{money:this.payMoneyNum},res=>{
                  this.loading.show=false;
                  if(res.result){
                      window.open(res.data.extraInfo);
                  }else{
                       this.$message.error(res.msg);
                   if (res.operateCode == 100) {
                 setTimeout( ()=> {
                    this.logOut()
                      },1000);
                  }
                  }
                })
            }else{
              this.loading.show=true;
                    this.unitAjax('post','/api/userCenter/charge/order',{payFlag:this.paymentEn,money:this.payMoneyNum},res=>{
                      this.loading.show=false;
              if(res.result){
                   this.money=this.payMoneyNum;
                this.extraInfo=res.data.extraInfo;
                this.payorderSn=res.data.orderSn;
                    if( this.extraInfo){
                      this.geterweima()
                       this.showErweima=true;
                    }

              }else{
                 this.$message.error(res.msg);
                   if (res.operateCode == 100) {
                 setTimeout( ()=> {
                    this.logOut()
                   },1000);
              }
              }
         })
            }

      }else{
          if(this.payMoneyNum<this.minPayMoney){
            this.$message.error('充值金额不能小于'+this.minPayMoney)
          }else if(this.payFlag>this.maxPayMoney){
              this.$message.error('充值金额不能大于'+this.maxPayMoney)
          }
      }
    },
    placeholderSupport() {
      return 'placeholder' in document.createElement('input');
    },
    notPlaceholder(){

      let _this = this;
      /*
       *placeholder兼容ie9以下
       */
      if (!this.placeholderSupport() ) {   // 判断浏览器是否支持 placeholder
        $(function () {
          //默认遍历循环添加placeholder
           $('.selectp [placeholder]').each(function(){

             if(!$(this).val() && $(this).parent().find('.placeholder').length <= 0) {
               $(this).parent().prepend("<span class='placeholder' style='position: absolute;left: 10px;top:8px;color:#898b8e;'>" + $(this).attr('placeholder') + "</span>");
             }
           })

          $('.input1 [placeholder]').each(function () {
            if(!$(this).val() && $(this).parent().find('.placeholder').length <= 0){
              $(this).parent().prepend("<span class='placeholder' style='position: absolute;left: 74px;top:10px;color:#898b8e'>" + $(this).attr('placeholder') + "</span>");
            }
          })
          $('.placeholder').on('click', function () {
            $(this).hide();
            $(this).parent().find('input').focus();
          })
          $('[placeholder]').focus(function () {
            $(this).parent().find('span.placeholder').hide();
          })

          $('.input1 [placeholder]').blur(function () {
            if ( $(this).val() != "" ) {  //如果当前值不为空，隐藏placeholder
              $(this).parent().find('span.placeholder').hide();
            } else {
              $(this).parent().find('span.placeholder').show();
            }
          })
        });
      }
      //生成二维码

      if(this.dialogVisible6){
        _this.$nextTick().then(()=>{
          QRCode.toCanvas(document.getElementById('qrcode'),_this.bindweixin.code,{width:200}, function (error) {
          if ( error ) console.error(error);
          //回调检测是否已扫描
        })
        })
/*        let erweimaTimer = setInterval(() => {
          if (document.getElementById('qrcode')) {
            QRCode.toCanvas(document.getElementById('qrcode'),this.bindweixin.code,{width:200}, function (error) {
              if ( error ) console.error(error);
              //回调检测是否已扫描
            })
            clearInterval(erweimaTimer);
          }
        }, 200)*/
      }

    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  padding: 33px 20px 20px;
  font-size: 14px;
  color: #43484a;
  .nickNameError{
    height: 28px;
    line-height: 28px;
    color: red;
    padding-left: 50px;
  }
  .bindz-err{
    color: red;
    height: 20px;
    line-height: 20px;
    padding-left: 102px;
    margin-top: 5px;
  }
  .input {
    border: 1px solid #ebebeb;
    width: 250px;
    height: 28px;
    line-height: 28px;
  }
    input{
        padding-left: 10px;
    }
    .with-name{
        margin-top: 20px;
       span{
        display: inline-block;
        width: 100px;
        text-align: right;
    }
    }
  .msgCode {
    margin-top: 20px;
    span{
        display: inline-block;
        width: 70px;
        text-align: right;
    }
  }
  .telcode{
    &.isbindtel{
      p{
        font-size: 14px;
        text-align: center;
      }
      .getzijpwd{
        text-align: right;
        color:#1a95f2;
        font-size: 12px;
        cursor: pointer;
      }
      .tel{
        font-size: 20px;
        font-weight: bold;
      }
     }
    .getzijpwd{
      text-align: right;
      color:#1a95f2;
      font-size: 12px;
      cursor: pointer;
    }
    p{
      position: relative;
      width:423px;
      margin-bottom: 15px;
      &.ewmweixin{
         height: 200px;
         margin-bottom: 0px;
       }
      &.w450{
        width: 450px;
      }
      &.removemb{
         margin-bottom: 0;
       }
      .getcode{
        position: absolute;
        cursor: pointer;
        color:#1a95f2;
        font-size: 12px;
        top: 9px;
        right: 10px;
        &.success{
           cursor: not-allowed;
           color: #9c9c9c;
         }
      }
      input{
        width: 358px;
        height: 42px;
        padding-left: 10px;
        border: 1px solid #eeeeee;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
      }
    }

    .info{
      display: inline-block;
      height: 31px;
      line-height: 31px;
      width: 60px;
      color:#43484a;
      font-size: 12px;
    }
    .btn{
      width: 96px;
      height: 31px;
      margin-left: 65px;
      color:#fff;
      background-color: #1a95f2;
      border: none;
      outline: none;
      cursor: pointer;
      -webkit-border-radius: 3px;
      -moz-border-radius: 3px;
      border-radius: 3px;
      &:hover{
         background-color: #1aa1ff;
       }
    }
    /*公共的按钮样式*/
    .ctx_three_btn{
      margin-top: 25px;
      .reset{
        background-color: #fff;
        color:#43484a;
        margin-left: 90px;
        border: 1px solid #eeeeee;
        &:hover{
           background-color: #f9f9f9;
         }
      }
    }

  }
  .mobile{
      position: relative;

      button{
          position: absolute;
          right: 15px;
          top:4px;
          cursor: pointer;
      }
    //    .activeMsg {
    //        display: inline-block;
    //        width: 100%;
    //        height: 100%;
    //     background-color: #007aff;
    //     color: white;
    //   }
  }

  .forminput {
    width: 240px;
  }
  .header {
    .title {
      width: 322px;
      height: 164px;
      line-height: 164px;
      box-shadow: 1px 1px 10px #e8e8e8;

      .logo {
        width: 126px;
        text-align: center;
        img {
          width: 103px;
        }
      }
      .user {
        margin-left: 20px;
        line-height: 20px;
        margin-top: 29px;
        width: 160px;

        .username {
          font: 700 19px "微软雅黑";
               overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .user-z{
               overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .user-nick {
          color: #68a8ff;
          cursor: pointer;
        }
        .user-lotter {
          .lotterRebate {
            padding: 0 5px;
            background-color: #feb407;
            color: white;
            border-radius: 3px;
            font-size: 12px;
          }
        }
      }
    }
    .usermoney {
      margin-left: 32px;
      height: 104px;
      width: 730px;
      box-shadow: 1px 1px 10px #e8e8e8;
      padding: 30px 35px;
      .money-num {
        margin-top: 30px;
        font: 700 50px "微软雅黑";
      }
      .line-col {
        height: 35px;
        margin-top: 50px;
        border-right: 1px solid #ebebeb;
      }
      .money {
        width: 364px;
      }
      .with-money {
        width: 330px;
        padding-left: 35px;
        i {
          cursor: pointer;
        }
        .el-icon-question {
          font-size: 17px;
        }
      }
    }
  }
  .set {
    float: left;
    width: 292px;
    height: 406px;
    padding: 15px;
    box-shadow: 1px 1px 10px #e8e8e8;
    margin-top: 32px;
    ul {
      margin-top: 10px;
      li {
        text-align: center;
        width: 97px;
        height: 75px;
        float: left;
        margin-top: 20px;
        cursor: pointer;
        position: relative;
        &:nth-child(3n+1){
           left: -10px;
        }
        &:nth-child(3n){
           left: 10px;
         }
        img:hover{
            transform: scale(1.1)
        }
        span{
            position: absolute;
            top:0;
            right:18px;
            background-color: red;
            color: white;
            font-size: 12px;
            padding: 5px;
            border-radius: 10px;
        }
      }
    }
  }
  .pay {
    float: left;
    width: 765px;
    // height: 421px;
    margin: 32px 0 0 32px;
    padding: 15px 0 130px 35px;
    box-shadow: 1px 1px 10px#e8e8e8;
    font-size: 14px;
    .paysucess{
      margin:100px 0 0 200px;
      width: 200px;
      text-align: center;
      .sucessImg{

      }
      .sucessFont{
          margin-top: 40px;
          span{
            color:#5CADF4;
            cursor: pointer;
          }
      }
    }
      .paymentList{
        margin-top: 10px;
        float: left;
        width: 150px;
      }
    .paySelected{
      margin-top: 50px;
      .form-size{
            width: 380px;
            float: left;
            .clearMoney{
              margin-left: 120px;
              .clearmargin{
                margin-left: 50px;
              }
            }
      }
      .paybank-header{
        position: relative;
      .paybankcode{
           position: absolute;
           top: 0;
           right: 30px;
           color: #409EFF;
           cursor: pointer;
      }
      }

      .bankMoney{
        float: left;
        margin-top: 5px;
        .spce{
          float: left;
          margin-left: 10px;
        }
      }
    }
    .pay-select {
      margin-top: 15px;
      .paylist{
        img{
          width: 20px;
          vertical-align: middle;
          margin-right: 5px;
        }
      }
      .el-radio-group{
        .paymentList:nth-child(4n+1){
          margin-left: 0;
        }
      }
    }
    .pay-content {
      margin-top: 48px;
      .content-left {
        input {
          border: 1px solid #d7d8d9;
          height: 30px;
          width: 174px;
          padding-left: 10px;
        }
        .margin {
          margin: 15px 70px;
          .spce {
            float: left;
            margin-left: 5px;
            #minspace {
              height: 30px;
            }
          }
        }
        .summit {
          margin-left: 75px;
          .submit-w {
            width: 96px;
            height: 31px;
          }
        }
      }
    }
    .content-right {
      width: 200px;
      margin-left: 10px;
      text-align: center;
      .paystaus{
        margin-top: 10px;
      }
      .erweima {
        height: 153x;
      }
      .tips{
        color:#CDCDCD;
      }
      .tag-money {
        font-weight: 700;
        height: 28px;
        line-height: 28px;
      }
    }
  }
  .trans {
    margin-top: 24px;
    input {
      border: 1px solid #d7d8d9;
      padding-left: 10px;
      height: 30px;
      line-height: 30px;
      width: 172px;
    }
  }
  .tip {
    margin: 12px 65px;
    color: #d7d8d9;
    font-size: 12px;
    span {
      color: #1a96f1;
      display: inline-block;
      border-bottom: 1px solid #1a96f1;
      cursor: pointer;
    }
  }
  .tip-bottom{
    margin-bottom: 30px;
  }
  .summit {
    margin-left:64px;
    .submit-w {
      width: 96px;
    }
  }
  .transTop{
    margin-bottom: 55px;
  }
  .wich {
    .el-cascader{
      width: 240px;
    }
    ul {
      // height: 220px;
      // overflow-y: scroll;
      // &::-webkit-scrollbar {
      //   display: none;
      // }
      // margin-top: 10px;
      .w-active {
        // border-radius: 25px;
      //  box-shadow: 0px 2px 10px 2px rgba(198,205,211,0.3);
       border: 2px solid #ff6365;
        // transform:scale(1.2) ;
        //  transform: ;
        // img{
        //   width: 176px;
        //   height: 70px;
        // }
      }

      li {

          box-sizing: border-box;
        position: relative;
        width: 180px;
        height: 74px;
        padding: 5px;
        float: left;
        margin: 20px 48px 27px 20px;
        border-radius: 5px;
        transition: all 0.5s;
        cursor: pointer;
        i {
          position: absolute;
          top: -10px;
          right: -15px;
        }
         .wClass{
          // width: 186px;
          // height:75px;
          width: 110%;
          height: 125%;
          transform: translateX(-12px) translateY(-10px)

        }
        img {
          position: absolute;
          left: 0;
          top: 0;
          width: 99%;
          z-index: 1;
          margin: 0;
          padding: 0;
        }

        .even {
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          z-index: 2;
          color: white;
          padding: 12px 0 0 12px;
          p:nth-child(1) {
            // padding-left: 35px;
          }
          p:nth-child(2) {
            margin-top: 15px;
          }
        }
            .binding{
           top: 17px;
           left: 44px;
        }
      }
      .add {
        border-radius: 5px;
        background-color: #eaf6ff;
        line-height: 75px;

        img {
          width: 36px;
          position: static;
          margin-left: 28px;
        }

        span {
          color: #43484a;
          margin-left: 10px;
        }
      }
      .removecolor{
        background-color: #ffeaea;
      }
    }
    .trans {
      margin-top: 8px;
    }
    .submit {
      margin-left: 24px;
      width: 96px;
      height: 31px;
    }
  }
}
</style>

