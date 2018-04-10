import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  routes: [
    {path: '/', redirect: '/login'},
    {path: '/login', component: resolve => require(['@/components/page/login.vue'], resolve),},
    {path: '/index', component: resolve => require(['@/components/page/index.vue'], resolve),
        children:[
            {path: '/',redirect: '/model'},
            {path: '/model', component: resolve => require(['@/components/page/model/model.vue'], resolve),},
            {path: '/approval', component: resolve => require(['@/components/page/approval/approval.vue'], resolve),},
            {path: '/my', component: resolve => require(['@/components/page/my/my.vue'], resolve),}
        ]},
    {path: '/equipment', component: resolve => require(['@/components/page/model/item/equipment.vue'], resolve),},
    {path: '/lessuse', component: resolve => require(['@/components/page/model/item/lessuse.vue'], resolve),},
    {path: '/rent', component: resolve => require(['@/components/page/model/item/rent.vue'], resolve),},
    {path: '/maintain', component: resolve => require(['@/components/page/model/item/maintain.vue'], resolve),},
    {path: '/repair', component: resolve => require(['@/components/page/model/item/repair.vue'], resolve),},
    {path: '/scrap', component: resolve => require(['@/components/page/model/item/scrap.vue'], resolve),},
    {path: '/selectPer', component: resolve => require(['@/components/page/model/item/selectPer.vue'], resolve),},
    {path: '/addScrap', component: resolve => require(['@/components/page/model/additem/addScrap.vue'], resolve),},
    {path: '/addrepair', component: resolve => require(['@/components/page/model/additem/addrepair.vue'], resolve),},
    {path: '/addrent', component: resolve => require(['@/components/page/model/additem/addrent.vue'], resolve),},
    {path: '/equipmentApproval', component: resolve => require(['@/components/page/approval/approvalitem/equipmentApproval.vue'], resolve),},
    {path: '/lessuseApproval', component: resolve => require(['@/components/page/approval/approvalitem/lessuseApproval.vue'], resolve),},
    {path: '/repairApproval', component: resolve => require(['@/components/page/approval/approvalitem/repairApproval.vue'], resolve),},
  ]
})
