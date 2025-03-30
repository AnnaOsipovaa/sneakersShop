<script setup>
defineEmits(['goBack']);
defineProps({
    title: String,
    description: String,
    img: String
})
</script>

<template>
    <div class="not-found">
        <div class="not-found__img">
            <img :src="'image/'+ img" alt="">
        </div>
        <div class="not-found__title title_xs">{{ title }}</div>
        <div class="not-found__text">{{ description }}</div>
        <button type="button" class="not-found__btn button-green" @click="$emit('goBack')">
            <div class="button-green__btn">
                <img src="image/arrow-back.png" alt="назад">
            </div>
            <div class="not-found__btn-text button-green__text">Вернуться назад</div>
        </button>
    </div>
</template>

<style lang="scss" scoped>
@use "../assets/styles/variables.scss";
@use "../assets/styles/mixins.scss";

.not-found{
    @include mixins.flex-center;
    flex-direction: column;
    flex-grow: 1;
    text-align: center;

    .not-found__img{
        width: 120px;
        height: 120px;
        margin-bottom: 31px;

        img{
            max-width: 100%;
        }
    }

    .not-found__title{
        margin-bottom: 11px;
    }

    .not-found__text{
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: variables.$text-color;
        margin-bottom: 41px;
    }

    .not-found__btn{
        width: 245px;
    }
}

</style>