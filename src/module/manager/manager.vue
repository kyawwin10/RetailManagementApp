<script setup lang="ts">
import { getSaleList, salesReport } from '@/api/product/queries';
import { cols } from '@/components/table/comlun-def';
import DataTable from '@/components/ui/data-table/data-table.vue';

const { data: sales } = getSaleList.useQuery();
const { data: report } = salesReport.useQuery();

</script>

<template>
    <h1 class="text-center font-bold mt-3">Manager Page</h1>

    <div class="container mx-auto">
        <div class="flex justify-center">
            <div class="card my-4 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md" style="width: 22rem">
                <div class="card-header mb-4 bg-blue-50 dark:bg-blue-800 p-3 rounded-lg">
                    <span class="text-blue-600 dark:text-blue-300 font-bold">Total Revenue</span> :
                    <span class="font-bold text-lg text-gray-700 dark:text-gray-100">{{ report?.totalPrice }}</span>
                </div>
                <div class="card-header bg-green-50 dark:bg-green-800 p-3 rounded-lg">
                    <span class="text-green-600 dark:text-green-300 font-bold">Total Profit</span> :
                    <span class="font-bold text-lg text-gray-700 dark:text-gray-100">{{ report?.totalProfit }}</span>
                </div>
            </div>
        </div>
    </div>

    <DataTable :data="sales ?? []" :columns="cols" />


    <!-- <h2>Total Revenue: {{ (item.stock * item.price) = Total }}</h2>
    <h2>Total Profit: ${{ (item.profit).toFixed(2) }}</h2> -->
</template>