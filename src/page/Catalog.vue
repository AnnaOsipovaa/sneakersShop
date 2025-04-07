<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import Advertisement from '../components/Advertisement.vue';
import CatalogItem from '../components/CatalogItem.vue';
import { useProductsStore } from '../store/products';

const productsStore = useProductsStore();

const inputSearch = ref('');

onMounted(async () => {
    if(productsStore.products.length === 0){
        await productsStore.getProducts();
    }
})

const productList = computed(() => {
    if(inputSearch.value){
        return productsStore.products.filter(product => product.title.toLowerCase().includes(inputSearch.value.toLowerCase()));
    }else{
        return productsStore.products;
    }
})

function addToCart(product){
    productsStore.addToCart(product);
}

function deleteToCart(product){
    productsStore.deleteToCart(product);
}

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
                <input type="text" v-model="inputSearch" class="input-search__input" placeholder="Поиск...">
            </div>
        </div>

        <div class="sneakers-list">
            <CatalogItem 
                v-for="product in productList" 
                :key=product.id
                @addToCart = addToCart(product)
                @deleteToCart = deleteToCart(product)
                :title="product.title"
                :img="product.imageUrl"
                :price="product.price"
                :inFavorites="false"
                :inCart="product.inCart">
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
        position: relative;
    
        .input-search__input{
            max-width: 250px;
            box-sizing: border-box;
            border: 1px solid variables.$text-color1;
            border-radius: 10px;
            padding: 13px 18px 13px 46px;
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
            position: absolute;
            top: 15px;
            left: 18px;
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