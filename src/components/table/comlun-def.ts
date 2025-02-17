import type { GetAllProductyPayload } from "@/api/product/types"
import { useCartStore } from "@/stores/useCartStore"
import type { ColumnDef } from "@tanstack/vue-table"
import { h } from "vue"
import 'primeicons/primeicons.css'


export const columns = ({ editClick, deleteClick }: { editClick: (data: GetAllProductyPayload) => void, deleteClick: (data: GetAllProductyPayload) => void }): ColumnDef<GetAllProductyPayload>[] => [
  {
    accessorKey: 'productID',
    header: () => h('div', { class: 'text-center' }, 'NO'),
    cell: ({ row }) => {

      return h('div', { class: 'text-center font-medium' }, row.index + 1)
    },
  },
  {
    accessorKey: 'productName',
    header: () => h('div', { class: 'text-center' }, 'Name'),
    cell: ({ row }) => {

      return h('div', { class: 'text-center font-medium' }, row.original.productName)
    },
  },
  {
    accessorKey: 'price',
    header: () => h('div', { class: 'text-center' }, 'Price'),
    cell: ({ row }) => {

      return h('div', { class: 'text-right font-medium' }, row.original.price)
    },
  },
  {
    accessorKey: 'stock',
    header: () => h('div', { class: 'text-center' }, 'Stock'),
    cell: ({ row }) => {

      return h('div', { class: 'text-right font-medium' }, row.original.stock)
    },

  },
  {
    accessorKey: 'profitPerItem',
    header: () => h('div', { class: 'text-center' }, 'Profit Per Item'),
    cell: ({ row }) => {

      return h('div', { class: 'text-right font-medium' }, row.original.profitPerItem)
    },
  },
  {
    accessorKey: 'action',
    header: () => h('div', { class: 'text-center' }, 'Action'),
    cell: ({ row }) => {
      const cartStore = useCartStore();
      const product = row.original
      const cart = cartStore.cartItems.find(item => item.productID === product.productID)
      return h('div', { class: 'flex justify-center gap-2' }, [
        cart && cart.cartQuantity > 0
          ? h('div', { class: 'flex items-center gap-2' }, [
            h(
              'button',
              {
                class: 'bg-red-500 text-black p-2 rounded',
                onClick: () => cartStore.decrementQuantity(product),
              },
              h('i', { class: "pi pi-minus-circle" })
            ),
            h('span', { class: 'font-medium' }, cart.cartQuantity),
            h(
              'button',
              {
                class: 'bg-green-500 text-black p-2 rounded',
                onClick: () => cartStore.addToCart(product),
              },
              h('i', { class: "pi pi-plus-circle" })
            ),
          ])
          :
          h(
            'button',
            {
              class: 'bg-blue-500 text-white px-3 py-1 rounded',
              onClick: () => cartStore.addToCart(row.original),
            },
            'Add To Cart'
          ),
        h(
          'button',
          {
            class: 'bg-yellow-500 text-white px-3 py-1 rounded',
            onClick: () => editClick(row.original), // Example function for edit
          },
          'Edit'
        ),
        h(
          'button',
          {
            class: 'bg-red-500 text-white px-3 py-1 rounded',
            onClick: () => deleteClick(row.original), // Example function for delete
          },
          'Delete'
        ),
      ]);
    },
  }

]