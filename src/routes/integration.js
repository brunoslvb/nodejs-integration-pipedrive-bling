const router = require('express').Router();

const controller = require('../Controllers/IntegrationController');

const { check } = require('express-validator');

let validation = [
    check('nome', 'Este campo deve ser preenchido').notEmpty(),
    check('codigo', 'Este campo deve ser preenchido').notEmpty(),
    check('preco', 'Este campo deve ser preenchido').isNumeric()
];

router.post('/', controller.post);
router.post('/product', validation, controller.postProduct);

module.exports = router;