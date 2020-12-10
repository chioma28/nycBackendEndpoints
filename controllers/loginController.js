//this controller handles the login of users
var loginController =(app)=>{

//import the required dependencies
    var connection = require('../models/db');
    const bcrypt =  require('bcrypt');
    const auth = require('./authController');
    const jwt = require('jsonwebtoken');
    require('dotenv').config();

    process.env.ACCESS_TOKEN_SECRET
    
    // app.post('/login',(req,res)=>{
    //     connection.query(`select * from users where email = '${req.body.email}'`,(err,resp)=>{
    //         if (err || resp.length < 1) {
    //             res.statusCode=401;
    //             res.send("Invalid email or password");
    //         }
    //         else{
                
    //              bcrypt.compare(req.body.password,resp[0].password,function(errh,result){
                     
                         
                     
    //                  if (result === false) {
    //                      res.statusCode = 401;
    //                      res.send('Invalid username and password');
    //                  }
    //                  if(result === true){
    //                     delete resp[0].password
    
    //                     let data = { "data":resp[0]}
    
    //                     let accessToken =  jwt.sign(data,process.env.ACCESS_TOKEN_SECRET)
    //                      //res.send(accessToken)
    //                    let tokenData ={
    //                        "data": resp[0],
    //                        "Token":accessToken
    //                    }
    //                    res.send(tokenData)
    
    //                  }
                   
                        
                   
    //              })
    //         }  
            
           
    //     })
    // })
}
module.exports = loginController