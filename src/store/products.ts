import { defineStore } from 'pinia';
import { computed, Ref, ref } from 'vue';
import { ProductServices } from '../services/products-services';
import { ProductType } from '@/types/product.type';
import { ServicesResponseType } from '@/types/services-response.type';

export const useProductsStore = defineStore('products', () => {
  const products: Ref<ProductType[]> = ref([]);
  const productsInFavorites: any = ref(null);
  let listIdProductsInCart: number[] = [];

  const cartSum = computed<number>(() => {
    let sum: number = 0;

    products.value.forEach((product: ProductType) => {
      if (product.inCart) {
        sum += product.price;
      }
    })

    return sum;
  });

  async function getProducts(): Promise<void> {
    const response: ServicesResponseType = await ProductServices.getProducts();
    if (!response.error && response.info) {
      products.value = response.info;
    } else {
      console.log('Ошибка загрузки');
    }

    setInCartFlag();
  }

  async function setInCartFlag(): Promise<void> {
    if (listIdProductsInCart.length === 0) {
      getListIdProductsInCart();
    }

    products.value.forEach((product: ProductType) => {
      const indexProductInCartList: number = listIdProductsInCart.findIndex(catrItem => catrItem === product.id);
      product.inCart = indexProductInCartList > -1 ? true : false;
    });
  }

  function getListIdProductsInCart() {
    let result: number[] = [];
    const listId: string | null = localStorage.getItem('cart');
    if (listId) {
      const listIdJson: number[] = JSON.parse(listId);
      if (listIdJson) {
        result = listIdJson;
      }
    }
    listIdProductsInCart = result;
  }

  function saveListIdProductsInCartInLocalStorage(list: number[]): void {
    localStorage.setItem('cart', JSON.stringify(list));
  }

  async function addToCart(product: ProductType): Promise<void> {
    listIdProductsInCart.unshift(product.id);
    saveListIdProductsInCartInLocalStorage(listIdProductsInCart);
    product.inCart = true;
  }

  async function deleteToCart(product: ProductType): Promise<void> {
    let indexProduct = listIdProductsInCart.findIndex(idProductInCart => idProductInCart === product.id);

    if (indexProduct > -1) {
      listIdProductsInCart.splice(indexProduct, 1);
      saveListIdProductsInCartInLocalStorage(listIdProductsInCart);
    }
    product.inCart = false;
  }

  async function getProductsInFavorites(): Promise<void> {
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