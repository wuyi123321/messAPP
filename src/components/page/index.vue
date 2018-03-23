<style scoped>
  .line_demo{
    display: flex;
  }
  .flex-demo{
    flex: 1;
    height: 33vw;
    margin-left: 0;
    border-bottom: solid 1px #eee;
    border-right: solid 1px #eee;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .flex-demo:hover{
    background: #ddd;
  }
  .flex-demo:last-child{
    border-right: none;
  }
  .flex-demo .demo_name{
    margin-top: 5px;
    font-size: 0.26rem;
  }
</style>
<template>
  <div class="zhuye">
    <mu-appbar title="知识共享社群" style="text-align: center">
    </mu-appbar>
    <div class="line_demo">
      <div class="flex-demo" @click="hrefTo('CompanyProfile')">
        <mu-icon value="chrome_reader_mode" :size="30" color="#009688"/>
        <span class="demo_name">公司简介</span>
      </div>
      <div class="flex-demo" @click="hrefTo('Templet')">
        <mu-icon value="open_in_browser" :size="30" color="#009688"/>
        <span class="demo_name">PPT模板</span>
      </div>
      <div class="flex-demo" @click="hrefTo('SunVideo')">
        <mu-icon value="group_work" :size="30" color="#009688"/>
        <span class="demo_name">欣旺达视频</span>
      </div>
    </div>
    <div class="line_demo">
      <div class="flex-demo" @click="hrefTo('Gallery')">
        <mu-icon value="photo" :size="30" color="#009688"/>
        <span class="demo_name">图库</span>
      </div>
      <div class="flex-demo" @click="hrefTo('LearnResource')">
        <mu-icon value="book" :size="30" color="#009688"/>
        <span class="demo_name">学习资源</span>
      </div>
      <div class="flex-demo" @click="hrefTo('PresidentSpeech')">
        <mu-icon value="perm_camera_mic" :size="30" color="#009688"/>
        <span class="demo_name">总裁致辞</span>
      </div>
    </div>
    <div class="line_demo">
      <div class="flex-demo" @click="hrefTo('ProcessManagement')">
        <mu-icon value="assignment" :size="30" color="#009688"/>
        <span class="demo_name">阅读</span>
      </div>
      <div class="flex-demo" @click="hrefTo('forum')">
        <mu-icon value="group" :size="30" color="#009688"/>
        <span class="demo_name">OA论坛</span>
      </div>
      <div class="flex-demo" style="border: none">

      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {

      }
    },
    mounted:function () {
      let self = this;
      console.log(this);
      var url ='http://appinter.sunwoda.com/common/getPersonalInfo.json?token='+self.token;
      console.log(url);
      self.$http.get(url).then((response) => {
        console.log(response);
         if(response.data.statusCode ==0){
           self.userNo.setMess(response.data.dataInfo.singleData.userNo);
   console.log("aaaaaaaaaa");
           localStorage.setItem("userNo",response.data.dataInfo.singleData.userNo);
           console.log(self.userNo);
         }
      }, (response) => {
        console.log('error');
      });
    },
    methods:{
      hrefTo:function (link) {
        let self = this;
        this.$router.push({ path: link,query: {token:self.token} })
      }
    }
  }
</script>
