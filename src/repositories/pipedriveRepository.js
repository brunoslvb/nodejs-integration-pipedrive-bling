const Pipedrive = require('../services/Pipedrive');
const { postDeals, putDeals } = require('../Controllers/PipedriveController');

module.exports = {

    async getDeals(status){
        let params = {};

        params.params = {
            start: 0
        };

        if(status !== undefined){
            params.params.status = status;
        }

        return await Pipedrive.get("/deals", params);
    },

    async postDeals(data){
        let params = {};

        params.params = {};
        params.body = data;

        return await Pipedrive.post("/deals", params);

    },

    async associateProductsInDeal(data){
        let params = {};

        params.params = {};
        params.body = data;

        return await Pipedrive.post(`/deals/${data.id}/products`, params);

    },

    async putDeals(id, data){

        let params = {};

        params.params = {};
        params.body = data;

        return await Pipedrive.put(`/deals/${id}`, params);

    },

    async getAllProductsInDeal(dealId){
        let params = {};

        params.params = {
            start: 0
        };
        return await Pipedrive.get(`/deals/${dealId}/products`, params);
    },

    async getProductDetail(productId){

        let params = {};

        params.params = {};

        return await Pipedrive.get(`/products/${productId}`, params);
    },

    async getProducts(){

        let params = {};

        params.params = {};

        return await Pipedrive.get('/products', params);

    },

    async postProduct(data){

        let params = {};

        params.params = {};
        params.body = data;

        return await Pipedrive.post(`/products`, params);

    },

    async getPersons(){
        
        let params = {};

        params.params = {};

        return await Pipedrive.get('/persons', params);
    
    },

    async postPerson(data){
        
        let params = {}

        params.params = {};
        params.body = data;

        return await Pipedrive.post('/persons', params);
    
    }

}