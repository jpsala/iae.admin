import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { title: 'título' },
    },
    {
        path: '/autocomplete',
        name: 'autocomplete',
        component: () => import(/* webpackChunkName: "code" */ '../views/Autocomplete.vue'),
    },
    {
        path: '/usuarios',
        name: 'usuarios',
        component: () => import(/* webpackChunkName: "code" */ '../views/Usuarios.vue'),
        children: [
            {
                path: '/usuarios/usuarios-list',
                name: 'usuarios-list',
                component: () => import(/* webpackChunkName: "code" */ '../views/Usuarios-list.vue'),
            },
        ],
    },
    {
        path: '/parientes',
        name: 'parientes',
        component: () => import(/* webpackChunkName: "code" */ '../views/Parientes.vue'),
        children: [
            {
                path: '/parientes/parientes-list',
                name: 'parientes-list',
                component: () => import(/* webpackChunkName: "code" */ '../views/Parientes-list.vue'),
            },
            {
                path: '/parientes/parientes-test',
                name: 'parientes-test',
                component: () => import(/* webpackChunkName: "code" */ '../views/parientes-test.vue'),
            },
        ],
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
