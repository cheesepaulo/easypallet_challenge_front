import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Loads from './components/loads/Loads'
import Products from './components/Products'
// import Load from './components/loads/Load'
// import Products from './components/orders/Products'

export default new Router({
  mode: 'history',
  routes: [
    { path: '/loads', component: Loads },
    { path: '/products', component: Products },
    // { path: '/loads/:id', component: Load, props: true },
    // { path: '/orders/:order_id/products', name: "order_products", component: Products, props: true }
  ]
})