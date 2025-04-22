import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';
import { ServicesResponseType } from '../types/services-response.type';
import { OrderServices } from '../services/order-services';
import { OrderItemType } from '../types/order-item.type';

export const useOrdersStore = defineStore('orders', () => {
    const orders: Ref<OrderItemType[]> = ref([]);
    const ordersRequested: Ref<boolean> = ref(false);

    async function getOrders(): Promise<void> {
        ordersRequested.value = true;

        const response: ServicesResponseType = await OrderServices.getOrders();
        if (response.error && !response.info) return;

        orders.value = response.info;
    }

    return {
        orders,
        ordersRequested,
        getOrders,
    }
})