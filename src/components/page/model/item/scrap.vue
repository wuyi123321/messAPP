<style scoped>
  .main{
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .header{
    height: 106px;
  }
  #eqscoll{
    width: 100%;
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    position: relative;
    user-select: none;
  }
  .search{
    font-size: 16px;
    width: 100%;
    display: flex;
    border-bottom: solid 1px #eee;
    padding-top: 8px;
    padding-right: 10px;
    background-color: #fff;
  }

  .setext{
    width: 80px;
    display: flex;
    z-index: 999;
    padding-left: 10px;
    align-items: center;
  }

  .setext p{
    border: solid 1px #009688;
    color: #009688;
    border-radius: 5px;
    padding-left: 5px;
    padding-right: 5px;
    padding-top: 2px;
    padding-bottom: 2px;
  }
  .setext p:hover{
    background-color: rgba(0,0,0,0.3);
  }

  .mu-text-field {
    width: 100%;
    min-height: 48px;
    display: inline-block;
    margin-bottom: 0;
    overflow: hidden;
  }
  .mu-td {
    overflow: hidden;
  }

  .mu-td, .mu-th {
    padding-left: 5px;
    padding-right: 5px;
    text-align: left;
  }
  .mu-th-wrapper{
    text-align: center;
  }

  /*右边的弹出层样式*/
  .searRight{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .srHeader{
    height: 56px;
  }
  .srcontent{
    flex: 1;
    overflow-y: auto;
    padding-left: 10px;
  }


  /*itemmess*/
  .itemmess{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }
  .itemcontent{
    background-color: #fff;
    max-height: 85%;
    width: 85%;
    overflow-y: auto;
    overflow-x: hidden;
    border-radius: 5px;
    display: flex;
    flex-direction: column;

  }
  .item_top{
    height: 48px;
    background-color: #009688;
    color: #fff;
    text-align: center;
    line-height: 48px;
    border-bottom: solid 1px #eee;
    font-size: 0.3rem;
    position: relative;
  }
  .item_top .mu-icon-button{
    position: absolute;
    top: 0;
    right: 10px;
  }
  .item_content{
    flex: 1;
    overflow: auto;

  }
  .item_content .itemline{
    height: 45px;
    line-height: 45px;
    padding-left: 15px;
    padding-right: 15px;
    display: flex;
    justify-content: space-between;
  }
  .item_content .itemline span:first-child{
    color: #009688;
  }
  .item_content .itemline span:last-child{
    color: #888;
  }

  .red{
    background-color: #ff4949;
  }

</style>


<template>
  <div class="main">
    <div class="header">
      <mu-appbar title="设备报废" style="text-align: center">
        <mu-icon-button icon="navigate_before" slot="left" @click="back"/>
        <mu-icon-button  icon="more_vert" slot="right" @click="draweropen=true">
        </mu-icon-button >
      </mu-appbar>
      <mu-drawer :open="draweropen" :docked="false" :right="true" width="85%"  @close="draweropen=false">
        <div class="searRight">
          <div class="srHeader">
            <mu-appbar title="设备台账查询">
              <mu-icon-button  slot="right" icon="check" @click="selectAll">
              </mu-icon-button >
            </mu-appbar>
          </div>
          <div class="srcontent">
              <div>
                <mu-select-field v-model="searchAll['scrapCust.dsStatus']" label="处理状态">
                  <mu-menu-item value="-1" title="请选择"/>
                  <mu-menu-item value="0" title="未通过"/>
                  <mu-menu-item value="1" title="报废"/>
                  <mu-menu-item value="2" title="延长使用"/>
                </mu-select-field>
                <mu-text-field label="设备名称"   hintText="请输入设备名称"    v-model="searchAll['scrapCust.deviceName']"     labelFloat/>
                <mu-text-field label="位置"     hintText="请输入设备位置"      v-model="searchAll['scrapCust.place']"        labelFloat/>
              </div>
          </div>
        </div>


      </mu-drawer>
      <div class="search">
        <mu-icon-menu
          icon="search"
          :anchorOrigin="leftTop"
          :targetOrigin="leftTop"
        >
          <mu-menu-item title="设备名称" @click="searchitem('设备名称','scrapCust.deviceName')"/>
          <mu-menu-item title="位置" @click="searchitem('位置','scrapCust.place')"/>
        </mu-icon-menu>
        <mu-text-field :hintText="hintText" v-model="searchText" @input="changeText(searchText)"/>
        <span class="setext" @click="search"><p>搜索</p></span>
      </div>

    </div>
    <div id="eqscoll" ref="eqscoll">

      <mu-divider/>
      <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
      <mu-table showCheckbox :fixedHeader="true" ref="table" multiSelectable enableSelectAll @rowSelection="showItem($event)">
        <mu-thead>
          <mu-tr>
            <mu-th><span style="color: #009688;width: 100%;text-align: center">设备SN</span></mu-th>
            <mu-th><span style="color: #009688">设备名称</span></mu-th>
            <mu-th>处理状态</mu-th>
          </mu-tr>
        </mu-thead>
        <mu-tbody>
          <mu-tr v-for="item in data" :class="{ red: item.dsStatusName=='未处理'}">
            <mu-td>{{item.deviceSn}}</mu-td>
            <mu-td style="padding-left: 15px">{{item.deviceName}}</mu-td>
            <mu-td>{{item.dsStatusName}}</mu-td>
          </mu-tr>
        </mu-tbody>
      </mu-table>
      <mu-divider/>
      <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
    </div>
    <div style="position: fixed;bottom: 80px;right: 20px">
      <div v-show="allow">
        <mu-raised-button label="新增报废" ref="button" @click="addscrap()" primary/>
        <p style="height: 5px"></p>
        <mu-raised-button label="批量通过" ref="button" @click="approve(1)" :disabled="approveable" primary/>
        <p style="height: 5px"></p>
        <mu-raised-button label="批量驳回" ref="button" @click="approve(2)" :disabled="approveable" primary/>
        <p style="height: 5px"></p>
        <mu-raised-button label="设备详情" ref="button" @click="itemshow=true" primary :disabled="able"/>
        <p style="height: 5px"></p>
      </div>
      <mu-raised-button label="操作" ref="button" @click="toggle" primary />
    </div>
    <div class="itemmess" v-show="itemshow">
      <div class="itemcontent">
        <div class="item_top">
          设备详情
          <mu-icon-button icon="clear" color="#fff" @click="itemshow=false"/>
        </div>
        <div class="item_content" v-if="dataItem">
          <div v-for="value,name in dataItem">
            <div class="itemline"><span>{{name}}</span><span>{{value}}</span></div>
            <mu-divider/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    data () {
      return {
        approveable:true,
        allow:false,
        able:true,
        itemshow:false,
        draweropen:false,
        refreshing:false,
        trigger: null,
        loading: false,
        scroller: null,
        data:[],
        searchText:"",
        hintText:"请根据设备名称搜索",
        startPage:1,
        totalPage:100,
        leftTop: {horizontal: 'left', vertical: 'top'},
        serchType:"scrapCust.deviceName",
        searchmess:{
          page:1,
          rows:20,
          empNo:localStorage.getItem('empNo')
        },
        searchAll:{
          empNo:localStorage.getItem('empNo'),
          'scrapCust.deviceName':"",//设备名称
          'scrapCust.place':"",//位置
          'scrapCust.dsStatus':"0",//处理状态
        },
        dataItem:{},
        listKey:[],//装报废ID 批量操作用
        dsDeviceIds:[],//装设备id 批量操作用
      }
    },

    mounted:function () {
      this.refreshing = true;
      this.getdata();
      this.scroller =this.$refs.eqscoll;
      this.trigger = this.$refs.eqscoll;
    },
    watch: {
    },

    methods: {

      toggle:function () {
        this.allow = !this.allow
      },
      refresh:function () {
        this.data=[];
        this.refreshing=true;
        this.startPage = 1
        this.searchmess.page= this.startPage;
        console.log( this.searchmess);
        this.getdata();
      },
      loadMore () {
        console.log("aaaa");
        this.startPage++;
        if(this.startPage<=this.totalPage){
          this.loading = true;

          this.searchmess.page= this.startPage;
          this.getdata()
        }else {
          this.$message("已经到底了")
        }
      },
      showItem:function(val){
        this.dsDeviceIds=[];
        this.listKey=[];
        if(val.length==0){
          this.able = true;
          this.approveable = true;
        }else {
          if(val.length==1){
            this.able = false;
            this.approveable = false;
            this.dataItem.设备名称 = this.data[val].deviceName;
            this.dataItem.设备SN = this.data[val].deviceSn;
            this.dataItem.维修单状态 = this.data[val].dsStatusName;
            this.dataItem.处理意见 = this.data[val].dsScrapOpinion;
            this.dataItem.处理人 = this.data[val].dsScrapEmp;
            this.dataItem.处理时间 = this.data[val].dsScrapDate;
            this.dataItem.报废原因 = this.data[val].dsCause;
            this.dataItem.报废单号 = this.data[val].dsNote;
            this.dataItem.延长时间 = this.data[val].years;
            this.dataItem.设备规格 = this.data[val].deviceSpec;
            this.dataItem.责任人 = this.data[val].dsScrapEmpName;
            this.dataItem.紧急程度 = this.data[val].urgencyName;
            this.dataItem.使用人 = this.data[val].empName;
            this.dataItem.地点 = this.data[val].place;
            this.dataItem.管理部门 = this.data[val].assetOrg;
            this.dataItem.限制查询部门= this.data[val].selectOrg;
            this.dataItem.购买时间 = this.data[val].buydate;
          }
          if(val.length>1){
            this.able = true;
            this.approveable = false;
          }
          for(var i = 0;i<val.length;i++){
            this.dsDeviceIds.push(this.data[i].dsDeviceId)
            this.listKey.push(this.data[i].scrapId)
          }
        }

        console.log(this.dsDeviceIds);
        console.log(this.listKey);

      },
//      进行查询前的数据配置
      searchitem:function (hintText,action) {
        var vm = this;
        console.log(action);
        this.hintText = "请根据"+hintText + "搜索";
        this.serchType = action;
      },
//      进行级联查询
      selectAll:function () {
        this.data=[];
        this.startPage = 1;
        this.searchmess=this.searchAll;
        this.searchmess.page=this.startPage;
        this.searchmess.rows=20;
        console.log(this.searchmess);
        this.draweropen = false;
        $("#eqscoll").scrollTop(0)
        this.getdata()
      },
      search:function () {
        this.data=[];
        console.log(this.serchType);
        this.startPage = 1;
        $("#eqscoll").scrollTop(0)
        console.log("++++++++++++++++"+this.serchType);
        this.searchmess[this.serchType] = this.searchText
        console.log(this.searchmess);
        this.getdata()
      },
      changeText:function (text) {
        console.log("aaaa");
        console.log(text);
        console.log(this.searchText);
        if(text==""){
          $("#eqscoll").scrollTop(0);
          this.searchmess={page:this.startPage,rows:20};
          this.getdata();
        }
      },
      addscrap:function () {
        this.$router.push({ path: '/addScrap'});
      },
      approve:function (type) {
        let vm = this;
        vm.refreshing = true;
        vm.allow = false;
        var pram ={
          listKey:vm.listKey.join(','),
          scrpkey:type,
          dsDeviceIds:vm.dsDeviceIds.join(','),
        };
        console.log(pram);
        $.ajax({
          url: vm.path+"device2/scrpupdate_submit.action",
          dataType: "json",
          data:pram,
          type: "get",
          success: function(data) {
            console.log(data);
            vm.refreshing = false;
            vm.data=[];
            vm.getdata();
            vm.$message(data.resultInfo.message);
          },
          error: function() {

          }
        });
      },
      getdata:function () {
        let vm = this;
        vm.refreshing = true;

        console.log("----------------"+$("#eqscoll").scrollTop())
        $.ajax({
          url: vm.path+"device2/scraplist.action",
          dataType: "json",
          data: vm.searchmess,
          type: "get",
          success: function(data) {
            console.log(data);
            vm.refreshing = false;
            vm.loading = false;
            vm.data = vm.data.concat(data.rows);
            vm.totalPage = Math.ceil(data.total/20);
            console.log(vm.totalPage);

          },
          error: function() {

          }
        });
      },
      back:function () {
        this.$router.go(-1)
      },

    }
  }
</script>

