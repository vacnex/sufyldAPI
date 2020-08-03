var sql = require("mssql");
var connect = function()
{
    var conn = new sql.ConnectionPool({
        user: "vacnex",
        password: "0123Huyhuy",
        server: "vacnex.database.windows.net",
        database: "sufyld_db",
        options: {encrypt: true}
    });
    return conn;
};

module.exports = connect;