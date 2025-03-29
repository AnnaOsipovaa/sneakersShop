<script setup>
import { onMounted } from 'vue';
import Advertisement from '../components/Advertisement.vue';
import CatalogItem from '../components/CatalogItem.vue';
import { useProductsStore } from '../store/products';

const productsStore = useProductsStore();

onMounted(async () => {
    if(!productsStore.products){
        await productsStore.getProducts();
    }
})
</script>

<template>
    <Advertisement></Advertisement>
    
    <div class="sneakers">
        <div class="sneakers-header">
            <h1 clapp="title_m">Все кроссовки</h1>
            <div class="input-search">
                <div class="input-search__img">
                    <img src="image/loupe.svg" alt="поиск">
                </div>
                <input type="text" class="input-search__input" placeholder="Поиск...">
            </div>
        </div>

        <div class="sneakers-list">
            <CatalogItem 
                v-for="product in productsStore.products" 
                :key=product.id
                :title="product.title"
                :img="product.imageUrl"
                :price="product.price"
                :inFavorites="false"
                :inCart="false">
            </CatalogItem>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "../assets/styles/variables.scss";
@use "../assets/styles/mixins.scss";

.sneakers-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 36px;

    .input-search{
        max-width: 250px;
        max-height: 45px;
        display: flex;
        align-items: center;
        gap: 13px;
        border: 1px solid variables.$text-color1;
        border-radius: 10px;
        padding: 15px 18px;
        box-sizing: border-box;

        .input-search__input{
            width: 100%; 
            font-weight: 400;
            font-size: 14px;
            line-height: 100%;

            &:placeholder{
                font-size: 14px;
                color: variables.$placeholder-color;
            }
        }

        .input-search__img{
            @include mixins.flex-center;
        }
    }
}

.sneakers-list{
    display: grid;
    justify-content: center;
    gap: 40px;
    grid-template-columns: repeat(auto-fill, 210px);
}
</style>