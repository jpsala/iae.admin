import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { setStoreInAxios } from './service/axios';
import './scss/app.scss';
import './assets/icomoon/style.css';

setStoreInAxios(store);
createApp(App).use(router).use(store).mount('#app');
