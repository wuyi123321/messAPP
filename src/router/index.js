import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/page/index'
import sunvideo from '@/components/page/SunVideo/sunvideo'
import templet from '@/components/page/Template/templet'
import gallery from '@/components/page/Gallery/gallery'
import companyprofile from '@/components/page/CompanyProfile/companyprofile'
import learnresource from '@/components/page/LearnResource/learnresource'
import presidentspeech from '@/components/page/presidentSpeech/presidentspeech'
import processmanagement from '@/components/page/ProcessManagement/processmanagement'
import forum from '@/components/page/forum/forum'
import pdfRead from '@/components/common/pdfRead'
import videoPlay from '@/components/common/videoPlay'
import fileitem from '@/components/common/fileitem'
import myforum from '@/components/page/forum/children/my'
import forummessage from '@/components/page/forum/children/message'
import forumcard from '@/components/page/forum/children/card'
import forumcount from '@/components/page/forum/children/count'
import forumItem from '@/components/page/forum/forumItem'
import forumIist from '@/components/page/forum/forumIist'
import collection from '@/components/page/forum/collection'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/forum',
    },
    {path: '/index', component: index,},
    { path: '/CompanyProfile',component:companyprofile, meta: { keepAlive: true }},
    { path: '/Templet',component:templet, meta: { keepAlive: true }},
    { path: '/SunVideo',component: sunvideo},
    { path: '/Gallery', component: gallery},
    {path: '/LearnResource',component: learnresource},
    {path: '/PresidentSpeech',component: presidentspeech,meta: { keepAlive: true }},
    {path: '/ProcessManagement',component: processmanagement},
    {path: '/forum',component: forum,children:[
      {path: '/', redirect: '/forummessage',},
      {path: '/myforum',component: myforum},
      {path: '/forummessage',component: forummessage},
      {path: '/forumcard',component: forumcard},
      {path: '/forumcount',component: forumcount},
    ]},
    {path: '/collection',component: collection},
    {path: '/forumItem',component: forumItem},
    {path: '/forumIist',component: forumIist},
    {path: '/videoPlay',component: videoPlay},
    {path: '/pdfRead',component: pdfRead},
    {path: '/fileitem',component: fileitem}
  ]
})
