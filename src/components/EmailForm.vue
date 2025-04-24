<script setup lang="ts">
import { ref, Ref, computed } from 'vue';

const emit = defineEmits<{
    'closeEmailForm': [email: string]
}>();

const props = defineProps<{
    openEmailForm: boolean
}>();

const email: Ref<string> = ref('');
const errorEmailText: Ref<string> = ref('');
const closeForm: Ref<boolean> = ref(false);

const validation = computed<boolean>(() => {
    let valid: boolean = true;
    errorEmailText.value = '';

    if(email.value){
        if(!/^[a-zA-Z0-9_-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,3}$/.test(email.value)){
            errorEmailText.value = 'Неверный формат';
            valid = false;
        }
    }

    return valid;
});

function closingCart(): void {
    closeForm.value = true;
    emit('closeEmailForm', email.value);
    email.value = '';
}

</script>

<template>
    <div class="fon display_none fon__email-form" :class="{ 'fon__open' : openEmailForm, 'fon__close' : closeForm && !openEmailForm}">
        <div class="fon__email-form-content">
            <form action="" class="email-form__form">
                <div class="form-input">
                    <input type="text" id="email" v-model="email" class="form-input__input text_s" :class="{ 'input-error' : errorEmailText }" required>
                    <label for="email" class="form-input__label">Ваш email</label>
                    <div class="input-error__text">{{ errorEmailText }}</div>
                </div>
                <div class="email-form__block-btn">
                    <button type="button" @click="closingCart" :disabled="!validation" class="button button-green">Готово</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "../assets/styles/variables.scss" as *;
@use "../assets/styles/mixins.scss" as *;

.fon__email-form{
    z-index: 20!important;

    .fon__email-form-content{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        max-width: 100%;
        width: 350px;
        padding: 0 20px;

        .email-form__form{
            
            padding: 20px;
            border-radius: $border-radius-s;
            background: white;

            .email-form__block-btn{
                margin-top: 20px;
                text-align: center;
            }
        }
    }
}

.fon__open{
    display: block;
    animation-name: fonOpening;
    animation-duration: 1s;
    animation-fill-mode: forwards;
}

.fon__close{ 
    animation-name: fonClosing;
    animation-duration: 1s;
    animation-fill-mode: forwards;
}

@keyframes fonOpening{
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
}

@keyframes fonClosing{
    0%{
        opacity: 1;
    }
    100%{
        opacity: 0;
    }
}
</style>