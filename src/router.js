import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Loads from './components/loads/Loads'
import LoadOrders from './components/loads/LoadOrders'
import Products from './components/Products'
import OrderProducts from './components/OrderProducts'
// import Load from './components/loads/Load'

export default new Router({
  mode: 'history',
  routes: [
    { path: '/loads', component: Loads },
    { path: '/loads/:id/orders', name: "loadOrders", component: LoadOrders, props: true },
    { path: '/orders/:order_id/products', name: "orderProducts", component: OrderProducts, props: true },
    { path: '/products', component: Products },
    // { path: '/loads/:id', component: Load, props: true },
  ]
})