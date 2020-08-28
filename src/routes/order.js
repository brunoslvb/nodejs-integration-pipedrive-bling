const router = require('express').Router();

const controller = require('../Controllers/OrderController');

router.get('/', controller.get);

module.exports = router;