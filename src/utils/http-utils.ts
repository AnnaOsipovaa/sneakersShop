import { ResponseType } from "@/types/response.type";

export class HttpUils {
    static async response(url: string, method: string = 'GET', body: object | null = null): Promise<ResponseType> {
        const result: ResponseType = {
            error: false,
            data: null
        }

        const params: any = {
            method: method
        }

        if (body) {
            params.body = JSON.stringify(body);
        }

        try {
            const response: Response = await fetch(process.env.API_URL + url, params);
            result.data = await response.json();
        } catch (error) {
            result.error = true;
        }

        return result
    }
}