import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import Vue3PersianDatetimePicker from 'vue3-persian-datetime-picker'
import './assets/styles.css'

const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia)
app.component('DatePicker', Vue3PersianDatetimePicker)
app.mount('#app')
