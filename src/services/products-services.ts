import { ServicesResponseType } from "@/types/services-response.type";
import { HttpUils } from "../utils/http-utils";
import { ResponseType } from "@/types/response.type";

export class ProductServices {
    static async getProducts(): Promise<ServicesResponseType> {
        const returnObject: ServicesResponseType = {
            error: false,
            redirect: null,
            info: null
        }

        const response: ResponseType = await HttpUils.response('/product');

        if (response.data && !response.error) {
            returnObject.info = response.data;
        } else {
            returnObject.error = true;
        }

        return returnObject;
    }
}