<script setup lang="ts">
import { ref, Ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useProductsStore } from '../store/products';
import { AuthServices } from '../services/auth-services';
import { CartServices } from '../services/cart-services';
import { StorageUtils } from '../utils/storage-utils';
import { ResponseType } from '../types/response.type';
import Loader from '../components/Loader.vue';
import { ErrorInput } from '../enum/error-input.enum';

const productsStore = useProductsStore();
const router = useRouter();

const email: Ref<string> = ref('');
const password: Ref<string> = ref('');
const errorEmailText: Ref<string> = ref('');
const errorPasswordText: Ref<string> = ref('');
const loaderOn: Ref<boolean> = ref(false);

async function login(): Promise<void> {
    if(!validation) return;

    loaderOn.value = true;
    const result: ResponseType = await AuthServices.login({
        email: email.value,
        password: password.value
    });
    loaderOn.value = false;

    if(result.error){
        switch (result.data.code) {
            case 2:
                showError(ErrorInput.email, result.data.message);
                break;
            case 3:
                showError(ErrorInput.password, result.data.message);
                break;
        }
        return;
    }

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
        default:
            errorEmailText.value = '';
            errorPasswordText.value = '';
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

    if(!password.value){
        error = true;
    }

    return error;
});

</script>

<template>
    <div v-if="loaderOn" class="loader-fon">
        <Loader></Loader>
    </div>

    <div class="login">
        <div class="login__block">
            <h1 class="login__title title_m">Вход</h1>
            <form action="" class="login-form">
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
                <div>
                    <button type="button" @click="login" :disabled="validation" class="login-form__btn button-green">Войти</button>
                </div>
            </form>
            <div class="login__block-link">
                <RouterLink :to="{ name: 'signup' }" class="link">У вас ещё нет аккаунта? Зарегистрироваться</RouterLink>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "../assets/styles/variables.scss" as *;
@use "../assets/styles/mixins.scss" as *;

.login {
    @include flex-center;
    flex-grow: 1;

    .login__block{
        display: flex;
        flex-direction: column;
        align-items: center;

        .login__title{
            margin-bottom: 15px;
        }

        .login-form{
            display: flex;
            flex-direction: column;
            gap: 17px;
            border-radius: 20px;
            margin-bottom: 30px;
            width: 315px;

            .login-form__btn{
                width: 100%;
                border-radius: 8px;
                display: flex;
                justify-content: center;
                padding: 17px 31px;
            }
        }

        .login__block-link{
            text-align: center;
        }
    }
}

@media screen and (max-width: 400px){
    .login {
        .login__block{
            .login-form{
                width: 265px;
            }
        }
    }
}
</style>