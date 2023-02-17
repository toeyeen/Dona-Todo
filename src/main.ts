import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import '@unocss/reset/tailwind.css'
import 'uno.css'
import './assets/scss/main.scss'

createApp(App).use(router).mount('#app')
