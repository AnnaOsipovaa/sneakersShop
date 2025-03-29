<script setup>
import { onMounted, ref } from 'vue';
import { useProductsStore } from '../store/products';
import NotFound from '../components/NotFound.vue';
import Loader from '../components/Loader.vue';

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
</script>

<template>
    <Loader v-if="loaderOn"></Loader>
    <div v-else-if="!notFavorites">Избранное</div>
    <NotFound v-else class="not-favorites"
        title="Нет избранных товаров"
        description="Вы ничего не добавили в избранное"
        img="emoji-1.png"
        >
    </NotFound>
</template>

<style lang="scss" scoped>
.loaderr{
    display: flex;
     
}
.not-favorites{
    display: flex;
    justify-content: center;
    flex-grow: 1;
}
</style>