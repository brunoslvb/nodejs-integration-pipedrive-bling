const orderRepository = require('../repositories/orderRepository');
const utils = require('../utils/utils');

class OrderController{

    async get(req, res, next){

        const date = req.query.data;

        try{
            let response = await orderRepository.getOrders(date);

            if(!response){
                return res.status(404).json({ message: "Nenhum dado encontrado" })
            }
            
            return res.status(200).json(response);

        } catch(e) {
            return res.status(500).json({ message: "Problemas ao processar requisição" });
        }
    }

}

module.exports = new OrderController;