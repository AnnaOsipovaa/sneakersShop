import { defineStore } from 'pinia';
import { ref } from 'vue';
import { ProductServices } from '../services/products-services';

export const useProductsStore = defineStore('products', () => {
  const favoritesProducts = ref(null);
  const products = ref(null);

  async function getProducts() {
    const response = await ProductServices.getProducts();
    if (!response.error && response.info) {
      products.value = response.info;
    } else {
      console.log('Ошибка загрузки');
    }
  }

  async function getFavoritesProducts() {
    
    /*
    const response = await ProductServices.getProducts();
    if (!response.error && response.info) {
      favoritesProducts.value = favoritesProducts.info;
    } else {
      console.log('Ошибка загрузки');
    }*/
    console.log('запрос избранного');
    favoritesProducts.value = [];
  }

  return {
    products,
    favoritesProducts,
    getProducts,
    getFavoritesProducts
  }
})