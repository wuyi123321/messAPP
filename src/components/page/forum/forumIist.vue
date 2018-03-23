<style scoped>
 .main{
   display: flex;
   flex-direction: column;
 }
  .header{
    height: 56px;
  }
  .conter{
    width: 100%;
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    position: relative;
    user-select: none;
  }
 .mu-infinite-scroll{
   padding-bottom: 0;
 }
</style>
<template>
  <div class="main">
    <div class="header">
    <mu-appbar :title="title" style="text-align: center">
      <mu-icon-button icon="navigate_before" slot="left" @click="back"/>
      <mu-icon-button icon="aaa" slot="right"/>
    </mu-appbar>
    </div>
    <div class="conter" id="scollL">
      <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
      <div class="forumList">
         <forumLall :listForum="listForum"></forumLall>
      </div>
      <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
    </div>
  </div>
</template>
<script>
import forumLall from "@/components/page/forum/forumcom/forumLall"
  export default {

    data () {
      return {
        title:"文化活动",
        listForum:[],
        fdid:"",
        pNo:"",
        loading: false,
        scroller: null,
        refreshing: false,
        trigger: null,
        totalPage:0,
        startPage:1,
        isCon:""
      }
    },
    mounted:function () {
      this.refreshing = true;
      this.fdid  = this.$route.query.id;
      this.title = this.$route.query.name;
      this.pNo = this.$route.query.pNo;
      this.token = this.$route.query.token;
      this.getdata(this.startPage);
    },
    methods: {
      refresh:function () {
        this.refreshing = true;
        this.listForum = [];
        this.startPage=1;
        this.getdata(this.startPage);
      },
      loadMore () {
        console.log("aaaa");
        this.loading = true;
        if(this.startPage<this.totalPage){
          this.startPage++;
          this.getdata(this.startPage)
        }else {
          this.loading = false;
        }
      },

      getdata:function(page){
        let self = this;
        var url;
       if(self.fdid){
          url =self.path+ 'findTopicList.json'+'?token='+self.token+"&pageSize=10&page="+page+"&fdPinked=2&fdForumId="+self.fdid;
        }else {
          url =self.path+ 'findTopicList.json'+'?token='+self.token+"&pageSize=10&page="+page+"&fdPinked=2&fdPosterId="+self.pNo;
        }
        console.log(url);
        self.$http.get(url
        ).then((response) => {
          console.log(response);
          self.loading = false;
          self.refreshing = false;
          if(response.data.statusCode !=0){
            alert("暂无数据");
            return 0
          }
          self.totalPage = response.data.dataInfo.pageInfo.totalPage;
          self.listForum =  self.listForum.concat(response.data.dataInfo.listData);
          self.scroller = document.getElementById("scollL");
          self.trigger = document.getElementById("scollL");
        }, (response) => {
          console.log('error');
        });

      },
      back:function () {
        this.$router.go(-1)
      },
    },
    components: {
      forumLall
    }
  }
</script>
