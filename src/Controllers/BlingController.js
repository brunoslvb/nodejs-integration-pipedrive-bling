const Bling = require('../services/Bling');
const blingRepository = require('../repositories/blingRepository');
const utils = require('../utils/utils');

class BlingController {

    async getOrders(req, res, next){
        
        let today = utils.getDateNow();

        let data = {
            params: {
                filters: `dataEmissao[${today} TO ${today}]`
            }
        }

        Bling.get("/pedidos/json/", data).then(response => {
            return res.status(200).json(response.data);
        }).catch(e => {
            return res.status(500).json({ message: "Problemas ao processar requisição", data: e });
        });
        
    }

    async postOrders(req, res, next){

        const xml = '<?xml version="1.0" encoding="UTF-8"?><pedido><cliente><nome>Bruno da Silva Barros</nome><tipoPessoa>F</tipoPessoa></cliente><transporte><tipo_frete>3</tipo_frete><volumes><volume><servico>SEDEX - CONTRATO</servico><codigoRastreamento></codigoRastreamento></volume></volumes></transporte><itens><item><codigo>0000002</codigo><qtde>10</qtde><vlr_unit>150.00</vlr_unit></item></itens><parcelas><parcela><data>01/01/2021</data><vlr>150.00</vlr><obs>Teste obs 1</obs></parcela></parcelas></pedido>';

        Bling.post("/pedido/json/", { params: { xml: xml } }).then(response => {
            return res.json(response.data);
        }).catch(e => {
            return res.status(500).json({ message: "Problemas ao processar requisição", data: e });
        });

    }

}

module.exports = new BlingController;