<script setup lang="ts">
import { computed } from 'vue';
import { OrderItemType } from '../types/order-item.type';
import { StringUtils } from '../utils/string-utils';
import CatalogItem from '../components/CatalogItem.vue';

const props = defineProps<{
    order: OrderItemType
}>();

const dateCreateFormat = computed<string>(() => {
    return new Date(props.order.date_create).toLocaleString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' });
});

const orderSum = computed<string>(() => {
    return StringUtils.toPriceFormat(props.order.sum) + ' руб.';
})
</script>

<template>
    <div class="order">
        <div class="order__status">{{ order.status }}</div>
        <div class="title_xs order__title">Заказ № {{ order.id }} от {{ dateCreateFormat }}</div>
        <div class="scroll order__products">
            <CatalogItem
                v-for="product in order.products" 
                :key=product.id
                :actionsShow="false"
                :product="product">
            </CatalogItem>
        </div>
        <div class="price order__price">Сумма: {{ orderSum }}</div>
    </div>
</template>

<style lang="scss" scoped>
@use "../assets/styles/variables.scss" as *;

.order{
    padding: 20px 15px;
    border: 1px solid $border-color;
    border-radius: 20px;
    position: relative;
    
    &:not(:last-child){
        margin-bottom: 10px;
    }

    .order__status{
        position: absolute;
        top: 9px;
        right: 8px;
        padding: 3px 9px;
        border-radius: 20px;
        color: $text-color;
        background: $border-color;
        font-size: 12px;
    }

    .order__title{
        color: $button-color;
        margin-bottom: 15px;
    }

    .order__products{
        display: flex;
        gap: 10px;
        overflow-x: auto;
        margin-bottom: 15px;
        padding-bottom: 5px;

        & > * {
            flex-shrink: 0;
            width: 100%;
        }
    }

    .order__price{
        font-size: 16px;
        text-align: end;
        color: $text-color;
    }
}

@media screen and (max-width: 530px){
    .order{
        .order__title{
            font-size: 14px;
        }
        .order__price{
            font-size: 12px;
        }
    }
}

@media screen and (max-width: 400px){
    .order{
        .order__status{
            top: unset;
            right: unset;
            bottom: 9px;
            left: 8px;
        }
    }
}
</style>