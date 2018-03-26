<template>
    <div class="pt50">
      <comdeveloping :page="msg"></comdeveloping>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        msg: '体育在线'
      }
    },
    mounted(){
//      this.$router.push({name:'developing',params:{page:this.msg}})
    },

  }
</script>
<style scoped>

</style>
