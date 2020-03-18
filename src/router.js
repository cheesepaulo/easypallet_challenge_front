import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import LoadList from './components/loads/LoadList'

export default new Router({
  mode: 'history',
  routes: [
    { path: '/loads', component: LoadList }
  ]
})