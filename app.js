var express = require('express');
var app = express();
var port = process.env.port || 3000;

var bodyParser = require('body-parser');
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }));
// create application/json parser
app.use(bodyParser.json());

app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

var accountsController = require('./Controller/accountsController')();
app.use("/api/accounts", accountsController);

app.listen(port, function () {
    var message = "Server runnning on Port: http://localhost:" + port
    console.log(message);
});