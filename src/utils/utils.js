const jsonToXml = require('js2xmlparser');

module.exports = {

    formatJsonDeal(data){

        let response = data.map(element => {

            return {
                id: element.id,
                personName: element.person_id === null ? "Desconhecido" : element.person_id.name,
                title: element.title,
                value: element.value,
                currency: element.currency,
                products_count: element.products_count,
            };
        });

        return response;
    },

    formatJsonOrders(responseOrders){

        let response = responseOrders.map(element => {


            return {
                data: element.data.retorno.pedidos || {},
                erros: element.data.retorno.erros || {}
            }

        });

        return response;

    },

    getDateNow(){
        let date = new Date();
        
        let month = date.getMonth() < 10 ? `0${date.getMonth()+1}` : `${date.getMonth()+1}`;

        let formatDate = `${date.getDate()}/${month}/${date.getFullYear()}`;

        return formatDate;

    }

}