<template>
    <div class="hello">
          <ul class="nav clearfix" v-if="userNameList.length>0">
            <!-- <li class="li" v-for="(item,index) in userInfo.userCenterMenusList[0].menuChildItems" :key="index" @click="getgotoLink(item.id,index)" :class="index==num?'active':''"> {{item.menuName}}  </li> -->
            <li> <router-link to="/user/bbzx/gameRecord"> {{userNameList[0].menuName}}</router-link>  </li>
            <li> <router-link to="/user/bbzx/lotterRecord"> {{userNameList[1].menuName}} </router-link></li>
            <li> <router-link to="/user/bbzx/billRecord"> {{userNameList[2].menuName}} </router-link></li>
            <li> <router-link to="/user/bbzx/payRecord"> {{userNameList[3].menuName}} </router-link></li>
            <li> <router-link to="/user/bbzx/withdrawRecord"> {{userNameList[4].menuName}} </router-link></li>
            <li> <router-link to="/user/bbzx/transferRecord"> 转账记录</router-link></li>
        </ul>
        <keep-alive>
         <router-view></router-view>
        </keep-alive>
        
    </div>
</template>
<script>
    export default {
        data () {
            return {
               userNameList:[]
            }
        },
        created () {
                this.getuser()
        },
        computed: {
        //    userInfo() {
        //     return this.$store.getters.userInfo.userCenterMenusList[0].menuChildItems;
        //     }, 
        },
        methods: {
               getuser(){
                  let vm = this;
        let token = vm.getValue("token");
        let userId = vm.getValue("userId");
        if (token && userId) {
                this.unitAjax('post','/api/userCenter/index',{},res=>{
                     if(res.result){
                          this.userNameList=res.data.userCenterMenusList[0].menuChildItems; 
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
            //             case 4:
            //                 this.$router.push('/user/bbzx/gameRecord')
            //                 break;
            //            case 5:
            //                 this.$router.push('/user/bbzx/lotterRecord')
            //               break;
            //                case 12:
            //                 this.$router.push('/user/bbzx/billRecord')
            //                 break; 
            //               case 22:
            //                 this.$router.push('/user/bbzx/payRecord')
            //                 break; 
            //               case 17:
            //                 this.$router.push('/user/bbzx/transferRecord')
            //                 break; 
            //               case 24:
            //                 this.$router.push('/user/bbzx/withdrawRecord')
            //                 break;    
            //             default:
            //                 break;
            //         }
            // }
        }
    }
</script>
<style lang="scss" scoped>
.hello{
    .nav{
        margin: 20px 0 23px;
        li{
            float: left;
            width: 72px;
            height: 32px;
            line-height: 32px;
            text-align: center;
            cursor: pointer;
            margin-left: 20px;
           
        }
        a{
            display:block;
              color: #43484a;
            font-size: 12px;
        }
      .active{
             border-radius: 5px;
             background-color: #1A95F2;
            color: white;
        }
    }
}
</style>

