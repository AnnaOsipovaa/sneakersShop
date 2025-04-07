import { createRouter, createWebHistory, Router, RouteRecordRaw } from 'vue-router';
import Catalog from '../page/Catalog.vue';
import Favorites from '../page/Favorites.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'catalog',
        component: Catalog
    },
    {
        path: '/favorites',
        name: 'favorites',
        component: Favorites
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        redirect: { name: 'catalog' }
    }
];

export const router: Router = createRouter({
    history: createWebHistory(),
    routes: routes
}); 