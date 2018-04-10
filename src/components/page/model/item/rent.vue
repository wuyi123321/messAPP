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
      <mu-appbar title="借出/还入" style="text-align: center">
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
              <mu-text-field label="模糊查询"   hintText="请输入模糊查询"    v-model="searchAll['lentreturnCust.queryCriteria']"     labelFloat/>
              <mu-text-field label="借用人"   hintText="请输入借用人"    v-model="searchAll['lentreturnCust.lentEmpName']"     labelFloat/>
              <mu-text-field label="设备名称"     hintText="请输入设备名称"      v-model="searchAll['lentreturnCust.deviceName']"        labelFloat/>
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
          <mu-menu-item title="模糊查询" @click="searchitem('模糊查询','lentreturnCust.queryCriteria')"/>
          <mu-menu-item title="借用人" @click="searchitem('借用人','lentreturnCust.lentEmpName')"/>
          <mu-menu-item title="设备名称" @click="searchitem('设备名称','lentreturnCust.deviceName')"/>
        </mu-icon-menu>
        <mu-text-field :hintText="hintText" v-model="searchText" @input="changeText(searchText)"/>
        <span class="setext" @click="search"><p>搜索</p></span>
      </div>

    </div>
    <div id="eqscoll" ref="eqscoll">

      <mu-divider/>
      <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
      <mu-table showCheckbox :fixedHeader="true" ref="table" @rowSelection="showItem($event)">
        <mu-thead>
          <mu-tr>
            <mu-th><span style="color: #009688;width: 100%;text-align: center">设备SN</span></mu-th>
            <mu-th><span style="color: #009688">设备名称</span></mu-th>
            <mu-th>借用人</mu-th>
            <mu-th>归还状态</mu-th>
          </mu-tr>
        </mu-thead>
        <mu-tbody>
          <mu-tr v-for="item in data" :class="{ red: item.dsStatusName=='未处理'}">
            <mu-td>{{item.deviceSn}}</mu-td>
            <mu-td style="padding-left: 15px">{{item.deviceName}}</mu-td>
            <mu-td>{{item.lentEmpName}}</mu-td>
            <mu-td>{{item.lentStatusName}}</mu-td>
          </mu-tr>
        </mu-tbody>
      </mu-table>
      <mu-divider/>
      <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
    </div>
    <div style="position: fixed;bottom: 80px;right: 20px">
      <div v-show="allow">
        <mu-raised-button label="新增借用" ref="button" @click="addrent()" primary/>
        <p style="height: 5px"></p>
        <mu-raised-button label="设备归还" ref="button" @click="addrent()" :disabled="approveable" primary/>
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
        hintText:"请根据模糊查询搜索",
        startPage:1,
        totalPage:100,
        leftTop: {horizontal: 'left', vertical: 'top'},
        serchType:"lentreturnCust.queryCriteria",
        searchmess:{
          page:1,
          rows:20,
          empNo:localStorage.getItem('empNo')
        },
        searchAll:{
          empNo:localStorage.getItem('empNo'),
          "lentreturnCust.queryCriteria":"",//模糊查询
          "lentreturnCust.lentEmpName":"",//借用人
          "lentreturnCust.deviceName":""//设备名称
        },
        dataItem:{},

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
          if(val>=0){
            this.able = false;
            this.approveable = false;
            this.dataItem.设备名称 = this.data[val].deviceName;
            this.dataItem.借出编号=this.data[val].lentId;
            this.dataItem.设备资产编号=this.data[val].deviceId;
            this.dataItem.借出状态=this.data[val].lentStatus;
            this.dataItem.借用人=this.data[val].lentEmp;
            this.dataItem.借用时间=this.data[val].lentDate;
            this.dataItem.预计归还时间=this.data[val].estimateReturnDate;
            this.dataItem.相关项目=this.data[val].project;
            this.dataItem.借出备注=this.data[val].lentNote;
            this.dataItem.登记人员=this.data[val].lentManager;
            this.dataItem.审批结果=this.data[val].lentResult;
            this.dataItem.审核备注=this.data[val].lentManagerNote;
            this.dataItem.还入管理员=this.data[val].returnManager;
            this.dataItem.还入时间=this.data[val].returnDate;
            this.dataItem.还入备注=this.data[val].returnNote;
            this.dataItem.借用人=this.data[val].lentEmpName;
            this.dataItem.登记人员=this.data[val].lentManagerName;
            this.dataItem.审批结果=this.data[val].lentResultName;
            this.dataItem.还入管理员=this.data[val].returnManagerName;
            this.dataItem.借用部门=this.data[val].lentOrg;
            this.dataItem.审核时间=this.data[val].lentAuditDate;
            this.dataItem.领用时间=this.data[val].lentSureDate;
            this.dataItem.确实还入时间=this.data[val].returnSureDate;
            this.dataItem.借用主管=this.data[val].lentEmpLeader;
            this.dataItem.设借用入库时间=this.data[val].lentEnterDate;
            this.dataItem.借用地点=this.data[val].lentPlace;
            this.dataItem.设备Sn=this.data[val].deviceSn;
            this.dataItem.设备资产归属=this.data[val].assetOrgName;
            this.dataItem.设备名称=this.data[val].deviceName;
            this.dataItem.原使用部门=this.data[val].manageOrgName;
            this.dataItem.设备规格=this.data[val].deviceSpec;
            this.dataItem.区域名称=this.data[val].areaname;
            this.dataItem.所在地点=this.data[val].place;
            this.dataItem.设备类型=this.data[val].deviceType;
            this.dataItem.仪校编号=this.data[val].internalId;
            this.dataItem.原设备编号=this.data[val].deviceOldSn;
            this.dataItem.资产编号=this.data[val].assetNumber;
            this.dataItem.资产类型=this.data[val].assetTypeName;
            this.dataItem.驳回=this.data[val].reject;
            this.dataItem.确认借出=this.data[val].confirmToLend;
            this.dataItem.接收使用=this.data[val].receivesTheUse;
            this.dataItem.申请归还=this.data[val].applyForTheReturn;
            this.dataItem.确认归还=this.data[val].ConfirmToReturn;
            this.dataItem.请输入借用入库时间=this.data[val].inputBorrowingTime;
            this.dataItem.借用入库时间=this.data[val].borrowingTime;
            this.dataItem.请输入审核时间=this.data[val].enterAuditTime;
            this.dataItem.确认时间差=this.data[val].confirmTimeDifference;
            this.dataItem.借用确认=this.data[val].warehousingConfirm;
            this.dataItem.未进行入库确认=this.data[val].noEntryConfirmed;
            this.dataItem.请先进行领用确定=this.data[val].makeSureLeadFirst;
            this.dataItem.已进行入库确认=this.data[val].confirmedInWarehousing;

          }else {
            this.able = true;
            this.approveable = true;
          }
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
      addrent:function () {
        this.$router.push({ path: '/addrent'});
      },

      getdata:function () {
        let vm = this;
        vm.refreshing = true;

        console.log("----------------"+$("#eqscoll").scrollTop())
        $.ajax({
          url: vm.path+"lentreturn/lentlist.action",
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
            vm.$message("维护中。。。");
            vm.refreshing = false;

          }
        });
      },
      back:function () {
        this.$router.go(-1)
      },

    }
  }
</script>

