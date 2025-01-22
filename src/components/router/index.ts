import { createRouter, createWebHistory } from 'vue-router'
import Sidebar from '../views/Sidebar.vue'
import Products from '../views/products/StockPage.vue'
import Cart from '../views/products/cart.vue'
import Cashier from '../views/products/cashier.vue'
import Manager from '../views/products/manager.vue'
import StockPage from '../ui/data-table/data-table.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: Sidebar,
      children: [
        {
          path: '',
          name: 'products',
          component: Products,
        },
        {
          path: 'cart',
          name: 'cart',
          component: Cart,
        },
        {
          path: 'cashier',
          name: 'cashier',
          component: Cashier,
        },
        {
          path: 'manager',
          name: 'manager',
          component: Manager,
        },
        {
          path: 'stockPage',
          name: 'stockPage',
          component: StockPage,
        },
      ],
    },
  ],
})

export default router
