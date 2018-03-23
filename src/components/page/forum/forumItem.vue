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
  .forumItem{
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 12px;
    padding-right: 12px;
    border-bottom: solid #eee 10px;
  }
 .forumItem .top{
   display: flex;
 }
 .forumItem .top .avatar{
   width: 50px;
   display: flex;
   justify-content: center;
   align-items: center;
 }
 .forumItem .top .tmes{
   flex: 1;
   padding-left: 5px;
 }
 .forumItem .top .title{
   font-size: 0.30rem;
 }
 .forumItem .top .tidis{
   font-size: 0.22rem;
   color: #999;
 }
 .forumItem .content{
   margin-top: 10px;
   margin-bottom: 10px;
 }

 .forumItem .file{
  display: flex;
   align-items: center;
   color: #009688;
   margin-bottom: 10px;
 }
 .forumItem .file span{
   padding-left: 10px;
   text-decoration-line: underline;
 }
.bottom{
    display: flex;
    justify-content: center;
    align-items: center;
  }
 .bottom>div{
   flex: 1;
   color: #9e9e9e;
   display: flex;
   justify-content: center;
   align-items: center;
   font-size: 0.3rem;
 }
 .comment{
   padding-left: 12px;
   padding-right: 12px;
   padding-top: 10px;
   padding-bottom: 10px;
 }
 .comment .comtitle{
   font-size: 0.28rem;
 }
 .comment .com_item{
   margin-top: 10px;
 }
 .comment .com_item .com_itemtop{
   display: flex;
   align-items: center;
 }
 .comment .com_item .com_itemtop span{
   padding-left: 10px;
   min-width: 60px;
   text-wrap: none;
   text-overflow: ellipsis;
 }
 .comment .com_item  .com_itemcontent{
   margin-top: 10px;
   margin-bottom: 10px;
   text-indent:0.5rem;
 }
 .main .mu-popup {
   width: 100%;
   background-color: #ffffff;
 }
 .mu-text-field.has-label{
   width: 100%;
 }

  .popbottom{
    display: flex;
    justify-content: flex-end;
    background-color: #009688;
    padding: 5px
  }
 .popbottom span{
   font-size: 0.28rem;
   color: #fff;
   padding: 5px;
   padding-left: 10px;
   padding-right: 10px;
   margin-right: 5px;
   border: solid 1px #eeeeee;
   border-radius: 5px;
 }

 .popbottom span:hover{
   background-color: rgba(0,0,0,0.4);
 }
</style>
<template>
  <div class="main">
    <div class="header">

    <mu-appbar :title="title" style="text-align: center">
      <mu-icon-button icon="navigate_before" slot="left" @click="back"/>
    </mu-appbar>
    </div>
    <mu-dialog :open="dialog" title="删除评论"  @close="dialog=false">
      您确定删除该条评论吗？
      <mu-flat-button slot="actions" @click="dialog=false" primary label="取消"/>
      <mu-flat-button slot="actions" primary @click="deleteItem" label="确定"/>
    </mu-dialog>
    <div class="conter" id="scoll">
      <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
      <div class="forumItem">
          <div class="top">
            <div class="avatar"><mu-avatar slot="left" icon="assignment_ind" backgroundColor="#ddd" :size="40"/></div>
            <div class="tmes">
              <div class="title">
                <span style="color: #009688;padding-right: 10px">{{card.fdName}}</span>
                {{card.docSubject}}</div>
              <div class="tidis">{{card.docAlterTimeStr}} 阅读：{{card.fdHitCount}} 收藏：{{card.fdCollectionCount}} </div>
            </div>
          </div>
          <div class="content" v-html="card.docContent">
          </div>
          <div class="file" v-for="i in card.cList">
            <mu-icon value="insert_drive_file"/>
            <span>{{i.fdFileName}}</span>
          </div>
          <div class="bottom">
            <div @click="thumbUp(card.fdId,0)"><mu-icon value="thumb_up"/>{{card.docApproveCount}}</div>
            <div @click="addCollection(card.fdId,card.docSubject)" v-if="card.fdCollectionCountByUser ==0">
              <mu-icon value="favorite"/>{{card.fdCollectionCount}}
            </div>
            <div @click="addCollection(1,1)"  v-else style="color:#d56">
              <mu-icon value="favorite"/>{{card.fdCollectionCount}}
            </div>
            <div @click="open('主帖',card.fdId,card.docSubject,0)"><mu-icon value="sms" /></div>
          </div>
      </div>

      <mu-popup position="bottom" popupClass="demo-popup-bottom" :open="bottomPopup" @close="close()">
        <div class="popbottom">
          <span @click="close()">取消</span>
          <span @click="subReForum">发表</span>
        </div>
        <mu-content-block>
          <mu-text-field label="添加回复" :hintText="retap" v-model="recont"/>
        </mu-content-block>
      </mu-popup>
      <div class="comment" id="comment">
              <div class="comtitle">评论（{{comments.length}}）</div>
              <div class="com_item" v-for="(item,n) in comments">
                      <div class="com_itemtop">
                        <mu-avatar slot="left" icon="assignment_ind" backgroundColor="#ddd" :size="30"/>
                        <span>{{item.fdName}}</span>
                        <span style="color: #999">回复</span>
                        <span>{{item.pName}}</span>
                        <span style="color: #888">{{item.docCreateTimeStr}}</span>
                        <!--<span style="color: #9e9e9e"><mu-icon value="remove_circle_outline"/></span>-->
                      </div>
                      <div class="com_itemcontent">
                        <div style="background-color: #eeeeee" v-if="item.pName">{{item.pName}}:{{item.pDocSummary}}</div>
                        {{item.docSummary}}
                      </div>
                <div class="bottom">
                  <div><mu-icon value="remove_circle_outline" @click="openDel(item.fdId,n)" v-if="personNo==item.fdPosterId"/></div>
                  <div>
                    <mu-icon value="thumb_up" @click="thumbUp(item.fdId,n+1)"/>{{item.docApproveCount}}
                  </div>
                  <div><mu-icon value="sms" @click="open(item.fdName,card.fdId,card.docSubject,item.fdId,item.docSummary)"/></div>
                </div>
                <mu-divider/>
              </div>
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    data () {
      return {
        dialog:false,
        retap:"",
        bottomPopup: false,
        title:"帖子详情",
        refreshing:false,
        trigger: null,
        fdHitCount:"",
        fdid:"",
        dataAll:[],
        card:{},//帖子
        comments:[],//评论
        reId:"",
        redocSubject:"",
        recont:"",
        personNo:"",//我的OA号信息
        reto:"",//回复的类型0--回复主帖  id--回复id
        retoName:"",//回复对象人  "" --回复主帖
        pDocSummary:"",
        deleteT:{
          id:"",
          n:-1
        }
      }
    },
    mounted:function () {
      this.fdid = this.$route.query.id;
      this.fdHitCount = this.$route.query.fdHitCount;
//      this.title = this.$route.query.title;
      this.refreshing = true;
      this.getData();
      this.getPermess();
    },
    methods: {
//item---回复人reid---回复id  docSubject---回复主题,reTo --- 回复类型,docSummary --- 回复信息
      open (item,reid,docSubject,reTo,docSummary) {
        this.reto = reTo;
        this.retap = "回复"+item;
        if(item == "主帖"){
          this.retoName = "";
        }else {
          this.retoName = item;
        }
        this.pDocSummary = docSummary;
        this.reId = reid;
        this.redocSubject ="RE:"+docSubject
        this.bottomPopup  = true
      },
//      获取本人信息（核对是否能删除回复）
      getPermess:function(){
        let self = this;
          var url =self.path+ 'findUserPost.json'+'?token='+self.token+"&userNo="+localStorage.getItem("userNo");
          console.log(url);
          self.$http.get(url
          ).then((response) => {
            console.log(response);
            self.personNo = response.data.dataInfo.listData[0].fdId
            if(response.data.statusCode !=0){
              alert("暂无数据");
              return 0
            }
          }, (response) => {
            console.log('error');
          });
      },
      close (position) {
        this.bottomPopup = false
      },
      openDel:function(id,n){
         this.dialog = true;
         this.deleteT.id = id;
         this.deleteT.n = n;
      },
      deleteItem:function () {
        let self = this;
        var url =self.path+ 'deleteForumPost.json'+'?token='+self.token+"&fdId="+self.deleteT.id;
        self.$http.get(url).then((response) => {
          console.log(response);
          if(response.data.statusCode == 0){
           self.comments.splice(self.deleteT.n,1);
           self.dialog = false;
          }
        }, (response) => {
          console.log('error');
        });
      },
      addCollection:function (fid,title) {
        let self = this;
        if(fid == 1){

          return 0;
        }
        var url =self.path+ 'addCollection.json'+'?token='+self.token+"&fdId="+fid+"&docSubject="+title;
        self.$http.get(url).then((response) => {
          console.log(response);
          if(response.data.statusCode == 0){
            self.card.fdCollectionCount++;
            self.card.fdCollectionCountByUser = 1;
          }
        }, (response) => {
          console.log('error');
        });
      },
      subReForum:function () {
        let self = this;
        var url;
        if( self.recont ==""){
          return 0;
        }
        if(self.reto == 0){
          url =self.path+ 'addForumPost.json'+'?token='+self.token+"&fdTopicId="+self.reId+"&docSubject="+
            self.redocSubject+"&docSummary="+self.recont+"&docContent="+"<p>"+self.recont+"</p>";
        }else {
          url =self.path+ 'addForumPost.json'+'?token='+self.token+"&fdTopicId="+self.reId+"&fdId="+self.reto+"&docSubject="+
            self.redocSubject+"&docSummary="+self.recont+"&docContent="+"<p>"+self.recont+"</p>";
        }
         self.$http.get(url).then((response) => {
          console.log(response);
          if(response.data.statusCode == 0){
            self.bottomPopup = false;
            self.recont = "";
//            self.$router.go(0);
            response.data.dataInfo.listData[0].fdName = localStorage.getItem("userName");
            response.data.dataInfo.listData[0].pName = self.retoName;
            response.data.dataInfo.listData[0].pDocSummary = self.pDocSummary;
            self.comments =self.comments.concat(response.data.dataInfo.listData);

          }
        }, (response) => {
          console.log('error');
        });
      },
      thumbUp:function (fid,i) {
        let self = this;
        var url =self.path+ 'thumbUp.json'+'?token='+self.token+"&fdId="+fid;
        self.$http.get(url).then((response) => {
            console.log(response);
          self.dataAll[i].docApproveCount = parseInt(self.dataAll[i].docApproveCount) + response.data.extData
            }, (response) => {
              console.log('error');
            });
      },
      getData:function () {
        let self = this;
        var url =self.path+ 'findForumPostList.json'+'?token='+self.token+"&pageSize=100&page=1&fdTopicId="+self.fdid;
        console.log(url);
        self.$http.get(url
        ).then((response) => {
          console.log(response);
          self.trigger = document.getElementById("scoll");
          self.refreshing = false;
          self.dataAll = response.data.dataInfo.listData;
          self.card =  self.dataAll[0];
          self.card .docContent = self.card .docContent.replace(/src="/g ,'style="width:30vw;height:30vw;display:block;" src="http://ekp.sunwoda.com');
          if(self.dataAll.length>0){
            for(var i =1;i<self.dataAll.length;i++){
              self.comments.push(self.dataAll[i])
            }
          }
          console.log(self.card);
          console.log(self.comments);
          if(response.data.statusCode !=0){
            alert("暂无数据");
            return 0
          }
        }, (response) => {
          console.log('error');
        });
      },
      refresh:function () {
        this.refreshing=true;
        this.getData();
      },
      back:function () {
        this.$router.go(-1)
      },
    }
  }
</script>
