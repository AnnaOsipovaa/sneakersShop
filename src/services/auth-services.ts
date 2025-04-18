import { ResponseType } from "../types/response.type";
import { HttpUils } from "../utils/http-utils";

export class AuthServices {
    static async login(data: object): Promise<ResponseType | null> {
        const result: ResponseType = {
            error: false,
            redirect: null,
            data: null
        };

        const response: ResponseType = await HttpUils.response('/auth/login', 'POST', data);

        if (!response.error && response.data) {
            result.data = response.data;
            if (!response.data.accessToken || !response.data.refreshToken || !response.data.email) {
                result.error = true;
            }
        } else {
            alert('Произошла ошибка, повторите попытку позже.');
            return null;
        }

        return result;
    }

    static async signup(data: object): Promise<ResponseType | null> {
        const result: ResponseType = {
            error: false,
            redirect: null,
            data: null
        };

        const response: ResponseType = await HttpUils.response('/auth/signup', 'POST', data);

        if (!response.error && response.data) {
            result.data = response.data;
            if (!response.data.id || !response.data.email) {
                result.error = true;
            }
        } else {
            alert('Произошла ошибка, повторите попытку позже.');
            return null;
        }

        return result;
    }
}