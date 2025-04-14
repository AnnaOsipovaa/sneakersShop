<script setup lang="ts">
import { onMounted, ref, Ref, computed } from 'vue';
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
    if(productsStore.products.length === 0){
        loaderOn.value = true;
        await productsStore.getProducts();
        loaderOn.value = false;
    }
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

const productsInFavorites = computed<ProductType[]>(() => {
    return productsStore.products.filter((product: ProductType) => product.inFavorites);
})
</script>

<template>
    <Loader v-if="loaderOn"></Loader>
    <NotFound v-else-if="productsInFavorites.length === 0" @goBack="goBack"
        title="Нет избранных товаров"
        description="Вы ничего не добавили в избранное"
        img="emoji-1.png"
        >
    </NotFound>
    <template v-else>
        <h1 class="title_m favorites-title">Избранное</h1>
        <div class="sneakers-list">
            <CatalogItem
                v-for="product in productsInFavorites" 
                :key=product.id
                @addToCart = addToCart(product)
                @deleteToCart = deleteToCart(product)
                @deleteToFavorites = deleteToFavorites(product)
                :title="product.title"
                :img="product.imageUrl"
                :price="product.price"
                :inFavorites="true"
                :inCart="product.inCart">
            </CatalogItem>
        </div>
    </template>
</template>

<style lang="scss" scoped>
.favorites-title{
    margin-bottom: 20px;
}
</style>