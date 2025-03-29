export class HttpUils{
    static async response(url, method = 'GET', body = null){
        const result = {
            error: false,
            data: null
        }

        const params = {
            method: method
        }

        if(body){
            params.body = JSON.stringify(body);
        }

        try {
            const response = await fetch(process.env.API_URL + url, params);
            result.data = await response.json();
        } catch (error) {
            result.error = true; 
        }

        return result
    }
}