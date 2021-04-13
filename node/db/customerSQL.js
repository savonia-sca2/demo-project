var utils = require('./utils/dbutils');

const deleteCustomer = (id) => {
    let query = "DELETE from Asiakas where id=?";
    return utils.executeSQL(query, [id]);
}

const fetchCustomer = (all) => {    

    let query = "select a.id, a.nimi, a.kayntiosoite, a.postinumero, a.postitoimipaikka, a.status, "; 
    query += " count(distinct t.id) as tilauslkm, sum(tr.maara*tr.yksikkohinta) as tilauslkm, ";
    query += " sum(tr.maara*tr.yksikkohinta*(1.0+(tr.veroprosentti/100.0))) as tilausyht ";
    query += " from asiakas a LEFT JOIN tilaus t ON t.asiakasid = a.id ";
    query += " LEFT JOIN tilausrivi tr ON tr.tilausid = t.id ";
    if ( all == 1 )
        query += " where a.status = 0 ";

    query += " group by a.id, a.nimi ";

    return utils.executeSQL(query, []);
}

module.exports = {

    fetch : (all) => {
        return fetchCustomer(all);
    },

    delete: (id) => {
        return deleteCustomer(id);
    }
}