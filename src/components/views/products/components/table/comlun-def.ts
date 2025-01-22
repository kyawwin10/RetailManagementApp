import type { GetAllProductyPayload } from "@/api/product/types"
import type { ColumnDef } from "@tanstack/vue-table"
import { h } from "vue"

export const columns: ColumnDef<GetAllProductyPayload>[] = [
    {
      accessorKey: 'productID',
      header: () => h('div', { class: 'text-right' }, 'NO'),
      cell: ({ row }) => {
  
        return h('div', { class: 'text-right font-medium' }, row.original.productID)
      },
    },
    {
      accessorKey: 'productName',
      header: () => h('div', { class: 'text-right' }, 'Name'),
      cell: ({ row }) => {
  
        return h('div', { class: 'text-right font-medium' }, row.original.productName)
      },
    },
    {
      accessorKey: 'price',
      header: () => h('div', { class: 'text-right' }, 'Price'),
      cell: ({ row }) => {
  
        return h('div', { class: 'text-right font-medium' }, row.original.price)
      },
    },
    {
      accessorKey: 'stock',
      header: () => h('div', { class: 'text-right' }, 'Stock'),
      cell: ({ row }) => {
  
        return h('div', { class: 'text-right font-medium' }, row.original.stock)
      },
      
    },
    {
      accessorKey: 'profitPerItem',
      header: () => h('div', { class: 'text-right' }, 'Profit Per Item'),
      cell: ({ row }) => {
  
        return h('div', { class: 'text-right font-medium' }, row.original.profitPerItem)
      },
    },
  ]