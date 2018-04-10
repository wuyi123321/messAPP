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
    padding-left: 15px;
    padding-right: 15px;
  }
  .main .mu-popover {
    overflow: scroll;
  }

</style>


<template>
  <div class="main">
    <div class="header">
      <mu-appbar title="新增维修" style="text-align: center">
        <mu-icon-button icon="navigate_before" slot="left" @click="back"/>
        <mu-icon-button  icon="more_vert" slot="right">
        </mu-icon-button >
      </mu-appbar>
    </div>
    <div id="eqscoll" ref="eqscoll">
      <mu-text-field label="设备名称"   hintText="请输入查询内容"   v-model="dataItem['drepairCust.deviceName']"  @focus="getItem" labelFloat fullWidth/>
      <mu-text-field label="设备SN"   hintText="请输入借用部门"    v-model="dataItem['scrapCust.drDeviceSn']"   disabled  labelFloat fullWidth/>
      <mu-text-field label="出厂时间"   hintText="请输入使用地点"    v-model="dataItem['drepairCust.outputdate']"   disabled  labelFloat fullWidth/>
      <mu-date-picker label="异常开始时间"   hintText="请输入异常开始时间"    v-model="dataItem['drepairCust.drFaultDate']"     labelFloat fullWidth/>
      <mu-select-field v-model="dataItem['drepairCust.drFaultType']"  label="异常类别" labelFloat fullWidth>
        <mu-menu-item value="工作时异常" title="工作时异常"/>
        <mu-menu-item value="非工作时异常" title="非工作时异常"/>
        <mu-menu-item value="点检异常" title="点检异常"/>
      </mu-select-field>
      <mu-select-field v-model="dataItem['drepairCust.drUrgency']"  label="紧急状态" labelFloat fullWidth>
        <mu-menu-item value="0" title="非紧急"/>
        <mu-menu-item value="1" title="一般"/>
        <mu-menu-item value="2" title="紧急"/>
      </mu-select-field>
      <mu-text-field label="异常描述"   hintText="请输入备注"    v-model="dataItem['drepairCust.drFaultNote']"    labelFloat fullWidth/>
      <mu-text-field label="申请备注"   hintText="请输入备注"    v-model="dataItem['drepairCust.drNote']"    labelFloat fullWidth/>
      <mu-select-field v-model="dataItem['drepairCust.faultCode']"  label="故障代码" labelFloat fullWidth>
        <mu-menu-item  v-for="i in types" :value="i.faultCode" :title="i.faultType" />
      </mu-select-field>
      <mu-select-field v-model="dataItem['drepairCust.drFix']"  label="内修/外修" @change="changeType" labelFloat fullWidth>
        <mu-menu-item value="1" title="内修"/>
        <mu-menu-item value="2" title="外修"/>
      </mu-select-field>
      <mu-select-field v-model="dataItem['drepairCust.drApprovalEmp']"  label="审核人"  v-show="dataItem['drepairCust.drFix']=='2'" labelFloat fullWidth>
        <mu-menu-item  v-for="i in appPer" :value="i.empNo" :title="i.empName" />
      </mu-select-field>
    </div>
    <div style="position: fixed;bottom: 80px;right: 20px">
      <mu-raised-button label="确定新增" ref="button" @click="toggle" primary />
    </div>
  </div>
</template>
<script>

  export default {
    data () {
      return {
        dataItem:{
         empNo:localStorage.getItem('empNo'),
        "scrapCust.drDeviceSn":"",
        "drepairCust.drDeviceId":"",
        "drepairCust.drStatus":"0",
        "drepairCust.deviceName":"",
        "drepairCust.outputdate":"",
        "drepairCust.drFaultDate":"",
        "drepairCust.drFaultType":"工作时异常",
        "drepairCust.drUrgency":"0",
        "drepairCust.drFaultNote":"",
        "drepairCust.drNote":"",
        "drepairCust.faultCode":1,
        "drepairCust.drFix":"1",
        "drepairCust.drApprovalEmp":""
        },
        types:[],
        appPer:[],

      }
    },

    mounted:function () {
      var loclitem = JSON.parse(localStorage.getItem('eqItem'));
      console.log(loclitem);
      this.getdata();
      this.getPerdata();
      if(loclitem){
        this.dataItem['drepairCust.drDeviceId'] = loclitem.deviceId;
        this.dataItem['drepairCust.deviceName'] = loclitem.deviceName;
        this.dataItem['scrapCust.drDeviceSn'] = loclitem.deviceSn;
        this.dataItem['drepairCust.outputdate'] = loclitem.outputdate;

      }
    },
    watch: {
    },

    methods: {
      changeType:function (val) {
        console.log(val);
        if(val==1){
          this.dataItem["drepairCust.drStatus"] = "0";
          dataItem['drepairCust.drApprovalEmp'] = "";
        }
        if(val == 2){
          this.dataItem["drepairCust.drStatus"] = "-1"
        }
      },
      getdata:function () {
        var vm = this;
        $.ajax({
          url: vm.path+"device2/selectFaultCodeAndType.action",
          dataType: "json",
          data: {},
          type: "get",
          success: function(data) {
            console.log(data);
            vm.types = data
          },
          error: function() {

          }
        });
      },
      getPerdata:function () {
        var vm = this;
        $.ajax({
          url: vm.path+"select/empdesc_query_list.action?empDescCust.manageDeviceArea=1",
          dataType: "json",
          data: {},
          type: "get",
          success: function(data) {
            console.log(data);
            vm.appPer = data
          },
          error: function() {

          }
        });
      },
      toggle:function () {
        var vm = this;
        if(vm.dataItem['scrapCust.dsDeviceName']==""){
          this.$message("请选择设备");
          return 0;
        }
        this.allow = !this.allow;
        localStorage.removeItem('eqItem');
        $.ajax({
          url: vm.path+"device2/repairadd_submit.action",
          dataType: "json",
          data: vm.dataItem,
          type: "post",
          success: function(data) {
            console.log(data);
            vm.$message(data.resultInfo.message);
            if(data.resultInfo.message == "新增成功"){
              vm.back();
            }
          },

          error: function() {

          }
        });
      },
      getItem:function () {
        this.$router.replace({path:"equipment",query: {seled:1,fromurl:'addrepair'} })
      },
      back:function () {
        localStorage.removeItem('eqItem');
        this.$router.go(-1)
      },

    }
  }
</script>

