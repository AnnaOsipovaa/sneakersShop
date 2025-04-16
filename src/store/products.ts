import { defineStore } from 'pinia';
import { computed, reactive, Reactive, Ref, ref } from 'vue';
import { ProductServices } from '../services/products-services';
import { ProductType } from '@/types/product.type';
import { ServicesResponseType } from '@/types/services-response.type';
import { CartItemLocalStorageType } from '@/types/cart-item-local-storage.type';

export const useProductsStore = defineStore('products', () => {
  const products: Ref<ProductType[]> = ref([]);
  const listIdProductsInFavorites: Ref<number[]> = ref([]);
  const listIdAndPriceProductsInCart: Ref<CartItemLocalStorageType[]> = ref([]);

  let productsUploaded: ProductType[] = [];

  const favoritesCount = computed<number>(() => {
    let count: number = 0;
    listIdProductsInFavorites.value.forEach(() => count++);
    return count;
  });

  const cartSum = computed<number>(() => {
    let sum: number = 0;
    listIdAndPriceProductsInCart.value.forEach((product: CartItemLocalStorageType) => sum += product.price);
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


  async function getFavorites(): Promise<ProductType[]> {
    let result: ProductType[] = [];

    for (let i = 0; i < listIdProductsInFavorites.value.length; i++) {
      const product = await getProduct(listIdProductsInFavorites.value[i]);
      if (product) {
        result.push(product);
      }
    }
    return result;
  }

  function checkProductInFavorites(id: number): boolean {
    return listIdProductsInFavorites.value.some((productId: number) => productId === id);
  }

  function addToFavorites(product: ProductType): void {
    listIdProductsInFavorites.value.push(product.id);
    updateListIdLocalStorage('favorites', listIdProductsInFavorites.value);
  }

  async function deleteToFavorites(product: ProductType): Promise<void> {
    let productIndex = listIdProductsInFavorites.value.findIndex((productId: number) => productId === product.id);

    if (productIndex > -1) {
      listIdProductsInFavorites.value.splice(productIndex, 1);
      updateListIdLocalStorage('favorites', listIdProductsInFavorites.value);
    }
  }


  async function getCart(): Promise<ProductType[]> {
    let result: ProductType[] = [];
     
    for (let i = 0; i < listIdAndPriceProductsInCart.value.length; i++) {
      const product = await getProduct(listIdAndPriceProductsInCart.value[i].id);
      if (product) {
        result.push(product);
      }
    }
    return result;
  }

  function checkProductInCart(id: number): boolean {
    return listIdAndPriceProductsInCart.value.some((product: CartItemLocalStorageType) => product.id === id);
  }

  function addToCart(product: ProductType): void {
    listIdAndPriceProductsInCart.value.push({
      id: product.id,
      price: product.price
    });
    updateListIdLocalStorage('cart', listIdAndPriceProductsInCart.value);
  }

  function deleteToCart(product: ProductType): void {
    let productIndex = listIdAndPriceProductsInCart.value.findIndex((productInCart: CartItemLocalStorageType) => productInCart.id === product.id);

    if (productIndex > -1) {
      listIdAndPriceProductsInCart.value.splice(productIndex, 1);
      updateListIdLocalStorage('cart', listIdAndPriceProductsInCart.value);
    }
  }

  
  function updateListIdLocalStorage(listName: string, newList: number[] | CartItemLocalStorageType[]) {
    localStorage.setItem(listName, JSON.stringify(newList));
  }

  function getInfoInLocalStorege() {
    listIdProductsInFavorites.value = getListIdProducts('favorites') as number[];
    listIdAndPriceProductsInCart.value = getListIdProducts('cart') as CartItemLocalStorageType[];
  }

  function getListIdProducts(listName: string): number[] | CartItemLocalStorageType[] {
    let result: number[] | CartItemLocalStorageType[] = [];
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
    listIdAndPriceProductsInCart,
    listIdProductsInFavorites,
    cartSum,
    favoritesCount,
    getProducts,
    addToCart,
    deleteToCart,
    addToFavorites,
    deleteToFavorites,

    checkProductInCart,
    checkProductInFavorites,
    getFavorites,
    getCart,
    getInfoInLocalStorege
  }
})