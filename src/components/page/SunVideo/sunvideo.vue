<style scoped>
 .main{
   display: flex;
   flex-direction: column;
 }
  .header{
    height: 56px;
  }
 .footer{
   box-sizing: border-box;
   border-top: solid 1px #eee;
 }
  .conter{
    width: 100%;
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    position: relative;
    user-select: none;
  }

 .vidoItem{
   margin-bottom: 10px;
   width: 100%;
   min-height: 200px;
   position: relative;
   overflow: hidden;
   background-color: #666;
 }
 .vidoItem:last-child{
   margin-bottom: 0;
 }
  .vidoTitle{
    position: absolute;
    top: 0;
    left: 0;
    height: 40px;
    width: 100%;
    background-color: rgba(0,0,0,0.3);
    color: #ffff;
    line-height: 40px;
    font-size: 0.3rem;
    border-bottom: solid 1px #888;
    padding-left: 10px;

  }
  .vidoPlay{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    line-height: 0;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 0.18rem;
  }
 .vidoTime{
   position: absolute;
   right: 5px;
   bottom: 5px;
   background-color: rgba(0,0,0,0.3);
   color: #fff;
   padding: 3px;
   border-radius: 8px;
 }

  .videoit{
    margin-top:3px;
    display: flex;
    margin-bottom: 10px;
    padding-left: 15px;
  }
 .videoit .left{
   width: 35vw;
   height: 90px;
   background-color: #ddd;
   border-radius: 5px;
   overflow: hidden;
   position: relative;

 }
 .videoit .left span{
   position: absolute;
   bottom: 5px;
   right: 5px;
   background-color: #555555;
   padding-top: 2px;
   padding-bottom: 2px;
   padding-left: 5px;
   padding-right: 5px;
   font-size: 0.2rem;
   color: #fff;
   border-radius: 5px;
 }
 .videoit .right{
   flex:1;
   display: flex;
   flex-direction: column;
 }
 .videoit .right>div{
   color: #757575;
 }

</style>
<template>
  <div class="main">
    <div class="header">
        <mu-appbar title="欣旺达视频" style="text-align: center">
          <mu-icon-button icon="navigate_before" slot="left" @click="back"/>
          <mu-icon-menu icon="more_vert" slot="right" style="opacity: 0">
          </mu-icon-menu>
        </mu-appbar>
    </div>
    <div class="conter" id="scoll">
      <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
          <div class="videoit" v-for="item in data" @click="toPlay(item.fileUrl,item.fileType)" >
            <div class="left">
              <!--<video id="mainvideo"   height="100%"  :src="'http://video.sunwoda.com/'+item.fileUrl+'.'+item.fileType" ></video>-->
              <span>{{item.fdVideoLength}}</span>
              <div class="vidoPlay">
                  <mu-icon value="arrow_right" :size="48"/>
              </div>
            </div>
            <div class="right" style="margin-left: 15px">
              <div style="height: 50%;font-size: 0.28rem;color: #000">{{item.fileName}}</div>
              <div>文件大小:{{item.fileSize}}</div>
              <div>上传时间:{{item.fUpdateDateStr}}</div>

            </div>
          </div>
          <!--<div class="vidoItem"  v-for="item in data" @click="toPlay(item.fileUrl,item.fileType)" >-->
            <!--<div class="videobox" style="position: absolute;top: 0;left: 0" >-->
              <!--<video id="mainvideo"  width="100%" height="100%"  :src="'http://video.sunwoda.com/'+item.fileUrl+'.'+item.fileType" ></video>-->
            <!--</div>-->
            <!--<div class="vidoTitle">{{item.fileName}}</div>-->
            <!--&lt;!&ndash;<img :src="img1" width="100%" height="100%">&ndash;&gt;-->
            <!--<div class="vidoPlay">-->
              <!--<mu-icon value="arrow_right" :size="48"/>-->
            <!--</div>-->
            <!--<div class="vidoTime">-->
              <!--{{item.fdVideoLength}}-->
            <!--</div>-->
          <!--</div>-->
      <mu-dialog :open="dialog" title="提示信息">
        格式不支持在线播放，请在OA论坛模块观看
        <mu-flat-button label="确定" slot="actions" primary @click="dialog=false"/>
      </mu-dialog>
    </div>
    <div class="footer">
        <mu-bottom-nav :value="bottomNav" @change="handleChange">
          <mu-bottom-nav-item value="recents" title="宣传类" icon="settings_voice"/>
          <mu-bottom-nav-item value="favorites" title="记录类" icon="theaters"/>
          <mu-bottom-nav-item value="nearby" title="校招类" icon="school"/>
          <mu-bottom-nav-item value="nex" title="团队纪念" icon="group"/>
        </mu-bottom-nav>
    </div>
  </div>
</template>
<script>

  export default {
    data () {
      return {
        dialog:false,
        bottomNav: 'recents',
        refreshing:false,
        trigger: null,
        data:[]
      }
    },

    mounted:function () {
      this.refreshing = true;
      this.getdata(301);

    },
    methods: {
      refresh:function () {
        this.refreshing=true
        if(this.bottomNav == "recents"){
          this.getdata(301);
        }
        if(this.bottomNav == "favorites"){
          this.getdata(302);
        }
        if(this.bottomNav == "nearby"){
          this.getdata(303);
        }
        if(this.bottomNav == "nex"){
          this.getdata(304);
        }
      },
      back:function () {
        this.$router.go(-1)
      },
      getdata:function (type) {
        let self = this;
        var url =self.path+ "findKnowledge.json"+'?token='+self.token+"&fileLangType=1&type="+type;
        console.log(url);
        self.$http.get(url
        ).then((response) => {
          self.refreshing = false;
          console.log(response);

          self.trigger = document.getElementById("scoll");
          self.data = response.data.dataInfo.listData;
          if(response.data.statusCode != 0){
            alert("暂无数据");
            return 0
          }
        }, (response) => {
          console.log('error');
        });
      },
      toPlay:function (path,type) {
        console.log(type);
        if(type!='mp4' && type!='mov'){
          this.dialog = true
          return 0
        }
        var url= 'http://video.sunwoda.com/'+path+'.'+type;
        this.$router.push({ path: "videoPlay",query: {url:url} });
      },
      handleChange (val) {
        this.bottomNav = val;
        this.data = [];
        this.refreshing=true
        if(val == "recents"){
          this.getdata(301);
        }
        if(val == "favorites"){
          this.getdata(302);
        }
        if(val == "nearby"){
          this.getdata(303);
        }
        if(val == "nex"){
          this.getdata(304);
        }
      }
    }
  }
</script>
