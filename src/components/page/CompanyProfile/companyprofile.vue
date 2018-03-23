<style scoped>
  .main{
    height: 100vh;
    display: flex;
    flex-direction: column;
     }
  .main header{
    height: 104px;
  }
  .flex-demo{
    height: 48px;
    line-height: 48px;
    text-align: center;
    overflow: hidden;
  }
  #ref{
    width: 100%;
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    position: relative;
    user-select: none;
  }
  .mu-tabs{
    background-color: #fff;
  }
  .mu-tab-text{
    color: #009866;
  }

 #aa .mu-tab-link-highlight{
    background-color: #009866;
  }
  #aa .mu-tab-link-highlight{
    background-color: #009866;
  }


</style>
<template>

  <div class="main" id="aa">
    <header>

        <mu-appbar title="公司简介" style="text-align: center">
          <mu-icon-button icon="navigate_before" slot="left" @click="back"/>
          <mu-icon-menu icon="more_vert" slot="right">
            <mu-menu-item title="中文"/>
            <mu-menu-item title="英文"/>
          </mu-icon-menu>
        </mu-appbar>
        <mu-tabs :value="activeTab" @change="handleTabChange">
          <mu-tab value="tab1" title="公司简介" style="color: #009688"/>
          <mu-tab value="tab2" title="各事业部简介" style="color: #009688"/>
        </mu-tabs>
        <mu-divider/>

    </header>
    <div id="ref">
      <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
      <mu-dialog :open="dialog" title="提示信息">
        暂时不支持此格式在线预览
        <mu-flat-button label="确定" slot="actions" primary @click="dialog=false"/>
      </mu-dialog>
      <div v-if="activeTab === 'tab1'">
          <mu-list>
            <mu-sub-header>政府受众</mu-sub-header>
            <mu-list-item  v-for="item in data" :title="item.fTitle" :describeText="item.fileName" v-if="item.type=='1000'" @click="goItem(item)">
              <mu-avatar :src="imgW" slot="leftAvatar" v-if="item.fileType == 'doc' || item.fileType == 'docx'"/>
              <mu-avatar :src="imgP" slot="leftAvatar" v-if="item.fileType == 'ppt' || item.fileType == 'pptx'"/>
              <mu-avatar :src="imgPdf" slot="leftAvatar" v-if="item.fileType == 'pdf'"/>
              <mu-icon value="get_app" slot="right" @click.stop="download(item.fileUrl+'.'+item.fileType,item.fileName)"/>
            </mu-list-item>
          </mu-list>
          <mu-divider/>
          <mu-list>
            <mu-sub-header>客户受众</mu-sub-header>
            <mu-list-item  v-for="item in data" :title="item.fTitle" v-if="item.type=='1001'" @click="goItem(item)">
              <mu-avatar :src="imgW" slot="leftAvatar" v-if="item.fileType == 'doc' || item.fileType == 'docx'"/>
              <mu-avatar :src="imgP" slot="leftAvatar" v-if="item.fileType == 'ppt' || item.fileType == 'pptx'"/>
              <mu-avatar :src="imgPdf" slot="leftAvatar" v-if="item.fileType == 'pdf'"/>
              <mu-icon value="get_app" slot="right" @click.stop="download(item.fileUrl+'.'+item.fileType,item.fileName)"/>
            </mu-list-item>
          </mu-list>
          <mu-divider/>
      </div>
      <div v-if="activeTab === 'tab2'">
          <mu-list>
          <!--<mu-sub-header>政府受众</mu-sub-header>-->
          <div v-for="item in data" v-if="item.type!='1000' && item.type!='1001' " @click="goItem(item)">
            <mu-list-item  :title="item.fTitle" :describeText="item.fileName" >
              <mu-avatar :src="imgW" slot="leftAvatar" v-if="item.fileType == 'doc' || item.fileType == 'docx'"/>
              <mu-avatar :src="imgP" slot="leftAvatar" v-if="item.fileType == 'ppt' || item.fileType == 'pptx'"/>
              <mu-avatar :src="imgPdf" slot="leftAvatar" v-if="item.fileType == 'pdf'"/>
              <mu-icon value="get_app" slot="right" @click.stop="download(item.fileUrl+'.'+item.fileType,item.fileName)"/>
            </mu-list-item>
            <mu-divider/>
          </div>
        </mu-list>

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
        activeTab: 'tab1',
        data:[]
      }
    },
    mounted:function () {
      this.refreshing=true;
      this.getdata(1);
    },
    methods:{
      back:function () {
        this.$router.go(-1)
      },
      refresh:function () {
        this.refreshing=true;
        this.data = [];
        this.getdata(1);
      },
      getdata:function (type) {
        let self = this;
        var url =self.path+ "findKnowledge.json"+'?token='+self.token+"&fileLangType=1&type="+type;
        console.log(url);
        self.$http.get(url
        ).then((response) => {
          console.log(response);
          self.refreshing=false;
          self.trigger = document.getElementById("ref");
          if(response.data.dataInfo){
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
      goItem:function (item) {
        localStorage.setItem("contion", JSON.stringify(item));
        this.$router.push({ path: "fileitem",query: {token:this.token} });
      },
      handleTabChange (val) {
        this.activeTab = val
      },
      showPdf:function (type,path,title) {
        console.log(type);
        var url =   'https://video.sunwoda.com/'+path+'.'+type;
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
