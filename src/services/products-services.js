import { HttpUils } from "../utils/http-utils";
 
export class ProductServices{
    static async getProducts(){
        const returnObject = {
            error: false,
            redirect: null,
            info: null
        }

        const response = await HttpUils.response('/product');

        if(response.data && !response.error){
            returnObject.info = response.data;
        }else{
            returnObject.error = true;
        }

        return returnObject;
    }
}