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

  .footer{
    border-top: solid 1px #eee;
    height: 57px;
  }
 .mu-buttom-item{
   min-width: 30px;
 }
  .addforum{
    width: 100%;
    height: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    top: 56px;
    background-color: #fffefe;
    border-bottom: solid 1px #eee;
    padding-top: 12px;
    padding-left: 12px;
    padding-right: 12px;
  }
 /*.mu-paper-1 {*/
   /*box-shadow: 0 0px 0px rgba(0,0,0,.117647), 0 1px 0px rgba(0,0,0,.117647);*/
 /*}*/
</style>
<template>
  <div class="main">
    <div class="header">

      <!--<div style="background-color: #009688;height: 20px"></div>-->
    <mu-appbar title="知识共享社区" style="text-align: center">
      <!--<mu-icon-button icon="navigate_before" slot="left" @click="closePage"/>-->
      <!--<mu-icon-button icon="aaa" slot="right"  />-->
    </mu-appbar>
    </div>
    <div class="conter" id="scoll">
      <!--<div class=></div>-->
      <mu-toast v-if="toast" :message="toastMess" @close="hideToast"/>
      <router-view :data="data" style="height: 100%"></router-view>
      <div v-show="addForum" class="addforum">
        <div style="color: #9e9e9e">
          选择模块
        </div>
        <div style="display: flex">
        <mu-select-field v-model="game1"   @change="changemodel">
          <mu-menu-item v-for="text,index in data" :key="index"  :value="index" :title="text.fdName" />
        </mu-select-field>
         <span style="width: 20px;height:36px;display: flex;justify-content: center;align-items: center">
         ——
         </span>
        <mu-select-field v-model="game2" :labelFocusClass="['label-foucs']" style="padding-left: 5px">
          <mu-menu-item v-for="text,index in list" :key="index" :value="text.fdId" :title="text.fdName" />
        </mu-select-field>
        </div>
        <mu-text-field label="帖子标题" labelFloat fullWidth v-model="fourmTitle"/>
        <mu-text-field label="帖子内容" labelFloat multiLine :rows="6" fullWidth v-model="fourmContent"/>
        <mu-raised-button class="demo-raised-button" label="发表" labelPosition="before" icon="cloud_upload" backgroundColor="#009688" @click="subForum"/>
      </div>
    </div>
    <div class="footer">
        <mu-bottom-nav :value="bottomNav" @change="handleChange">
          <mu-bottom-nav-item value="forummessage" title="智库" icon="collections_bookmark"/>
          <mu-bottom-nav-item value="forumcount" title="论坛" icon="group"/>
          <div class="mu-buttom-item" style="display: flex; flex-direction: column;justify-content:center;align-items: center;" @click="addForums">
           <mu-icon  :value="addicon" style="padding-right: 8px;padding-left: 8px;padding-top: 3px;padding-bottom: 3px;background-color:#009688;border-radius: 5px;color: #fff"/>
          </div>
          <mu-bottom-nav-item value="forumcard" title="发现" icon="explore"/>
          <mu-bottom-nav-item value="myforum" title="我的" icon="perm_identity"/>
        </mu-bottom-nav>
    </div>
  </div>
</template>
<script>

  export default {
    data () {
      return {
        toastMess:"操作成功",
        toast:false,
        fourmTitle:"",
        fourmContent:"",
        game1: 1,//模块的信息
        game2:"",//子模块信息
        list: [],//子模块内容数组
        bottomNav: 'forumcount',//默认底下路由
        addicon:"add",//中间图标信息
        addForum:false,//添加模块显示
        data:[]
      }
    },
    mounted:function () {
      console.log(this.$router);
      //根据路由判断底下标签
      var a =this.$router.history.current.path;
      var b =a.replace('/',"");
      console.log(b);
      this.bottomNav = b;
      this.getdata("findCategory.json");

    },

    methods: {
      showToast (mess) {
        this.toastMess = mess;
        this.toast = true;
        if (this.toastTimer) clearTimeout(this.toastTimer)
        this.toastTimer = setTimeout(() => { this.toast = false }, 2000)
      },
      closePage:function () {
        console.log("aaa");
        this.setupWebViewJavascriptBridge(function(bridge) {
            bridge.callHandler('popViewWithJsCall');
        });
      },
      setupWebViewJavascriptBridge:function(callback) {
        if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
        if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
      },
      hideToast () {
        this.toast = false
        if (this.toastTimer) clearTimeout(this.toastTimer)
      },
//  修改模块信息获取后面的内容
      changemodel:function (val) {
        console.log(val);
        this.game2 = "";
        this.list = this.data[val].cList
      },
//    添加帖子按钮 添加组建的出现和隐藏
      addForums:function () {
        console.log("aaa");
        let self = this;
        if(self.addForum == true){
          self.addicon ="add";
          Velocity($(".addforum"), "slideUp",{duration:300,complete: function() {self.addForum = false;}});
        }else {
          this.addicon ="remove";
          this.addForum = true;
          Velocity($(".addforum"), "slideDown",{duration:300});
          this.game1 = 0;
          this.list = this.data[this.game1].cList;
          console.log(this.data[this.game1]);
        }
      },
//      帖子提交事件
      subForum:function () {
         var self = this;
        var pram = {
          token:self.token,
          docSubject:self.fourmTitle,
          docSummary:self.fourmContent,
          docContent:"<p>"+self.fourmContent+"</p>",
          fdForumId:self.game2
        };
        $.ajax({
          url: self.path+"addTopic.json",
          dataType: "json",
          data: pram,
          type: "post",
          success: function(data) {
           console.log(data);
           if(data.statusCode ==0){
             self.showToast(data.message);
             self.game2 = "";
             self.fourmTitle = "";
             self.fourmContent = "";
           }else {
             self.showToast(data.message);
           }
          },
          error: function() {

          }
        });
      },
//      获取初始数据/论坛的板块信息
      getdata:function(path){
        let self = this;
        var url =self.path+ path+'?token='+self.token;
        console.log(url);
        self.$http.get(url
        ).then((response) => {
          console.log(response);
          if(response.data.statusCode !=0){
            alert("暂无数据");
            return 0
          }
          self.data = response.data.dataInfo.listData;
        }, (response) => {
          console.log('error');
        });
      },
//      底下模块更换进行路由更换
      handleChange (val) {
        let self = this;
        this.bottomNav = val;
        if(this.addForum ==true){
          this.addForums();
        }
        this.$router.replace({ path: val+'?token='+self.token});

      }
    }
  }
</script>
