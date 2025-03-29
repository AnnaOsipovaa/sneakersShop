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
    <nav class="header__menu">
      <ul class="header__menu-list">
        <li class="header__menu-item">
          <RouterLink :to="{ name: 'favorites'}" class="header__menu-link">
            <div class="header__menu-icon">
              <img src="image/icon-card.svg" alt="card" />
            </div>
            <div class="header__menu-title header__menu-title_bold">1205 руб.</div>
          </RouterLink>
        </li>
        <li class="header__menu-item">
          <RouterLink :to="{ name: 'favorites'}" class="header__menu-link">
            <div class="header__menu-icon">
              <img src="image/icon-heart.svg " alt="heart" />
            </div>
            <div class="header__menu-title">Избранное</div>
          </RouterLink>
        </li>
        <li class="header__menu-item">
          <RouterLink :to="{ name: 'favorites'}" class="header__menu-link">
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
        }
      }
    }
  }
}
</style>