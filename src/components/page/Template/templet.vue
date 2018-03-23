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

</style>

<template>

  <div class="main">
    <div class="header">
          <mu-appbar title="PPT模板" style="text-align: center">
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
          <mu-sub-header>月度例会PPT模板</mu-sub-header>
            <mu-list-item  v-for="item in data" :title="item.fileName"  v-if="item.type=='201'" @click="goItem(item)">
                <mu-avatar :src="imgP" slot="leftAvatar"/>
                <mu-icon value="get_app" slot="right" @click.stop="download(item.fileUrl+'.'+item.fileType,item.fileName)"/>
            </mu-list-item>
        </mu-list>
        <mu-divider/>
        <mu-list>
          <mu-sub-header>讨论型PPT模板</mu-sub-header>
          <mu-list-item  v-for="item in data" :title="item.fileName"  v-if="item.type=='202'" @click="goItem(item)">
            <mu-avatar :src="imgP" slot="leftAvatar"/>
            <mu-icon value="get_app" slot="right" @click.stop="download(item.fileUrl+'.'+item.fileType,item.fileName)"/>
          </mu-list-item>
        </mu-list>
        <mu-divider/>

        <mu-list>
          <mu-sub-header>HR类PPT模板</mu-sub-header>
          <mu-list-item  v-for="item in data" :title="item.fileName"  v-if="item.type=='203'" @click="goItem(item)">
            <mu-avatar :src="imgP" slot="leftAvatar"/>
            <mu-icon value="get_app" slot="right" @click.stop="download(item.fileUrl+'.'+item.fileType,item.fileName)"/>
          </mu-list-item>
          <mu-divider/>
        </mu-list>
    </div>

  </div>
</template>
<script>
  import p from "@/assets/icon/p.jpg"
  export default {
    data () {
      return {
        imgP:p,
        dialog:false,
        refreshing:false,
        trigger: null,
        pdfshow:false,
        transitionName: 'slide-left',
        data:[]
      }
    },

    mounted:function () {
      this.refreshing = true;
      this.getdata(2);
    },
    watch: {
    },
      methods: {
      refresh:function () {
        this.refreshing=true;
        this.getdata(2);
      },
        goItem:function (item) {
          localStorage.setItem("contion", JSON.stringify(item));
          this.$router.push({ path: "fileitem",query: {token:this.token} });
        },
        getdata:function (type) {
          let self = this;
          var url =self.path+ "findKnowledge.json"+'?token='+self.token+"&fileLangType=1&type="+type;
          console.log(url);
          self.$http.get(url
          ).then((response) => {
            console.log(response);
            self.refreshing = false;
            self.trigger = document.getElementById("scoll");
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
        download:function (url,name) {
          console.log(url);
          window.location.href = this.path+"downloadFile.json"+"?token="+this.token+"&fFileUrl=http://video.sunwoda.com/"+url+"&fileName="+name
        }
    }
  }
</script>

