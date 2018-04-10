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
    padding-left: 15px;
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
    height: 46px;
    padding-top: 5px;
    padding-bottom: 5px;
    display: flex;
    display: -webkit-box;
    justify-content: center;
  }
  .item_content{
    flex: 1;
    overflow: auto;

  }

  .mu-text-field.has-label .mu-text-field-content{
   padding-bottom: 0;
    padding-top: 28px;
    padding-left: 10px;
  }
  .mu-text-field-content {
    padding-bottom: 0;
    padding-left: 10px;
  }
</style>


<template>
  <div class="main">
    <div class="header">
      <mu-appbar title="设备台账" style="text-align: center">
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
    <div id="eqscoll" ref="eqscoll">

      <mu-divider/>
      <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
      <mu-table showCheckbox :fixedHeader="true" ref="table" @rowSelection="showItem($event)">
        <mu-thead>
          <mu-tr>
            <mu-th><span style="color: #009688;width: 100%;text-align: center">设备SN</span></mu-th>
            <mu-th><span style="color: #009688">设备名称</span></mu-th>
            <mu-th>设备类型</mu-th>
          </mu-tr>
        </mu-thead>
        <mu-tbody>
          <mu-tr v-for="item in data">
            <mu-td>{{item.deviceSn}}</mu-td>
            <mu-td style="padding-left: 15px">{{item.deviceName}}</mu-td>
            <mu-td>{{item.deviceTypeName}}</mu-td>
          </mu-tr>
        </mu-tbody>
      </mu-table>
      <mu-divider/>
      <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
    </div>
    <div style="position: fixed;bottom: 80px;right: 20px">

      <mu-raised-button label="确认选择" ref="button" @click="selectIt" primary :disabled="able" v-if="seled==1"/>
      <mu-raised-button label="详情" ref="button" @click="itemshow=true" primary :disabled="able" v-else/>
    </div>
    <div class="itemmess" v-show="itemshow">
      <div class="itemcontent">
        <div class="item_top">
          <mu-raised-button label="修改" @click="updata"  primary/>
          <span style="width: 5px"></span>
          <mu-raised-button label="取消"  primary @click="itemshow = false"/>
        </div>
        <div class="item_content" v-if="dataItem">
          <mu-divider/>
          <mu-text-field label="设备名称"   hintText="请输入查询内容"   v-model="dataItem.deviceName"  labelFloat/>
          <mu-text-field label="设备SN"   hintText="请输入借用部门"    v-model="dataItem.deviceSn"   disabled  labelFloat/>
          <mu-text-field label="原设备编号"   hintText="请输入仪校编号"    v-model="dataItem.deviceOldSn"    labelFloat/>
          <mu-text-field label="资产性质"   hintText="请输入仪校编号"    v-model="dataItem.assetTypeName"    labelFloat/>
          <mu-text-field label="资产编号"   hintText="请输入借用主管"    v-model="dataItem.assetNumber" labelFloat/>
          <mu-text-field label="仪校编号"     hintText="请输入设备SN"      v-model="dataItem.internalId"       labelFloat/>
          <mu-text-field label="规格型号"   hintText="请输入使用地点"    v-model="dataItem.deviceSpec"     labelFloat/>
          <mu-text-field label="设备类型"   hintText="请输入使用地点"    v-model="dataItem.deviceTypeName"     labelFloat/>
          <mu-text-field label="资产归属"   hintText="请输入规格型号"    v-model="dataItem.assetOrgName"    labelFloat/>
          <mu-text-field label="资产管理员" hintText="请输入原设备编号"  v-model="dataItem.assetManagerName"   labelFloat/>
          <mu-text-field label="借用部门" hintText="请输入原设备编号"  v-model="dataItem.manageOrgName"   labelFloat/>
          <mu-text-field label="借用人"   hintText="请输入规格型号"    v-model="dataItem.emp"    labelFloat/>
          <mu-text-field label="借用主管"   hintText="请输入规格型号"    v-model="dataItem.leaderEmp"    labelFloat/>
          <mu-text-field label="所属区域"   hintText="请输入仪校编号"    v-model="dataItem.areaname"   disabled labelFloat/>
          <mu-text-field label="使用地点"   hintText="请输入使用地点"    v-model="dataItem.placeName"  disabled  labelFloat/>
          <mu-text-field label="设备厂商"   hintText="请输入仪校编号"    v-model="dataItem.manufacturer"    labelFloat/>
          <mu-text-field label="使用年限"   hintText="请输入仪校编号"    v-model="dataItem.durableYears"    labelFloat/>
          <mu-text-field label="出厂日期"   hintText="请输入使用地点"    v-model="dataItem.outputdate"     labelFloat/>
          <mu-text-field label="购买时间"   hintText="请输入使用地点"    v-model="dataItem.buydate"     labelFloat/>
          <mu-text-field label="设备状态"   hintText="请输入使用地点"    v-model="dataItem.statusName"     labelFloat/>
          <mu-text-field label="是否验收"   hintText="请输入使用地点"    v-model="dataItem.isAcceptanceName"     labelFloat/>
          <mu-text-field label="验收单号"   hintText="请输入使用地点"    v-model="dataItem.acceptanceId"     labelFloat/>
          <mu-text-field label="验收时间"   hintText="请输入使用地点"    v-model="dataItem.acceptanceDate"     labelFloat/>
          <mu-text-field label="新增时间"   hintText="请输入使用地点"    v-model="dataItem.deviceAddDate"     labelFloat/>
          <mu-text-field label="审核人"   hintText="请输入使用地点"    v-model="dataItem.assetManagerName"     labelFloat/>
          <mu-text-field label="资产原值" hintText="请输入原设备编号"  v-model="dataItem.deviceAssets"   labelFloat/>
          <mu-text-field label="资产净值"   hintText="请输入规格型号"    v-model="dataItem.deviceNet"    labelFloat/>
          <mu-text-field label="设备备注"   hintText="请输入规格型号"    v-model="dataItem.deviceParameter"    labelFloat/>
          <mu-text-field label="设备速率" hintText="请输入原设备编号"  v-model="dataItem.speed"   labelFloat/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    data () {
      return {
        able:true,
        itemshow:false,
        draweropen:false,
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
          page:1,
          rows:20,
          empNo:localStorage.getItem('empNo')
        },
        searchAll:{
          empNo:localStorage.getItem('empNo'),
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
        dataItem:{},
        seled:0,
        fromurl:""
      }
    },

    mounted:function () {
      this.seled=this.$route.query.seled;
      this.fromurl=this.$route.query.fromurl;

      this.refreshing = true;
      this.getdata();
      this.scroller =this.$refs.eqscoll;
      this.trigger = this.$refs.eqscoll;
    },
    watch: {
    },

    methods: {
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
      selectIt:function () {
         localStorage.setItem('eqItem',JSON.stringify(this.dataItem));
         this.$router.replace({ path: this.fromurl});
      },
      showItem:function(val){
        if(val>=0){
          this.able = false;
        }else {
          this.able = true;
        }
        console.log(val);
        this.dataItem = this.data[val];
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
        this.searchmess[this.serchType] = this.searchText
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

      getdata:function () {
        let vm = this;
        vm.refreshing = true;

        console.log("----------------"+$("#eqscoll").scrollTop())
        $.ajax({
          url: vm.path+"device2/devicelist.action",
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
        this.$router.go(-1);
      },
      updata:function () {

        var vm = this;
        var pram={}
        for(var i in vm.dataItem){
          pram['deviceCust.'+i] = vm.dataItem[i]
        }


        console.log(pram);
        $.ajax({
          url: vm.path+"/device2/deviceedit_submit.action",
          dataType: "json",
          data: pram,
          type: "post",
          success: function(data) {
            console.log(data);
            vm.$message(data.resultInfo.message);
            vm.itemshow = false;
          },
          error: function() {

          }
        });
      }

    }
  }
</script>

