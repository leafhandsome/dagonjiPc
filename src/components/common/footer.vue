<template>
  <div class="dgj-container-fluid footer">
    <div class="dgj-footer footer-top">
      <ul class="dgj-container clearfix">
        <li><a href="##">关于大公鸡</a></li>
        <li><a href="##">常见问题</a></li>
        <li><a href="##">责任博彩</a></li>
        <li><a href="##">隐私政策</a></li>
        <li><a href="##">条款与规则</a></li>
        <li><a class="remove-after" href="##">声明</a></li>
      </ul>
    </div>
    <div class="dgj-footer footer-btm">
      <div class="dgj-container">
        <p>版权所有&reg;2012-2018大公鸡</p>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        msg: 'footer尾部！'
      }
    },
    methods: {

    }
  }
</script>
<style lang="scss" scoped>
  .footer{

    .dgj-footer{
      width: 100%;
      text-align: center;
      width:100%;
    }

    .footer-top{
      height: 48px;
      line-height: 48px;
      background-color: #1a222e;

      ul{

        li{

          display: inline-block;

        a{
          position: relative;
          display: block;
          color:#aeaeae;
          padding: 0 15px;

          &:hover{
            color:#ffffff;
           }

          &::after{
            content: '|';
             position: absolute;
             right: -3px;
             font-size: 12px;
             top: 0;
             color:#aeaeae;
           }

           &.remove-after::after{
              content: '';
            }
        }
        }
      }


    }

    .footer-btm{
      background-color: #000000;
      height: 45px;
      line-height: 45px;
      color: #ffffff;
      font-size: 12px;
    }
  }




</style>
