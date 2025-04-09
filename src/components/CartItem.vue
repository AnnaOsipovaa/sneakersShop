<script setup lang="ts">
import { computed } from 'vue';
import { StringUtils } from '../utils/string-utils';

defineEmits(['deleteToCart']);
const props = defineProps<{
    title: string,
    img: string,
    price: number
}>();

const priceFormatted = computed<string>(() => {
    return StringUtils.toPriceFormat(props.price) + ' руб.';
})
</script>


<template>
    <div class="cart-item">
        <div class="cart-item__img">
            <img :src="'image/' + img" alt="фото">
        </div>
        <div class="cart-item__details">
            <div class="cart-item__title product-title">{{ title }}</div>
            <div class="price">{{ priceFormatted }}</div>
        </div>
        <div class="cart-item__delete" @click="$emit('deleteToCart')">
            <img src="image/icon-delete.png" alt="удалить из корзины">
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "../assets/styles/variables.scss";

.cart-item{
    border: 1px solid variables.$text-color1;
    border-radius: variables.$border-radius-s;
    display: flex;
    align-items: center;
    padding: 20px;

    .cart-item__img{
        width: 70px;
        height: 70px;
        flex-shrink: 0;

        img{
            max-width: 100%;
        }
    }

    .cart-item__details{
        margin-left: 21px;

        .cart-item__title{
            margin-bottom: 8px;
        }
    }

    .cart-item__delete{
        align-self: flex-end;
        cursor: pointer;
    }
}
</style>