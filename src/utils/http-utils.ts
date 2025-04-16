import { ResponseType } from "@/types/response.type";

export class HttpUils {
    static async response(url: string, method: string = 'GET', body: object | null = null): Promise<ResponseType> {
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

        try {
            const response: Response = await fetch(process.env.API_URL + url, params);
            
            if(response.status > 499 && response.status <= 500){
                throw new Error();
            }
            
            result.data = await response.json();
        } catch (error) {
            result.error = true;
        }

        return result
    }
}