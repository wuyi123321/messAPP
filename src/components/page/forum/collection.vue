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
    <div class="header">
    <mu-appbar :title="title" style="text-align: center">
      <mu-icon-button icon="navigate_before" slot="left" @click="back"/>
      <mu-icon-button icon="aaa" slot="right"/>
    </mu-appbar>
    </div>

    <div class="conter" id="scollL">
      <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
      <mu-dialog :open="dialog" title="删除收藏"  @close="dialog=false">
        您确定删除该收藏吗？
        <mu-flat-button slot="actions" @click="dialog=false" primary label="取消"/>
        <mu-flat-button slot="actions" primary @click="deleteItem" label="确定"/>
      </mu-dialog>
      <div class="forumList">
        <div v-for="(item, n) in listForum" class="forumItem" @click="toItem(item.fdModelId,item.docSubject)">
        <div class="title">
          <mu-avatar slot="left" icon="assignment_ind" backgroundColor="#ddd" :size="30"/>
          <span>{{item.fdPosterName}}</span>
          <span style="color: #888">{{item.docCreateTimeStr}}</span>
          <span style="color: #888;padding:15px " @click.stop="delet(item.fdId,n)" >删除</span>
        </div>
        <div class="content">
          <span class="artitle" style="color: #009688;padding-right: 10px">{{item.docSubject}}</span>
          {{item.docSummary}}
          <!--<span style="color: #0000ff">详情>></span>-->
        </div>
        </div>
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
        isCon:"",
        deletId:"",
        deletPiont:-1,
        dialog:false,
      }
    },
    mounted:function () {
      this.refreshing = true;
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
      delet:function (id,n) {
         this.deletId = id;
         this.deletPiont=n;
         this.dialog = true;
      },
      deleteItem:function () {
        let self = this;
        var url =self.path+ 'deleteCollection.json'+'?token='+self.token+"&collectionFdId="+self.deletId;
        console.log(url);
        self.$http.get(url
        ).then((response) => {
          console.log(response);

          if(response.data.statusCode !=0){
            alert("操作失败");
            return 0
          }
          this.listForum.splice(self.deletPiont,1);
          self.dialog = false;
        }, (response) => {
          console.log('error');
        });
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
        var url =self.path+ 'findCollection.json'+'?token='+self.token+"&pageSize=10&page="+page+"&userNo="+self.pNo;
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
      toItem:function(id,title){
        let self = this;
        this.$router.push({ path: "forumItem",query: {id:id,fdHitCount:0,title:title,token:self.token} });
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
