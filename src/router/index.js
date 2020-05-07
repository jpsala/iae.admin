import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/test',
        name: 'test',
        component: () => import(/* webpackChunkName: "test" */ '../views/Test.vue'),
    },
    {
        path: '/autocomplete',
        name: 'autocomplete',
        component: () => import(/* webpackChunkName: "autocomplete" */ '../views/Autocomplete.vue'),
    },
    {
        path: '/usuariosDiferdo',
        name: 'usuariosDiferdo',
        component: () => import(/* webpackChunkName: "test" */ '../views/UsuariosDiferdo.vue'),
    },
    {
        path: '/usuarios-list',
        name: 'usuarios-list',
        component: () => import(/* webpackChunkName: "test" */ '../views/Usuarios-list.vue'),
    },
    {
        path: '/parientes-list',
        name: 'parientes-list',
        component: () => import(/* webpackChunkName: "test" */ '../views/Parientes-list.vue'),
    },
    {
        path: '/usuarios',
        name: 'usuarios',
        component: () => import(/* webpackChunkName: "test" */ '../views/Usuarios.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
