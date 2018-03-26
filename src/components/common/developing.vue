<template>
  <div>
    <div class="notfound clearfix">
      <div class="nfl fl">
        <h1>开发中</h1>
        <p class="nf-title">您访问的<span>{{page}}</span>页面正在开发中，敬请期待…</p>
        <p class="nf-tcontent">对不起，您访问的页面正在开发中。请返回首页或联系客服</p>
        <p class="nf-btn"><a href="javascript:;" @click="$router.push({path:'/index/index'})">返回首页</a><a href="javascript:;">联系客服</a></p>
      </div>
      <div class="nfr fl">
        <img src="~assets/img/index/dev.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        msg: 'developing~~~',
      }
    },
    props:['page'],
    mounted(){
    },
    methods:{
      goback(){
        this.$router.push({path:'/index/index'});
      },

    }
  }
</script>
<style lang="scss" scoped>
    .notfound{
      text-align: center;
      width:1200px;
      margin: 0 auto;
      margin-top: 150px;
      color:#7f7f7f;
      font-size: 12px;
      .nfl{
        width: 600px;
        height: 410px;
        margin-top: 50px;
        text-align: left;
        padding-left: 100px;

        h1{
          font-size: 80px;
          font-weight: bold;
          color:#bfc3c9;
          margin-bottom: 35px;
        }
        .nf-title{
          font-size: 21px;
          color: #43484a;
          margin-bottom: 19px;
          span{
            color:#1a95f2;
            padding: 0 5px;
          }
        }
        .nf-tcontent{
          color:#a5a5a5;
        }
        .nf-btn{
          a{
            width: 94px;
            height: 31px;
            line-height: 31px;
            text-align: center;
            color:#ffffff;
            -webkit-border-radius: 15px;
            -moz-border-radius: 15px;
            border-radius: 15px;
            background-color: #1a95f2;
            margin-top: 30px;
            margin-right: 20px;
            &:hover{
               box-shadow: 1px 2px 10px 0px #1a95f2;
            }
            &:nth-child(2){
              background-color: #62c832;
              &:hover{
                 box-shadow: 1px 2px 10px 0px #62c832;
              }
             }
          }
        }

      }
      .nfr{
        width: 410px;
        height: 410px;
        img{
          width: 410px;
          height: 410px;
        }
      }
    }

</style>
