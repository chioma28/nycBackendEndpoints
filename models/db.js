var mysql = require('mysql')
/****************************************** Database Connection **************************************/
var connection = mysql.createConnection({
    host:"us-cdbr-east-02.cleardb.com",
    user:"bdb56ad9623032",
    password:"12640e0b",
    database:"heroku_6a8d5a0f04ba48a"
})

connection.connect((err,res)=>{
    if (err) throw err
    console.log('Database server connected')
})

module.exports = connection