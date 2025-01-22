<script setup lang="ts">
import { useCartStore } from '@/stores/useCartStore';
import { Button } from '@/components/ui/button'
import type { ProductSalePayload } from '@/api/product/types';
import { SaleProduct } from '@/api/product/queries';


const cartStore = useCartStore();

// Add Sale Mutation
const { mutate: saleProduct } = SaleProduct.useMutation({
    onSuccess: () => {
        console.log("Add Sale Successfully");
    },
    onError: (error) => {
        console.log('Error adding product:', error);
    },
});

const cashOut = () => {
    const payloads: ProductSalePayload[] = cartStore.cartItems.map(item => ({
        productID: item.productID,
        quantitySold: item.cartQuantity,
    }))
    saleProduct(payloads);
}

</script>

<template>
    <div class="flex justify-center p-4 mt-4">
        <div class="bg-white rounded-lg shadow-lg p-2 w-1/2 max-w-2xl">
            <h1 class="text-center font-bold text-2xl md:text-3xl mb-6">Cashier Page</h1>
            <div class="overflow-x-auto">
                <table class="table-auto w-full border-collapse border border-gray-300 mb-4">
                    <thead>
                        <tr class="bg-gray-200">
                            <th class="px-4 py-2 border-gray-300 text-center">Quantity Sold</th>
                            <th class="px-4 py-2 border-gray-300 text-center">Price</th>
                            <th class="px-4 py-2 border-gray-300 text-center">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in cartStore.cartItems" :key="item.productID"
                            class="odd:bg-white even:bg-gray-50 text-center">
                            <div class="flex justify-center m-2">
                                <Button @click="cartStore.decrementQuantity(item)" class="bg-red-500 hover:bg-red-800"><i
                                    class="pi pi-minus-circle"></i></Button>
                            <td class="px-3 py-1 border-gray-300 ml-2">{{ item.cartQuantity }}</td>
                            <Button @click="cartStore.addToCart(item)" class="bg-green-500 hover:bg-green-800 ml-2"><i
                                    class="pi pi-plus-circle"></i></Button>
                            </div>
                            <td class="px-4 py-2 border-gray-300 text-right">
                                {{ item.price }}
                            </td>
                            <td class="px-4 py-2 border-gray-300 text-right">
                                {{ (item.price * item.cartQuantity).toFixed(2) }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h2 class="text-md md:text-xl font-semibold text-right">
                Total Price:
                <span class="text-green-600 font-bold">
                    {{ cartStore.cartItems.reduce((acc, item) => acc += item.price * item.cartQuantity, 0).toFixed(2) }}
                </span>
            </h2>
            <router-link to="/manager">
                <Button @click="cashOut" class="m-4 bg-blue-500 hover:bg-blue-800 text-center">Cash Out</Button>
            </router-link>
        </div>
    </div>


    <!-- <button @click="cashOut">Cash Out</button> -->
    <!-- <div v-for="item in cartStore.cartItems" :key="item.productID" class="flex items-center justify-center m-4 text-center">
        <Button @click="cartStore.decrementQuantity(item)" class="bg-red-500 hover:bg-red-800"><i
                class="pi pi-minus-circle"></i></Button>
        <Input class="w-12 ml-2 text-center" type="number" placeholder="QuantitySold" v-model="item.cartQuantity" />
        <Button @click="cartStore.addToCart(item)" class="bg-green-500 hover:bg-green-800 ml-2"><i
                class="pi pi-plus-circle"></i></Button>
    </div> -->


</template>