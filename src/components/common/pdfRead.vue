<style scoped>
  .main{
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .header{
    height: 56px;
  }
  #pdf .mu-appbar{
    background-color: #555;
  }
  #scoll{
    width: 100%;
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    position: relative;
    user-select: none;
    background-color: #fff;

  }
.load{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
 justify-content: center;
  align-items: center;
}
  .pdfRead{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #fff;
    z-index: 999;
  }
</style>

<template>
  <div class="main">
    <div class="header" id="pdf">
          <mu-appbar :title="pdfMess.name" style="text-align: center">
            <mu-icon-button icon="navigate_before" slot="left" @click="back"/>
            <mu-icon-menu icon="more_vert" slot="right" style="opacity: 0">
            </mu-icon-menu>
          </mu-appbar>
    </div>
    <div id="scoll">
      <div class="load">
      <mu-circular-progress :size="40" v-show="loading"/>
        <div>加载中...</div>
      </div>
      <iframe class="pdfRead"  frameborder=0 scrolling=auto :src="url+pdfMess.path" v-show="!loading" id ="iframe"></iframe>
      <div id="a"></div>
    </div>
  </div>
</template>
<script>

  export default {
    props:{
//      pdfMess:Object,
    },
    data () {
      return {
          pdfMess:{
            name:"sunwoda周会总结",
            path:""
          },
        url:"https://mozilla.github.io/pdf.js/web/viewer.html?file=",
        loading:true,
      }
    },
    mounted:function () {
      var vm =this;
      vm.pdfMess.path = this.$route.query.url;
      vm.pdfMess.name = this.$route.query.title;
      console.log(this.$route.query.url);
      var ifem = document.getElementById("iframe");
      ifem.onload=function(){
        vm.loading = false;
      }

      console.log("aaa");
//    vm.loading = false;
    },
    methods: {

      back:function () {
        this.$router.go(-1)
      },

    }
  }
</script>

