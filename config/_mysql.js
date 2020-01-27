/**
 * Bruger mysql's createPool til at skabe og opretholde connections med
 */
const dotenv = require('dotenv');
dotenv.config();

module.exports = (function() {
  const mysql = require("mysql");
    return () => 
      mysql.createPool({
        connectionLimit: 10,
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PSWD || "root",
        database: process.env.DB_DTBS || "test",
        port: 3306
      });
  })();
  