<template>
  <div>
    <canvas id="can2" width="1400" height="1730"></canvas>
  </div>
</template>
<script>
  export default {
    props:['data','num','showNum'],
    data () {
      return {
        msg: 'hello World！',
        ctx:'',
        canvas:'',
        //10位数5个号码  6位数3个号码 11位数5个号码 10位数4个号码
        //10位数5个号码  6位数3个号码 11位数5个号码 10位数4个号码
        move:[{x:21,y:30},{x:58.5,y:30},{x:19,y:30},{x:26.3,y:30}],
        //10位数 5个号码
        move1:[{x:351,y:85},{x:562,y:85},{x:774,y:85},{x:986,y:85},{x:1199,y:85}],
        //6位数 3个号码
        move2:[{x:310,y:85},{x:664,y:85},{x:1018,y:85}],
        //11位数 5个号码
        move3:[{x:331,y:85},{x:542,y:85},{x:754,y:85},{x:966,y:85},{x:1179,y:85}],
        //10位数 4个号码
        move4:[{x:353,y:85},{x:618,y:85},{x:883,y:85},{x:1148,y:85}]
      }
    },
    mounted(){
      let can1 = document.getElementById("can2");
      let ctx = can1.getContext("2d");
      this.canvas = can1;
      this.ctx = ctx;
      this.canvasinit();
    },
    watch:{
      'data'(now,old){
        this.canvasinit();
      }
    },
    methods:{
      canvasinit(){
        this.clearCanvas();
        if(this.num==5){
          if(this.showNum==10){
            for ( let i = 0; i < this.move1.length; i++ ) {
              this.drawLine(this.getnum(this.move1.length-i), this.move1[i]);
            }
          }else if(this.showNum==11){
            for ( let i = 0; i < this.move3.length; i++ ) {
              this.drawLine(this.getnum(this.move3.length-i), this.move3[i]);
            }
          }
        }else if(this.num==3){
          for ( let i = 0; i < this.move2.length; i++ ) {
            this.drawLine(this.getnum(this.move2.length-i), this.move2[i]);
          }
        }else if(this.num==4){
          for ( let i = 0; i < this.move4.length; i++ ) {
            this.drawLine(this.getnum(this.move4.length-i), this.move4[i]);
          }
        }

      },
      //绘制折线
      drawLine(nums,move){

        let ctx = this.ctx;
        let obj = {};
        if(this.num==5){
          if(this.showNum==10){
            //10位数5个号码
            obj = this.move[0];
          }else{
            //11位数5个号码
            obj = this.move[2];
          }
        }else if(this.num==3){
          //6位数3个号码
          obj = this.move[1];
        }else if(this.num==4){
          //10位数4个号码
          obj = this.move[3];
        }
        for (let i = 0;i < nums.length-1;i ++){
          //起始坐标
          let numsY = move.y + i*obj.y;
          let numsX = move.x+nums[i]*obj.x;
          //终止坐标
          let numsNY = move.y + (i+1)*obj.y;
          let numsNX = move.x + nums[i+1]*obj.x;
          ctx.beginPath();
          ctx.moveTo(numsX,numsY);
          ctx.lineTo(numsNX,numsNY);
          ctx.lineWidth = 2;
          ctx.strokeStyle = "#409EFF";
          ctx.closePath();
          ctx.stroke();
        }
      },
      //清屏
      clearCanvas(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        this.canvas.height=this.canvas.height;
      },
      getnum(num){
        let numdata = [];
        for (let i = 0; i < this.data.length; i++) {
          numdata.push(this.data[i].openCode[this.num-num]);
        }
        return numdata;
      },
    }
  }
</script>
<style lang="scss" scoped>
  .pt60{
    padding-top: 60px;
  }
  .can1{
    border: none;
  }
</style>
