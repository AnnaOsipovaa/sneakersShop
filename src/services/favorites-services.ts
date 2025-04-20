import { ResponseType } from "../types/response.type";
import { ServicesResponseType } from "../types/services-response.type";
import { HttpUils } from "../utils/http-utils";

export class FavoritesServices{
    static async getFavorites(): Promise<ServicesResponseType> {
        const returnObject: ServicesResponseType = {
            error: false,
            redirect: null,
            info: null
        }

        const response: ResponseType = await HttpUils.response('/favorites', true);
 
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

        const response: ResponseType = await HttpUils.response('/favorites', true, 'POST', data);
 
        if (!response.error && response.data) {
            returnObject.info = response.data;
        } else {
            returnObject.error = true;
        }

        return returnObject;
    }

    static async delete(id: number): Promise<ServicesResponseType> {
        const returnObject: ServicesResponseType = {
            error: false,
            redirect: null,
            info: null
        }

        const response: ResponseType = await HttpUils.response('/favorites/' + id, true, 'DELETE');
 
        if (!response.error && response.data) {
            returnObject.info = response.data;
        } else {
            returnObject.error = true;
        }

        return returnObject;
    }

    static async sync(data: object): Promise<ServicesResponseType> {
        const returnObject: ServicesResponseType = {
            error: false,
            redirect: null,
            info: null
        }

        const response: ResponseType = await HttpUils.response('/favorites/sync', true, 'POST', data);
 
        if (!response.error && response.data) {
            returnObject.info = response.data;
        } else {
            returnObject.error = true;
        }

        return returnObject;
    }
}