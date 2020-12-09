var mysql = require('mysql')
/****************************************** Database Connection **************************************/
var connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"yellowcatalogue"
})

connection.connect((err,res)=>{
    if (err) throw err
    console.log('Database server connected')
})

module.exports = connection