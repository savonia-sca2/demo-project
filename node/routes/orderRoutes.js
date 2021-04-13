var express = require('express');
var app = express();
var router = express.Router();

let ctrl = require('../controllers/orderController');

router.route('/api/tilaus').
    post(ctrl.insertOrder);

router.route('/api/tilaus/:asiakasid').
    get(ctrl.fetchByCustomer);

router.route('/api/tilausrivi/:tilausid').
    put(ctrl.updateOrderRows);

// Julkaistaan ao. funktiot tämän js-filun ulkopuolelle
module.exports = router;