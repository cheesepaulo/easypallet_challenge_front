import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import LoadList from './components/loads/LoadList'
import LoadDetail from './components/loads/LoadDetail'
import Products from './components/orders/Products'

export default new Router({
  mode: 'history',
  routes: [
    { path: '/loads', component: LoadList },
    { path: '/loads/:id', component: LoadDetail, props: true },
    { path: '/orders/:order_id/products', name: "order_products", component: Products, props: true }
  ]
})