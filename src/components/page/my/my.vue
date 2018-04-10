<style scoped>
  .header{
    height: 35vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /*background-color: #fefeee;*/
  }
  .header_me{
    width: 100%;
    display: flex;
    padding-left: 5%;
    padding-right: 5%;
  }
  .header_me div{
    margin-top: 15px;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .header_me div span:first-child{
    color: #757575;
  }

  .header_me div span:last-child{

    color:#0066aa;
  }
</style>
<template>
  <div class="main">
    <div class="header">
      <div style="height: 30px;width: 100%"></div>

      <mu-avatar slot="left" icon="assignment_ind" backgroundColor="#ddd" :size="80" :iconSize="40"/>
      <div style="height: 30px;width: 100%;text-align: center;font-size: 0.3rem;line-height: 30px">{{userMess.empName}}</div>
      <div class="header_me">
        <div><span>{{userMess.tcdpCode}}</span><span></span></div>
        <div><span>{{userMess.roleName}}</span><span></span></div>
        <div><span>{{userMess.empNameEng}}</span><span></span></div>
      </div>
    </div>
    <div>
      <mu-list>

        <mu-list-item title="我的信息">
          <mu-icon value="star" slot="left" color="yellew"/>
          <mu-icon value="keyboard_arrow_right" slot="right"/>
        </mu-list-item>
        <mu-divider/>
        <mu-list-item title="我的流程">
          <mu-icon value="star" slot="left" color="yellew"/>
          <mu-icon value="keyboard_arrow_right" slot="right"/>
        </mu-list-item>
        <mu-divider/>
        <mu-list-item title="退出登录" @click="logout">
          <mu-icon value="star" slot="left" color="yellew"/>
          <mu-icon value="keyboard_arrow_right" slot="right"/>
        </mu-list-item>
        <mu-divider/>
      </mu-list>
    </div>
  </div>
</template>
<script>

  export default {
    data () {
      return {
        userMess:{}

      }
    },
    mounted:function () {

      this.userMess = JSON.parse(localStorage.getItem('mesUsermess'));
      console.log(this.userMess);
    },
    methods: {
      logout:function () {
        this.$router.push({path:"login"})
      }
    }
  }
</script>
