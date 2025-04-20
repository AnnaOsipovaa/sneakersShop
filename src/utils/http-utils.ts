import { ResponseType } from "../types/response.type";
import { StorageUtils } from "./storage-utils";
import { AuthServices } from "../services/auth-services";

export class HttpUils {
    static async response(url: string, authorization: boolean = false, method: string = 'GET', body: object | null = null): Promise<ResponseType> {
        const result: ResponseType = {
            error: false,
            redirect: null,
            data: null
        }

        const params: any = {
            method: method,
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
        }

        if (body) {
            params.body = JSON.stringify(body);
        }

        let token: string | null = null;
        if(authorization){
            token = StorageUtils.getAuthToken(StorageUtils.accessTokenKey);
            if(token){
                params.headers['x-auth-token'] = token;
            }
        }

        let response: Response | null = null;
        try {
            response = await fetch(process.env.API_URL + url, params);
            result.data = await response.json();
        } catch (error) {
            result.error = true;
        }

        if(response){
            if (response.status < 200 || response.status > 299) {
                if(response.status === 401 && authorization){
                    if(!token){
                        result.redirect = 'login';
                    }else{
                        const refresh: boolean = await AuthServices.refrech();
                        if(!refresh){
                            result.redirect = 'login';
                        }else{
                            return await this.response(url, authorization, method, body);
                        }
                    }
                }
                result.error = true;
                result.redirect = 'login';
            }
        }
    
        return result
    }
}