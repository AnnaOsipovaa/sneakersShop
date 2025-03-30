<script setup>
import { RouterView } from 'vue-router';
import { ref } from 'vue';

import Header from './components/Header.vue';
import Cart from './components/Cart.vue';

const openCart = ref(false);

function toggleCart(){
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