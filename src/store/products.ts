import { defineStore } from 'pinia';
import { computed, reactive, Reactive, Ref, ref } from 'vue';
import { ProductServices } from '../services/products-services';
import { ProductType } from '../types/product.type';
import { ServicesResponseType } from '@/types/services-response.type';
import { StorageUtils } from '../utils/storage-utils';
import { CartServices } from '../services/cart-services';
import { CartItemType } from '../types/cart-item.type';
import { FavoritesServices } from '../services/favorites-services';

export const useProductsStore = defineStore('products', () => {
  const products: Ref<ProductType[]> = ref([]);
  const cart: Ref<ProductType[]> = ref([]);
  const favorites: Ref<ProductType[]> = ref([]);

  const cartRequested: Ref<boolean> = ref(false);

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
    if (StorageUtils.getAuthToken(StorageUtils.accessTokenKey)) {
      favorites.value = await requestServerFavorites();
    } else {
      favorites.value = await requestLocalFavorites();
    }
  }

  async function requestServerFavorites(): Promise<ProductType[]> {
    const response = await FavoritesServices.getFavorites();
    if (!response.error) {
      return response.info;
    }
    return [];
  }

  async function requestLocalFavorites(): Promise<ProductType[]> {
    let result: ProductType[] = [];
    for (let i = 0; i < listIdProductsInFavorites.length; i++) {
      const product = await getProduct(listIdProductsInFavorites[i]);
      if (product) {
        result.unshift(product);
      }
    }
    return result;
  }

  function checkProductInFavorites(id: number): boolean {
    return favorites.value.some((product: ProductType) => product.id === id);
  }

  async function addToFavorites(product: ProductType): Promise<void> {
    let productIndex = favorites.value.findIndex((productInCart: ProductType) => productInCart.id === product.id);
    if (productIndex !== -1) return;

    favorites.value.unshift(product);

    if (StorageUtils.getAuthToken(StorageUtils.accessTokenKey)) {
      await FavoritesServices.add({
        productId: product.id
      });
    }
  }

  async function deleteToFavorites(product: ProductType): Promise<void> {
    let productIndex = favorites.value.findIndex((productInCart: ProductType) => productInCart.id === product.id);
    if (productIndex === -1) return;

    favorites.value.splice(productIndex, 1);
    
    if (StorageUtils.getAuthToken(StorageUtils.accessTokenKey)) {
      await FavoritesServices.delete(product.id);
    }
  }

  async function syncFavorites() {
    if (favorites.value.length === 0) return;

    let list: number[] = [];

    favorites.value.forEach(product => {
      list.push(product.id)
    });

    await FavoritesServices.sync({
      favorites: list
    });
  }




  async function getCart(): Promise<void> {
    cartRequested.value = true;
    if (StorageUtils.getAuthToken(StorageUtils.accessTokenKey)) {
      cart.value = await requestServerCart();
    } else {
      cart.value = await requestLocalCart();
    }
  }

  async function requestServerCart(): Promise<ProductType[]> {
    const response = await CartServices.getCart();
    if (!response.error) {
      return response.info;
    }
    return [];
  }

  async function requestLocalCart(): Promise<ProductType[]> {
    let result: ProductType[] = [];
    for (let i = 0; i < listIdProductsInCart.length; i++) {
      const product = await getProduct(listIdProductsInCart[i]);
      if (product) {
        result.unshift(product);
      }
    }
    return result;
  }

  function checkProductInCart(id: number): boolean {
    return cart.value.some((product: ProductType) => product.id === id);
  }

  async function addToCart(product: ProductType): Promise<void> {
    let productIndex = cart.value.findIndex((productInCart: ProductType) => productInCart.id === product.id);
    if (productIndex !== -1) return;

    cart.value.unshift(product);

    if (StorageUtils.getAuthToken(StorageUtils.accessTokenKey)) {
      await CartServices.add({
        productId: product.id,
        count: 1
      });
    }
  }

  async function deleteToCart(product: ProductType): Promise<void> {
    let productIndex = cart.value.findIndex((productInCart: ProductType) => productInCart.id === product.id);

    if (productIndex === -1) return;

    cart.value.splice(productIndex, 1);

    if (StorageUtils.getAuthToken(StorageUtils.accessTokenKey)) {
      await CartServices.delete(product.id)
    }
  }

  async function syncCart() {
    if (cart.value.length === 0) return;

    let list: CartItemType[] = [];

    cart.value.forEach(product => {
      list.push({
        id: product.id,
        count: 1
      })
    });

    await CartServices.sync({
      cart: list
    });
  }


  function setInfoInLocalStorege() {
    const listIdCart: number[] = [];
    cart.value.forEach((product: ProductType) => {
      listIdCart.unshift(product.id);
    })
    StorageUtils.updateListIdLocalStorage('cart', listIdCart);

    const listIdFavorites: number[] = [];
    favorites.value.forEach((product: ProductType) => {
      listIdFavorites.unshift(product.id);
    })
    StorageUtils.updateListIdLocalStorage('favorites', listIdFavorites);
  }

  function getInfoInLocalStorege() {
    listIdProductsInFavorites = StorageUtils.getListIdProducts('favorites');
    listIdProductsInCart = StorageUtils.getListIdProducts('cart');
  }

  function reset() {
    cart.value = [];
    favorites.value = [];
    listIdProductsInCart = [];
    listIdProductsInFavorites = [];
  }

  return {
    products,
    cart,
    favorites,
    listIdProductsInCart,
    listIdProductsInFavorites,
    cartRequested,
    cartSum,
    favoritesCount,
    getProducts,
    addToCart,
    deleteToCart,
    syncCart,
    addToFavorites,
    deleteToFavorites,
    syncFavorites,
    setInfoInLocalStorege,
    checkProductInCart,
    checkProductInFavorites,
    getFavorites,
    getCart,
    getInfoInLocalStorege,
    reset
  }
})