<template>
  <div class="main" >
    <div class="header">
    <mu-appbar title="视频播放" style="text-align: center;background-color: #222">
      <mu-icon-button icon="navigate_before" slot="left" @click="back"/>
      <mu-icon-menu icon="more_vert" slot="right" style="opacity: 0">
      </mu-icon-menu>
    </mu-appbar>
    </div>
      <div class="videobox" >
        <video id="mainvideo"  width="100%"  :src="videosrc" controls="controls"></video>
      </div>
  </div>
</template>
<script>
  export default {
    props: ['imgSrc'],
    data () {
      return {
//       videosrc:"http://7xvl2z.com1.z0.glb.clouddn.com/nigg2.mp4"
        videosrc:"http://appweb.sunwoda.com/select/ceshi/1.mp4"
      }
      },
    mounted:function (){

      this.videosrc = this.$route.query.url;
      console.log(this.videosrc );
    },
    methods: {
      back:function () {
        this.$router.go(-1)
      },
    }
  }
</script>
<style scoped>
   .main{
     background-color: #404040;
     display: flex;
     flex-direction: column;
   }
   .header{
     height: 56px;
   }
  .videobox{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
