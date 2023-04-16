const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "hansli",
  password: "fasih123",
});

module.exports = pool.promise();
