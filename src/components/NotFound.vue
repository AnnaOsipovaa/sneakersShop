<script setup lang="ts">
defineEmits<{
    'go': []
}>();

defineProps<{
    title: string,
    description: string,
    img: string,
    buttonText: string
}>();
</script>

<template>
    <div class="not-found">
        <div class="not-found__img">
            <img :src="'image/'+ img" alt="">
        </div>
        <div class="not-found__title title_xs">{{ title }}</div>
        <div class="not-found__text">{{ description }}</div>
        <button type="button" class="not-found__btn button button-green" @click="$emit('go')">
            <div>
                <img src="image/arrow-back.png" alt="назад">
            </div>
            <div class="not-found__btn-text">{{ buttonText }}</div>
        </button>
    </div>
</template>

<style lang="scss" scoped>
@use "../assets/styles/variables.scss" as *;
@use "../assets/styles/mixins.scss" as *;

.not-found{
    @include flex-center;
    flex-direction: column;
    flex-grow: 1;
    text-align: center;
    padding: 15px;

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
        color: $text-color;
        margin-bottom: 41px;
    }

    .not-found__btn{
        width: 245px;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
}

@media screen and (max-width: 800px){
    .not-found{
        .not-found__img{
            width: 100px;
            height: 100px;
            margin-bottom: 20px;
        }

        .not-found__title{
            margin-bottom: 5px;
        }

        .not-found__text{
            font-size: 14px;
            margin-bottom: 25px;
        }
    }
}

@media screen and (max-width: 400px){
    .not-found{
        .not-found__img{
            width: 60px;
            height: 60px;
            margin-bottom: 15px;
        }
    }
}
</style>