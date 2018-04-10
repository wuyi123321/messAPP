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

</style>


<template>
  <div class="main">
    <div class="header">
      <mu-appbar title="新增报废" style="text-align: center">
        <mu-icon-button icon="navigate_before" slot="left" @click="back"/>
        <mu-icon-button  icon="more_vert" slot="right">
        </mu-icon-button >
      </mu-appbar>

    </div>
    <div id="eqscoll" ref="eqscoll">
      <mu-text-field label="设备名称"   hintText="请输入查询内容"   v-model="dataItem['scrapCust.dsDeviceName']"  @focus="getItem" labelFloat fullWidth/>
      <mu-text-field label="设备SN"   hintText="请输入借用部门"    v-model="dataItem['scrapCust.dsDeviceSn']"   disabled  labelFloat fullWidth/>
      <mu-text-field label="使用地点"   hintText="请输入使用地点"    v-model="dataItem['scrapCust.place']"  disabled  labelFloat fullWidth/>
      <mu-text-field label="购买时间"   hintText="请输入使用地点"    v-model="dataItem['scrapCust.buydate']"   disabled  labelFloat fullWidth/>
      <mu-text-field label="使用年限"   hintText="请输入仪校编号"    v-model="dataItem['scrapCust.durableYears']"   disabled  labelFloat fullWidth/>
      <mu-text-field label="规格型号"   hintText="请输入使用地点"    v-model="dataItem['scrapCust.dsDeviceSpec']"    disabled  labelFloat fullWidth/>
      <mu-date-picker label="处理时间"   hintText="请输入处理时间"    v-model="dataItem['scrapCust.dsScrapDate']"     labelFloat fullWidth/>
      <mu-text-field label="报废原因"   hintText="请输入处理时间"    v-model="dataItem['scrapCust.dsCause']"     labelFloat fullWidth/>
      <mu-text-field label="备注"   hintText="请输入备注"    v-model="dataItem['scrapCust.dsNote']"    labelFloat fullWidth/>

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
          "scrapCust.dsDeviceId":"",
          "scrapCust.dsStatus":"",
          "scrapCust.dsDeviceName":"",
          "scrapCust.dsDeviceSn":"",
          "scrapCust.place":"",
          "scrapCust.empName":"",
          "scrapCust.durableYears":"",
          "scrapCust.buydate":"",
          "scrapCust.dsDeviceSpec":"",
          "scrapCust.dsScrapDate":"",
          "scrapCust.dsCause":"",
          "scrapCust.dsNote":''
        }

      }
    },

    mounted:function () {
      var loclitem = JSON.parse(localStorage.getItem('eqItem'));
      console.log(loclitem);
      if(loclitem){
        this.dataItem['scrapCust.dsDeviceId'] = loclitem.deviceId;
        this.dataItem['scrapCust.dsDeviceName'] = loclitem.deviceName;
        this.dataItem['scrapCust.dsDeviceSn'] = loclitem.deviceSn;
        this.dataItem['scrapCust.dsStatus'] = loclitem.status;
        this.dataItem['scrapCust.place'] = loclitem.place;
        this.dataItem['scrapCust.buydate'] = loclitem.buydate;
        this.dataItem['scrapCust.durableYears'] = loclitem.durableYears;
        this.dataItem['scrapCust.dsDeviceSpec'] = loclitem.deviceSpec;
      }
    },
    watch: {
    },

    methods: {

      toggle:function () {
        var vm = this;
        if(vm.dataItem['scrapCust.dsDeviceName']==""){
          this.$message("请选择设备");
          return 0;
        }
        this.allow = !this.allow;

        vm.dataItem['scrapCust.dsScrapDate'] = vm.dataItem['scrapCust.dsScrapDate']
        localStorage.removeItem('eqItem');
        $.ajax({
          url: vm.path+"device2/scrapadd_submit.action",
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
        this.$router.replace({path:"equipment",query: {seled:1,fromurl:'addScrap'} })
      },
      back:function () {
        localStorage.removeItem('eqItem');
        this.$router.go(-1)
      },

    }
  }
</script>

