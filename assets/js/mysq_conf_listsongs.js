const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "heka",
    password: "password",
    database: "songbook"
});

con.connect((err) => {
    if (err) throw err;
    var sql = "SELECT * FROM song LIMIT 3";
    con.query(sql, (err, result, fields) => {
        if(err) throw err;
        return result;
    })
});    