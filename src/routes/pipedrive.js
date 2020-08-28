const router = require('express').Router();

const controller = require('../Controllers/PipedriveController');

const { check } = require('express-validator');


let dealsPostValidation = [
    check('titulo', 'Este campo deve ser preenchido').notEmpty(),
    check('id_contato', 'Este campo deve ser preenchido').notEmpty(),
    check('status', 'Este campo deve ser preenchido').notEmpty(),
    check('preco_item', 'Este campo deve ser preenchido').notEmpty(),
    check('quantidade_item', 'Este campo deve ser preenchido').notEmpty(),
    check('id_produto', 'Este campo deve ser preenchido').isNumeric()
];

let dealsPutValidation = [
    check('status', 'Este campo deve ser preenchido').notEmpty()
];

router.get('/deals', controller.getDeals);
router.post('/deals', dealsPostValidation, controller.postDeals);
router.put('/deals/:id', dealsPutValidation, controller.putDeals);


let personsPostValidation = [
    check('nome', 'Este campo deve ser preenchido').notEmpty()
];

router.get('/persons', controller.getPersons);
router.post('/persons', personsPostValidation, controller.postPerson);


let productsPostValidation = [
    check('nome', 'Este campo deve ser preenchido').notEmpty(),
    check('codigo', 'Este campo deve ser preenchido').notEmpty(),
    check('preco', 'Este campo deve ser preenchido').notEmpty()
];

router.get('/products', controller.getProducts);
router.post('/products', productsPostValidation, controller.postProduct);

module.exports = router;