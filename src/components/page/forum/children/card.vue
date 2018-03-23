<style scoped>
    .main{
      /*height: 100%;*/
    }
    .mu-infinite-scroll{
      padding-bottom: 0;
    }
  #itemScoll{
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    position: relative;
    user-select: none;

  }
  .search{
    position: fixed;
    top: 56px;
    font-size: 16px;
    width: 100%;
    display: flex;
    border-bottom: solid 1px #eee;
    padding-top: 8px;
    padding-right: 10px;
    background-color: #fff;

  }
 .mu-text-field {

      width: 100%;
      min-height: 48px;
      display: inline-block;
      color: rgba(0,0,0,.54);
      margin-bottom: 0;
    }
  .list{
    margin-top: 50px;
  }

  .setext{
    width: 80px;
    display: flex;
    z-index: 999;
    padding-left: 10px;
    align-items: center;
  }

    .setext p{
      border: solid 1px #009688;
      color: #009688;
      border-radius: 5px;
      padding-left: 5px;
      padding-right: 5px;
      padding-top: 2px;
      padding-bottom: 2px;
    }
    .setext p:hover{
      background-color: rgba(0,0,0,0.3);
    }
</style>
<template>
  <div class="main" id="itemScoll">
    <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
    <div class="search">
      <mu-text-field hintText="根据帖子标题搜索"  icon="search" v-model="searchText" @input="changeText(searchText)"/>
      <span class="setext" @click="search"><p>搜索</p></span>
    </div>

    <forum-lall :listForum="listForum" class="list"></forum-lall>
    <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
  </div>
</template>
<script>
  import forumLall from "@/components/page/forum/forumcom/forumLall"
  export default {
    data () {
      return {
         listForum:[],
         loading: false,
         scroller: null,
         refreshing: false,
         trigger: null,
         totalPage:0,
         startPage:1,
         searchText:"",
      }
    },
    mounted:function () {
       this.startPage=1;
      this.refreshing = true;
       this.getdata(this.startPage);
    },
    methods: {
      refresh () {
        this.refreshing = true;
        this.listForum = [];
        this.startPage=1;
        this.getdata(1);
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
      changeText:function (text) {
        console.log("aaaa")
        console.log(text);
        console.log(this.searchText);
        if(text==""){
          this.getdata(1);
        }
      },
      search:function () {
        let self = this;
        self.listForum=[];
        var url =self.path+ 'findTopicList.json'+'?token='+self.token+"&pageSize=10&page="+1+"&fdPinked=2&docSubject="+self.searchText;
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
          self.scroller = document.getElementById("itemScoll");
          self.trigger = document.getElementById("itemScoll");
        }, (response) => {
          console.log('error');
        });

      },
      getdata:function(page){
        let self = this;
        var url =self.path+ 'findTopicList.json'+'?token='+self.token+"&pageSize=10&page="+page+"&fdPinked=2";
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
          self.scroller = document.getElementById("itemScoll");
          self.trigger = document.getElementById("itemScoll");
        }, (response) => {
          console.log('error');
        });

      }
    },


    components: {
      forumLall
    }
  }
</script>
