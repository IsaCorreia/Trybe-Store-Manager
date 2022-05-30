const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
    password: 'password',
  database: 'StoreManager',
  port: 3000,
});

module.exports = connection;