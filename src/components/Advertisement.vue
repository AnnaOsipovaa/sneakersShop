<script setup lang="ts">
import { onMounted, ref, useTemplateRef, watch, Ref, ShallowRef } from "vue";
import { AdvertisementType } from "@/types/advertisement.type";

const currentSlide: Ref<number> = ref(0);
const listSlide = useTemplateRef<HTMLElement>("slider-list");
const advertisementList: Ref<AdvertisementType[]> = ref([]);

onMounted(() => {
    advertisementList.value = [
        {
            id: 1,
            link: "",
            img: "image/advertisements/advertisement1.png",
        },
        {
            id: 3,
            link: "",
            img: "image/advertisements/advertisement1.png",
        },
        {
            id: 7,
            link: "",
            img: "image/advertisements/advertisement1.png",
        }
    ];
})

watch( 
  () => currentSlide.value, 
  () => {

      if(!listSlide || !listSlide.value) return;

      if (currentSlide.value === advertisementList.value.length) {
          currentSlide.value = 0;
      } else if (currentSlide.value === -1) {
          currentSlide.value = advertisementList.value.length - 1;
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
          v-for="(advertisementItem, index) in advertisementList"
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
@use "../assets/styles/variables.scss";
@use "../assets/styles/mixins.scss";

$arrow-size: 35px;

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
    @include mixins.flex-center;
    position: absolute;
    right: math.div(-$arrow-size, 2);
    top: 50%;
    transform: translateY(-50%) scale(1);
    width: $arrow-size;
    height: $arrow-size;
    border-radius: 50%;
    background: variables.$container-color;
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
</style>