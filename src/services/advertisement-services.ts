import { ResponseType } from "../types/response.type";
import { ServicesResponseType } from "../types/services-response.type";
import { HttpUils } from "../utils/http-utils";

export class AdvertisementServices{
    static async getAdvertisement(): Promise<ServicesResponseType> {
        const returnObject: ServicesResponseType = {
            error: false,
            redirect: null,
            info: null
        }

        const response: ResponseType = await HttpUils.response('/advertisement');
 
        if (!response.error && response.data) {
            returnObject.info = response.data;
        } else {
            returnObject.error = true;
        }

        return returnObject;
    }
}