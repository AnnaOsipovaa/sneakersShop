<script setup lang="ts">
import { computed, Ref, ref } from "vue"
import { StringUtils } from "../utils/string-utils";
import { ProductType } from "@/types/product.type";
import { useProductsStore } from '../store/products';
import Loader from '../components/Loader.vue';

const productsStore = useProductsStore();
const loaderOn: Ref<boolean> = ref(false);

const props = defineProps<{
    actionsShow: boolean
    product: ProductType
}>();

const priceFormatted = computed<string>(() => {
    return StringUtils.toPriceFormat(props.product.price) + ' руб.';
});

async function addToCart(): Promise<void> {
    loaderOn.value = true;
    await productsStore.addToCart(props.product);
    loaderOn.value = false;
}

async function deleteToCart(): Promise<void> {
    loaderOn.value = true;
    await productsStore.deleteToCart(props.product);
    loaderOn.value = false;
}

async function addToFavorites(): Promise<void> {
    loaderOn.value = true;
    await productsStore.addToFavorites(props.product);
    loaderOn.value = false;
}

async function deleteToFavorites(): Promise<void> {
    loaderOn.value = true;
    await productsStore.deleteToFavorites(props.product);
    loaderOn.value = false;
}

</script>

<template>
    

    <div class="catalog-item">
        <div v-if="actionsShow" class="catalog-item__action">
            <div v-if="loaderOn" class="fon fon_absolute">
                <Loader></Loader>
            </div>
            <div v-if="!productsStore.checkProductInFavorites(product.id)" class="catalog-item__is-favourites" @click="addToFavorites">
                <img src="image/is-favorites-off.svg" alt="добавить в избранное">
            </div>
            <div v-else class="catalog-item__is-favourites" @click="deleteToFavorites">
                <img src="image/is-favorites-on.svg" alt="удалить из избранного">
            </div>
        </div>
        <div class="catalog-item__img">
            <img :src="'image/sneakers/' + product.imageUrl" alt="фото">
        </div>
        <div class="catalog-item__title text_s">{{ product.title }}</div>
        <div class="catalog-item__block-price">
            <div class="catalog-item__price">
                <div class="catalog-item__price-title">Цена:</div>
                <div class="price">{{ priceFormatted }}</div>
            </div>
            <div v-if="actionsShow" class="catalog-item__action">
                <div v-if="!productsStore.checkProductInCart(product.id)" class="catalog-item__in-cart" @click="addToCart">
                    <img src="image/in-cart-off.svg" alt="добавить в корзину">
                </div>
                <div v-else class="catalog-item__action-item" @click="deleteToCart">
                    <img src="image/in-cart-on.svg" alt="удалить из корзины">
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "../assets/styles/variables.scss" as *;

.catalog-item{
    border: 1px solid $text-color1;
    border-radius: $border-radius-m;
    padding: 30px 29px;
    position: relative;
    display: flex;
    flex-direction: column;
    transition: 0.3s;
    overflow: hidden;
    max-width: 210px;

    &:hover{
        box-shadow: $box-shadow-lite;
    }

    .catalog-item__is-favourites{
        width: 31px;
        height: 32px;
        position: absolute;
        top: 29px;
        left: 30px;
        cursor: pointer;

        img{
            cursor: pointer;
            max-width: 100%;
        }
    }

    .catalog-item__img{
        width: 133px;
        height: 112px;
        margin-bottom: 14px;
        align-self: center;

        img{
            max-width: 100%;
        }
    }

    .catalog-item__title{
        margin-bottom: 14px;
    }

    .catalog-item__block-price{
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        .catalog-item__price-title{
            font-weight: 500;
            font-size: 11px;
            line-height: 100%;
            text-transform: uppercase;
            color: $text-color3;
            margin-bottom: 2px;
        }

        .catalog-item__action{
            position: relative;
            width: 31px;
            height: 32px;
            
            img{
                cursor: pointer;
                max-width: 100%;
            }
        }
    }
}

@media screen and (max-width: 1130px){
    .catalog-item{
        border-radius: 32px;
        padding: 20px 20px;

        .catalog-item__is-favourites{
            top: 20px;
            left: 25px;
        }

        .catalog-item__img{
            width: 115px;
            height: 100px;
        }

        .catalog-item__title{
            margin-bottom: 10px;
            min-height: 36px;
        }
    }  
}

@media screen and (max-width: 500px){
    .catalog-item{
        border-radius: $border-radius-s;
        padding: 15px 15px;

        .catalog-item__is-favourites{
            top: 15px;
            left: 15px;
        }
    }  
}

@media screen and (max-width: 400px){
    .catalog-item{
        border-radius: 15px;
        padding: 10px 10px;

        .catalog-item__is-favourites{
            width: 25px;
            height: 25px;
        }

        .catalog-item__img{
            width: 90px;
            height: 90px;
        }

        .catalog-item__block-price{
            .catalog-item__action{
                width: 25px;
                height: 25px;
            }
        }
    }  
}
</style>