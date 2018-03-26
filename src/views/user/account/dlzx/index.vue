<template>
    <div class="hello">
        <ul class="nav clearfix" v-if="teamname.length>0">
             <!-- <li class="li" v-for="(item,index) in userInfo.userCenterMenusList[1].menuChildItems" v-show="item.id==6||item.id==7||item.id==27||item.id==37||item.id==38" :key="index" @click="getgotoLink(item.id,index)" ><a :class="index==num?'active':''">{{item.menuName}}  </a> </li> -->
            <li> <router-link to="/user/dlzx/teamCenter">  {{teamname[0].menuName}} </router-link>  </li>
            <li> <router-link to="/user/dlzx/accountCenter">{{teamname[1].menuName}} </router-link></li>
            <li> <router-link to="/user/dlzx/teamList">{{teamname[2].menuName}}</router-link></li>
            <li> <router-link to="/user/dlzx/teamRecord">{{teamname[3].menuName}} </router-link></li>
            <!-- <li> <router-link to="/user/dlzx/teamGameRecord">团队游戏记录 </router-link></li> -->
            <!-- <li> <router-link to="/user/dlzx/teamPayRecord">团队充提记录</router-link></li>
            <li> <router-link to="/user/dlzx/teambillRecord">团队账变记录</router-link></li>
            <li> <router-link to="/user/dlzx/teamRebateRecord">团队返点记录</router-link></li> -->
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
               num:0,
               teamname:[]
            }
        },
        created () {
            this.getuser()
        },
        //     computed: {
        //    teamname() {
        //     return this.$store.getters.userInfo.userCenterMenusList[1].menuChildItems;
        //     }, 
        // },
        methods: {
            getuser(){
                  let vm = this;
        let token = vm.getValue("token");
        let userId = vm.getValue("userId");
        if (token && userId) {
                this.unitAjax('post','/api/userCenter/index',{},res=>{
                     if(res.result){
                          this.teamname=res.data.userCenterMenusList[1].menuChildItems;  
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
            //           getgotoLink(id,index){
            //     this.num=index;
            //         switch (id) {
            //             case 6:
            //                 this.$router.push('/user/dlzx/teamCenter')
            //                 break;
            //            case 7:
            //                 this.$router.push('/user/dlzx/accountCenter')
            //               break;
            //                case 27:
            //                 this.$router.push('/user/dlzx/teamList')
            //                 break; 
            //               case 37:
            //                 this.$router.push('/user/dlzx/teamRecord')
            //                 break; 
            //               case 38:
            //                 this.$router.push('/user/dlzx/teamGameRecord')
            //                 break; 
            //               case 39:
            //                 this.$router.push('/user/dlzx/teamPayRecord')
            //                 break;  
            //                    case 40:
            //                 this.$router.push('/user/dlzx/teambillRecord')
            //                 break;  
            //                    case 41:
            //                 this.$router.push('/user/dlzx/teamRebateRecord')
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
           
            height: 32px;
            line-height: 32px;
            text-align: center;
            padding: 0 8px;
            margin-left: 20px;
           cursor: pointer;
        }
        a{
             padding:0 10px;
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

