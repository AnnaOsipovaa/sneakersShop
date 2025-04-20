<script setup lang="ts">
import { ref, Ref } from 'vue';
import { useRouter } from 'vue-router';
import { useProductsStore } from '../store/products';
import { AuthServices } from '../services/auth-services';
import { StorageUtils } from '../utils/storage-utils';
import Loader from '../components/Loader.vue';

const router = useRouter();
const productsStore = useProductsStore();
const loaderOn: Ref<boolean> = ref(false);

async function logout(): Promise<void> {
    loaderOn.value = true;
    await AuthServices.logout({
        refreshToken: StorageUtils.getAuthToken(StorageUtils.accessTokenKey)
    });
    loaderOn.value = false;

    StorageUtils.removeAuthInfo();
    productsStore.reset();
    router.push({ name: 'login' });
}
</script>

<template>
    <div v-if="loaderOn" class="loader-fon">
        <Loader></Loader>
    </div>

    <div class="profile">
        <div class="profile__header">
            <h1 class="title_m">Заказы</h1>
            <div>
                <button type="button" @click="logout" class="profile__btn button-green">Выйти из личного кабинета</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.profile{
    .profile__header{
        display: flex;
        justify-content: space-between;
        align-items: center;

        .profile__btn{
            padding: 15px 20px;
            border-radius: 18px;
        }
    }
}

</style>