const connection = require('../database/connection');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    data: {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        default: 0
    },
    pedidos: [{
        pedido: {
            numero: {
                type: Number,
                require: true
            },
            totalvenda: {
                type: Number,
                require: true
            },
            valorfrete: {
                type: Number,
            },
            desconto: {
                type: String
            },
            cliente: {
                id: {
                    type: Number,
                    require: true
                },
                nome: {
                    type: String,
                    require: true
                }
            },
            itens: [{
                item: {
                    codigo: {
                        type: Number,
                        require: true
                    },
                    descricao: {
                        type: String,
                        require: true
                    },
                    quantidade: {
                        type: Number,
                        require: true
                    },
                    valorunidade: {
                        type: Number,
                        require: true
                    },
                    unidade: {
                        type: String,
                        require: true,
                        default: "PÇ"
                    },
                    descontoItem: {
                        type: Number
                    }
                }
            }],
            parcelas: [{
                parcela: {
                    valor: {
                        type: Number,
                    },
                    dataVencimento: {
                        type: Date
                    },
                    obs: {
                        type: String
                    },
                    forma_pagamento: {
                        id: {
                            type: Number
                        },
                        descricao: {
                            type: String
                        }
                    }
                }
            }]
        },
    }]



});

module.exports = mongoose.model('Order', schema);