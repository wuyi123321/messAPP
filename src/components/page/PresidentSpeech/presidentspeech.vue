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
  .titleclass{
    border-bottom: solid 1px #eee;
  }
  .Tclass{
    background-color: #eee;
  }
</style>

<template>
  <div class="main">
    <div class="header">
      <mu-appbar title="管理者思想集" style="text-align: center">
        <mu-icon-button icon="navigate_before" slot="left" @click="back"/>
        <mu-icon-menu icon="more_vert" slot="right" style="opacity: 0">
        </mu-icon-menu>
      </mu-appbar>
    </div>
    <div id="scoll">
      <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
      <mu-dialog :open="dialog" title="提示信息">
        暂时不支持此格式在线预览

        <mu-flat-button label="确定" slot="actions" primary @click="dialog=false"/>
      </mu-dialog>
      <mu-list>

        <mu-list-item title="对外致辞" toggleNested :open="false">
          <mu-list-item slot="nested" title="面向客户"  titleClass="Tclass" nestedListClass="titleclass" toggleNested :open="false"  style="background-color:#eee;border-bottom: solid #fff 1px">
            <mu-list-item slot="nested" v-for="item in data" style="background-color: #fff;border-bottom: solid 1px #eee" :title="item.fTitle" :describeText="item.fileName" v-if="item.type=='605'" @click="goItem(item)">
              <mu-avatar :src="imgW" slot="leftAvatar" v-if="item.fileType == 'doc' || item.fileType == 'docx'"/>
              <mu-avatar :src="imgP" slot="leftAvatar" v-if="item.fileType == 'ppt' || item.fileType == 'pptx'"/>
              <mu-avatar :src="imgPdf" slot="leftAvatar" v-if="item.fileType == 'pdf'"/>
              <mu-icon value="get_app" slot="right" @click.stop="download(item.fileUrl+'.'+item.fileType,item.fileName)"/>
            </mu-list-item>
          </mu-list-item>

          <mu-list-item slot="nested" title="面向学校"  style="background-color:#eee;border-bottom: solid #fff 1px" toggleNested :open="false">
            <mu-list-item slot="nested" v-for="item in data" :title="item.fTitle" style="background-color: #fff;border-bottom: solid 1px #eee"  :describeText="item.fileName" v-if="item.type=='606'" @click="goItem(item)">
              <mu-avatar :src="imgW" slot="leftAvatar" v-if="item.fileType == 'doc' || item.fileType == 'docx'"/>
              <mu-avatar :src="imgP" slot="leftAvatar" v-if="item.fileType == 'ppt' || item.fileType == 'pptx'"/>
              <mu-avatar :src="imgPdf" slot="leftAvatar" v-if="item.fileType == 'pdf'"/>
              <mu-icon value="get_app" slot="right" @click.stop="download(item.fileUrl+'.'+item.fileType,item.fileName)"/>
            </mu-list-item>
          </mu-list-item>

          <mu-list-item slot="nested" title="面向政府"  style="background-color:#eee;border-bottom: solid #fff 1px" toggleNested :open="false">
            <mu-list-item slot="nested" v-for="item in data" :title="item.fTitle" style="background-color: #fff;border-bottom: solid 1px #eee"  :describeText="item.fileName" v-if="item.type=='607'" @click="goItem(item)">
              <mu-avatar :src="imgW" slot="leftAvatar" v-if="item.fileType == 'doc' || item.fileType == 'docx'"/>
              <mu-avatar :src="imgP" slot="leftAvatar" v-if="item.fileType == 'ppt' || item.fileType == 'pptx'"/>
              <mu-avatar :src="imgPdf" slot="leftAvatar" v-if="item.fileType == 'pdf'"/>
              <mu-icon value="get_app" slot="right" @click.stop="download(item.fileUrl+'.'+item.fileType,item.fileName)"/>

            </mu-list-item>
          </mu-list-item>


          <mu-list-item slot="nested" title="面向商会"  style="background-color:#eee;border-bottom: solid #fff 1px" toggleNested :open="false">
            <mu-list-item slot="nested" v-for="item in data" :title="item.fTitle" style="background-color: #fff;border-bottom: solid 1px #eee" :describeText="item.fileName" v-if="item.type=='608'" @click="goItem(item)">
              <mu-avatar :src="imgW" slot="leftAvatar" v-if="item.fileType == 'doc' || item.fileType == 'docx'"/>
              <mu-avatar :src="imgP" slot="leftAvatar" v-if="item.fileType == 'ppt' || item.fileType == 'pptx'"/>
              <mu-avatar :src="imgPdf" slot="leftAvatar" v-if="item.fileType == 'pdf'"/>
              <mu-icon value="get_app" slot="right" @click.stop="download(item.fileUrl+'.'+item.fileType,item.fileName)"/>

            </mu-list-item>
          </mu-list-item>

        </mu-list-item>

      </mu-list>
      <mu-divider/>
      <mu-list>
        <mu-list-item title="内部讲话" toggleNested :open="false">

          <mu-list-item slot="nested" title="节日致辞" toggleNested :open="false" style="background-color:#eee;border-bottom: solid #fff 1px">
            <mu-list-item slot="nested" v-for="item in data" :title="item.fTitle" :describeText="item.fileName" style="background-color: #fff;border-bottom: solid 1px #eee" v-if="item.type=='604'" @click="goItem(item)">
              <mu-avatar :src="imgW" slot="leftAvatar" v-if="item.fileType == 'doc' || item.fileType == 'docx'"/>
              <mu-avatar :src="imgP" slot="leftAvatar" v-if="item.fileType == 'ppt' || item.fileType == 'pptx'"/>
              <mu-avatar :src="imgPdf" slot="leftAvatar" v-if="item.fileType == 'pdf'"/>
              <mu-icon value="get_app" slot="right" @click.stop="download(item.fileUrl+'.'+item.fileType,item.fileName)"/>
            </mu-list-item>
          </mu-list-item>
          <mu-list-item slot="nested" title="会议讲话" toggleNested :open="false" style="background-color:#eee;border-bottom: solid #fff 1px">
            <mu-list-item slot="nested" v-for="item in data" :title="item.fTitle" :describeText="item.fileName" style="background-color: #fff;border-bottom: solid 1px #eee" v-if="item.type=='602'" @click="goItem(item)">
              <mu-avatar :src="imgW" slot="leftAvatar" v-if="item.fileType == 'doc' || item.fileType == 'docx'"/>
              <mu-avatar :src="imgP" slot="leftAvatar" v-if="item.fileType == 'ppt' || item.fileType == 'pptx'"/>
              <mu-avatar :src="imgPdf" slot="leftAvatar" v-if="item.fileType == 'pdf'"/>
              <mu-icon value="get_app" slot="right" @click.stop="download(item.fileUrl+'.'+item.fileType,item.fileName)"/>
            </mu-list-item>
          </mu-list-item>
        </mu-list-item>

      </mu-list>
      <mu-divider/>

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
        data:[]
      }
    },
    mounted:function () {
      this.refreshing=true;
      this.getdata(6);

    },
    methods: {
      getdata:function (type) {
        let self = this;
        var url =self.path+ "findKnowledge.json"+'?token='+self.token+"&fileLangType=1&type="+type;
        console.log(url);
        self.$http.get(url
        ).then((response) => {
          console.log(response);
          self.refreshing=false;
          self.trigger = document.getElementById("scoll");
          if( response.data.dataInfo){
            self.data = response.data.dataInfo.listData;
          }

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
        this.getdata(6);
      },
      back:function () {
        this.$router.go(-1)
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
      goItem:function (item) {
        localStorage.setItem("contion", JSON.stringify(item));
        this.$router.push({ path: "fileitem",query: {token:this.token} });
      },
      download:function (url,name) {
        console.log(url);
        window.location.href = this.path+"downloadFile.json"+"?token="+this.token+"&fFileUrl=http://video.sunwoda.com/"+url+"&fileName="+name
      }
    }
  }
</script>

