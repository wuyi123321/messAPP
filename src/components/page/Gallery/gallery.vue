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
  .gridlist-demo-container{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .gridlist-demo{
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
</style>

<template>
  <div class="main">
    <div class="header">
    <mu-appbar title="图片展示" style="text-align: center">
      <mu-icon-button icon="navigate_before" slot="left" @click="back"/>
      <mu-icon-menu icon="more_vert" slot="right" style="opacity: 0">
      </mu-icon-menu>
    </mu-appbar>
    </div>

    <div class="conter" id="scoll1">
      <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
    <div class="gridlist-demo-container">
      <mu-grid-list class="gridlist-demo">
        <mu-sub-header>公司形象图片</mu-sub-header>
        <mu-grid-tile v-for="tile, index in data" :key="index"   v-if="tile.type=='401'">
          <img :src="'http://video.sunwoda.com/'+tile.fileUrl+'.'+tile.fileType" @click="showBig('http://video.sunwoda.com/'+tile.fileUrl+'.'+tile.fileType)"/>
          <span slot="title">{{tile.fileName}}</span>
          <span slot="subTitle"><b>{{tile.fUpdateDateStr}}</b></span>
          <mu-icon-button icon="star_border" slot="action"/>
        </mu-grid-tile>
      </mu-grid-list>
      <mu-grid-list class="gridlist-demo">
        <mu-sub-header>产品图片</mu-sub-header>
        <mu-grid-tile v-for="tile, index in data" :key="index"  v-if="tile.type=='402'" >
          <img :src="'http://video.sunwoda.com/'+tile.fileUrl+'.'+tile.fileType" @click="showBig('http://video.sunwoda.com/'+tile.fileUrl+'.'+tile.fileType)"/>
          <span slot="title">{{tile.fileName}}</span>
          <span slot="subTitle"><b>{{tile.fUpdateDateStr}}</b></span>
          <mu-icon-button icon="star_border" slot="action"/>
        </mu-grid-tile>
      </mu-grid-list>
    </div>
  </div>
    <bigImg v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></bigImg>
  </div>
</template>
<script>
  import bigImg from '@/components/common/bigImg.vue';
  export default {
    data () {

      return {
        refreshing:false,
        trigger:null,
        imgSrc:"",
        showImg:false,
        data:[]
      }
    },
    mounted:function () {
      this.refreshing=false;
      this.getdata(4)
    },
    methods: {
      refresh:function () {
        this.refreshing=false;
        this.getdata(4)
      },
      getdata:function (type) {
        let self = this;
        var url =self.path+ "findKnowledge.json"+'?token='+self.token+"&fileLangType=1&type="+type;
        console.log(url);
        self.$http.get(url
        ).then((response) => {
          console.log(response);
          self.trigger = document.getElementById("scoll1");
          self.refreshing=false;
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
      showBig:function (imgSrc) {
        console.log("aaa");
        this.imgSrc = imgSrc;
        this.showImg = true;
      },
      back:function () {
        this.$router.go(-1)
      },
      viewImg:function () {
        this.showImg = false;
      },
      download:function (a) {
        this.imgSrc = a;
        alert(a);
      }
    },

    components: {
      bigImg
    }
  }
</script>


