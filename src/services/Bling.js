const axios = require('axios');

class Bling {

    get(route, data = {}){
        return this.request('GET', `${process.env.ENDPOINT_BLING}${route}`, data);
    }

    post(route, data = {}){
        return this.request('POST', `${process.env.ENDPOINT_BLING}${route}`, data);
    }

    put(route, data = {}){
        return this.request('PUT', `${process.env.ENDPOINT_BLING}${route}`, data);
    }
    
    delete(route, data = {}){
        return this.request('DELETE', `${process.env.ENDPOINT_BLING}${route}`, data);
    }

    async request(method, url, data = {}) {

        data.params.apikey = process.env.API_KEY_BLING;

        let response = await axios({
            method: method,
            url: url,
            params: data.params,
            data: data.body
        });

        return response;
    }

}

module.exports = new Bling;