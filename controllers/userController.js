var userController = (app) =>{
    var connection = require('../models/db')
    const bcrypt = require('bcrypt')

    /**************************** Get Request *********************************/
    //getting all the records in the table
    app.get('/signup',(req,res)=>{
        connection.query(`select * from users`,(err,resp)=>{
            if (err) throw err
            res.send(resp)
        })
    })

    //getting records from the table by id
    app.get('/signup/:id',(req,res)=>{
        connection.query(`select * from users where user_id = '${req.params.id}'`,(err,resp)=>{
            if (err) throw err
            res.send(resp)
        })
    })
      
    /******************************** Post Request **************************************/
    //adding records into the table
    app.post('/signup',(req,res)=>{
        bcrypt.hash(req.body.password,10,(errh,hash)=>{
            if (errh) throw err
            if(req.body.phoneNumber != undefined || req.body.businessName != undefined || req.body.email != undefined){
            connection.query(`insert into users (role_id,businessName,email,password,phoneNumber,website,description,state,city,longitude,latitude,userCategory,userPackage) 
            values ('${req.body.role_id}',
                '${req.body.businessName}',
                '${req.body.email}',
                '${hash}',
                '${req.body.phoneNumber}',
                '${req.body.website}',
                '${req.body.description}',
                '${req.body.state}',
                '${req.body.city}',
                '${req.body.longitude}',
                '${req.body.latitude}',
                '${req.body.userCategory}'),
                '${req.body.userPackage}')`,(err,resp)=>{
                    if(err)
                    {
                        res.status(400).send(err)
                    }
                    res.send(`User ${req.body.businessName} has been successfully registered`)
                })
            }
        })
    })

          /******************************** Put Request **************************************/
          //updating records in the table
        app.put('/signup/:id',(req,res)=>{
            connection.query(`update users set website ='${req.body.website}' where user_id = ${req.params.id}`,(err,resp)=>{
                if (err) throw err
                res.send(`The details of user with id ${req.params.id} has been modified`)
            })
        })
         /******************************** Put Request **************************************/
        //updating records in the table
        app.delete('/signup/:id',(req,res)=>{
            connection.query(`delete from users where user_id = ${req.params.id}`,(err,resp)=>{
                if (err) throw err
                res.status(200).send(`User with the ID ${req.params.id} has been deleted `)
            })
        })
        



}
module.exports = userController