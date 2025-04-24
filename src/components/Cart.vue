<script setup lang="ts">
import { onMounted, computed, ref, Ref, watchEffect } from 'vue';
import { useProductsStore } from '../store/products';
import { OrderServices } from '../services/order-services';
import CartItem from './CartItem.vue';
import NotFound from '../components/NotFound.vue';
import { ProductType } from '../types/product.type';
import { StringUtils } from '../utils/string-utils';
import { StorageUtils } from '../utils/storage-utils';
import { ServicesResponseType } from '../types/services-response.type';
import { OrderProductType } from '../types/order-product.type';
import { UserInfoType } from "../types/user-info.type";
import EmailForm from './EmailForm.vue';
import Loader from './Loader.vue';

const productsStore = useProductsStore();

const emit = defineEmits<{
    'closeCart': []
}>();

const props = defineProps<{
    openCart: boolean
}>();

const closeCart: Ref<boolean> = ref(false);
const loaderOn: Ref<boolean> = ref(false);
let orderEmail: string | null = null;

onMounted(async () => {
    if(props.openCart && !productsStore.cartRequested){
        await productsStore.getCart();
    }
});

const cartSum = computed<string>(() => {
    return StringUtils.toPriceFormat(productsStore.cartSum) + ' руб.';
})

function closingCart(): void {
    closeCart.value = true;
    emit('closeCart');
}

async function createOrder(): Promise<void>{
    if(!orderEmail) {
        let userinfo: UserInfoType | null = StorageUtils.getAuthUserInfo();

        if(!userinfo || !userinfo.email) return toggleEmailForm();

        orderEmail = userinfo.email;
    }

    const products: OrderProductType[] = [];
    productsStore.cart.forEach((product: ProductType) => {
        products.push({
            idProduct: product.id,
            price: product.price
        })
    });

    if(products.length === 0 || productsStore.cartSum === 0) return;

    loaderOn.value = true;
    
    const response: ServicesResponseType = await OrderServices.create({
        email: orderEmail,
        items: products,
        sum: productsStore.cartSum
    });
    loaderOn.value = false;

    if (!response.error) {
       alert('Заказ успешно создан!');
    }else{
        alert('Возникла ошибка, повторите попытку позже.');
    }

    closingCart();
    orderEmail = null;
    productsStore.cart = [];
}

const openEmailForm: Ref<boolean> = ref(false);

function toggleEmailForm(email?: string): void {
    openEmailForm.value = !openEmailForm.value;
    if(email){
        orderEmail = email;
        createOrder();
    }
}
</script>

<template>
    <div v-if="loaderOn" class="fon fon_absolute" style="z-index: 30;">
        <Loader></Loader>
    </div>
 

    <EmailForm :openEmailForm="openEmailForm" @closeEmailForm="toggleEmailForm"></EmailForm>

    <div>
        <div @click="closingCart" class="fon display_none" :class="{ 'fon__open' : openCart, 'fon__close' : closeCart && !openCart}"></div>
        <div class="cart" :class="{ 'cart__open' : openCart, 'cart__close' : closeCart && !openCart}">
            <div class="cart__title title_s">Корзина</div>
            <div class="cart__cross" @click="closingCart">✕</div>
            <template v-if="productsStore.cart.length !== 0">
                <div class="cart__list">
                    <CartItem v-for="product in productsStore.cart" 
                        :key="product.id"
                        :product="product"
                    ></CartItem>
                </div>
                <div class="cart__price">
                    <div class="cart__price-title">Итого:</div>
                    <div class="cart__price-line"></div>
                    <div class="price">{{ cartSum }}</div>
                </div>
                <div class="cart__action">
                    <button type="button" @click="createOrder" class="cart__btn button button-green">
                        <div>Оформить заказ</div>
                        <div>
                            <img src="image/arrow-next.svg" alt="вперед">
                        </div>
                    </button>
                </div>
            </template>

            <NotFound v-else 
                @go="closingCart"
                title="Корзина пуста"
                description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
                img="box.png"
                buttonText="Вернуться назад"
            >
            </NotFound>
        </div>
    </div>
    
</template>

<style lang="scss" scoped>
@use "../assets/styles/variables.scss" as *;
@use "../assets/styles/mixins.scss" as *;

.cart{
    transform: translateX(100%);
    position: fixed;
    top: 0;
    right: 0;
    width: 385px;
    height: 100%;
    z-index: 15;
    padding: 32px 30px;
    background: $background-color1;
    display: flex;
    flex-direction: column;

    .cart__title{
        margin-bottom: 30px;
    }

    .cart__cross{
        font-size: 26px;
        cursor: pointer;
        position: absolute;
        right: 10px;
        top: 10px;
        color: $text-color;
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
            border-bottom: 1px dotted $text-color3;
        }
    }

    .cart__action{
        .cart__btn{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
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

@media screen and (max-width: 500px){
    .cart {
        width: 100%;
    }
}

@media screen and (max-width: 370px){
    .cart {
        padding: 20px;
    }
}
</style>