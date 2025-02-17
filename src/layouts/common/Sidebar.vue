<script setup lang="ts">
import { useRoute } from 'vue-router';
import 'primeicons/primeicons.css'
import { useCartStore } from '@/stores/useCartStore';

const route = useRoute();
const cartStore = useCartStore();

</script>


<template>
    <div class="w-screen h-screen flex">
        <div class="w-[300px] h-full bg-gray-200 text-white">
            <div class="h-[50px] bg-gray-900 flex justify-start items-center">
                <div class="px-[20px]">
                    <h1 class="font-bold text-md">Admin Dashboard</h1>
                </div>
            </div>

            <div class="h-[calc(100vh-50px)] bg-gray-700 py-[20px]">
                <div class="flex flex-col justify-between h-full px-[20px] space-y-[10px]">
                    <div class="flex flex-col justify-between space-y-[10px]">
                        <router-link to="/" class="inline-flex relative items-center py-[10px] px-[10px] w-full text-md"
                            :class="{ 'text-yellow-500': route.path === '/' }">
                            Stock Page
                        </router-link>
                        <router-link to="/cart"
                            class="inline-flex relative items-center py-[10px] px-[10px] w-full text-md"
                            :class="{ 'text-yellow-500': route.path === '/cart' }">
                            Cart
                        </router-link>
                        <router-link to="/cashier"
                            class="inline-flex relative items-center py-[10px] px-[10px] w-full text-md"
                            :class="{ 'text-yellow-500': route.path === '/cashier' }">
                            Cashier Page
                        </router-link>
                        <router-link to="/manager"
                            class="inline-flex relative items-center py-[10px] px-[10px] w-full text-md"
                            :class="{ 'text-yellow-500': route.path === '/manager' }">
                            Manager Page
                        </router-link>
                        <!-- <router-link to="/stockPage"
                            class="inline-flex relative items-center py-[10px] px-[10px] w-full text-md"
                            :class="{ 'text-yellow-500': route.path === '/stockPage' }">
                            Stock Page
                        </router-link> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full h-full bg-gray-400">
            <div class="h-[50px] bg-gray-100 flex items-center shadow-sm px-[20px] w-full py-[10px] z-10 border-b">
                Header Sidebar
                <router-link to="/cart">
                    <i class="pi pi-shopping-cart text-green-700 text-2xl ml-80"></i>
                    Cart ({{ cartStore.countCartItems }})
                </router-link>
            </div>
            <div>
                <!-- Search Bar -->
            </div>
            <div class="h-[calc(100vh-30px)] bg-gray-50 p-[20px]">
                <div class="border border-gray-300 rounded-lg-p-[10px] h-full">
                    <router-view> </router-view>
                </div>
            </div>
        </div>
    </div>
</template>
