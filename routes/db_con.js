const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysql",
    database: "withjihwan",
    port: 3307
});

module.exports = con;