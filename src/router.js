import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Loads from './components/loads/Loads'
import LoadOrders from './components/loads/LoadOrders'
import Products from './components/products/Products'
import OrderProducts from './components/products/OrderProducts'

export default new Router({
  mode: 'history',
  routes: [
    { path: '/loads', component: Loads },
    { path: '/loads/:load_id/orders', name: "loadOrders", component: LoadOrders, props: true },
    { path: '/orders/:order_id/products', name: "orderProducts", component: OrderProducts, props: true },
    { path: '/products', component: Products },
  ]
})