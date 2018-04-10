<style scoped>
  #count .mu-item-right{
    width: auto;
  }

  .mu-list{
    padding-bottom: 0;
  }
</style>
<template>

  <div class="main" id="count" >
    <div>
      <mu-list>
        <div @click="goforumItem('equipmentApproval')" >
          <mu-list-item title="设备台账审核" >
            <mu-avatar icon="forum" slot="leftAvatar"/>
            <mu-badge content="10" secondary slot="right"/>
          </mu-list-item>
          <mu-divider/>
        </div>
      </mu-list>
      <mu-list>
        <div @click="goforumItem('scrap')" >
          <mu-list-item title="报废审核" >
            <mu-avatar icon="forum" slot="leftAvatar"/>
            <mu-badge content="5" secondary slot="right"/>
          </mu-list-item>
          <mu-divider/>
        </div>
      </mu-list>
      <mu-list>
        <div @click="goforumItem('repairApproval')" >
          <mu-list-item title="外修审核" >
            <mu-avatar icon="forum" slot="leftAvatar"/>
            <mu-badge content="5" secondary slot="right"/>
          </mu-list-item>
          <mu-divider/>
        </div>
      </mu-list>
    </div>

  </div>
</template>
<script>

  export default {
    props:{

    },
    data () {
      return {

      }


    },
    mounted:function () {
      console.log(this.data);
    },
    methods: {
      goforumItem:function (url) {
        var self = this;
        this.$router.push({ path: url, });
      }
    }
  }
</script>
