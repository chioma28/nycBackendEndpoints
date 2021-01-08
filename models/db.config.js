var mysql = require('mysql')
/****************************************** Database Connection **************************************/
require('dotenv').config();
var connection = mysql.createPool({
    "host" : process.env.DB_HOST,
    "user" : process.env.DB_USER,
    "password" : process.env.DB_PASSWORD,
    "database" : process.env.DB_DATABASE
});
connection.getConnection((err,res)=>{
    if(err) throw err

    console.log('db server connected')
});
 
 
module.exports = connection;