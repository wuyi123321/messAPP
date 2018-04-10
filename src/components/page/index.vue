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
      <mu-appbar title="设备管理" style="text-align: center">
        <!--<mu-icon-button icon="navigate_before" slot="left" @click="closePage"/>-->
        <!--<mu-icon-button icon="aaa" slot="right"  />-->
      </mu-appbar>
    </div>
    <div class="conter">
      <router-view style="height: 100%"></router-view>
    </div>
    <div class="footer">

      <mu-bottom-nav :value="bottomNav" @change="handleChange">
        <mu-bottom-nav-item value="model" title="功能" icon="collections_bookmark"/>
        <mu-bottom-nav-item value="approval" title="审单" icon="group"/>
        <!--<div class="mu-buttom-item" style="display: flex; flex-direction: column;justify-content:center;align-items: center;" @click="addForums">-->
          <!--<mu-icon  :value="addicon" style="padding-right: 8px;padding-left: 8px;padding-top: 3px;padding-bottom: 3px;background-color:#009688;border-radius: 5px;color: #fff"/>-->
        <!--</div>-->
        <!--<mu-bottom-nav-item value="forumcard" title="发现" icon="explore"/>-->
        <mu-bottom-nav-item value="my" title="我的" icon="perm_identity"/>
      </mu-bottom-nav>
    </div>
  </div>
</template>
<script>

  export default {
    data () {
      return {
        bottomNav: 'model',//默认底下路由
        addicon:"add",//中间图标信息
      }
    },
    mounted:function () {
      console.log(this.$router);
      //根据路由判断底下标签
      var a =this.$router.history.current.path;
      var b =a.replace('/',"");
      console.log(b);
      this.bottomNav = b;

    },

    methods: {

//      底下模块更换进行路由更换
      handleChange (val) {
        let self = this;
        this.bottomNav = val;
        this.$router.replace({ path: val});
      }
    }
  }
</script>
