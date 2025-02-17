<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useCartStore } from '@/stores/useCartStore'
import 'primeicons/primeicons.css'
import { Button } from '@/components/ui/button'

const cartStore = useCartStore();
</script>

<template>
  <div>
    <!-- Check if cart is empty -->
    <div v-if="cartStore.cartItems.length === 0" class="text-center text-gray-500 mt-4">
      <p>Your cart is empty. Add some items to get started!</p>
    </div>

    <!-- Show the cart table if there are items -->
    <Table v-else>
      <TableHeader>
        <TableRow>
          <TableHead class="text-center">ProductName</TableHead>
          <TableHead class="text-center">Price</TableHead>
          <TableHead class="text-center">Quantity</TableHead>
          <TableHead class="text-center">Subtotal</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="item in cartStore.cartItems" :key="item.productID">
          <TableCell class="text-center">{{ item.productName }}</TableCell>
          <TableCell class="text-right">{{ item.price }}</TableCell>
          <TableCell class="text-center text-xl">
            <Button @click="cartStore.decrementQuantity(item)" class="bg-red-500 hover:bg-red-800">
              <i class="pi pi-minus-circle"></i>
            </Button>
            {{ item.cartQuantity }}
            <Button @click="cartStore.addToCart(item)" class="bg-green-500 hover:bg-green-800">
              <i class="pi pi-plus-circle"></i>
            </Button>
          </TableCell>
          <TableCell class="text-right">{{ item.price * item.cartQuantity }}</TableCell>
          <TableCell class="text-center">
            <Button @click="cartStore.removeFromCart(item)" class="w-8 h-7 bg-red-500 hover:bg-red-800">
              <i class="pi pi-times"></i>
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableHead class="text-right font-medium" colspan="3">Total</TableHead>
          <TableCell class="text-right" colspan="1">
            {{ cartStore.cartItems.reduce((acc, item) => acc += item.price * item.cartQuantity, 0) }}
          </TableCell>
          <TableCell class="text-center">
            <router-link to="/cashier">
              <Button class="ml-2 w-30 rounded-xl bg-orange-500">
                Process to cashier ({{ cartStore.countCartItems }})
              </Button>
            </router-link>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
