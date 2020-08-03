var express = require('express');
var router = express.Router();
var sql = require("mssql");
const { nextTick } = require('process');
var conn = require("../connection/connect")();
var cn = {
    user: "vacnex",
    password: "0123Huyhuy",
    server: "vacnex.database.windows.net",
    database: "sufyld_db",
    options: {encrypt: true}
};
var routes = function () {
    router.route('/')
        .get(function (req, res) {
            conn.connect().then(function () {
                var sqlQuery = "SELECT * FROM tbl_account";
                var req = new sql.Request(conn);
                req.query(sqlQuery).then(function (recordset) {
                    res.json(recordset.recordset);
                    conn.close();
                })
                    .catch(function (err) {
                        conn.close();
                        res.status(400).send("Error while inserting data");
                    });
            })
                .catch(function (err) {
                    conn.close();
                    res.status(400).send("Error while inserting data");
                });
        });
    router.route('/:id')
        .get(function (req, res) {
            conn.connect().then(function () {
                var id = req.params.id
                var sqlQuery ="SELECT * FROM tbl_account where username= '"+id+"'";
                console.log(sqlQuery)
                var reqq = new sql.Request(conn);
                reqq.query(sqlQuery).then(function (recordset) {
                    console.log(recordset.recordset[0])
                    res.json(recordset.recordset[0]);
                    conn.close();
                })
                    .catch(function (err) {
                        conn.close();
                        res.status(400).send("Error " + err);
                    });
            })
                .catch(function (err) {
                    conn.close();
                    res.status(400).send("Error while inserting data" + err);
                    console.log(err)
                });
        });
    // router.route('/')
    //     .post(function (req, res) {
    //         conn.connect().then(function () {
    //             var transaction = new sql.Transaction(conn);
    //             transaction.begin().then(function () {
    //                 var request = new sql.Request(transaction);
    //                 request.input("ProductName", sql.VarChar(50), req.body.ProductName)
    //                 request.input("ProductPrice", sql.Decimal(18, 0), req.body.ProductPrice)
    //                 request.execute("Usp_InsertProduct").then(function () {
    //                     transaction.commit().then(function (recordSet) {
    //                         conn.close();
    //                         res.status(200).send(req.body);
    //                     }).catch(function (err) {
    //                         conn.close();
    //                         res.status(400).send("Error while inserting data");
    //                     });
    //                 }).catch(function (err) {
    //                     conn.close();
    //                     res.status(400).send("Error while inserting data");
    //                 });
    //             }).catch(function (err) {
    //                 conn.close();
    //                 res.status(400).send("Error while inserting data");
    //             });
    //         }).catch(function (err) {
    //             conn.close();
    //             res.status(400).send("Error while inserting data");
    //         });
    //     });


    // router.route('/:id')
    //     .put(function (req, res) {
    //         var _productID = req.params.id;
    //         conn.connect().then(function () {
    //             var transaction = new sql.Transaction(conn);
    //             transaction.begin().then(function () {
    //                 var request = new sql.Request(transaction);
    //                 request.input("ProductID", sql.Int, _productID)
    //                 request.input("ProductPrice", sql.Decimal(18, 0), req.body.ProductPrice)
    //                 request.execute("Usp_UpdateProduct").then(function () {
    //                     transaction.commit().then(function (recordSet) {
    //                         conn.close();
    //                         res.status(200).send(req.body);
    //                     }).catch(function (err) {
    //                         conn.close();
    //                         res.status(400).send("Error while updating data");
    //                     });
    //                 }).catch(function (err) {
    //                     conn.close();
    //                     res.status(400).send("Error while updating data");
    //                 });
    //             }).catch(function (err) {
    //                 conn.close();
    //                 res.status(400).send("Error while updating data");
    //             });
    //         }).catch(function (err) {
    //             conn.close();
    //             res.status(400).send("Error while updating data");
    //         });
    //     });


    // router.route('/:id')
    // .delete(function (req, res) {
    //     var _productID = req.params.id;
    //     conn.connect().then(function () {
    //         var transaction = new sql.Transaction(conn);
    //         transaction.begin().then(function () {
    //             var request = new sql.Request(transaction);
    //             request.input("ProductID", sql.Int, _productID)
    //             request.execute("Usp_DeleteProduct").then(function () {
    //                 transaction.commit().then(function (recordSet) {
    //                     conn.close();
    //                     res.status(200).json("ProductID:" + _productID);
    //                 }).catch(function (err) {
    //                     conn.close();
    //                     res.status(400).send("Error while Deleting data");
    //                 });
    //             }).catch(function (err) {
    //                 conn.close();
    //                 res.status(400).send("Error while Deleting data");
    //             });
    //         }).catch(function (err) {
    //             conn.close();
    //             res.status(400).send("Error while Deleting data");
    //         });
    //     })
    // });

    return router;
};
module.exports = routes;