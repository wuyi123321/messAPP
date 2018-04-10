<style scoped>
  .main{
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .header{
    height: 56px;
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


 .main .mu-popup {
    background-color: #ffffff;
    width: 100%;
  }
  .mu-text-field.has-label{
    width: 100%;
  }

  .popbottom{
    display: flex;
    justify-content: flex-end;
    background-color: #009688;
    padding: 5px
  }
  .popbottom span{
    font-size: 0.28rem;
    color: #fff;
    padding: 5px;
    padding-left: 10px;
    padding-right: 10px;
    margin-right: 5px;
    border: solid 1px #eeeeee;
    border-radius: 5px;
  }

  .popbottom span:hover{
    background-color: rgba(0,0,0,0.4);
  }
</style>


<template>
  <div class="main">
    <div class="header">
      <mu-appbar title="外修审核" style="text-align: center">
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
                <mu-text-field label="申请单ID"   hintText="请输入申请单ID"    v-model="searchAll['drepairCust.drRepairId']"     labelFloat/>
                <mu-text-field label="申请填单人"     hintText="请输入填单人"  v-model="searchAll['drepairCust.drApplyEmpName']"        labelFloat/>
                <mu-select-field v-model="searchAll['drepairCust.drUrgency']" label="紧急程度">
                  <mu-menu-item value="-1" title="请选择"/>
                  <mu-menu-item value="0" title="非紧急"/>
                  <mu-menu-item value="1" title="一般"/>
                  <mu-menu-item value="2" title="紧急"/>
                </mu-select-field>
                <mu-text-field label="设备名称"   hintText="请输入设备名称"    v-model="searchAll['drepairCust.deviceName']"     labelFloat/>
                <mu-text-field label="位置"     hintText="请输入设备位置"      v-model="searchAll['drepairCust.place']"        labelFloat/>
              </div>
          </div>
        </div>

      </mu-drawer>
    </div>
    <div id="eqscoll" ref="eqscoll">

      <mu-divider/>
      <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
      <mu-table showCheckbox :fixedHeader="true" ref="table"  @rowSelection="showItem($event)">
        <mu-thead>
          <mu-tr>
            <mu-th><span style="color: #009688;width: 100%;text-align: center">设备SN</span></mu-th>
            <mu-th><span style="color: #009688">设备名称</span></mu-th>
            <mu-th>维修状态</mu-th>
          </mu-tr>
        </mu-thead>
        <mu-tbody>
          <mu-tr v-for="item in data" >
            <mu-td>{{item.deviceSn}}</mu-td>
            <mu-td style="padding-left: 15px">{{item.deviceName}}</mu-td>
            <mu-td>{{item.repairStatusName}}</mu-td>
          </mu-tr>
        </mu-tbody>
      </mu-table>
      <mu-divider/>
      <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
    </div>
    <div style="position: fixed;bottom: 80px;right: 20px">
      <div v-show="allow">

        <!--<mu-raised-button label="新增维修" ref="button" @click="addscrap()" primary/>-->
        <!--<p style="height: 5px"></p>-->
        <mu-raised-button label="通过" ref="button" @click="approve(1)" :disabled="approveable" primary/>
        <p style="height: 5px"></p>
        <mu-raised-button label="驳回" ref="button" @click="approve(2)" :disabled="approveable" primary/>
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
    <mu-popup position="bottom" popupClass="demo-popup-bottom" :open="bottomPopup" @close="bottomPopup=false">
      <div class="popbottom">
        <span @click="bottomPopup=false">取消</span>
        <span @click="subAppro">提交</span>
      </div>
      <mu-content-block>
        <mu-text-field label="审批备注" :hintText="approtxt" v-model="recont"/>
      </mu-content-block>
    </mu-popup>
  </div>
</template>
<script>

  export default {
    data () {
      return {
        bottomPopup:false,
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
        repirType:"1",
        startPage:1,
        totalPage:100,
        searchmess:{
          page:1,
          rows:20,
          empNo:localStorage.getItem('empNo'),
          "drepairCust.drFix":"2",
          "drepairCust.drStatus":"-1",
          "drepairCust.drApprovalEmp":localStorage.getItem('empNo'),
        },
        recont:"",
        approtxt:"",
        searchAll:{
          empNo:localStorage.getItem('empNo'),
          "drepairCust.drApprovalEmp":localStorage.getItem('empNo'),
          "drepairCust.drRepairId":"",
          "drepairCust.drFix":"2",
          "drepairCust.deviceTypeName":"",
          "drepairCust.deviceType":"-1",
          "drepairCust.repairIdStr":"",
          "drepairCust.drStatus":"-1",
          "drepairCust.drUrgency":"-1",
          "drepairCust.drApplyEmpName":"",
          "drepairCust.areaName":"",
          "drepairCust.areaId":"-1",
          "drepairCust.faultCode":"",
          "drepairCust.deviceName":"",
          "drepairCust.place":"",
          "drepairCust.manageOrgName":"",
          "drepairCust.manageOrg":"",
          "drepairCust.startDate":"",
          "drepairCust.endDate":"",
        },
        dataItem:{},      //选择修改后的模块
        dataItemBe:{},   //选中的原生子模块内容
        isapproval:true,//是否是通过
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
//      提交审核确定
      subAppro:function () {
        var vm = this;
        var pram={}
        vm.dataItemBe.drApprovalNote = vm.recont;
        vm.dataItemBe.drApprovalDate = vm.dateFns.format(new Date(),"YYYY-MM-dd hh:mm:ss");
        vm.dataItemBe.drApprovalEmp = localStorage.getItem('empNo');
        vm.dataItemBe.drStatus ='0';
        if( this.isapproval == true){//通过操作
         }else {//驳回操作
             this.dataItemBe.drFix ='1';
         }
        for(var i in vm.dataItemBe){
          pram['drepairCust.'+i] = vm.dataItemBe[i]
        }
        console.log(pram);
        pram.empNo=localStorage.getItem('empNo');
        $.ajax({
          url: vm.path+"device2/repairedit_submit.action",
          dataType: "json",
          data: pram,
          type: "get",
          success: function(data) {
            vm.$message(data.resultInfo.message);
            vm.bottomPopup = false;
            vm.data=[];
            vm.getdata();
          },
          error: function() {

          }
        });

      },
      showItem:function(val){
        console.log(val);
        this.dataItem = {};
        if(val>=0){
            this.dataItemBe = this.data[val];
            this.able = false;
            this.approveable = false;
            this.dataItem.设备名称 = this.data[val].deviceName;
            this.dataItem.设备SN = this.data[val].deviceSn;
            this.dataItem.设备规格 = this.data[val].deviceSpec;
            this.dataItem.原编号 = this.data[val].deviceOldSn;
            this.dataItem.仪校编号 = this.data[val].internalId;
            this.dataItem.资产编号 = this.data[val].assetNumber;
            this.dataItem.设备规格 = this.data[val].deviceStatus;
            this.dataItem.责任人 = this.data[val].empName;
            this.dataItem.维修人 = this.data[val].repairEmpName;
            this.dataItem.维修单状态 = this.data[val]. repairStatusName;
            this.dataItem.紧急程度 = this.data[val].urgencyName;
            this.dataItem.申报人名称 = this.data[val].drOutdeclareEmpName;
            this.dataItem.出厂日期 = this.data[val].outputdateStr;
            this.dataItem.申请单Id = this.data[val].repairIdStr;
            this.dataItem.维修结束日期 = this.data[val].repairEndDateStr;
            this.dataItem.维修结果 = this.data[val].repairResultName;
            this.dataItem.外修审核人 = this.data[val].drApprovalEmpName;
            this.dataItem.外修审核备注 = this.data[val].drApprovalNote;
            this.dataItem.管理设别区域 = this.data[val].manageDeviceArea;
            this.dataItem.申请填单人 = this.data[val].drApplyEmpName;
            this.dataItem.限制查询部门 = this.data[val].selectOrg;
            this.dataItem.异常开始时间=this.data[val].drFaultDate;
            this.dataItem.异常描述=this.data[val].drFaultNote;
            this.dataItem.异常类别=this.data[val].drFaultType;
            this.dataItem.紧急程度=this.data[val].drUrgency;
            this.dataItem.申请备注=this.data[val].drNote;
            this.dataItem.维护人员=this.data[val].repairEmp;
            this.dataItem.维修开始=this.data[val].repairStartDate;
            this.dataItem.维修结束=this.data[val].repairEndDate;
            this.dataItem.维修时间=this.data[val].repairSpendDate;
            this.dataItem.维修处理意见=this.data[val].repairOpinion;
            this.dataItem.维修结果=this.data[val].repairResult;
            this.dataItem.零件更换记录=this.data[val].repairNote;
            this.dataItem.维修花费=this.data[val].repairSpend;
            this.dataItem.验收评价=this.data[val].drEvaluation;
            this.dataItem.验收备注=this.data[val].drEvaluationNote;
          }
          console.log(this.dataItem);
          console.log(this.data[val]);
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

      addscrap:function () {
        this.$router.push({ path: '/addrepair'});
      },
      approve:function (type) {
        //通过
       if(type==1){
            this.bottomPopup = true;
            this.isapproval = true;
            this.approtxt="请填写通过备注"
       }

       if(type==2){
         this.bottomPopup = true;
         this.isapproval = false;
         this.approtxt="请填写驳回备注"
       }

      },
      getdata:function () {
        let vm = this;
        vm.refreshing = true;
        $.ajax({
          url: vm.path+"device2/repairlist.action",
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

