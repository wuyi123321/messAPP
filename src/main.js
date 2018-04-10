// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Factclick from  'fastclick'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-teal.css'
import $ from 'jquery'
import 'element-ui/lib/theme-default/index.css'
import { Message } from 'element-ui';
import dateFns from 'date-fns';

Vue.prototype.dateFns = dateFns;
Vue.use(MuseUI);
Vue.prototype.$message = Message;
Vue.prototype.$ELEMENT = { size: 'small' };

// Factclick.attach(document.body);

// Vue.prototype.path = "http://192.168.9.132:8088/mesproject/"
Vue.prototype.path = "http://172.16.98.106:8080/mesproject/"
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
