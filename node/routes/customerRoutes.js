var express = require('express');
var app = express();
var router = express.Router();

let ctrl = require('../controllers/customerController');

router.route('/api/asiakas').
    get(ctrl.fetch);

router.route('/api/asiakas/:avain').
    delete(ctrl.delete);

// Julkaistaan ao. funktiot tämän js-filun ulkopuolelle
module.exports = router;