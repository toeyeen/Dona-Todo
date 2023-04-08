import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import myModel from './directives/my-model'

import '@unocss/reset/tailwind.css'
import 'uno.css'
import './assets/scss/main.scss'

createApp(App).directive('my-model', myModel).use(router).mount('#app')
