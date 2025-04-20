import { StorageUtils } from "../utils/storage-utils";
import { ResponseType } from "../types/response.type";
import { HttpUils } from "../utils/http-utils";
import { RefreshResponseType } from "@/types/refresh-response.type";

export class AuthServices {
    static async login(data: object): Promise<ResponseType> {
        const result: ResponseType = {
            error: false,
            redirect: null,
            data: null
        };

        const response: ResponseType = await HttpUils.response('/auth/login', false, 'POST', data);

        if (response.error || !response.data.accessToken || !response.data.refreshToken || !response.data.email) {
            result.error = true;
            result.redirect = response.redirect;
        }

        result.data = response.data;

        return result;
    }

    static async signup(data: object): Promise<ResponseType> {
        const result: ResponseType = {
            error: false,
            redirect: null,
            data: null
        };

        const response: ResponseType = await HttpUils.response('/auth/signup', false, 'POST', data);

        if (response.error || !response.data.id || !response.data.email) {
            result.error = true;
            result.redirect = response.redirect;
        }

        result.data = response.data;

        return result;
    }

    static async refrech(): Promise<boolean>{
        let result: boolean = false;
        
        const refreshToken = StorageUtils.getAuthToken(StorageUtils.refreshTokenKey);
        if(!refreshToken){
            return result;
        }

        const response: Response = await fetch(process.env.API_URL + '/auth/refresh', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                refreshToken: refreshToken
            })
        });
        
        if(response.status === 200){
            const tokens: RefreshResponseType = await response.json();

            if(tokens){
                StorageUtils.setAuthInfo(tokens.accessToken, tokens.refreshToken);
                result = true;
                return result;
            }
        }

        StorageUtils.removeAuthInfo();
        
        return result;
    }

    static async logout(data: object){
        await HttpUils.response('/auth/logout', false, 'POST', data);
    }
}