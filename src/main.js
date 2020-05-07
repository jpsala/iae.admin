import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// import useSession from './service/useSession';
import './service/axios';
import './app.css';
import './assets/icomoon/style.css';

// const { setApiToken } = useSession();
// setApiTokenInAxios(setApiToken);
createApp(App).use(router).mount('#app');
