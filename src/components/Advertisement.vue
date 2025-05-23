<script setup lang="ts">
import { onMounted, ref, useTemplateRef, watch, Ref } from "vue";
import { useAdvertisementsStore } from "../store/advertisement";

const advertisementsStore = useAdvertisementsStore();
const currentSlide: Ref<number> = ref(0);
const listSlide = useTemplateRef<HTMLElement>("slider-list");

onMounted(async () => {
  if(advertisementsStore.advertisements.length !== 0) return;

  await advertisementsStore.getAdvertisements();
});

watch( 
  () => currentSlide.value, 
  () => {
    if(!listSlide || !listSlide.value) return;

    if (currentSlide.value === advertisementsStore.advertisements.length) {
        currentSlide.value = 0;
    } else if (currentSlide.value === -1) {
        currentSlide.value = advertisementsStore.advertisements.length - 1;
    }

    listSlide.value.style.transform = `translateX(-${currentSlide.value * listSlide.value.offsetWidth}px)`;
  }
)

window.addEventListener('resize', () => {
  if(!listSlide || !listSlide.value) return;

  currentSlide.value = 0;
  listSlide.value.style.transform = `translateX(0px)`;
});
</script>

<template>
  <div class="advertisement">
    <div class="slider">
      <div class="slider__list" ref="slider-list">
        <div
          class="slider__list-item"
          :class="{
            animationPreviousSlide: currentSlide === index + 1,
            animationCurrentSlide: currentSlide === index,
          }"
          v-for="(advertisementItem, index) in advertisementsStore.advertisements"
          :key="advertisementItem.id"
        >
          <a :href="advertisementItem.link">
            <img :src="advertisementItem.img" alt="рекламный слайд" />
          </a>
        </div>
      </div>
    </div>
    <div class="advertisement__arrow" @click="currentSlide++;">
      <img src="image/arrow.svg" alt="вперед" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:math";
@use "../assets/styles/variables.scss" as *;
@use "../assets/styles/mixins.scss" as *;

$arrow-size_m: 35px;
$arrow-size_s: 25px;

.advertisement {
  position: relative;
  max-height: 300px;
  margin-bottom: 39px;
  
  .slider {
    overflow: hidden;

    .slider__list {
      max-width: 100%;
      display: flex;
      transition: 1s;
      transform: translateX(0px);
    }

    .slider__list-item{
      width: 100%;
      flex-shrink: 0;

      img{
        max-width: 100%;
        max-height: 100%;
      }
    }
  }

  .advertisement__arrow {
    @include flex-center;
    position: absolute;
    right: math.div(-$arrow-size_m, 2);
    top: 50%;
    transform: translateY(-50%) scale(1);
    width: $arrow-size_m;
    height: $arrow-size_m;
    border-radius: 50%;
    background: $background-color1;
    cursor: pointer;
    box-shadow: 0px 0px 6px 0 #00000026;
    transition: 0.2s;

    &:hover {
      transform: translateY(-50%) scale(1.1);
    }
  }
}

.animationPreviousSlide {
  animation-name: opacityOff;
  animation-duration: 1s;
  animation-fill-mode: forwards;
}

.animationCurrentSlide {
  animation-name: opacityOn;
  animation-duration: 1.5s;
  animation-fill-mode: forwards;
}

@keyframes opacityOff {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes opacityOn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@media screen and (max-width: 900px){
  .advertisement {
    margin-bottom: 20px;
  }
}

@media screen and (max-width: 600px){
  .advertisement {
    .advertisement__arrow {
      right: math.div(-$arrow-size_s, 2);
      width: $arrow-size_s;
      height: $arrow-size_s;
    }
  }
}
</style>