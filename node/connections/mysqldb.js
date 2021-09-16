require('dotenv').config();
const mysql = require('mysql');
const util = require('util');

const hostdb = process.env.DB_HOST;
const userdb = process.env.DB_USER;
const passworddb = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;


const db = mysql.createConnection({
    host: hostdb,
    user: userdb,
    password: passworddb,
    database: database,
});

db.query = util.promisify(db.query);

module.exports = db;