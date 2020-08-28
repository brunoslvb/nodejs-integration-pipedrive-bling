const router = require('express').Router();

const controller = require('../Controllers/BlingController');

router.get('/orders', controller.getOrders);

module.exports = router;