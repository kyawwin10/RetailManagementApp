<script setup lang="ts">
import { getSaleList, salesReport } from '@/api/product/queries';

const { data: sales } = getSaleList.useQuery();
const { data: sale } = salesReport.useQuery();
</script>

<template>
    <h1 class="text-center font-bold mt-3">Manager Page</h1>

    <div class="container mx-auto">
        <div class="flex justify-center">
            <div class="card my-4 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md" v-if="sale" style="width: 22rem">
                <div class="card-header mb-4 bg-blue-50 dark:bg-blue-800 p-3 rounded-lg">
                    <span class="text-blue-600 dark:text-blue-300 font-bold">Total Revenue</span> :
                    <span class="font-bold text-lg text-gray-700 dark:text-gray-100">{{ sale.totalPrice }}</span>
                </div>
                <div class="card-header bg-green-50 dark:bg-green-800 p-3 rounded-lg">
                    <span class="text-green-600 dark:text-green-300 font-bold">Total Profit</span> :
                    <span class="font-bold text-lg text-gray-700 dark:text-gray-100">{{ sale.totalProfit }}</span>
                </div>
            </div>
        </div>
    </div>



    <table class="min-w-full table-auto mt-4">
        <thead class="bg-sky-400 text-white">
            <tr class="text-center">
                <th class="px-4 py-2">No</th>
                <th class="px-4 py-2">Product ID</th>
                <th class="px-4 py-2">Quantity Sold</th>
                <th class="px-4 py-2">Total Amount</th>
                <th class="px-4 py-2">Total Profit</th>
                <th class="px-4 py-2">Sale Date</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(sale, index) in sales" :key="index" class="text-center">
                <td class="px-4 py-2">{{ index + 1 }}</td>
                <td class="px-4 py-2">{{ sale.productID }}</td>
                <td class="px-4 py-2">{{ sale.quantitySold }}</td>
                <td class="px-4 py-2">{{ sale.totalAmount }}</td>
                <td class="px-4 py-2">{{ sale.totalProfit }}</td>
                <td class="px-4 py-2">{{ sale.salesDate }}</td>
            </tr>
        </tbody>
    </table>


    <!-- <h2>Total Revenue: {{ (item.stock * item.price) = Total }}</h2>
    <h2>Total Profit: ${{ (item.profit).toFixed(2) }}</h2> -->
</template>