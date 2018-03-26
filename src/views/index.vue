<template>
    <div class="dgj-index">
      <comHeader></comHeader>
      <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'hello',
        data () {
            return {
                msg: '首页index！'
            }
        }
    }
</script>
<style lang="scss" scoped>

</style>
