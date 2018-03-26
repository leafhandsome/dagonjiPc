<template>
  <div class="index-xtgg pt50">
    <div v-loading="fullscreenLoading" class="mt20 dgj-container i-xtgg clearfix">
      <div class="xtgg-left bgcfff bz">
        <h1 class="biaoqi">公告</h1>
        <div class="i-xt-l-box">
          <ul class="i-xt-l-items bz">
            <li v-for="(item,index) in notices" :class="{unread:item.isread=='1'}"><a @click="getcontent(item)" :class="{active:active_notice.id==item.id}" href="javascript:;"><span class="xtgg-left-time" v-html="formatYYMMDD(item.createDate,10)">2017-12-05</span>
              <el-tooltip :enterable="false" :content="item.title" placement="top">
                <span v-html="formattitle(item.title,7)"></span>
              </el-tooltip>
            </a>
            </li>
          </ul>
          <p>
            <a class="click_more" v-show="currentPage<totalPages" @click="noticesMore">查看更多</a>
            <a class="click_more" v-show="currentPage>=totalPages && notices.length>0 ">到底了哦</a>
          </p>
        </div>
      </div>
      <div class="xtgg-right bgcfff">
        <h2 class="biaoqi bz" v-html="active_notice.title"></h2>
        <div class="xtgg-content bz">
          <p v-show="notices.length>0">尊敬的用户：</p>
          <div v-html="active_notice.content">
          </div>
          <div class="tar" v-html="active_notice.createDate">2017年9月6日星期二</div>
        </div>
      </div>
    </div>
    <comFooter></comFooter>
  </div>
</template>

<script>
  import utils from '@/common/js/utils';
  export default {
    data () {
      return {
        msg: '公告中心！',
        currentPage:1,
        totalPages:1,
        active_notice:{},
        notices:[],
        fullscreenLoading:true
      }
    },
    mounted(){
    /*if(this.$store.getters.token){
        this.$store.commit('set_announcement_badge',false)
      }*/
      this.$api.noticeList({}).then(res=>{
        if(res.result){
          this.notices = res.data.items;
          this.getcontent(res.data.items[0])
          this.currentPage = res.data.currentPage;
          this.totalPages = res.data.totalPages;
        }else{
          this.remoteLogin(res);
        }
        this.fullscreenLoading = false;
      })
    },
    methods:{
      getcontent(item){
        if(this.active_notice.id == item.id)return;
        this.fullscreenLoading = true;
        this.$api.noticeDetail({id:item.id}).then(res=>{
          if(res.result){
            this.active_notice = res.data;
          }else{
            this.remoteLogin(res);
          }
          this.fullscreenLoading = false;
        })
      },
      formattitle(title,length){
        if(title.length>length){
          title = title.slice(0,length)+'…';
        }
        return title;
      },
      formatYYMMDD(date,length){
          return utils.formatYYMMDD(date,length);
      },
      noticesMore(){
        if(this.currentPage<this.totalPages){
          this.fullscreenLoading = true;
          this.$api.noticeList({pageIndex:this.currentPage+1}).then(res=>{
            if(res.result){
              this.notices = this.notices.concat(res.data.items);
              this.currentPage = res.data.currentPage;
              this.totalPages = res.data.totalPages;
            }else{
              this.remoteLogin(res);
            }
            this.fullscreenLoading = false;
          })
        }
      }
    }

  }
</script>
<style lang="scss" scoped>
  .index-xtgg {
    background-color: #f2f6f9;
  .bgcfff {
    background-color: #fff;
  }

  .i-xtgg {
    margin-top: 20px;
    margin-bottom: 20px;

  .biaoqi {
    text-align: center;
    font-weight: bold;
    font-size: 16px;
    color: #43484a;
    padding: 25px 20px;
  }

  .xtgg-left {
    float: left;
    height: 750px;
    width: 240px;


    .i-xt-l-box{
      height: 660px;
      overflow: auto;
      margin-bottom: 10px;
      &>p{
          text-align: center;
        }
      .click_more{
        display: inline-block;
        color:#1a95f2;
        cursor: pointer;
        text-align: center;
        line-height: 20px;
        border-bottom: 1px solid #1a95f2;
       }
    }
  .i-xt-l-items {
    border-left: 4px solid #f1f5f8;

    margin-right: 2px;
    margin-left: 10px;

  li {
    position: relative;
    margin-bottom: 10px;
    height: 30px;
    line-height: 30px;
  &.unread::before{
     position: absolute;
     right: 8px;
     top: 12px;
     content: '';
     width: 6px;
     height: 6px;
     -webkit-border-radius: 50%;
     -moz-border-radius: 50%;
     border-radius: 50%;
     background-color: #ff6662;

   }

  a {
    position: relative;
    padding: 0 10px;
    font-size: 14px;
    color: #909090;

  &.active {
     font-weight: bold;
     color: #43484a;
   }

  &.active::after {
     position: absolute;
     left: -4px;
     content: '';
     width: 4px;
     height: 30px;
     -webkit-border-radius: 2px;
     -moz-border-radius: 2px;
     border-radius: 2px;
     background-color: #1a95f2;
   }
  .xtgg-left-time {
    display: inline-block;
    margin-right: 6px;
  }
  }
  }
  }

  }
  .xtgg-right {
    float: right;
    min-height: 750px;
    width: 955px;
    border-left: 3px solid #f2f6f9;

  h2 {
    width: 100%;
    border-bottom: 1px solid #ebebeb;
    padding-bottom: 20px;
  }
  .xtgg-content{
    font-size: 14px;
    color:#43484a;
    padding: 25px;
    width: 100%;
  &>p{
      margin-bottom: 30px;
    }

  .tar{
    margin-top: 100px;
    text-align: right;
  }

  }

  }
  }
  }
</style>
