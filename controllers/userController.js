var userController = (app) =>{
    //import all the required dependencies

    var connection = require('../models/db')
    const bcrypt = require('bcrypt')
    const formidable = require('formidable')
    const multer  =require('multer')
    const jwt = require('jsonwebtoken')
    const joi = require('@hapi/joi')
    const auth = require('../controllers/authController')
    require('dotenv').config()

    //instantiating the .env file
    process.env.ACCESS_TOKEN_SECRET
    process.env.FORGOT_TOKEN_SECRET

    /**************************** Get Request *********************************/
    //getting all the records in the table
    app.get('/admin',auth.authenticate,(req,res)=>{
        // checking if you are an admin to get access to view all records
         
        if(req.data.data.roleId == 1){
            connection.query(`select * from users order by id`,(err,resp)=>{
                res.status(200).send(resp)
                console.log(resp)
            })
        }
        else{
            res.send('You have not been authorized to perform this function').status(403)
        }
        
    })

    //getting the details of any user by id
    app.get('/admin/:1',auth.authenticate,(req,res)=>{
        // checking if you are an admin to get access to view all records
         
        if(req.data.data.roleId == 1){
            connection.query(`select * from users where id = '${req.params.id}'`,(err,resp)=>{
                if (err) throw err
                res.send(resp)
          
            })
        }
        else{
            res.send('You have not been authorized to perform this function').status(403)
        }
        
    })

    //users getting their records from the table by id
    app.get('/users/:id',auth.authenticate,(req,res)=>{
        if(req.params.id == req.data.data.id)
        {
            connection.query(`select * from users where id = '${req.params.id}'`,(err,resp)=>{
                if (err) throw err
                res.send(resp)
            })
        }
        else return res.status(403).send('You cannot view this profile')
        
    })
      
    /******************************** Post Request **************************************/
    //adding records into the table
    app.post('/signup',(req,res)=>{
        bcrypt.hash(req.body.password,10,(errh,hash)=>{
            if (errh) throw err
            
            // const schema = joi.object({
            //     businessName: joi.string().alphanum().min(6).max(60).required(),
            //     password : joi.string().min(8).max(20).required(),
            //     email : joi.string().email().lowercase().required()
            //  });
            //  joi.valid(req.body,schema,(err,joiResult)=>{
            //      if (err) return res.send(err)
            //      console.log(joiResult)

            //    if(joiResult){
                connection.query(`insert into users (roleId,businessName,email,password) 
                values ('${req.body.roleId}',
                    '${req.body.businessName}',
                    '${req.body.email}',
                    '${hash}')`,(err,resp)=>{
                        if(err)
                        {
                            res.status(400).send(err)
                        }
                        res.send(`User ${req.body.businessName} has been successfully registered`)
                    })
               
               
                    
                    

             })

            
        })
    // })

          /******************************** Put Request **************************************/
          //user updating records after logging in the table
        app.put('/users/profile/:id',auth.authenticate,(req,res)=>{
            if(req.params.id == req.data.data.id)
            {

                connection.query(`update users set phoneNumber = '${req.body.phoneNumber}',
                 website ='${req.body.website}',
                 description ='${req.body.description}',
                 state ='${req.body.state}',
                 city ='${req.body.city}',
                 userCategory ='${req.body.userCategory}' where id = ${req.params.id}`,(err,resp)=>{
                    if (err) throw err
                    res.send(`The details of user with id ${req.params.id} has been modified`)
                })
            }
           
        })
        

         /******************************** Delete Request **************************************/
        //Deleting records in the table
        app.delete('/admin/:id',auth.authenticate,(req,res)=>{
            if(req.data.data.roleId == 1){
            connection.query(`delete from users where id = ${req.params.id}`,(err,resp)=>{
                
                res.status(200).send(`User with the ID ${req.params.id} has been deleted `);
            })
            }
            else{
                    res.sendStatus(404).send('Access denied!');
            }
            
        })

/****************************************** User Login *************************************************/
app.post('/login',(req,res)=>{
    connection.query(`select * from users where email = '${req.body.email}'`,(err,resp)=>{
        if (err || resp.length < 1) {
            res.statusCode=401;
            res.send("Invalid email or password");
        }
        else{
            
             bcrypt.compare(req.body.password,resp[0].password,function(errh,result){
                 
                     
                 
                 if (result === false) {
                     res.statusCode = 401;
                     res.send('Invalid username and password');
                 }
                 if(result === true){

                    //check permissions
                    connection.query(`select permissionName from permission inner join permission_roles on permission.id=permission_roles.permissionId where permission_roles.roleId = ${resp[0].roleId}`,
                    (err,response)=>{
                        if (err) return res.status(401).send(err);
                        resp[0].permissions = response

                        delete resp[0].password//deleting password from result
                        //token logic
                        let data = { "data":resp[0]}
    
                        let accessToken =  jwt.sign(data,process.env.ACCESS_TOKEN_SECRET)
                         //res.send(accessToken)
                       let tokenData ={
                           "data": resp[0],
                           "Token":accessToken
                       }
                       res.send(tokenData)
                    })
                   

                 }
               
                    
               
             })
        }  
        
       
    })
})

/****************************************** Forgot password *************************************************/
   app.post('/forgotPassword',(req,res)=>{
    connection.query(`select * from users where email = '${req.body.email}'`,(err,resp)=>{
       
        if (err || resp.length < 1) {
           
            res.status(401).send('Email does not exist');
        }
        
        else{
            // if(resp === false){
            //     res.status(401).send('Email does not exist');
            // }
            // if(resp === true){
                // encapsulating the password
                delete resp[0].password
                if(req.body.email == resp[0].email){
                    let data = {"data" : resp[0]}
                    let forgotToken = jwt.sign(data,process.env.FORGOT_TOKEN_SECRET)
                    res.send(forgotToken)
                }
                 //token login
           
            // }
             

           
        }
            
        
        

    })


   })    
   

/******************************************************************** Reset Password******************************************************/

    app.put('/reset',auth.forgotPassword,(req,res)=>{
        // console.log(req.data.data.email)
        bcrypt.hash(req.body.password,10,(errh,hash)=>{
            if (errh) throw err
        connection.query(`update users set password = '${hash}' where email = '${req.data.data.email}' `,(err,resp)=>{
            if(err) return res.send(err)
            res.status(200).send('Password successfully updated');
        })
    })
})

}
module.exports = userController
