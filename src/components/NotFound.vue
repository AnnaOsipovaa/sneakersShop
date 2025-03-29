<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

defineProps({
    title: String,
    description: String,
    img: String
})

function goBack(){
    router.go(-1);
}
</script>

<template>
    <div class="not-found">
        <div class="not-found__img">
            <img :src="'image/'+ img" alt="">
        </div>
        <div class="not-found__title title_s">{{ title }}</div>
        <div class="not-found__text">{{ description }}</div>
        <button type="button" class="not-found__btn" @click="goBack">
            <div class="not-found__btn-img">
                <img src="image/arrow-back.png" alt="назад">
            </div>
            <div class="not-found__btn-text">Вернуться назад</div>
        </button>
    </div>
</template>

<style lang="scss" scoped>
@use "../assets/styles/variables.scss";
@use "../assets/styles/mixins.scss";

.not-found{
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    .not-found__img{
        width: 70px;
        height: 70px;
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
        background-color: variables.$button-color;
        color: variables.$text-color4;
        display: flex;
        align-items: center;
        gap: 20px;
        padding: 17px 31px;
        border-radius: 18px;
        max-width: 245px;
        cursor: pointer;
        font-size: 16px;
        line-height: 100%;
        transition: 0.3s;

        &:hover{
            background: variables.$button-hover-color;
        }

        .not-found__btn-img{
            @include mixins.flex-center;
        }
    }
}

</style>