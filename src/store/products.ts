import { defineStore } from 'pinia';
import { computed, reactive, Reactive, Ref, ref } from 'vue';
import { ProductServices } from '../services/products-services';
import { ProductType } from '@/types/product.type';
import { ServicesResponseType } from '@/types/services-response.type';

export const useProductsStore = defineStore('products', () => {
  const products: Ref<ProductType[]> = ref([]);
  const cart: Ref<ProductType[]> = ref([]);
  const favorites: Ref<ProductType[]> = ref([]);

  let listIdProductsInFavorites: number[] = [];
  let listIdProductsInCart: number[] = [];

  let productsUploaded: ProductType[] = [];

  const favoritesCount = computed<number>(() => {
    let count: number = 0;
    favorites.value.forEach(() => count++);
    return count;
  });

  const cartSum = computed<number>(() => {
    let sum: number = 0;
    cart.value.forEach((product: ProductType) => sum += product.price);
    return sum;
  });






  async function getProducts(): Promise<void> {
    const response: ServicesResponseType = await ProductServices.getProducts();
    if (response.error && !response.info) return;
    products.value = response.info;

    addProductsInUploaded(response.info);
  }

  function addProductsInUploaded(list: ProductType[]) {
    list.forEach((product: ProductType) => {
      productsUploaded.push(product);
    })
  }

  async function getProduct(id: number): Promise<ProductType | null> {
    const product = productsUploaded.find((product: ProductType) => product.id === id);
    if (product) {
      return product;
    }

    const response: ServicesResponseType = await ProductServices.getProduct(id);
    if (response.error && !response.info) return null;
    productsUploaded.push(response.info);

    return getProduct(id);
  }








  async function getFavorites(): Promise<void> {
    let result: ProductType[] = []; 
    for (let i = 0; i < listIdProductsInFavorites.length; i++) { // если не авторизованы
      const product = await getProduct(listIdProductsInFavorites[i]);
      if (product) {
        result.unshift(product);
      }
    }
    favorites.value = result;
  }

  function checkProductInFavorites(id: number): boolean {
    return favorites.value.some((product: ProductType) => product.id === id);
  }

  function addToFavorites(product: ProductType): void {
    let productIndex = favorites.value.findIndex((productInCart: ProductType) => productInCart.id === product.id);

    if (productIndex === -1) { // если авторизован + отправка на сервер
      favorites.value.unshift(product);  
    }
  }

  async function deleteToFavorites(product: ProductType): Promise<void> {
    let productIndex = favorites.value.findIndex((productInCart: ProductType) => productInCart.id === product.id);

    if (productIndex !== -1) { // если авторизован + отправка на сервер
      favorites.value.splice(productIndex, 1);
    }
  }






  async function getCart(): Promise<void> {
    let result: ProductType[] = [];
    for (let i = 0; i < listIdProductsInCart.length; i++) { // если не авторизованы
      const product = await getProduct(listIdProductsInCart[i]);
      if (product) {
        result.unshift(product);
      }
    }
    cart.value = result;
  }

  function checkProductInCart(id: number): boolean {
    return cart.value.some((product: ProductType) => product.id === id);
  }

  function addToCart(product: ProductType): void {
    let productIndex = cart.value.findIndex((productInCart: ProductType) => productInCart.id === product.id);

    if (productIndex === -1) { // если авторизован + отправка на сервер
      cart.value.unshift(product);  
    }
  }

  function deleteToCart(product: ProductType): void {
    let productIndex = cart.value.findIndex((productInCart: ProductType) => productInCart.id === product.id);

    if (productIndex !== -1) { // если авторизован + отправка на сервер
      cart.value.splice(productIndex, 1);
    }
  }

  


  function updateListIdLocalStorage(listName: string, newList: number[]) {
    localStorage.setItem(listName, JSON.stringify(newList));
  }

  function setInfoInLocalStorege() {
    let listIdCart: number[] = [];
    cart.value.forEach((product: ProductType) => {
      listIdCart.unshift(product.id);
    })

    let listIdFavorites: number[] = [];
    favorites.value.forEach((product: ProductType) => {
      listIdFavorites.unshift(product.id);
    })

    updateListIdLocalStorage('cart', listIdCart);
    updateListIdLocalStorage('favorites', listIdFavorites);
  }

  function getInfoInLocalStorege() {
    listIdProductsInFavorites = getListIdProducts('favorites');
    listIdProductsInCart = getListIdProducts('cart');
  }

  function getListIdProducts(listName: string): number[] {
    let result: number[] = [];
    const listId: string | null = localStorage.getItem(listName);
    if (listId) {
      const listIdJson: number[] = JSON.parse(listId);
      if (listIdJson) {
        result = listIdJson;
      }
    }
    return result;
  }


  return {
    products,
    cart,
    favorites,
    listIdProductsInCart,
    listIdProductsInFavorites,
    cartSum,
    favoritesCount,
    getProducts,
    addToCart,
    deleteToCart,
    addToFavorites,
    deleteToFavorites,
    setInfoInLocalStorege,
    checkProductInCart,
    checkProductInFavorites,
    getFavorites,
    getCart,
    getInfoInLocalStorege
  }
})