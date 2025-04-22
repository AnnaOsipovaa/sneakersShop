<script setup lang="ts">
import { ref, Ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useProductsStore } from '../store/products';
import { useOrdersStore } from '../store/orders';
import { AuthServices } from '../services/auth-services';
import { StorageUtils } from '../utils/storage-utils';
import Loader from '../components/Loader.vue';
import NotFound from '../components/NotFound.vue';
import Order from '../components/Order.vue';

const router = useRouter();
const productsStore = useProductsStore();
const ordersStore = useOrdersStore();
const loaderOn: Ref<boolean> = ref(false);

onMounted(async () => {
    if(!ordersStore.ordersRequested){
        loaderOn.value = true;
        await ordersStore.getOrders();
        loaderOn.value = false;
    }

    if(!productsStore.cartRequested){
        await productsStore.getCart();
    }

    if(!productsStore.favoritesRequested){
        await productsStore.getFavorites();
    }
});

async function logout(): Promise<void> {
    loaderOn.value = true;
    await AuthServices.logout({
        refreshToken: StorageUtils.getAuthToken(StorageUtils.accessTokenKey)
    });
    loaderOn.value = false;

    StorageUtils.removeAuthInfo();
    productsStore.reset();
    ordersStore.reset();
    router.push({ name: 'login' });
}

function goToCatalog(): void {
    router.push({ name: 'catalog' });
}
</script>

<template>
    <div class="profile">
        <div class="profile__header">
            <h1 class="title_m">Заказы</h1>
            <div>
                <button type="button" @click="logout" class="profile__btn button-green">Выйти из личного кабинета</button>
            </div>
        </div>

        <Loader v-if="loaderOn"></Loader>
        <div v-else-if="ordersStore.orders.length !== 0" class="profile__orders">
            <Order v-for="order in ordersStore.orders"
            :key="order.id"
            :order="order"
            ></Order>
        </div>
        <NotFound v-else 
            @go="goToCatalog"
            title="Нет заказов"
            description="Вы ещё не делали заказов"
            img="box.png"
            buttonText="Перейти в каталог"
        >
        </NotFound>
    </div>
</template>

<style lang="scss" scoped>
.profile{
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    
    .profile__header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;

        .profile__btn{
            padding: 15px 20px;
            border-radius: 18px;
        }
    }
}

@media screen and (max-width: 530px){
    .profile{
        .profile__header{
            flex-direction: column-reverse;
            align-items: flex-start;
            gap: 20px;

            .profile__btn{
                padding: 12px 15px;
                border-radius: 12px;
            }
        }
    }
}
</style>