<style scoped>
  .child-view {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transition: all .5s cubic-bezier(.55,0,.1,1);
  }
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(300px, 0);
    transform: translate(300px, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-300px, 0);
    transform: translate(-300px, 0);
  }
  .loading{
   position: fixed;
    background-color: rgba(0,0,0,0.3);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #fff;
    font-size: 0.3rem;
  }
</style>
<template>
  <div>
      <transition :name="transitionName">
        <router-view class="child-view"></router-view>
      </transition>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        transitionName: 'slide-left'
      }
    },
    mounted () {
    },
    //监听路由的路径，可以通过不同的路径去选择不同的切换效果
    watch: {
      '$route' (to, from) {
        console.log(from);
         if(from.path == '/maintain' || from.path == '/equipment' ||　from.path == '/equipmentApproval'　|| from.path == '/lessuse' || from.path == '/rent' || from.path == '/scrap' || from.path == '/repair'){
           console.log("+++++++++++++++++++++++++++++++");
          this.transitionName = 'slide-right';
        }
        else{
          this.transitionName = 'slide-left';
        }
      }
    }
  }
</script>
