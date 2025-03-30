<script setup>
import { ref } from 'vue';
import CartItem from './CartItem.vue';
import NotFound from '../components/NotFound.vue';

const emit = defineEmits(['closeCart']);
defineProps({
    openCart: Boolean
})

const notCartItems = ref(false);
const closeCart = ref(false);

function closingCart(){
    closeCart.value = true;
    emit('closeCart');
}
</script>

<template>
    <div @click="closingCart" class="fon" :class="{ 'fon__close' : !openCart}"></div>
    <div class="cart" :class="{ 'cart__open' : openCart, 'cart__close' : closeCart && !openCart}">
        <div class="cart__title title_s">Корзина</div>
        <template v-if="!notCartItems">
            <div class="cart__list">
                <CartItem
                    title="Мужские Кроссовки Nike Air Max 270"
                    img="/sneakers/sneakers-3.jpg"
                    :price="12999"
                ></CartItem>
            </div>
            <div class="cart__price">
                <div class="cart__price-title">Итого:</div>
                <div class="cart__price-line"></div>
                <div class="price">21498 руб.</div>
            </div>
            <div class="cart__action">
                <button type="button" class="cart__btn button-green">
                    <div class="button-green__text">Оформить заказ</div>
                    <div class="button-green__btn">
                        <img src="image/arrow-next.svg" alt="вперед">
                    </div>
                </button>
            </div>
        </template>

        <NotFound v-else @goBack="closingCart"
            title="Корзина пустая"
            description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            img="box.png"
            >
        </NotFound>
    </div>
</template>

<style lang="scss" scoped>
@use "../assets/styles/variables.scss";
@use "../assets/styles/mixins.scss";

.fon{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
    background: variables.$fon-color;
}

.fon__close{
    display: none;
}

.cart{
    transform: translateX(100%);
    position: fixed;
    top: 0;
    right: 0;
    width: 385px;
    height: 100%;
    z-index: 5;
    padding: 32px 30px;
    background: variables.$container-color;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    .cart__title{
        margin-bottom: 30px;
    }

    .cart__list{
        display: flex;
        flex-direction: column;
        gap: 20px;
        flex-grow: 1;
        margin-bottom: 30px;
    }

    .cart__price{
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        gap: 3px;
        margin-bottom: 24px;

        .cart__price-title{
            font-weight: 400;
            font-size: 16px;
            line-height: 100%;
        }

        .cart__price-line{
            flex-grow: 1;
            border-bottom: 1px dotted variables.$text-color3;
        }
    }

    .cart__action{
        .cart__btn{
            width: 100%;
        }
    }
}

.cart__open{
    animation-name: cartOpening;
    animation-duration: 1s;
    animation-fill-mode: forwards;
}

.cart__close{
    animation-name: cartClosing;
    animation-duration: 1s;
    animation-fill-mode: forwards;
}

@keyframes cartOpening{
    0%{
        transform: translateX(100%);
    }
    100%{
        transform: translateX(0%);
    }
}

@keyframes cartClosing{
    0%{
        transform: translateX(0%);
    }
    100%{
        transform: translateX(100%);
    }
}
</style>