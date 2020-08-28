const axios = require('axios');

class Pipedrive {

    get(route, params = {}){
        return this.request('GET', `${process.env.ENDPOINT_PIPEDRIVE}${route}`, params);
    }

    post(route, params = {}){
        return this.request('POST', `${process.env.ENDPOINT_PIPEDRIVE}${route}`, params);
    }

    put(route, params = {}){
        return this.request('PUT', `${process.env.ENDPOINT_PIPEDRIVE}${route}`, params);
    }
    
    delete(route, params = {}){
        return this.request('DELETE', `${process.env.ENDPOINT_PIPEDRIVE}${route}`, params);
    }

    async request(method, url, params = {}) {

        params.params.api_token = process.env.API_KEY_PIPEDRIVE;

        let response = await axios({
            method: method,
            url: url,
            params: params.params,
            data: params.body
        });

        return response;
    }

}

module.exports = new Pipedrive;