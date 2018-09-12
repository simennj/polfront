import Vue from 'vue'
import Router from 'vue-router'
import Product from '@/components/Product'
import Table from '@/components/Table'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Table',
      component: Table
    },
    {
      path: '/product/:id',
      name: 'product',
      component: Product
    }
  ]
})
