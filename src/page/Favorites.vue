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
const favoritesProduct: Ref<ProductType[]> = ref([]);

onMounted(async () => {
    watch(
        productsStore.listIdProductsInFavorites, 
        async () => {
            loaderOn.value = true;
            favoritesProduct.value = await productsStore.getFavorites();
            loaderOn.value = false;
        },
        { immediate: true }
    )
})

function goBack(): void {
    router.go(-1);
}

function addToCart(product: ProductType): void {
    productsStore.addToCart(product);
}

function deleteToCart(product: ProductType): void {
    productsStore.deleteToCart(product);
}

function deleteToFavorites(product: ProductType): void {
    productsStore.deleteToFavorites(product);
}
</script>

<template>
    <Loader v-if="loaderOn"></Loader>
    <NotFound v-else-if="favoritesProduct.length === 0" @goBack="goBack"
        title="Нет избранных товаров"
        description="Вы ничего не добавили в избранное"
        img="emoji-1.png"
        >
    </NotFound>
    <template v-else>
        <h1 class="title_m favorites-title">Избранное</h1>
        <div class="sneakers-list">
            <CatalogItem
                v-for="product in favoritesProduct" 
                :key=product.id
                @addToCart = addToCart(product)
                @deleteToCart = deleteToCart(product)
                @deleteToFavorites = deleteToFavorites(product)
                :title="product.title"
                :img="product.imageUrl"
                :price="product.price"
                :inFavorites="true"
                :inCart="productsStore.checkProductInCart(product.id)">
            </CatalogItem>
        </div>
    </template>
</template>

<style lang="scss" scoped>
.favorites-title{
    margin-bottom: 20px;
}
</style>