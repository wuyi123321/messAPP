// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Factclick from  'fastclick'
import axios from "axios"
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-teal.css'
import $ from 'jquery'
import Velocity from 'velocity-animate'
import userNo from '../static/ind/config'
Vue.use(MuseUI);
Vue.prototype.$http=axios
Vue.config.productionTip = false
Factclick.attach(document.body);
Vue.prototype.path = "http://appinter.sunwoda.com/common/knowledgeSharing/"
// Vue.prototype.path = "http://appinter.sunwoda.com/weixin/knowledgeSharing/"
 // Vue.prototype.path = "http://172.30.128.32:8081/swdAPP/weixin/knowledgeSharing/"
console.log(window.location.toString().split("token=")[1]);
Vue.prototype.token = window.location.toString().split("token=")[1];
// Vue.prototype.token = "73938de85af7d0128e400b1988077ddd";
Vue.prototype.userNo = userNo
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
