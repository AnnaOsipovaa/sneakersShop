<script setup lang="ts">
import { onMounted, ref, Ref, watch } from 'vue';
import { useProductsStore } from '../store/products';  
import { ProductType } from "@/types/product.type";
import CatalogItem from '../components/CatalogItem.vue';
import NotFound from '../components/NotFound.vue';
import Loader from '../components/Loader.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const productsStore = useProductsStore();

const loaderOn: Ref<boolean> = ref(false);

onMounted(async () => {
    watch(
        productsStore.listIdProductsInFavorites, 
        async () => {
            if(productsStore.favoritesRequested) return;

            loaderOn.value = true;
            await productsStore.getFavorites();
            loaderOn.value = false;
        },
        { immediate: true }
    )
})

function goBack(): void {
    router.go(-1);
}
</script>

<template>
    <Loader v-if="loaderOn"></Loader>
    <NotFound v-else-if="productsStore.favorites.length === 0" @goBack="goBack"
        title="Нет избранных товаров"
        description="Вы ничего не добавили в избранное"
        img="emoji-1.png"
        >
    </NotFound>
    <template v-else>
        <h1 class="title_m favorites-title">Избранное</h1>
        <div class="sneakers-list">
            <CatalogItem
                v-for="product in productsStore.favorites" 
                :key=product.id
                :actionsShow="true"
                :product="product">
            </CatalogItem>
        </div>
    </template>
</template>

<style lang="scss" scoped>
.favorites-title{
    margin-bottom: 20px;
}
</style>