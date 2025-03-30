<script setup>
import { computed } from "vue"
import { StringUtils } from "../utils/string-utils";

const props = defineProps({
    title: String,
    img: String,
    price: Number,
    inFavorites: Boolean,
    inCart: Boolean
})

const inFavoritesImg = computed(() => {
    return 'image/' + (props.inFavorites ? 'is-favorites-on.svg' : 'is-favorites-off.svg');
});

const inCartImg = computed(() => {
    return 'image/' + (props.inCart ? 'in-cart-on.svg' : 'in-cart-off.svg');
});

const priceFormatted = computed(() => {
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
            <div class="catalog-item__in-cart">
                <img :src="inCartImg" alt="в корзину">
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

        .catalog-item__in-cart{
            cursor: pointer;
        }
    }
}
</style>