<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useProductsStore } from '../store/products';
import { StringUtils } from '../utils/string-utils';
const productsStore = useProductsStore();

defineEmits<{
  'openCart': []
}>();

const cartSum = computed<string>(() => {
  return StringUtils.toPriceFormat(productsStore.cartSum) + ' руб.';
});

onMounted(async () => {
  if(!productsStore.cartRequested){
    await productsStore.getCart();
  }
});

</script>

<template>
  <header class="header">
    <RouterLink :to="{ name: 'catalog'}" class="logo">
      <div class="logo__img">
        <img src="image/logo.png" alt="logo" />
      </div>
      <div class="logo__text">
        <div class="logo__text-title">VUE SNEAKERS</div>
        <div class="logo__text-description">Магазин лучших кроссовок</div>
      </div>
    </RouterLink>
    <div class="header__burger-menu">
      <span class="header__burger-menu-item"></span>
      <span class="header__burger-menu-item"></span>
      <span class="header__burger-menu-item"></span>
    </div>
    <nav class="header__menu">
      <ul class="header__menu-list">
        <li class="header__menu-item">
          <div @click="$emit('openCart')" class="header__menu-link">
            <div class="header__menu-icon">
              <img src="image/icon-card.svg" alt="card" />
            </div>
            <div class="header__menu-title header__menu-title_bold">{{ cartSum }}</div>
          </div>
        </li>
        <li class="header__menu-item">
          <RouterLink :to="{ name: 'favorites'}" class="header__menu-link">
            <div class="header__menu-icon">
              <img src="image/icon-heart.svg " alt="heart" />
            </div>
            <div class="header__menu-title">Избранное</div>
            <div class="header__menu-count" v-if="productsStore.favoritesCount">{{ productsStore.favoritesCount }}</div>
          </RouterLink>
        </li>
        <li class="header__menu-item">
          <RouterLink :to="{ name: 'profile'}" class="header__menu-link">
            <div class="header__menu-icon">
              <img src="image/icon-user.svg" alt="user" />
            </div>
            <div class="header__menu-title">Профиль</div>
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
@use "../assets/styles/variables.scss";
@use "../assets/styles/mixins.scss";

.header {
  padding: 43px 45px;
  border-bottom: 1px solid variables.$border-color;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo {
    display: flex;
    align-items: center;
    gap: 16px;

    .logo__img {
      width: 40px;
      height: 40px;

      img {
        max-width: 100%;
      }
    }

    .logo__text {
      .logo__text-title {
        font-weight: 700;
        font-size: 20px;
        line-height: 100%;
        text-transform: uppercase;
        margin-bottom: 3px;
      }

      .logo__text-description {
        font-weight: 400;
        font-size: 14px;
        line-height: 100%;
        color: variables.$text-color;
      }
    }
  }

  .header__burger-menu{
    display: none;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;

    .header__burger-menu-item{
      background: variables.$text-color;
      width: 35px;
      height: 3px;
      border-radius: 20px;
    }
  }

  .header__menu{
    .header__menu-list {
      list-style-type: none;
      display: flex;
      align-items: center;
      gap: 32px;

      .header__menu-item{
        .header__menu-link {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          position: relative;
          transition: 0.3s;

          &:hover {
            transform: scale(1.05);
          }

          .header__menu-icon {
            @include mixins.flex-center;
          }

          .header__menu-title {
            font-weight: 400;
            font-size: 14px;
            line-height: 100%;
            color: variables.$text-color2;
          }

          .header__menu-title_bold {
            font-weight: 600;
            color: variables.$text-color-dark;
          }

          .header__menu-count{
            min-width: 18px;
            min-height: 18px;
            position: absolute;
            border-radius: 50%;
            font-size: 11px;
            top: -12px;
            right: -16px;
            background: variables.$background-color;
            color: variables.$text-color4;
            @include mixins.flex-center;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1130px){
  .header {
    position: relative;

    .header__burger-menu{
      display: flex;

      &:hover ~ .header__menu{
        display: block;
      }
    }

    .header__menu{
      display: none;
      min-width: 150px;
      position: absolute;
      right: 42px;
      top: 73px;
      z-index: 4;
      background: variables.$container-color;
      box-shadow: 0 10px 14px 0 rgb(0 0 0 / 20%);
      padding: 20px 30px;
      border-radius: 20px;

      &:hover{
        display: block;
      }
      
      .header__menu-list {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
      }
    }
  }
}

@media screen and (max-width: 600px) {
  .header {
    padding: 23px 25px;

    .logo {
      gap: 10px;

      .logo__img {
        width: 35px;
        height: 35px;
      }

      .logo__text {
        .logo__text-title {
          font-size: 15px;
          margin-bottom: 0;
        }

        .logo__text-description {
          font-size: 12px;
        }
      }
    }

    .header__menu{
      right: 22px;
      top: 50px;
      padding: 20px 25px;
    }
  }
}

@media screen and (max-width: 400px) {
  .header {
    padding: 20px 20px;

    .logo {
      gap: 7px;

      .logo__img {
        width: 35px;
        height: 35px;
      }

      .logo__text {
        .logo__text-title {
          font-size: 13px;
        }

        .logo__text-description {
          font-size: 10px;
        }
      }
    }

    
    .header__menu{
      right: 18px;
      top: 47px;
    }
  }
}

@media screen and (max-width: 340px) {
  .header {
    .logo {
      .logo__text {
        .logo__text-description {
          display: none;
        }
      }
    }
  }
}
</style>