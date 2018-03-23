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
      <div style="height: 30px;width: 100%;text-align: center;font-size: 0.3rem;line-height: 30px">{{personmess.fdName}}</div>
        <div class="header_me">

          <div><span>发帖数</span><span>{{personmess.fdPostCount}}</span></div>
          <div><span>回帖数</span><span>{{personmess.fdReplyCount}}</span></div>
          <div><span>积分</span><span>{{personmess.fdScore}}</span></div>
        </div>
    </div>
    <div>
      <mu-list>
        <mu-list-item title="我的发帖" @click="goMyForum(personmess.fdId)">
          <mu-icon value="star" slot="left" color="yellew"/>
          <mu-icon value="keyboard_arrow_right" slot="right"/>
        </mu-list-item>
        <mu-divider/>
        <mu-list-item title="我的收藏" @click="goMyColl(personmess.fdNo)">
          <mu-icon value="star" slot="left" color="yellew"/>
          <mu-icon value="keyboard_arrow_right" slot="right"/>
        </mu-list-item>
        <mu-divider/>
        <mu-list-item title="设置">
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
         personmess:{}

      }
    },

    mounted:function () {
      console.log(this.userNo.userNo);
      if(this.userNo.userNo == ""){
        this.getPno();
      }else {
        this.getdata();
      }

    },
    methods: {
      goMyForum:function (pNo) {
        console.log(pNo);
        var self = this;
        var name = this.personmess.fdName+"的帖子";
        this.$router.push({ path: "forumIist",query: {token:self.token,name:name,pNo:pNo} });
      },
      goMyColl:function (pNo) {
        console.log(pNo);
        var self = this;
        var name = this.personmess.fdName+"的收藏";
        this.$router.push({ path: "collection",query: {name:name,pNo:pNo,token:self.token} });
      },
      getPno:function () {
        let self = this;
        console.log(this);
        var url =self.path+'getPersonalInfo.json?token='+self.token;
        console.log(url);
        self.$http.get(url).then((response) => {
          console.log(response);
          if(response.data.statusCode ==0){
            self.userNo.setMess(response.data.dataInfo.singleData.userNo);
            localStorage.setItem("userNo",response.data.dataInfo.singleData.userNo);
            localStorage.setItem("userName",response.data.dataInfo.singleData.userName);
            self.getdata();
          }
        }, (response) => {
          console.log('error');
        });
      },


      getdata:function(){
        let self = this;
        var url =self.path+ 'findUserPost.json'+'?token='+self.token+"&userNo="+localStorage.getItem('userNo');
        console.log(url);
        self.$http.get(url
        ).then((response) => {
          console.log(response);
          self.personmess = response.data.dataInfo.listData[0]
          if(response.data.statusCode !=0){
            alert("暂无数据");
            return 0
          }
        }, (response) => {
          console.log('error');
        });
      },
    }
  }
</script>
