import { createRouter, createWebHistory, Router, RouteRecordRaw } from 'vue-router';
import Catalog from '../page/Catalog.vue';
import Favorites from '../page/Favorites.vue';
import Login from '../page/Login.vue';
import Signup from '../page/Signup.vue';
import Profile from '../page/Profile.vue';
import { StorageUtils } from '../utils/storage-utils';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'catalog',
        component: Catalog,
        meta: {
            title: 'Каталог'
        }
    },
    {
        path: '/favorites',
        name: 'favorites',
        component: Favorites,
        meta: {
            title: 'Избранное'
        }
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile,
        meta: {
            title: 'Профиль',
            requiresAuth: true,
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            title: 'Авторизация'
        }
    },
    {
        path: '/signup',
        name: 'signup',
        component: Signup,
        meta: {
            title: 'Регистрация'
        }
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

router.afterEach((to) => {
    const defaultTitle: string = 'Vue Sneakers';
    document.title = <string>to.meta.title || defaultTitle
});

router.beforeEach((to, from, next) => {
    const noTokens: boolean = !StorageUtils.getAuthToken(StorageUtils.accessTokenKey) || !StorageUtils.getAuthToken(StorageUtils.refreshTokenKey); 
    
    if (to.meta.requiresAuth && noTokens) {
        next({ name: 'login' });
    } else {
        next();
    }
})

 