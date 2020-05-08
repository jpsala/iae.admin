import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/autocomplete',
        name: 'autocomplete',
        component: () => import(/* webpackChunkName: "code" */ '../views/Autocomplete.vue'),
    },
    {
        path: '/usuarios-list',
        name: 'usuarios-list',
        component: () => import(/* webpackChunkName: "code" */ '../views/Usuarios-list.vue'),
    },
    {
        path: '/parientes-list',
        name: 'parientes-list',
        component: () => import(/* webpackChunkName: "code" */ '../views/Parientes-list.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "code" */ '../views/Login.vue'),
    },

];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
