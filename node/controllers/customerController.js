const sql = require('../db/customerSQL');
const utils = require('./utils/utils')
const orderSql = require('../db/orderSQL')

module.exports = {


    fetch: async (req, res) => {
        try {
            const {all} = req.query;

            let c = await sql.fetch(all);
            res.statusCode = 200;
            res.json(c);
        }
        catch (err) {
            utils.createErrorMessage(res, "Virhe: " + err.message);
        }
    },

    delete: async (req, res) => {
        try {
            const avain = req.params.avain;

            // Tarkistetaan löytyykö asiakkaalle toimitettuja tilauksia
            let orderRows = await orderSql.fetchOrderRowsByCustomer(avain, 1);
            if ( orderRows.length > 0 )
            {
                utils.createErrorMessage(res, "Asiakasta ei voi poistaa, koska siihen liittyy toimitettu tilausrivi", orderRows)
                return;
            }

            let result = await sql.deleteCustomers(avain);

            res.statusCode = 204;
            res.json()
        }
        catch(err){
            utils.createErrorMessage(res, "Virhe: " + err.message);
        }
    },


}