import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';
import { ServicesResponseType } from '../types/services-response.type';
import { AdvertisementType } from '../types/advertisement.type';
import { AdvertisementServices } from '../services/advertisement-services';

export const useAdvertisementsStore = defineStore('advertisements', () => {
    const advertisements: Ref<AdvertisementType[]> = ref([]);

    async function getAdvertisements(): Promise<void> {
        const response: ServicesResponseType = await AdvertisementServices.getAdvertisement();
        if (response.error && !response.info) return;

        advertisements.value = response.info;
    }

    return {
        advertisements,
        getAdvertisements,
    }
})