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

</style>


<template>
  <div class="main">
    <div class="header">
      <mu-appbar title="闲置资产" style="text-align: center">
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
                <mu-select-field v-model="searchAll['leaveonlineCust.isIdeleLine']" label="选择状态">
                  <mu-menu-item value="0" title="闲置申请"/>
                  <mu-menu-item value="1" title="审批经理同意"/>
                  <mu-menu-item value="2" title="资产管理同意"/>
                  <mu-menu-item value="3" title="闲置成功"/>
                  <mu-menu-item value="4" title="申请上线"/>
                  <mu-menu-item value="5" title="选人同意"/>
                  <mu-menu-item value="6" title="资产管理同意"/>
                  <mu-menu-item value="7" title="上线成功"/>
                </mu-select-field>
                <mu-text-field label="使用人"   hintText="请输入使用人"    v-model="searchAll['leaveonlineCust.candidateName']"     labelFloat/>
                <mu-text-field label="审批经理"     hintText="请输入审批经理"      v-model="searchAll['leaveonlineCust.managerName']"        labelFloat/>
                <mu-text-field label="资产经理"   hintText="请输入资产经理"    v-model="searchAll['leaveonlineCust.propertyAdminName']" labelFloat/>
                <mu-text-field label="申请人"     hintText="请输入设备SN"      v-model="searchAll['leaveonlineCust.applyEmpId']"       labelFloat/>
                <mu-text-field label="设备名称"   hintText="请输入设备名称"    v-model="searchAll['leaveonlineCust.deviceName']"    labelFloat/>
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
          <mu-menu-item title="使用人" @click="searchitem('使用人','leaveonlineCust.candidateName')"/>
          <mu-menu-item title="审批经理" @click="searchitem('审批经理','leaveonlineCust.managerName')"/>
          <mu-menu-item title="资产经理" @click="searchitem('资产经理','leaveonlineCust.propertyAdminName')"/>
          <mu-menu-item title="申请人" @click="searchitem('申请人','leaveonlineCust.applyEmpId')"/>
          <mu-menu-item title="设备名称" @click="searchitem('设备名称','leaveonlineCust.deviceName')"/>
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
            <mu-th>申请人</mu-th>
          </mu-tr>
        </mu-thead>
        <mu-tbody>
          <mu-tr v-for="item in data">
            <mu-td>{{item.deviceSn}}</mu-td>
            <mu-td style="padding-left: 15px">{{item.deviceName}}</mu-td>
            <mu-td>{{item.applyName}}</mu-td>
          </mu-tr>
        </mu-tbody>
      </mu-table>
      <mu-divider/>
      <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
    </div>
    <div style="position: fixed;bottom: 80px;right: 20px">
      <mu-raised-button label="详情" ref="button" @click="itemshow=true" primary :disabled="able"/>
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
        able:true,
        itemshow:false,
        draweropen:false,
        refreshing:false,
        trigger: null,
        loading: false,
        scroller: null,
        data:[],
        searchText:"",
        hintText:"请根据使用人搜索",
        startPage:1,
        totalPage:100,
        leftTop: {horizontal: 'left', vertical: 'top'},
        serchType:"leaveonlineCust.candidateName",
        searchmess:{
          page:1,
          rows:20,
          empNo:localStorage.getItem('empNo')
        },
        searchAll:{
          empNo:localStorage.getItem('empNo'),
          'leaveonlineCust.candidateName':"",//使用人
          'leaveonlineCust.managerName':"",//审批经理
          'leaveonlineCust.propertyAdminName':"",//资产经理
          'leaveonlineCust.applyEmpId':"",//申请人
          'leaveonlineCust.deviceName':"",//设备名称
          'leaveonlineCust.isIdeleLine':"0"//当前状态
        },
        dataItem:{}
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
          this.dataItem.设备名称 = this.data[val].deviceName;
          this.dataItem.设备SN = this.data[val].deviceSn;
          this.dataItem.申请人 = this.data[val].applyName;
          this.dataItem.当前状态 = this.data[val].newExamineStutas;
          this.dataItem.设备规格 = this.data[val].deviceSpec;
          this.dataItem.设备类型 = this.data[val].assetTypeName;
          this.dataItem.闲置区域 = this.data[val].areaName;
          this.dataItem.闲置地点 = this.data[val].placeName;
          this.dataItem.仓管员 = this.data[val].assetManagerName;
          this.dataItem.审核经理 = this.data[val].managerName;
          this.dataItem.资产管理员 = this.data[val].assetManagerName;
          this.dataItem.上线申请人 = this.data[val].lineApplyName;
          this.dataItem.上线地点 = this.data[val].lineareaName;
          this.dataItem.使用人 = this.data[val].empName;
          this.dataItem.使用人上级 = this.data[val].candidateSuper;
          this.dataItem.解决方案 = this.data[val].solution;
          this.dataItem.入库时间 = this.data[val].storageTime;
          this.dataItem.出库时间 = this.data[val].deliveryTime;
          this.dataItem.闲置审批经理 = this.data[val].examineManagerExamineStutasname;
          this.dataItem.闲置资产经理 = this.data[val].propertyAdminExamineStutasname;
          this.dataItem.闲置审批仓管员 = this.data[val].warehokeStuName;
          this.dataItem.使用人审批 = this.data[val].candidateExamineStutasname;
          this.dataItem.上线资产经理 = this.data[val].linepropertyAdminExamineStutasname;
          this.dataItem.上线仓管员审批 = this.data[val].warehokeLineStuName;
          this.dataItem.闲置原因说明 = this.data[val].leaveApplyNote;
        }else {
          this.able = true;
        }
        console.log(val);

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
          url: vm.path+"leaveonline/leaveonlinelist.action",
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

