<style scoped>
  .forumItem{
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 10px;
    padding-bottom: 5px;
    font-size: 0.25rem;
    border-bottom: solid 10px #eee;
  }

  .forumItem .title{
     height: 30px;
     display: flex;
     align-items: center;
   }
  .forumItem .content{
    padding-top: 5px;
    padding-bottom: 10px;
  }
   .forumItem .title span{
     padding-left: 15px;
   }
  .forumItem .bottom span{
    color: #888;
    padding-right: 10px;
  }
</style>
<template>
  <div class="main">

    <div v-if="listForum.length==0" style="height: 50px;border-bottom: solid 1px #eee;text-align: center;line-height: 50px">
      暂无帖子
    </div>
    <div  v-for="item in listForum"  @click="toforumItem(item.fdId,item.fdHitCount,item.docSubject)">
        <div class="forumItem">
           <div class="title">
             <mu-avatar slot="left" icon="assignment_ind" backgroundColor="#ddd" :size="30"/>
             <span>{{item.fdPosterName}}</span>
             <span style="color: #888">{{item.docCreateTimeStr}}</span>
           </div>
          <div class="content">
            <span class="artitle" style="color: #009688;padding-right: 10px">{{item.docSubject}}</span>
           {{item.docSummary}}
            <!--<span style="color: #0000ff">详情>></span>-->
          </div>
          <div class="bottom">
            <span>阅读{{item.fdHitCount}}</span><span>回复{{item.fdReplyCount}}</span>
            <!--<span>收藏50</span>-->
          </div>
        </div>

    </div>
  </div>
</template>
<script>

  export default {
    props:{
      listForum:Array
    },
    data () {
      return {
      }
    },
    mounted:function () {
       console.log(this.listForum);
    },
    methods: {
      toforumItem:function (id,fdHitCount,title) {
        let self = this;

        this.$router.push({ path: "forumItem",query: {id:id,fdHitCount:fdHitCount,title:title,token:self.token} });
      }
    }
  }
</script>
