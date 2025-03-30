<script setup>
import { onMounted, ref } from 'vue';
import { useProductsStore } from '../store/products';
import NotFound from '../components/NotFound.vue';
import Loader from '../components/Loader.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const productsStore = useProductsStore();

const notFavorites = ref(false);
const loaderOn = ref(false);

onMounted(async () => {
    loaderOn.value = true;

    if(!productsStore.favoritesProducts){
        await productsStore.getFavoritesProducts();
    }

    loaderOn.value = false;

    if(productsStore.favoritesProducts.length === 0){
        notFavorites.value = true;
    }
})

function goBack(){
    router.go(-1);
}
</script>

<template>
    <Loader v-if="loaderOn"></Loader>
    <div v-else-if="!notFavorites">Избранное</div>
    <NotFound v-else @goBack="goBack"
        title="Нет избранных товаров"
        description="Вы ничего не добавили в избранное"
        img="emoji-1.png"
        >
    </NotFound>
</template>