import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import LoadList from './components/loads/LoadList'
import LoadDetail from './components/loads/LoadDetail'

export default new Router({
  mode: 'history',
  routes: [
    { path: '/loads', component: LoadList },
    { path: '/loads/:id', component: LoadDetail, props: true },
  ]
})