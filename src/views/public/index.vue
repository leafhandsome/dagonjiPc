<template>
  <div>
    <comHeader></comHeader>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        msg: 'public'
      }
    }
  }
</script>
<style scoped>

</style>
