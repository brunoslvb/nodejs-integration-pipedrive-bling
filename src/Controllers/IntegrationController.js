const pipedriveRepository = require('../repositories/pipedriveRepository');
const blingRepository   = require('../repositories/blingRepository');
const orderRepository   = require('../repositories/orderRepository');
const utils             = require('../utils/utils');

const jsonToXml = require('js2xmlparser');

const { validationResult } = require('express-validator');

const errorFormatter =  ({ location, msg, param, value, nestedErrors }) => {
    return `${msg}`;
};

class IntegrationController{

    async post(req, res, next){

        let responseOrderPromise = [];

        let responseDeals;
        let dataDeals;
        let responseProductsInDeals;
        let responseProductDetail;
        let responseOrder;
        let responseOrders;

        responseDeals = await pipedriveRepository.getDeals("won");
        
        if(responseDeals.data.data){
            dataDeals = utils.formatJsonDeal(responseDeals.data.data);
                    
            let jsonDeals;

            for(let i = 0; i < dataDeals.length; i++){

                try {
                    responseProductsInDeals = await pipedriveRepository.getAllProductsInDeal(dataDeals[i].id);
                } catch(e) {
                    return res.status(500).json({ message: "Erro ao processar requisição" });
                }

                jsonDeals = {
                    "cliente": {
                        "nome": `${dataDeals[i].personName}`,
                        "tipoPessoa": "F"
                    },
                    "transporte": {
                        "tipo_frete": "3",
                        "volumes": {
                            "volume": {
                                "servico": "SEDEX - CONTRATO",
                                "codigoRastreamento": []
                            }
                        }
                    },
                    "itens": [],
                    "numeroOrdemCompra": `${dataDeals[i].id}`,
                };

                if(responseProductsInDeals.data.data !== null ){

                    for(let j = 0; j < responseProductsInDeals.data.data.length; j++){

                        try {
                            responseProductDetail = await pipedriveRepository.getProductDetail(responseProductsInDeals.data.data[j].product_id);
                        } catch(e) {
                            return res.status(500).json({ message: "Erro ao processar requisição" });
                        }

                        jsonDeals.itens.push({ item: { codigo: responseProductDetail.data.data.code, vlr_unit: responseProductsInDeals.data.data[j].item_price, qtde: responseProductsInDeals.data.data[j].quantity } });
                    }

                }

                const xml = jsonToXml.parse("pedido", jsonDeals);

                try{
                    responseOrderPromise.push(blingRepository.postOrders(xml));
                } catch(e) {
                    return res.status(500).json({ message: "Problemas ao realizar a integração" });
                }

            }
            try{
                responseOrder = await Promise.all(responseOrderPromise);
            } catch(e) {
                return res.status(500).json({ message: "Problemas ao realizar a integração", data: e });
            }

            responseOrders = utils.formatJsonOrders(responseOrder);
        }

        let orders;

        let today = utils.getDateNow();

        try{
            orders = await blingRepository.getAllDealsOrdes(today);
        } catch(e) {
            return res.status(500).json({ message: "Problemas ao realizar a integração", data: e });
        }

        try{
            await orderRepository.deleteOrderByDate(today);
            await orderRepository.postOrders({data: today, pedidos: orders.data.retorno.pedidos});

            let orderData = await orderRepository.getOrdersByDate(today);

            let total = 0;

            total = orderData.pedidos.map(element => {
                total = total + element.pedido.totalvenda;
                return total;
            });

            total = total[total.length - 1];
            
            total === undefined ? total = 0 : total;
            
            await orderRepository.sumOrders(today, total);

        } catch(e) {
            return res.status(500).json({ message: "Problemas ao gravar na base de dados", data: e });
        }

        responseOrders === undefined ? responseOrders = "Nenhuma ordem com status ganho foi encontrada" : responseOrders;

        return res.status(200).json({ message: "Integração realizada com sucesso", data: responseOrders });

    }

    async postProduct(req, res, next){
        
        const schemaErrors = validationResult(req).formatWith(errorFormatter);

        if (!schemaErrors.isEmpty()) {
            return res.status(400).json({ errors: schemaErrors.mapped() });
        }

        const { codigo, nome, preco } = req.body;

        const xml = `<?xml version="1.0" encoding="UTF-8"?><produto><codigo>${codigo}</codigo><descricao>${nome}</descricao><un>Pc</un><vlr_unit>${preco}</vlr_unit></produto>`;

        const json = {
            name: nome,
            code: codigo,
            prices: [
                {
                    currency: "BRL",
                    price: preco
                }
            ]
        }

        try{
            await pipedriveRepository.postProduct(json);
            await blingRepository.postProduct(xml);
            return res.status(201).json({ message: "Produto inserido com sucesso" });
        } catch(e) {
            return res.status(500).json({ message: "Problemas ao processar requisição", data: e });
        }

    }

}

module.exports = new IntegrationController;