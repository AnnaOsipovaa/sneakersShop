<template>
    <div class="loader-background">
        <span class="loader"></span>
    </div>
</template>

<style lang="scss" scoped>
@use "../assets/styles/variables.scss";
@use "../assets/styles/mixins.scss";

.loader-background{
    @include mixins.flex-center;
    flex-grow: 1;

    .loader {
        width: 48px;
        height: 48px;
        border: 5px solid variables.$button-color;
        border-bottom-color: transparent;
        border-radius: 50%;
        display: inline-block;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
    }
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
} 
</style>