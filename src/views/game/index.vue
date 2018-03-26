<template>
  <div>
    <comHeader></comHeader>
    <div class="dgj-container">
      <h1>{{ msg }}</h1>
      <div class="main-container clearfix">
        <theAside class="game-left"></theAside>
        <router-view class="game-right"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import theAside from './aside'
  export default {
    data () {
      return {
        msg: '彩票页！'
      }
    },
    components:{theAside},
  }
</script>
<style scoped>
  .game-left{
    float: left;
  }
  .game-right{
    float: right;
  }
</style>
