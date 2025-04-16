<script setup lang="ts">
import { ref, Ref, computed } from 'vue';
import { AuthServices } from '../services/auth-services';
import { StorageUtils } from '../utils/storage-utils';
import { ResponseType } from '../types/response.type';
import Loader from '../components/Loader.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const email: Ref<string> = ref('');
const password: Ref<string> = ref('');
const errorEmailText: Ref<string> = ref('');
const errorPasswordText: Ref<string> = ref('');
const loaderOn: Ref<boolean> = ref(false);

async function login(): Promise<void> {
    if(!disabledBtnLogin) return;

    loaderOn.value = true;

    const result: ResponseType | null = await AuthServices.login({
        email: email.value,
        password: password.value
    });
    showError();
    loaderOn.value = false;

    if(!result) return;

    if(result.error){
        showError(result.data.code);
        return;
    }

    StorageUtils.setAuthInfo(result.data.accessToken, result.data.refreshToken, {
        name: result.data.name,
        email: result.data.email
    });
    router.push({ name: 'profile' });
}

function showError(codeError?: number): void{
    switch (codeError) {
        case 2:
            errorEmailText.value = 'Пользователь не найден';
            break;
        case 3:
            errorPasswordText.value = 'Неверный пароль';
            break;
        default:
            errorEmailText.value = '';
            errorPasswordText.value = '';
            break;
    }
}

const disabledBtnLogin = computed<boolean>(() => {
    return !email.value || 
        !password.value || 
        !/^[a-zA-Z0-9_-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,3}$/.test(email.value);
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
                    <button type="button" @click="login" :disabled="disabledBtnLogin" class="login-form__btn button-green">Войти</button>
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

.loader-fon{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 15;
    background: $fon-color;
    @include flex-center;
}

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
                width: 100%;
            }
        }
    }
}
</style>