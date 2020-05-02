import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { setStoreInAxios } from './service/axios';
import './app.css';
import './assets/icomoon/style.css';

setStoreInAxios(store);
createApp(App).use(router).use(store).mount('#app');
