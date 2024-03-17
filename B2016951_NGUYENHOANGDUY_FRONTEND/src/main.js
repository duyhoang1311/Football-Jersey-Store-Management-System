import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { createPinia } from 'pinia';
import { useAuthStore } from './stores/store';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue';

const app = createApp(App);

app.use(createPinia());
app.use(VueSweetalert2);
app.use(router);
app.use(autoAnimatePlugin);
app.mount('#app');
