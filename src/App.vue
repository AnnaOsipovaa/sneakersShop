<script setup lang="ts">
import { RouterView } from 'vue-router';
import { Ref, ref } from 'vue';

import Header from './components/Header.vue';
import Cart from './components/Cart.vue';

const openCart: Ref<boolean> = ref(false);

function toggleCart(): void {
    openCart.value = !openCart.value;
}
</script>

<template>
    <Cart :openCart="openCart" @closeCart="toggleCart"></Cart>

    <div class="container">
        <Header @openCart="toggleCart"></Header>
        <div class="content">
            <RouterView></RouterView>
        </div>
    </div>
</template>