var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

var port = 3000;
var hostname = "127.0.0.1";

var cors = function (req, res, next)
{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(cors);

// importataan reitit
const customerRoutes = require('./routes/customerRoutes');
app.use(customerRoutes);

const orderRoutes = require('./routes/orderRoutes');
app.use(orderRoutes);

app.listen(port, hostname, () => {
    console.log(`36-44 Server running at http://${hostname}:${port}/`);
});