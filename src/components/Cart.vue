<script setup lang="ts">
import { computed, ref, Ref } from 'vue';
import { ProductType } from "@/types/product.type";
import { useProductsStore } from '../store/products';
import CartItem from './CartItem.vue';
import NotFound from '../components/NotFound.vue';
import { StringUtils } from '../utils/string-utils';

const productsStore = useProductsStore();

const emit = defineEmits<{
    'closeCart': []
}>();

const props = defineProps<{
    openCart: boolean
}>();

const closeCart: Ref<boolean> = ref(false);

function closingCart(): void {
    closeCart.value = true;
    emit('closeCart');
}

async function deleteToCart(product: ProductType): Promise<void> {
    productsStore.deleteToCart(product);
}

const productInCart = computed<ProductType[]>(() => {
    return productsStore.products.filter((product: ProductType) => product.inCart === true);
});

const cartSum = computed<string>(() => {
    return StringUtils.toPriceFormat(productsStore.cartSum) + ' руб.';
})
</script>

<template>
    <div>
        <div @click="closingCart" class="fon" :class="{ 'fon__open' : openCart, 'fon__close' : closeCart && !openCart}"></div>
        <div class="cart" :class="{ 'cart__open' : openCart, 'cart__close' : closeCart && !openCart}">
            <div class="cart__title title_s">Корзина</div>
            <template v-if="productInCart.length !== 0">
                <div class="cart__list">
                    <CartItem v-for="product in productInCart" 
                        :key="product.id"
                        @deleteToCart = deleteToCart(product)
                        :title="product.title"
                        :img="product.imageUrl"
                        :price="product.price"
                    ></CartItem>
                </div>
                <div class="cart__price">
                    <div class="cart__price-title">Итого:</div>
                    <div class="cart__price-line"></div>
                    <div class="price">{{ cartSum }}</div>
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

            <NotFound v-else 
                @goBack="closingCart"
                title="Корзина пуста"
                description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
                img="box.png"
            >
            </NotFound>
        </div>
    </div>
    
</template>

<style lang="scss" scoped>
@use "../assets/styles/variables.scss";
@use "../assets/styles/mixins.scss";

.fon{
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
    background: variables.$fon-color;
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
        overflow-y: auto;
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

.fon__open{
    display: block;
    animation-name: fonOpening;
    animation-duration: 1s;
    animation-fill-mode: forwards;
}

.fon__close{ 
    animation-name: fonClosing;
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

@keyframes fonOpening{
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
}

@keyframes fonClosing{
    0%{
        opacity: 1;
        display: block;
    }
    100%{
        opacity: 0;
        display: none;
    }
}
</style>