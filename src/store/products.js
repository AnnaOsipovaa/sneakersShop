import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { ProductServices } from '../services/products-services';

export const useProductsStore = defineStore('products', () => {
  const products = ref([]);
  const productsInFavorites = ref(null);
  let listIdProductsInCart = [];

  const cartSum = computed(() => {
    let sum = 0;

    products.value.forEach((product) => {
      if (product.inCart) {
        sum += product.price;
      }
    })

    return sum;
  }); 

  async function getProducts() {
    const response = await ProductServices.getProducts();
    if (!response.error && response.info) {
      products.value = response.info;
    } else {
      console.log('Ошибка загрузки');
    }

    setInCartFlag();
  }

  async function setInCartFlag() {
    if (listIdProductsInCart.length === 0) {
      getListIdProductsInCart();
    }

    products.value.forEach(product => {
      const indexProductInCartList = listIdProductsInCart.findIndex(catrItem => catrItem === product.id);
      product.inCart = indexProductInCartList > -1 ? true : false;
    });
  }

  function getListIdProductsInCart() {
    let result = [];
    const listId = localStorage.getItem('cart');
    if (listId) {
      const listIdJson = JSON.parse(listId);
      if (listIdJson) {
        result = listIdJson;
      }
    }
    listIdProductsInCart = result;
  }

  function saveListIdProductsInCartInLocalStorage(list) {
    localStorage.setItem('cart', JSON.stringify(list));
  }

  async function addToCart(product) {
    listIdProductsInCart.unshift(product.id);
    saveListIdProductsInCartInLocalStorage(listIdProductsInCart);
    product.inCart = true;
  }

  async function deleteToCart(product) {
    let indexProduct = listIdProductsInCart.findIndex(idProductInCart => idProductInCart === product.id);

    if (indexProduct > -1) {
      listIdProductsInCart.splice(indexProduct, 1);
      saveListIdProductsInCartInLocalStorage(listIdProductsInCart);
    }
    product.inCart = false;
  }

  async function getProductsInFavorites() {
    productsInFavorites.value = [];
  }

  return {
    products,
    productsInFavorites,
    listIdProductsInCart,
    cartSum,
    getProducts,
    getProductsInFavorites,
    addToCart,
    deleteToCart
  }
})