<script setup lang="ts">
import { computed } from "vue"
import { StringUtils } from "../utils/string-utils";

defineEmits<{
    'addToCart': [],
    'deleteToCart': []
    'addToFavorites': [],
    'deleteToFavorites': []
}>();

const props = defineProps<{
    title: string,
    img: string,
    price: number,
    inFavorites: boolean,
    inCart: boolean
}>();

const priceFormatted = computed<string>(() => {
    return StringUtils.toPriceFormat(props.price) + ' руб.';
})
</script>

<template>
    <div class="catalog-item">
        <div class="catalog-item__action">
            <div v-if="!inFavorites" class="catalog-item__is-favourites" @click="$emit('addToFavorites')">
                <img src="image/is-favorites-off.svg" alt="добавить в избранное">
            </div>
            <div v-else class="catalog-item__is-favourites" @click="$emit('deleteToFavorites')">
                <img src="image/is-favorites-on.svg" alt="удалить из избранного">
            </div>
        </div>
        <div class="catalog-item__img">
            <img :src="'image/sneakers/' + img" alt="фото">
        </div>
        <div class="catalog-item__title product-title">{{ title }}</div>
        <div class="catalog-item__block-price">
            <div class="catalog-item__price">
                <div class="catalog-item__price-title">Цена:</div>
                <div class="price">{{ priceFormatted }}</div>
            </div>
            <div class="catalog-item__action">
                <div v-if="!inCart" class="catalog-item__in-cart" @click="$emit('addToCart')">
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
    display: flex;
    flex-direction: column;
    transition: 0.3s;

    &:hover{
        box-shadow: variables.$box-shadow-lite;
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
            color: variables.$text-color3;
            margin-bottom: 2px;
        }

        .catalog-item__action{
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
        border-radius: 20px;
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