<script setup lang="ts">
import { computed, onMounted, ref, watch, Ref } from 'vue';
import { ProductType } from "@/types/product.type";
import Advertisement from '../components/Advertisement.vue';
import CatalogItem from '../components/CatalogItem.vue';
import Loader from '../components/Loader.vue';
import { useProductsStore } from '../store/products';

const productsStore = useProductsStore();

const inputSearch: Ref<string> = ref('');
const loaderOn: Ref<boolean> = ref(false);

onMounted(async () => {
    if(productsStore.products.length === 0){
        loaderOn.value = true;
        await productsStore.getProducts();
        loaderOn.value = false;
    }

    if(!productsStore.cartRequested){
        await productsStore.getCart();
    }

    if(!productsStore.favoritesRequested){
        await productsStore.getFavorites();
    }
});

const productList = computed<ProductType[]>(() => {
    if(inputSearch.value){
        return productsStore.products.filter((product : ProductType) => product.title.toLowerCase().includes(inputSearch.value.toLowerCase()));
    }else{
        return productsStore.products;
    }
});
</script>

<template>
    <Advertisement></Advertisement>
    
    <div class="sneakers">
        <div class="sneakers-header">
            <h1 class="title_m">Все кроссовки</h1>
            <div class="input-search">
                <div class="input-search__img">
                    <img src="image/loupe.svg" alt="поиск">
                </div>
                <input type="text" v-model="inputSearch" class="input-search__input" placeholder="Поиск...">
            </div>
        </div>

        <Loader v-if="loaderOn"></Loader>
        <div v-else class="sneakers-list">
            <CatalogItem
                v-for="product in productList" 
                :key=product.id
                :actionsShow="true"
                :product="product">
            </CatalogItem>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "../assets/styles/variables.scss" as *;
@use "../assets/styles/mixins.scss" as *;

.sneakers{
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    .sneakers-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 36px;
    }
}

@media screen and (max-width: 1130px){
    .sneakers{
        .sneakers-header{
            flex-direction: column;
            align-items: stretch;
            gap: 20px;
        }
    }
}

@media screen and (max-width: 600px){
    .sneakers{
        .sneakers-header{
            gap: 10px;
            padding-bottom: 20px;
        }
    }
}
</style>