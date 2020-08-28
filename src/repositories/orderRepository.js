const Order = require('../Models/Order');

module.exports = {

    async postOrders(data){
        let order = new Order(data);
        return await order.save();
    },

    async getOrders(date = ""){

        let params = {};

        let response;

        if(date !== ""){
            params.data = date;
            response = await Order.findOne(params);
        } else {
            response = await Order.find(params);
        }

        return response;
    },

    async getOrdersByDate(date){
        let response = await Order.findOne({ data: date });

        return response;
    },

    async deleteOrderByDate(date){
        
        return await Order.deleteMany({ data: date });

    },

    async sumOrders(date, total){
        
        return await Order.findOneAndUpdate({ data: date }, { total: total });

    } 

}