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




  .line_dehover:hover{
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
    <div class="line_demo ">
      <div class="flex-demo line_dehover" @click="hrefTo('equipment')">
        <mu-icon value="chrome_reader_mode" :size="30" color="#009688"/>
        <span class="demo_name">设备台账</span>
      </div>
      <div class="flex-demo line_dehover" @click="hrefTo('rent')">
        <mu-icon value="markunread_mailbox" :size="30" color="#009688"/>
        <span class="demo_name">借出/借入</span>
      </div>
      <div class="flex-demo line_dehover" @click="hrefTo('maintain')">
        <mu-icon value="group_work" :size="30" color="#009688"/>
        <span class="demo_name">设备保养</span>
      </div>
    </div>
    <div class="line_demo ">
      <div class="flex-demo line_dehover" @click="hrefTo('repair')">
        <mu-icon value="photo" :size="30" color="#009688"/>
        <span class="demo_name">设备维修</span>
      </div>
      <div class="flex-demo line_dehover" @click="hrefTo('scrap')">
        <mu-icon value="book" :size="30" color="#009688"/>
        <span class="demo_name">设备报废</span>
      </div>
      <!--<div class="flex-demo" style="border: none">-->

      <!--</div>-->
      <div class="flex-demo line_dehover" @click="hrefTo('lessuse')">
        <mu-icon value="book" :size="30" color="#009688"/>
        <span class="demo_name">闲置资产</span>
      </div>
    </div>
    <div class="line_demo ">
      <div class="flex-demo line_dehover" @click="hrefTo('selectPer')">
        <mu-icon value="photo" :size="30" color="#009688"/>
        <span class="demo_name">人员信息</span>
      </div>
      <div class="flex-demo" style="border: none">
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

    },
    methods:{
      hrefTo:function (link) {
        let self = this;
        this.$router.push({ path: link,query: {token:self.token} })
      }
    }
  }
</script>
