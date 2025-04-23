<script setup lang="ts">
import { ref, Ref, computed } from 'vue';
import { AuthServices } from '../services/auth-services';
import { StorageUtils } from '../utils/storage-utils';
import { ResponseType } from '../types/response.type';
import Loader from '../components/Loader.vue';
import { useRouter } from 'vue-router';
import { ErrorInput } from '../enum/error-input.enum';
import { useProductsStore } from '../store/products';

const productsStore = useProductsStore();
const router = useRouter();

const email: Ref<string> = ref('');
const password: Ref<string> = ref('');
const repeatPassword: Ref<string> = ref('');
const errorEmailText: Ref<string> = ref('');
const errorPasswordText: Ref<string> = ref('');
const errorRepeatPasswordText: Ref<string> = ref('');
const loaderOn: Ref<boolean> = ref(false);

async function signup(): Promise<void> {
    if(!validation) return;

    loaderOn.value = true;
    const result: ResponseType = await AuthServices.signup({
        email: email.value,
        password: password.value
    });
    loaderOn.value = false;

    if(result.error){
        switch (result.data.code) {
            case 2:
                showError(ErrorInput.email, result.data.message);
                break;
        }
        return;
    }

    alert('Регистрация прошла успешно!');
    await login();
}

async function login(): Promise<void> {
    loaderOn.value = true;
    const result: ResponseType = await AuthServices.login({
        email: email.value,
        password: password.value
    });
    loaderOn.value = false;

    if(result.error) return;

    StorageUtils.setAuthInfo(result.data.accessToken, result.data.refreshToken, {
        name: result.data.name,
        email: result.data.email
    });
    router.push({ name: 'profile' });
    await productsStore.syncCart();
    await productsStore.getCart();
    await productsStore.syncFavorites();
    await productsStore.getFavorites();
}

function showError(inputError?: number, message: string = ''): void{
    switch (inputError) {
        case ErrorInput.email:
            errorEmailText.value = message;
            break;
        case ErrorInput.password:
            errorPasswordText.value = message;
            break;
        case ErrorInput.repeatPassword:
            errorRepeatPasswordText.value = message;
            break;
        default:
            errorEmailText.value = '';
            errorPasswordText.value = '';
            errorRepeatPasswordText.value = '';
            break;
    }
}

const validation = computed<boolean>(() => {
    showError();
    let error = false;

    if(email.value){
        if(!/^[a-zA-Z0-9_-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,3}$/.test(email.value)){
            showError(ErrorInput.email, 'Неверный формат');
            error = true;
        }
    }else{
        error = true;
    }

    if(password.value){
        if(!/(?=.*\d)/.test(password.value)){
            showError(ErrorInput.password, 'Пароль должен содержать цифры');
            error = true;
        }else if(!/(?=.*[a-z])/.test(password.value)){
            showError(ErrorInput.password, 'Пароль должен содержать строчные буквы');
            error = true;
        }else if(!/(?=.*[A-Z])/.test(password.value)){
            showError(ErrorInput.password, 'Пароль должен содержать заглавные буквы');
            error = true;
        }else if(!/.{8,}/.test(password.value)){
            showError(ErrorInput.password, 'Пароль должен быть более 7 символов');
            error = true;
        }
    }else{
        error = true;
    }

    if(repeatPassword.value){
        if(password.value !== repeatPassword.value){
            showError(ErrorInput.repeatPassword, 'Пароли не совпадают');
            error = true;
        }
    }else{
        error = true;
    }

    return error;
});
</script>

<template>
    <div v-if="loaderOn" class="fon">
        <Loader></Loader>
    </div>

    <div class="signup">
        <div class="signup__block">
            <h1 class="signup__title title_m">Регисрация</h1>
            <form action="" class="signup-form">
                <div class="form-input">
                    <input type="text" id="email" v-model="email" class="form-input__input text_s" :class="{ 'input-error' : errorEmailText }" required>
                    <label for="email" class="form-input__label">Ваш email</label>
                    <div class="input-error__text">{{ errorEmailText }}</div>
                </div>
                <div class="form-input">
                    <input type="password" id="password" v-model="password" class="form-input__input text_s" :class="{ 'input-error' : errorPasswordText }" required>
                    <label for="password" class="form-input__label">Ваш пароль</label>
                    <div class="input-error__text">{{ errorPasswordText }}</div>
                </div>
                <div class="form-input">
                    <input type="password" id="passwordRepeat" v-model="repeatPassword" class="form-input__input text_s" :class="{ 'input-error' : errorRepeatPasswordText }" required>
                    <label for="passwordRepeat" class="form-input__label">Повторите пароль</label>
                    <div class="input-error__text">{{ errorRepeatPasswordText }}</div>
                </div>
                <div>
                    <button type="button" @click="signup" :disabled=validation class="signup-form__btn button-green">Зарегистрироваться</button>
                </div>
            </form>
            <div class="signup__block-link">
                <RouterLink :to="{ name: 'login' }" class="link">У вас уже есть аккаунт? Войти</RouterLink>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "../assets/styles/variables.scss" as *;
@use "../assets/styles/mixins.scss" as *;

.signup {
    @include flex-center;
    flex-grow: 1;

    .signup__block{
        display: flex;
        flex-direction: column;
        align-items: center;
        
        .signup__title{
            margin-bottom: 15px;
        }

        .signup-form{
            display: flex;
            flex-direction: column;
            gap: 17px;
            border-radius: 20px;
            margin-bottom: 30px;
            width: 315px;

            .signup-form__btn{
                width: 100%;
                border-radius: 8px;
                display: flex;
                justify-content: center;
                padding: 17px 31px;
            }
        }

        .signup__block-link{
            text-align: center;
        }
    }
}

@media screen and (max-width: 400px){
    .signup {
        .signup__block{
            .signup-form{
                width: 265px;
            }
        }
    }
}
</style>