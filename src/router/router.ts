import { createRouter, createWebHistory, Router, RouteRecordRaw } from 'vue-router';
import Catalog from '../page/Catalog.vue';
import Favorites from '../page/Favorites.vue';
import Login from '../page/Login.vue';
import Signup from '../page/Signup.vue';
import Profile from '../page/Profile.vue';

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
        path: '/profile',
        name: 'profile',
        component: Profile
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/signup',
        name: 'signup',
        component: Signup
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