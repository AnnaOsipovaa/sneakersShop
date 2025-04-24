<script setup lang="ts">
import { RouterView } from 'vue-router';
import { Ref, ref, onBeforeMount } from 'vue';
import { useProductsStore } from './store/products';
import { StorageUtils } from './utils/storage-utils';
import Header from './components/Header.vue';
import Cart from './components/Cart.vue';
import ProgressLine from './components/ProgressLine.vue';

const productsStore = useProductsStore();
const openCart: Ref<boolean> = ref(false);

function toggleCart(): void {
    openCart.value = !openCart.value;
}

onBeforeMount(() => {
    if(StorageUtils.getAuthToken(StorageUtils.accessTokenKey)) return;

    productsStore.getInfoInLocalStorege();
});

window.addEventListener("beforeunload", function() {
    if(StorageUtils.getAuthToken(StorageUtils.accessTokenKey)) return;

    productsStore.setInfoInLocalStorege();
});
</script>

<template>
    <ProgressLine></ProgressLine>

    <Cart :openCart="openCart" @closeCart="toggleCart"></Cart>

    <div class="container">
        <Header @openCart="toggleCart"></Header>
        <div class="content">
            <RouterView></RouterView>
        </div>
    </div>
</template>