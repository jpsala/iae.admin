import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { setStore } from './service/axios';
// import '../node_modules/papercss/dist/paper.min.css';
// import '../node_modules/mini.css/dist/mini-default.min.css';
import './app.scss';

setStore(store);

createApp(App).use(router).use(store).mount('#app');
