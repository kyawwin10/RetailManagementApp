import './assets/index.css'

import { createApp } from 'vue'
import {createPinia} from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import 'vue3-toastify/dist/index.css';

import App from './App.vue'
import router from './components/router'
const app = createApp(App)

app.use(createPinia())
app.use(VueQueryPlugin)
app.use(router)

app.mount('#app')


