<script setup>
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
</script>

<template>
    <div class="container">
        <Header></Header>
        <div class="content">
            <RouterView></RouterView>
        </div>
    </div>
</template>