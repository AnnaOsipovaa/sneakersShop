<script setup lang="ts">
import { computed, ref, Ref } from 'vue';

const progress: Ref<number> = ref(0);

window.addEventListener("scroll", () => {
    const height: number = document.body.scrollHeight - window.innerHeight;
    const scrollPosition: number = document.documentElement.scrollTop;
    progress.value = (scrollPosition * 100)/height;
});
</script>

<template>
    <div class="progress-line" :style="{ 'width' : progress + '%'}"></div>
</template>

<style lang="scss" scoped>
@use "../assets/styles/variables.scss" as *;
@use "../assets/styles/mixins.scss" as *;

.progress-line{
    position: fixed;
    top: 0;
    left: 0;
    height: 1vh;
    width: 0%;
    z-index: 15;
    background: $button-color;
    border-radius: 0 15px 15px 0;
}
</style>