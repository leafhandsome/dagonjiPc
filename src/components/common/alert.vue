<template>
  <div class="modal-mask" v-show="settings.show">
    <div class="mask"></div>
    <div class="modal-confirm">
      <h2 class="confirm-header">
        <i class="iconfont el-icon-warning"></i> {{ settings.title }}
      </h2>
      <div class="confirm-content">
        {{ settings.content }}
      </div>
      <div class="confirm-btns">
        <button class="btn btn-primary" @click="op(2)">确 定</button>
      </div>
    </div>
  </div>
</template>
<script >
  export default{
    props: ['settings'],
    data(){
      return{
        show: false,
        onCancel: false,
        onOk: false,
        title: '',
        content: ''
      }
    },
    methods: {
      op(type){
        this.settings.show = false
        if(type == '1'){
          if(this.onCancel) this.onCancel()
        }else{
          if(this.onOk) this.onOk()
        }

        this.onCancel = false
        this.onOk = false

        document.body.style.overflow = ''
      },
    }
  }
</script>

<style lang="scss" scoped>
  .modal-mask{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(55,55,55,.6);
    z-index: 5000;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal-confirm{
    width: 420px;
    box-sizing: border-box;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 6px;
    h2 {
      font-size: 18px;
    }
    .iconfont{
      color: #e6a23c;
    }
  }
  .confirm-content {
    padding:20px 0;

  }
  .confirm-btns{
    text-align: right;
    .btn {
      display: inline-block;
      margin-bottom: 0;
      font-weight: 500;
      text-align: center;
      cursor: pointer;
      border: 1px solid #409EFF;
      white-space: nowrap;
      line-height: 1.5;
      padding: 2px 14px;
      font-size: 14px;
      border-radius: 6px;
      -webkit-user-select: none;
      user-select: none;
      color: #fff;
      background-color: #409EFF;
    }
  }
  @media only screen and (max-width: 640px) {
    .modal-confirm{
      width: 100%;
      margin: 0 20px;
      padding: 10px 20px;
    }
  }
  .modal-enter, .modal-leave {
    opacity: 0;
  }
  .modal-transition{
    transition: all .3s ease;
  }

  .modal-enter .modal-confirm,
  .modal-leave .modal-confirm {
    transform: scale(1.1);
  }
  .modal-transition{
    transition: all .3s ease;
  }
</style>
