<script setup lang="ts">
// /^[a-zA-Z0-9_-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,3}$/
</script>

<template>
    <div class="signup">
        <div class="signup__block">
            <h1 class="signup__title title_m">Регисрация</h1>
            <form action="" class="signup-form">
                <div class="form-input">
                    <input type="text" id="email" class="form-input__input text_s" required>
                    <label for="email" class="form-input__label">Ваш email</label>
                </div>
                <div class="form-input">
                    <input type="password" id="password" class="form-input__input text_s" required>
                    <label for="password" class="form-input__label">Ваш пароль</label>
                </div>
                <div class="form-input">
                    <input type="password" id="passwordRepeat" class="form-input__input text_s" required>
                    <label for="passwordRepeat" class="form-input__label">Повторите пароль</label>
                </div>
                <div>
                    <button type="button" class="signup-form__btn button-green">Зарегистрироваться</button>
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
            gap: 10px;
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
        .signup-form{
            width: 100%;
        }
    }
}
</style>