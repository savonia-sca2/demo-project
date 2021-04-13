
const sql = require('../db/orderSQL');
const utils = require('./utils/utils')

module.exports = {

    fetchByCustomer: async (req, res) => {
        try {
            let asiakasid = req.params.asiakasid
            let orders = await sql.fetchOrderByCustomer(asiakasid);
            let rows = await sql.fetchOrderRowsByCustomer(asiakasid);
            let result = {tilaukset : orders, tilausrivit: rows }

            res.statusCode = 200;
            res.json(result);
        }
        catch (err) {
            utils.createErrorMessage(res, "Virhe: " + err.message);
        }
    },

    insertOrder: async (req, res) => {
        try {
            const { tilaus, tilausrivit } = req.body;
            const { tilausnumero, tilauspvm, toimituspvm, asiakasid } = tilaus;

            let result = await sql.insertOrder(tilausnumero, tilauspvm, toimituspvm, asiakasid);

            let tilausid = result.insertId;

            for (var i=0; i < tilausrivit.length; i++){
                let {tuote, maara, yksikko, huomautus, yksikkohinta, veroprosentti, toimitettu} = tilausrivit[i];                 
                let r = await sql.insertOrderRow(tilausid, tuote, maara, yksikko, huomautus, yksikkohinta, veroprosentti, toimitettu);
            }

            res.statusCode = 204;
            res.json()
        }
        catch(err){
            utils.createErrorMessage(res, "Virhe: " + err.message);
        }
    },

    updateOrderRows: async (req, res) => {
        try {
            const tilausid = req.params.tilausid
            const tilausrivit = req.body;

            let result = await sql.deleteOrderRows(tilausid);

            for (var i=0; i < tilausrivit.length; i++){
                let {tuote, maara, yksikko, huomautus, yksikkohinta, veroprosentti, toimitettu} = tilausrivit[i];                 
                let r = await sql.insertOrderRow(tilausid, tuote, maara, yksikko, huomautus, yksikkohinta, veroprosentti, toimitettu);
            }

            res.statusCode = 204;
            res.json()
        }
        catch(err){
            utils.createErrorMessage(res, "Virhe: " + err.message);
        }
    },
}