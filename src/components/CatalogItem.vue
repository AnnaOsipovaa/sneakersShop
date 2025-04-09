<script setup lang="ts">
import { computed } from "vue"
import { StringUtils } from "../utils/string-utils";

defineEmits(['addToCart', 'deleteToCart']);
const props = defineProps<{
    title: string,
    img: string,
    price: number,
    inFavorites: boolean,
    inCart: boolean
}>();

const inFavoritesImg = computed<string>(() => {
    return 'image/' + (props.inFavorites ? 'is-favorites-on.svg' : 'is-favorites-off.svg');
});

const priceFormatted = computed<string>(() => {
    return StringUtils.toPriceFormat(props.price) + ' руб.';
})
</script>

<template>
    <div class="catalog-item">
        <div class="catalog-item__is-favourites">
            <img :src="inFavoritesImg" alt="в избранное">
        </div>
        <div class="catalog-item__img">
            <img :src="'image/' + img" alt="фото">
        </div>
        <div class="catalog-item__title product-title">{{ title }}</div>
        <div class="catalog-item__block-price">
            <div class="catalog-item__price">
                <div class="catalog-item__price-title">Цена:</div>
                <div class="price">{{ priceFormatted }}</div>
            </div>
            <div class="catalog-item__action">
                <div v-if="!inCart" class="catalog-item__action-item" @click="$emit('addToCart')">
                    <img src="image/in-cart-off.svg" alt="добавить в корзину">
                </div>
                <div v-else class="catalog-item__action-item" @click="$emit('deleteToCart')">
                    <img src="image/in-cart-on.svg" alt="удалить из корзины">
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "../assets/styles/variables.scss";

.catalog-item{
    border: 1px solid variables.$text-color1;
    border-radius: variables.$border-radius-m;
    padding: 30px 29px;
    position: relative;
    transition: 0.3s;

    &:hover{
        box-shadow: variables.$box-shadow-lite;
    }

    .catalog-item__is-favourites{
        position: absolute;
        top: 29px;
        left: 30px;
        cursor: pointer;
    }

    .catalog-item__img{
        width: 133px;
        height: 112px;
        margin-bottom: 14px;

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
            color: variables.$text-color3;
            margin-bottom: 2px;
        }

        .catalog-item__action{
            width: 31px;
            height: 32px;
            
            .catalog-item__action-item{
                cursor: pointer;
            }
        }
    }
}
</style>