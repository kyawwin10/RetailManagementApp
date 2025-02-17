import Sidebar from '@/layouts/common/Sidebar.vue'
import Cart from '@/module/cart/cart.vue'
import Cashier from '@/module/cashier/cashier.vue'
import Manager from '@/module/manager/manager.vue'
import StockPage from '@/module/stock/StockPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

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
          name: 'stock',
          component: StockPage,
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
      ],
    },
  ],
})

export default router
