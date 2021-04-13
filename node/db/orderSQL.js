var mysql = require('mysql');
var utils = require('./utils/dbutils');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // ÄLÄ käytä root:n tunnusta tuotannossa
    password: '',
    database: 'tilaus'
});

const fetchOrder = (asiakasid) => {

    let query = "select t.id, t.tilausnumero, t.tilauspvm, t.toimituspvm, SUM(tr.maara*tr.yksikkohinta) as hintyht_veroton, ";
    query += " SUM(tr.maara*tr.yksikkohinta*(1.0+(tr.veroprosentti/100.0))) as hintayht ";
    query += " from asiakas a ";
    query += " LEFT JOIN tilaus t ON t.asiakasid = a.id ";
    query += " LEFT JOIN tilausrivi tr ON tr.tilausid = t.id ";
    query += " where 1=1 ";

    let vars = [];

    if ( asiakasid ){
         query = query + " AND a.id= ?";
         vars.push(asiakasid);
    }

    query += " group by t.id, t.tilausnumero, t.tilauspvm, t.toimituspvm ";

    return utils.executeSQL(query, vars);
}

const fetchOrderRows = (asiakasid, toimitettu) => {

    let query = "select tr.id, tr.tilausid, tr.tuote, tr.maara, tr.yksikko, tr.huomautus, ";
    query += " tr.veroprosentti, tr.toimitettu, ";
    query += " tr.maara*tr.yksikkohinta as hintyht_veroton, tr.maara*tr.yksikkohinta*(1.0+(tr.veroprosentti/100.0)) as hintayht ";
    query += " from asiakas a ";
    query += " LEFT JOIN tilaus t ON t.asiakasid = a.id ";
    query += " LEFT JOIN tilausrivi tr ON tr.tilausid = t.id ";
    query += " where 1=1 ";

    let vars = [];

    if ( asiakasid ){
         query = query + " AND a.id= ?";
         vars.push(asiakasid);
    }

    if ( toimitettu ) {
        query = query + " AND tr.toimitettu= ?";
        vars.push(toimitettu);
    }

    return utils.executeSQL(query, vars);
}

const insertOrder = (tilausnumero, tilauspvm, toimituspvm, asiakasid) => {
    let query = "INSERT INTO Tilaus (tilausnumero, tilauspvm, toimituspvm, asiakasid) VALUES (?,?,?,?)";
    return utils.executeSQL(query, [tilausnumero, tilauspvm, toimituspvm, asiakasid]);
}

const insertOrderRow = (tilausid, tuote, maara, yksikko, huomautus, yksikkohinta, veroprosentti, toimitettu) => {
    let query = "INSERT INTO Tilausrivi (tilausid, tuote, maara, yksikko, huomautus, yksikkohinta, veroprosentti, toimitettu) VALUES (?,?,?,?,?,?,?, ?)";
    return utils.executeSQL(query, [tilausid, tuote, maara, yksikko, huomautus, yksikkohinta, veroprosentti, toimitettu]);
}

const deleteOrderRows = (tilausid) => {
    let query = "DELETE FROM Tilausrivi where tilausid = ?"
    return utils.executeSQL(query, [tilausid]);
}
module.exports = {
    fetchOrderByCustomer: (asiakasid) => {
        return fetchOrder(asiakasid);
    },

    fetchOrderRowsByCustomer: (asiakasid, toimitettu) => {
        return fetchOrderRows(asiakasid, toimitettu);
    },

    insertOrder: (tilausnumero, tilauspvm, toimituspvm, asiakasid) => {
        return insertOrder(tilausnumero, tilauspvm, toimituspvm, asiakasid)
    },

    insertOrderRow: (tilausid, tuote, maara, yksikko, huomautus, yksikkohinta, veroprosentti, toimitettu) => {
        return insertOrderRow(tilausid, tuote, maara, yksikko, huomautus, yksikkohinta, veroprosentti, toimitettu);
    },

    deleteCustomer: (id) => {
        deleteCustomers(id);
    },

    deleteOrderRows

}