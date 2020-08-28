const pipedriveRepository = require('../repositories/pipedriveRepository');

const { validationResult } = require('express-validator');

const errorFormatter =  ({ location, msg, param, value, nestedErrors }) => {
    return `${msg}`;
};

class PipedriveController {

    async getDeals(req, res, next){
        
        const status = req.query.status;

        try{
            let response = await pipedriveRepository.getDeals(status);

            if(!response.data.data){
                return res.status(404).json({ message: "Nenhum dado encontrado" })
            }

            return res.status(200).json(response.data.data);
        } catch(e) {
            return res.status(500).json({ message: "Problemas ao processar requisição", data: e });
        }

    }

    async postDeals(req, res, next){

        const schemaErrors = validationResult(req).formatWith(errorFormatter);

        if (!schemaErrors.isEmpty()) {
            return res.status(400).json({ errors: schemaErrors.mapped() });
        }

        const { titulo, id_contato, status, preco_item, quantidade_item, id_produto } = req.body;

        let json = {
            title: titulo,
            currency: "BRL",
            person_id: id_contato,
            status: status
        };

        try{

            let response = await pipedriveRepository.postDeals(json);

            if(response.status !== 201){
                return res.status(500).json({ message: "Problemas ao processar requisição", data: e });
            }

            let deal_id = response.data.data.id;

            json = {
                id: deal_id,
                item_price: preco_item,
                quantity: quantidade_item,
                product_id: id_produto
            };

            response = await pipedriveRepository.associateProductsInDeal(json);

            if(response.status !== 201){
                return res.status(500).json({ message: "Problemas ao processar requisição", data: e });
            }

            return res.status(201).json({ message: "Acordo inserido com sucesso" });

        } catch(e) {
            return res.status(500).json({ message: "Problemas ao processar requisição", data: e });
        }

    }

    async putDeals(req, res, next){
        
        const schemaErrors = validationResult(req).formatWith(errorFormatter);

        if (!schemaErrors.isEmpty()) {
            return res.status(400).json({ errors: schemaErrors.mapped() });
        }

        const id = req.params.id;

        const { status } = req.body;

        let json = {
            status
        };

        try{
            let response = await pipedriveRepository.putDeals(id, json);
            return res.status(200).json({ message: "Acordo atualizado com sucesso" });
        } catch(e) {
            return res.status(500).json({ message: "Problemas ao processar requisição", data: e });
        }

    }

    async getProducts(req, res, next) {
        try{
            let response = await pipedriveRepository.getProducts();
            return res.status(200).json(response.data.data);
        } catch(e) {
            return res.status(500).json({ message: "Problemas ao processar requisição", data: e });
        }
    }

    async getPersons(req, res, next){

        try{
            let response = await pipedriveRepository.getPersons();
            return res.status(200).json(response.data.data);
        } catch(e) {
            return res.status(500).json({ message: "Problemas ao processar requisição", data: e });
        }

    }

    async postPerson(req, res, next){

        const schemaErrors = validationResult(req).formatWith(errorFormatter);

        if (!schemaErrors.isEmpty()) {
            return res.status(400).json({ errors: schemaErrors.mapped() });
        }

        const { nome } = req.body;

        const data = {
            name: nome
        };

        try{
            let response = await pipedriveRepository.postPerson(data);
            return res.status(201).json({ message: "Contato adicionado com sucesso", data: { id: response.data.data.id }});
        } catch(e) {
            return res.status(500).json({ message: "Problemas ao processar requisição", data: e });
        }

    }

}

module.exports = new PipedriveController;