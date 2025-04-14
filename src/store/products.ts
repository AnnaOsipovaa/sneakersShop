import { defineStore } from 'pinia';
import { computed, reactive, Reactive, Ref, ref } from 'vue';
import { ProductServices } from '../services/products-services';
import { ProductType } from '@/types/product.type';
import { ServicesResponseType } from '@/types/services-response.type';

export const useProductsStore = defineStore('products', () => {
  const products: Ref<ProductType[]> = ref([]);

  let listIdProductsInCart: number[] = [];
  let listIdProductsInFavorites: number[] = [];

  const cartSum = computed<number>(() => {
    let sum: number = 0;
    products.value.forEach((product: ProductType) => {
      if (product.inCart) {
        sum += product.price;
      }
    })
    return sum;
  });

  const favoritesCount = computed<number>(() => {
    let count: number = 0;
    products.value.forEach((product: ProductType) => {
      if (product.inFavorites) {
        count++;
      }
    })
    return count;
  });

  async function getProducts(): Promise<void> {
    const response: ServicesResponseType = await ProductServices.getProducts();
    if (response.error && !response.info) {
      return;
    }

    products.value = response.info;
    setProductFlag();
  }

  function setProductFlag(): void {
    if (listIdProductsInCart.length === 0) {
      listIdProductsInCart = getListIdProducts('cart');
    }

    if (listIdProductsInFavorites.length === 0) {
      listIdProductsInFavorites = getListIdProducts('favorites');
    }

    products.value.forEach((product: ProductType) => {
      const productInCart: boolean = listIdProductsInCart.some((productId: number) => productId === product.id);
      product.inCart = productInCart;

      const productInFavoritesList: boolean = listIdProductsInFavorites.some((productId: number) => productId === product.id);
      product.inFavorites = productInFavoritesList;
    });
  }


  function addToCart(product: ProductType): void {
    if (product.inCart) return;

    product.inCart = true;

    listIdProductsInCart.push(product.id)
    updateListIdLocalStorage('cart', listIdProductsInCart);
  }

  function deleteToCart(product: ProductType): void {
    if (!product.inCart) return;

    product.inCart = false;

    let productIndex = listIdProductsInCart.findIndex((productId: number) => productId === product.id);

    if (productIndex > -1) {
      listIdProductsInCart.splice(productIndex, 1);
      updateListIdLocalStorage('cart', listIdProductsInCart);
    }
  }

  function addToFavorites(product: ProductType): void {
    if (product.inFavorites) return;

    product.inFavorites = true;

    listIdProductsInFavorites.push(product.id)
    updateListIdLocalStorage('favorites', listIdProductsInFavorites);
  }

  async function deleteToFavorites(product: ProductType): Promise<void> {
    if (!product.inFavorites) return;

    product.inFavorites = false;

    let productIndex = listIdProductsInFavorites.findIndex((productId: number) => productId === product.id);

    if (productIndex > -1) {
      listIdProductsInFavorites.splice(productIndex, 1);
      updateListIdLocalStorage('favorites', listIdProductsInFavorites);
    }
  }

  function updateListIdLocalStorage(listName: string, newList: number[]) {
    localStorage.setItem(listName, JSON.stringify(newList));
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
    listIdProductsInCart,
    listIdProductsInFavorites,
    cartSum,
    favoritesCount,
    getProducts,
    addToCart,
    deleteToCart,
    addToFavorites,
    deleteToFavorites  
  }
})