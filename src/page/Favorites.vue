<script setup lang="ts">
import { onMounted, ref, Ref } from 'vue';
import { useProductsStore } from '../store/products';
import NotFound from '../components/NotFound.vue';
import Loader from '../components/Loader.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const productsStore = useProductsStore();

const notFavorites: Ref<boolean> = ref(false);
const loaderOn: Ref<boolean> = ref(false);

onMounted(async () => {
    loaderOn.value = true;

    if(!productsStore.productsInFavorites){
        await productsStore.getProductsInFavorites();
    }

    loaderOn.value = false;

    if(productsStore.productsInFavorites.length === 0){
        notFavorites.value = true;
    }
})

function goBack(): void {
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