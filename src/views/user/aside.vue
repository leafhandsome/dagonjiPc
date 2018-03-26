<template>
    <div>
      <ul class="nav" v-if="flog">
        <li  ><router-link to="/user/grzx">个人中心</router-link> </li>
          <!-- <li class="right-icon" v-for="(item,index) in userInfo.userCenterMenusList" :key="index" v-show="userInfo.userType==1" @click="getgotoLink(item.id,index)" ><a :class="index==num?'active':''"> {{item.menuName}} </a> </li> -->
        
        <li class="right-icon"><router-link to="/user/bbzx">{{userInfo.userCenterMenusList[0].menuName}}</router-link></li>
        <li class="right-icon" v-show="userInfo.userType==1"><router-link to="/user/dlzx">{{userInfo.userCenterMenusList[1].menuName}}</router-link></li>
        <li class="right-icon"><router-link to="/user/xxzx">{{userInfo.userCenterMenusList[2].menuName}}</router-link></li>
      </ul>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                userInfo:{},
                flog:false
            }
        },
    //    computed: {
    // userInfo() {
    //   return this.$store.getters.userInfo;
    // }
    // },
    created () {
      this.getuser()
    },
      methods: {
            getuser(){
                  let vm = this;
        let token = vm.getValue("token");
        let userId = vm.getValue("userId");
        if (token && userId) {
                this.unitAjax('post','/api/userCenter/index',{},res=>{
                     if(res.result){
                          this.userInfo=res.data; 
                         this.flog=true;
                     }else{
                           this.$message.error(res.msg)
                        if (res.operateCode == 100) {
                            setTimeout( ()=> {
                            vm.logOut()
                            },1000);
                        }
                     }   
                })
                 }else{
                       setTimeout( ()=> {
                            vm.logOut()
                            },1000);
                 }
            }
            // getgotoLink(id,index){
            //     this.num=index;
            //         switch (id) {
            //             case 1:
            //                 this.$router.push('/user/bbzx')
            //                 break;
            //            case 2:
            //                 this.$router.push('/user/dlzx')
            //               break;
            //                case 3:
            //                 this.$router.push('/user/xxzx')
            //                 break; 
            //                  case 'first':
            //                  this.$router.push('/user/grzx')
            //                 break; 
            //             default:
            //                 break;
            //         }
            // }
        }
    }
</script>
<style lang="scss" scoped>

  .nav{
    margin: 0px 15px;
    border-bottom: 2px solid #f5f5f5;
    li{
      margin: 0 5px;
      display: inline-block;
      cursor: pointer;
      &.right-icon::before{
        content: '|';
        color:#7f7f7f;
        position: relative;
        left: -6px;
      }

      a{
        position: relative;
        display: inline-block;
        padding: 15px 15px;
        height: 100%;
        font-size: 14px;
        text-align: center;
        text-decoration: none;
        color:#898b8e;
        &:hover{
         color: #898b8e;
          &::after{
             position: absolute;
             content:'';
             height: 2px;
             width: 100%;
             background-color: #1a95f2;
             left: 0;
             bottom: -1px;
           }
        }
      }
      .active{
           font-weight: bold;
        color: #43484a;
        &::after{
           position: absolute;
           content:'';
           height: 2px;
           width: 100%;
           background-color: #1a95f2;
           color: #000000;
           left: 0;
           bottom: -1px;
         }
      }
      a.active{
        font-weight: bold;
        color: #43484a;
        &::after{
           position: absolute;
           content:'';
           height: 2px;
           width: 100%;
           background-color: #1a95f2;
           color: #000000;
           left: 0;
           bottom: -1px;
         }
      }

    }
  }



</style>
