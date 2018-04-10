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
  .nodata{
    height: 56px;
    text-align: center;
    line-height: 56px;
    color: #009688
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
  /*原生组件修改样式*/

  .mu-text-field {
    width: 100%;
    min-height: 48px;
    display: inline-block;
    margin-bottom: 0;
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
</style>


<template>
  <div class="main">
    <div class="header">
      <mu-appbar title="新增设备台账审核" style="text-align: center">
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
                <mu-text-field label="模糊查询"   hintText="请输入查询内容"   v-model="searchAll['deviceCust.queryCriteria']"  labelFloat/>
                <mu-text-field label="借用部门"   hintText="请输入借用部门"    v-model="searchAll['deviceCust.manageOrg']"     labelFloat/>
                <mu-text-field label="借用人"     hintText="请输入借用人"      v-model="searchAll['deviceCust.empName']"        labelFloat/>
                <mu-text-field label="借用主管"   hintText="请输入借用主管"    v-model="searchAll['deviceCust.leaderEmpName']" labelFloat/>
                <mu-text-field label="设备SN"     hintText="请输入设备SN"      v-model="searchAll['deviceCust.deviceSn']"       labelFloat/>
                <mu-text-field label="设备名称"   hintText="请输入设备名称"    v-model="searchAll['deviceCust.deviceName']"    labelFloat/>
                <mu-text-field label="资产编号"   hintText="请输入资产编号"    v-model="searchAll['deviceCust.assetNumber']"   labelFloat/>
                <mu-text-field label="原设备编号" hintText="请输入原设备编号"  v-model="searchAll['deviceCust.deviceOldSn']"   labelFloat/>
                <mu-text-field label="规格型号"   hintText="请输入规格型号"    v-model="searchAll['deviceCust.deviceSpec']"    labelFloat/>
                <mu-text-field label="仪校编号"   hintText="请输入仪校编号"    v-model="searchAll['deviceCust.internalId']"    labelFloat/>
                <mu-text-field label="使用地点"   hintText="请输入使用地点"    v-model="searchAll['deviceCust.placeName']"     labelFloat/>
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
          <mu-menu-item title="设备SN" @click="searchitem('设备SN','deviceCust.deviceSn')"/>
          <mu-menu-item title="资产编号" @click="searchitem('资产编号','deviceCust.assetNumber')"/>
          <mu-menu-item title="设备名称" @click="searchitem('设备名称','deviceCust.deviceName')"/>
          <mu-menu-item title="模糊查询" @click="searchitem('模糊查询','deviceCust.queryCriteria')"/>
          <mu-menu-item title="仪校编号" @click="searchitem('仪校编号','deviceCust.internalId')"/>
          <mu-menu-item title="原设备编号" @click="searchitem('原设备编号','deviceCust.deviceOldSn')"/>
        </mu-icon-menu>
        <mu-text-field :hintText="hintText" v-model="searchText" @input="changeText(searchText)"/>
        <span class="setext" @click="search"><p>搜索</p></span>
      </div>
    </div>

    <div id="eqscoll" ref="scoll">
      <div v-if="data.length>0">
        <mu-divider/>
        <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh" />
        <mu-table  :fixedHeader="true" ref="table" enableSelectAll  multiSelectable @rowSelection="selectTable($event)">
          <mu-thead>
            <mu-tr>
              <mu-th><span style="color: #009688;width: 100%;text-align: center">设备SN</span></mu-th>
              <mu-th><span style="color: #009688">设备名称</span></mu-th>
              <mu-th>设备类型</mu-th>
            </mu-tr>
          </mu-thead>
          <mu-tbody>
            <mu-tr v-for="(item,index) in data" :key="index" :selected="item.selected" >
              <mu-td>{{item.deviceSn}}</mu-td>
              <mu-td style="padding-left: 15px">{{item.deviceName}}</mu-td>
              <mu-td>{{item.deviceTypeName}}</mu-td>
            </mu-tr>
          </mu-tbody>
        </mu-table>
        <mu-divider/>
        <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
      </div>
      <div v-else class="nodata">
        没有审核单据
        <mu-divider/>
      </div>
    </div>

    <div class="itemmess" v-show="itemshow">
      <div class="itemcontent">
        <div class="item_top">
          设备详情
          <mu-icon-button icon="clear" color="#fff" @click="itemshow=false"/>
        </div>
        <div class="item_content" v-if="dataItem">
          <div class="itemline"><span>设备名称</span><span>{{dataItem.deviceName}}</span></div>
          <mu-divider/>
          <div class="itemline"><span>设备SN</span><span>{{dataItem.deviceSn}}</span></div>
          <mu-divider/>
          <div class="itemline"><span>设备名称</span><span>{{dataItem.deviceName}}</span></div>
          <mu-divider/>
          <div class="itemline"><span>原设备编号</span><span>{{dataItem.deviceOldSn}}</span></div>
          <mu-divider/>
          <div class="itemline"><span>资产性质</span><span>{{dataItem.assetTypeName}}</span></div>
          <mu-divider/>
          <div class="itemline"><span>资产编号</span><span>{{dataItem.assetNumber}}</span></div>
          <mu-divider/>
          <div class="itemline"><span>仪校编号</span><span>{{dataItem.internalId}}</span></div>
          <mu-divider/>
          <div class="itemline"><span>规格型号</span><span>{{dataItem.deviceSpec}}</span></div>
          <mu-divider/>
          <div class="itemline"><span>设备类型</span><span>{{dataItem.deviceTypeName}}</span></div>
          <mu-divider/>
          <div class="itemline"><span>资产归属</span><span>{{dataItem.assetOrgName}}</span></div>
          <mu-divider/>
          <div class="itemline"><span>资产管理员</span><span>{{dataItem.assetManagerName}}</span></div>
          <mu-divider/>
          <div class="itemline"><span>借用部门</span><span>{{dataItem.manageOrgName}}</span></div>
          <mu-divider/>
          <div class="itemline"><span>借用人</span><span>{{dataItem.emp}}</span></div>
          <mu-divider/>
          <div class="itemline"><span>借用主管</span><span>{{dataItem.leaderEmp}}</span></div>
          <mu-divider/>
          <div class="itemline"><span>所属区域</span><span>{{dataItem.areaname}}</span></div>
          <mu-divider/>
          <div class="itemline"><span>使用地点</span><span>{{dataItem.placeName}}</span></div>
          <mu-divider/>
          <div class="itemline"><span>设备厂商</span><span>{{dataItem.manufacturer}}</span></div>
          <mu-divider/>
          <div class="itemline"><span>使用年限</span><span>{{dataItem.durableYears}}</span></div>
          <mu-divider/>
          <div class="itemline"><span>出厂日期</span><span>{{dataItem.manufacturer}}</span></div>
          <mu-divider/>
          <div class="itemline"><span>购买时间</span><span>{{dataItem.buydate}}</span></div>
          <mu-divider/>
          <div class="itemline"><span>设备状态</span><span>{{dataItem.statusName}}</span></div>
          <mu-divider/>
          <div class="itemline"><span>是否验收</span><span>{{dataItem.isAcceptanceName}}</span></div>
          <mu-divider/>
          <div class="itemline"><span>验收单号</span><span>{{dataItem.acceptanceId}}</span></div>
          <mu-divider/>
          <div class="itemline"><span>验收时间</span><span>{{dataItem.acceptanceDate}}</span></div>
          <mu-divider/>
          <div class="itemline"><span>新增时间</span><span>{{dataItem.deviceAddDate}}</span></div>
          <mu-divider/>
          <div class="itemline"><span>审核人</span><span>{{dataItem.assetManagerName}}</span></div>
          <mu-divider/>
          <div class="itemline"><span>资产原值</span><span>{{dataItem.deviceAssets}}</span></div>
          <mu-divider/>
          <div class="itemline"><span>资产净值</span><span>{{dataItem.deviceNet}}</span></div>
          <mu-divider/>
          <div class="itemline"><span>设备备注</span><span>{{dataItem.deviceParameter}}</span></div>
          <mu-divider/>
          <div class="itemline"><span>设备速率</span><span>{{dataItem.speed}}</span></div>
          <mu-divider/>
          <div style="height: 10px"></div>
        </div>
      </div>
    </div>
    <div style="position: fixed;bottom: 80px;right: 20px">
      <div v-show="allow">
        <mu-raised-button label="批量通过" ref="button" @click="approve(1)" primary/>
        <p style="height: 5px"></p>
        <mu-raised-button label="批量驳回" ref="button" @click="approve(2)" primary/>
        <p style="height: 5px"></p>
        <mu-raised-button label="设备详情" ref="button" @click="itemshow=true" primary :disabled="itemable"/>
        <p style="height: 5px"></p>

      </div>
      <mu-raised-button label="操作" ref="button" @click="toggle" primary :disabled="able"/>

    </div>
  </div>
</template>
<script>

  export default {
    data () {
      return {
        itemshow:false,//详细信息显示or隐藏
        itemable:true,//设备详情按钮是否禁用
        dataItem:{},  //详细信息数据
        able:true,    //操作按钮是否禁用
        allow:false,  //操作选项显示or隐藏
        draweropen:false, //右边筛选列表显示or隐藏
        refreshing:false,
        trigger: null,
        loading: false,
        scroller: null,
        data:[],
        searchText:"",
        hintText:"请根据设备SN搜索",
        startPage:1,
        totalPage:100,
        leftTop: {horizontal: 'left', vertical: 'top'},
        serchType:"deviceCust.deviceSn",
        searchmess:{
          empNo:localStorage.getItem('empNo'),
          page:1,
          rows:20,
          "deviceCust.status":-3
        },
        searchAll:{
          empNo:localStorage.getItem('empNo'),
          "deviceCust.status":-3,
          'deviceCust.queryCriteria':"",//模糊查询
          'deviceCust.deviceTypeName':"",//设备类型
          'deviceCust.manageOrg':"",//借用部门
          'deviceCust.empName':"",//借用人
          'deviceCust.leaderEmpName':"",//借用主管
          'deviceCust.deviceSn':"",//设备SN
          'deviceCust.deviceName':"",//设备名称
          'deviceCust.assetNumber':"",//资产编号
          'deviceCust.deviceOldSn':"",//原设备编号
          'deviceCust.deviceSpec':"",//规格型号
          'deviceCust.internalId':"",//仪校编号
          'deviceCust.placeName':""//使用地点
        },
        setids:[],//提交的id集合
      }
    },
    mounted:function () {
      this.getdata();
      this.scroller =this.$refs.scoll;
      this.trigger = this.$refs.scoll;
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
        this.startPage = 1;
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

//      选中一行
      selectTable:function (val) {
        this.setids = [];
        if(val.length != 0){
          this.able = false;
        }
        if(val.length == 0){
          this.able = true;
          this.allow = false;
        }
        if(val.length != 1){
          this.itemable=true
        }
        if(val.length == 1){
          this.itemable=false
          this.dataItem = this.data[val]
        }
        for(var i = 0;i<val.length;i++){
          this.setids.push(this.data[i].deviceId)
        }
      },
//      进行查询前的数据配置
      searchitem:function (hintText,action) {
        var vm = this;
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
        if(this.serchType == 'deviceCust.deviceSn'){
           this.searchmess={
             empNo:localStorage.getItem('empNo'),
             "deviceCust.status":-3,
             page:this.startPage,
             rows:20,
             'deviceCust.deviceSn':this.searchText
           };
         }
//资产编号
        if(this.serchType == 'deviceCust.assetNumber'){
          this.searchmess={
            empNo:localStorage.getItem('empNo'),
            "deviceCust.status":-3,
            page:this.startPage,
            rows:20,
            'deviceCust.assetNumber':this.searchText
          };
        }
//        设备名称
        if(this.serchType == 'deviceCust.deviceName'){
          this.searchmess={
            empNo:localStorage.getItem('empNo'),
            "deviceCust.status":-3,
            page:this.startPage,
            rows:20,
            'deviceCust.deviceName':this.searchText
          };
        }
//        模糊查询
        if(this.serchType == 'deviceCust.queryCriteria'){
          this.searchmess={
            empNo:localStorage.getItem('empNo'),
            "deviceCust.status":-3,
            page:this.startPage,
            rows:20,
            'deviceCust.queryCriteria':this.searchText
          };
        }
//        仪校编号
        if(this.serchType == 'deviceCust.internalId'){
          this.searchmess={
            empNo:localStorage.getItem('empNo'),
            "deviceCust.status":-3,
            page:this.startPage,
            rows:20,
            'deviceCust.internalId':this.searchText
          };
        }

        if(this.serchType == 'deviceCust.deviceOldSn'){
          this.searchmess={
            empNo:localStorage.getItem('empNo'),
            "deviceCust.status":-3,
            page:this.startPage,
            rows:20,
            'deviceCust.deviceOldSn':this.searchText
          };
        }

         this.getdata()
      },
      changeText:function (text) {
        console.log("aaaa");
        console.log(text);
        console.log(this.searchText);
        if(text==""){
          $("#eqscoll").scrollTop(0)
          this.searchmess={page:this.startPage,rows:20};
          this.getdata();
        }
      },
     approve:function (type) {
       let vm = this;
       vm.refreshing = true;
       vm.allow = false;
       var pram ={
         primaryKey:vm.setids.join(','),
         primar:type
       };
       console.log(pram);
       $.ajax({
         url: vm.path+"device2/deviceedit_updateBatch.action",
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
      goItem:function (item) {
        localStorage.setItem("contion", JSON.stringify(item));
        this.$router.push({ path: "fileitem",query: {token:this.token} });
      },
      getdata:function () {
        let vm = this;
        vm.refreshing = true;
        $.ajax({
          url: vm.path+"device2/devicelist.action",
          dataType: "json",
          data: vm.searchmess,
          type: "get",
          success: function(data) {
            console.log(data);
            vm.refreshing = false;
            vm.loading = false;
            vm.able = true;
            vm.allow = false;
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

