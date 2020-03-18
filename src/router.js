import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import LoadList from './components/loads/LoadList'
import LoadDetail from './components/loads/LoadDetail'
import OrderProductList from './components/OrderProductList'
import OrdenatedOrder from './components/OrdenatedOrder'

export default new Router({
  mode: 'history',
  routes: [
    { path: '/loads', component: LoadList },
    { path: '/loads/:id', component: LoadDetail, props: true },
    { path: '/orders/:id', component: OrderProductList, props: true },
    { path: '/orders/:id/organized', component: OrdenatedOrder, props: true }
  ]
})