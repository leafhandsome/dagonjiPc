<template>
  <div>
    <comHeader></comHeader>
    <div class="dgj-container pt65">
      <p v-if="lastLoginDateStr" class="last-login"><span class="fz43">您上次登录时间：</span><span class="pr5" v-text="lastLoginDateStr"></span><span v-text="lastLoginAddress"></span></p>
      <div class="main-container">
        <theAside></theAside>
      <keep-alive>
          <router-view></router-view>
      </keep-alive>  
      </div>
    </div>
    <comFooter></comFooter>
  </div>
</template>

<script>
 import theAside from './aside'
  export default {
    data() {
      return {
        msg: '2018-3-10 20:12:32 中国 广东 广州'
      }
    },
    computed:{
      lastLoginAddress(){
        return this.$store.getters.userInfo.lastLoginAddress;
      },
      lastLoginDateStr(){
        return this.$store.getters.userInfo.lastLoginDateStr;
      }
    },
    components:{theAside}
  }
</script>
<style lang="scss" scoped>
  .last-login{
    line-height: 35px;
    height: 35px;
    font-size: 12px;
    color: #8e9395;
    .fz43{
      color:#43484a;
    }
  }

  .pt65{
    padding-top: 65px;
  }
  .main-container{
    background-color: #fff;
  }
</style>
