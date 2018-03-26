<template>
    <div class="nav">
      <ul>
        <li class="aside">
          <div @click="aside('ssc')" :class="{active:isshow=='ssc'}"><span>时时彩</span></div>
          <ul class="game" :class="{active:isshow=='ssc'}">
            <li @click="aside('ssc')"><router-link to="/game/gamecqssc">重庆时时彩</router-link></li>
            <li @click="aside('ssc')"><router-link to="/game/gamexjssc">新疆时时彩</router-link></li>
          </ul>
        </li>
        <li class="aside">
          <div @click="aside('gpc')" :class="{active:isshow=='gpc'}"><span>高频彩</span></div>
          <ul class="game" :class="{active:isshow=='gpc'}">
            <li @click="aside('gpc')"><router-link to="/game/gamecqssc">某某高频彩</router-link></li>
            <li @click="aside('gpc')"><router-link to="/game/gamexjssc">某某高频彩</router-link></li>
          </ul>
        </li>
      </ul>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                msg: 'hello World！',
                isshow:'ssc',
            }
        },
      methods:{
        aside(arg){
            this.isshow = arg;
        }
      }

    }
</script>
<style scoped>
  .nav{
    width: 120px;
  }
  .nav li{
    display: block;
  }
  .nav li a{
    display: inline-block;
    padding: 10px 20px;
    height: 100%;
    text-align: center;
    text-decoration: none;
    color:#666666;
  }
  .nav li .game:hover{
    color: #ff3f4c;
  }
  .nav li .game .active{
    color: #ff3f4c;
  }

  .nav .aside{
    background-color: #f9f5ee;
    cursor: pointer;
    border-bottom: 1px dashed #898989;
  }
  .nav .aside:hover .game{
    display: block;
  }
  .nav li .game{
    display: none;
  }
  .nav li .game.active{
    display: block;
  }
  .aside>div.active{
    background-color: #ffb8c1;
  }
</style>
