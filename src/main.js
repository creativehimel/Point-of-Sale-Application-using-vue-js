import './assets/main.css'
import '../node_modules/nprogress/nprogress.css'
import 'vue3-toastify/dist/index.css'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueSweetalert2);
app.mount('#app')
