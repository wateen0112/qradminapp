import { createApp } from 'vue'
import { createPinia } from 'pinia'
// Plugins 
import App from './App.vue'
import router from './router'
import { vuetifyInstance } from './plugins/vuetify'
import VueSweetalert2 from "vue-sweetalert2";

import VueApexCharts from "vue3-apexcharts";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css"
// import { FontAwesomeIcon } from "@/plugins/font-awesome";
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
// import { createI18n } from 'vue-i18n'
// Scss Files 
import 'vuetify/styles' // Global CSS has to be imported
import "@fortawesome/fontawesome-svg-core/styles.css"
import "@/core/scss/index.scss"
import "@/plugins/scss/vuetify.override.scss"
import 'sweetalert2/dist/sweetalert2.min.css';
import { i18n } from './i18n/index'
// Icons Library
const options = {
    // You can set your default options here
    position: "bottom-right",
    duration: 1000,
    theme: "toasted-primary"
};
const app = createApp(App)
app.component('apexchart', VueApexCharts)
app.component('Datepicker', Datepicker);
app.use(createPinia())
app.use(i18n)
app.use(VueApexCharts)
app.use(Toast, options);
app.use(router)
app.use(vuetifyInstance)
app.use(VueSweetalert2);

// app.component("f-icon", FontAwesomeIcon);
app.mount('#app')
