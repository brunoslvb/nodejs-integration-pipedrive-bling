const Bling = require('../services/Bling');

module.exports = {

    async getAllDealsOrdes(date){

        let params = {}

        params.params = {
            filters: `dataEmissao[${date} TO ${date}]`
        }

        return await Bling.get("/pedidos/json/", params);
    },

    async postOrders(xml){
        let params = {}

        params.params = {
            xml: xml
        }
        return await Bling.post("/pedido/json/", params);
    },

    async postProduct(xml){

        let params = {}

        params.params = {
            xml: xml
        }
        return await Bling.post("/produto/json/", params);

    }

}