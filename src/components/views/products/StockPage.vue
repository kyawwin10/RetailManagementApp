<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { getProductList, DeleteProduct } from '@/api/product/queries'
import 'primeicons/primeicons.css'
import { useCartStore } from '@/stores/useCartStore'
import { reactive } from 'vue'
import ProductDialog from '@/components/dialog/ProductDialog.vue'
import type { GetAllProductyPayload, ProductDeletePayload, ProductUpdatePayload } from '@/api/product/types'
import Button from '@/components/ui/button/Button.vue'
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination'
import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import DataTable from '@/components/ui/data-table/data-table.vue'
import { columns } from './components/table/comlun-def'

const cartStore = useCartStore();

const productDialog = reactive({
  isOpen: false,
  isEdit: false,
  data: null as ProductUpdatePayload | null
})

// Query to getAllProducts
const { data: products, isLoading, isError, error } = getProductList.useQuery();

// Delete Product Mutation
const { mutate: deleteProduct } = DeleteProduct.useMutation({
  onSuccess: () => {
    console.log("Product Delete Successfully")
  },
  onError: (error) => {
    console.log('Error deleting product:', error);
  },
});

// Open Add Dialog
const handleAdd = () => {
  productDialog.isEdit = false;
  productDialog.isOpen = true;
  productDialog.data = null
}

// Open Edit Dialog
const editClick = (data: ProductUpdatePayload) => {
  productDialog.isEdit = true;
  productDialog.isOpen = true;
  productDialog.data = data
}

const handleClose = () => {
  productDialog.isEdit = false;
  productDialog.isOpen = false;
  productDialog.data = null
}

const deleteClick = (product: ProductDeletePayload) => {
  deleteProduct(product);
};


</script>

<template>
  <h1 class="text-center font-bold text-left py-2">Stock Page</h1>

  <Button @click="handleAdd()" class="bg-green-500 hover:bg-green-700 m-4">+Add</Button>
  <!-- <h1 class="text-center font-bold py-2">Product List</h1> -->

  <!-- Loading state -->
  <div v-if="isLoading" class="text-center">Loading products...</div>

  <!-- Error state -->
  <div v-if="isError" class="text-center text-red-500">
    Error: {{ error?.message }}
  </div>
  <DataTable :data="products ?? []" :columns="columns"/>
  
  <ProductDialog :dialogData="productDialog" :handleClose="handleClose" />
</template>