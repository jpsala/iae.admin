import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { setStore } from './service/axios';

setStore(store);

createApp(App).use(router).use(store).mount('#app');
