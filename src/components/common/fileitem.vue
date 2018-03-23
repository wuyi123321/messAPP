<style scoped>
  .main{
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .header{
    height: 56px;
  }
  #scoll{
    width: 100%;
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    position: relative;
    user-select: none;
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
      <mu-appbar :title="item.fileName" style="text-align: center">
        <mu-icon-button icon="navigate_before" slot="left" @click="back"/>
        <mu-icon-menu icon="more_vert" slot="right" style="opacity: 0">
        </mu-icon-menu>
      </mu-appbar>
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
    <mu-dialog :open="dialogdlete" title="删除评论"  @close="dialogdlete=false">
      您确定删除该条评论吗？
      <mu-flat-button slot="actions" @click="dialogdlete=false" primary label="取消"/>
      <mu-flat-button slot="actions" primary @click="deleteItem" label="确定"/>
    </mu-dialog>

    <div id="scoll">
      <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
      <mu-dialog :open="dialog" title="提示信息">
        暂时不支持此格式在线预览
        <mu-flat-button label="确定" slot="actions" primary @click="dialog=false"/>
      </mu-dialog>
      <mu-list>
        <mu-list-item  :title="item.fTitle" :describeText="item.fileName" style="background-color: #eee;" @click="showPdf(item.fileType,item.fileUrl,item.fileName)">

          <mu-avatar :src="imgW" slot="leftAvatar" v-if="item.fileType=='doc' || item.fileType == 'docx'"/>
          <mu-avatar :src="imgP" slot="leftAvatar" v-if="item.fileType=='ppt' || item.fileType == 'pptx'"/>
          <mu-avatar :src="imgPdf" slot="leftAvatar" v-if="item.fileType=='pdf'"/>

          <mu-icon value="get_app" slot="right" @click.stop="download(item.fileUrl+'.'+item.fileType,item.fileName)"/>
        </mu-list-item>
      </mu-list>
      <div class="bottom">
        <div></div>
        <div></div>
        <div @click="showreplay(item.fid)"><mu-icon value="sms" /></div>
      </div>
      <mu-divider/>
      <div class="comment" id="comment">
        <div class="comtitle">评论（{{comments.length}}）</div>

        <div class="com_item" v-for="(item,n) in comments" :key="n">
          <div class="com_itemtop">
            <mu-avatar slot="left" icon="assignment_ind" backgroundColor="#ddd" :size="30"/>
            <span>{{item.fdPeplierName}}</span>
            <span style="color: #999">回复</span>
            <span>{{item.pFdName}}</span>
            <span style="color: #888" v-if="item.docCreateTimeStr">{{item.docCreateTimeStr.substring(0,17)}}</span>
            <!--<span style="color: #9e9e9e"><mu-icon value="remove_circle_outline"/></span>-->
          </div>

          <div class="com_itemcontent">
            <div style="background-color: #eeeeee" v-if="item.pFdName">{{item.pFdName}}:{{item.pFdReplyContent}}</div>
            <div  v-html="item.fdReplyContent"></div>
          </div>
          <div class="bottom">
            <div></div>
            <div><mu-icon value="remove_circle_outline" @click="openDel(item.fdId)" v-if="item.userNo ==  userNo"/></div>
            <div><mu-icon value="sms" @click="showreplay(item.fdId,item.fdPeplierName)"/></div>
          </div>
          <mu-divider/>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import w from "@/assets/icon/w.jpg"
  import p from "@/assets/icon/p.jpg"
  import s from "@/assets/icon/s.jpg"
  import pdf from "@/assets/icon/pdf.png"
  export default {
    data () {
      return {
        imgP:p,
        imgW:w,
        imgS:s,
        imgPdf:pdf,
        dialog:false,
        refreshing:false,
        trigger: null,
        pdfshow:false,
        item:{},
        bottomPopup:false,
        recont:"",
        retap:'回复主贴', //底下会根据“回复主贴判断”
        comments:[],
        replayid:"",//回复id
        dialogdlete:false,
        userNo:"", //登录人工号
        deleteId:""    //删除的id

      }
    },
    mounted:function () {
      this.refreshing = true;
      var vm =this;
      vm.item = JSON.parse(localStorage.getItem("contion"));
      vm.userNo = localStorage.getItem("userNo");
      console.log(vm.item);
      this.getdata(vm.item.fid);
    },
    watch: {
    },
    methods: {
      showreplay:function(replayid,userName){
        this.bottomPopup = true;
        console.log(replayid);
        this.replayid = replayid;
        if(userName){
          this.retap =  "回复"+userName;
        }
      },
//      打开删除信息，传入id
      openDel:function (id) {
        this.dialogdlete = true;
        this.deleteId = id;
      },

      close (position) {
        this.bottomPopup = false;
        this.retap =  "回复主贴";
      },
      refresh:function () {
        this.refreshing=true;
        this.getdata(this.item.fid);
      },

//      获取文件的评论信息
      getdata:function (fid) {
        let self = this;
        var url =self.path+ "findReply.json"+'?token='+self.token+"&fileId="+fid;
        console.log(url);
        self.$http.get(url
        ).then((response) => {
          console.log(response);
          self.refreshing = false;
          self.trigger = document.getElementById("scoll");
          if(response.data.dataInfo){

            self.comments= response.data.dataInfo.listData;

          }
          if(response.data.statusCode !=0){

            return 0
          }
        }, (response) => {
          console.log('error');
        });
      },
      back:function () {
        this.$router.go(-1)
      },
      subReForum:function () {

        let self = this;
        if(self.retap ==  "回复主贴"){//回复主题
          var url =self.path+ "replyFile.json"+'?token='+self.token+"&fileId="+self.item.fid + "&docContent=<p>"+self.recont+"</p>";
          console.log(url);
          self.$http.get(url
          ).then((response) => {
            console.log(response)
            if(response.data.statusCode == 0){
              self.bottomPopup = false;
              self.getdata(self.item.fid);
            }
          }, (response) => {
            console.log('error');
          });
        }else {
          var url =self.path+ "reply.json"+'?token='+self.token+"&fileId="+self.item.fid + "&docContent=<p>"+self.recont+"</p>"+"&replyId="+self.replayid;
          console.log(url);
          self.$http.get(url
          ).then((response) => {
            console.log(response)
            if(response.data.statusCode == 0){
              self.bottomPopup = false;
              self.getdata(self.item.fid);

            }
          }, (response) => {
            console.log('error');
          });
        }

      },
      deleteItem:function () {
        let self = this;
        var url =self.path+ "deleteReply.json"+'?token='+self.token+"&replyId="+self.deleteId ;
        console.log(url);
        self.$http.get(url
        ).then((response) => {
          console.log(response)
          if(response.data.statusCode == 0){
            self.dialogdlete = false
            self.getdata(self.item.fid);
          }
        }, (response) => {
          console.log('error');
        });
      },
      showPdf:function (type,path,title) {
        console.log(type);
        var url = 'https://video.sunwoda.com/'+path+'.'+type;
        if(type=='pdf'){
          this.$router.push({ path: "pdfRead",query: {url:url,title:title} });
        }else {
          this.dialog = true;
        }
      },
      download:function (url,name) {
        console.log(url);
        window.location.href = this.path+"downloadFile.json"+"?token="+this.token+"&fFileUrl=http://video.sunwoda.com/"+url+"&fileName="+name
      }
    }
  }
</script>

