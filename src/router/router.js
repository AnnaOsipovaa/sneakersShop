import { createRouter, createWebHistory } from 'vue-router';
import Catalog from '../page/Catalog.vue';
import Favorites from '../page/Favorites.vue';

const routes = [
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
        redirect: { name: 'catalog' }
    }
];

export const router = createRouter({
    history: createWebHistory(),
    routes
}); 