import { ResponseType } from "../types/response.type";
import { ServicesResponseType } from "../types/services-response.type";
import { HttpUils } from "../utils/http-utils";

export class OrderServices{
    static async getOrders(): Promise<ServicesResponseType> {
        const returnObject: ServicesResponseType = {
            error: false,
            redirect: null,
            info: null
        }

        const response: ResponseType = await HttpUils.response('/order', true);
 
        if (!response.error && response.data) {
            returnObject.info = response.data;
        } else {
            returnObject.error = true;
        }

        return returnObject;
    }

    static async add(data: object): Promise<ServicesResponseType> {
        const returnObject: ServicesResponseType = {
            error: false,
            redirect: null,
            info: null
        }

        const response: ResponseType = await HttpUils.response('/order', false, 'POST', data);
 
        if (!response.error && response.data) {
            returnObject.info = response.data;
        } else {
            returnObject.error = true;
        }

        return returnObject;
    }
}