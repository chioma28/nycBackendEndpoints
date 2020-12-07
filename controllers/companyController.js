var companyController = (app) =>{
var connection = require('../models/db');


/**************************** Get Request *********************************/
    //getting all the records in the table
    app.get('/createUser',(req,res)=>{
        connection.query(`select * from company`,(err,resp)=>{
            if (err) throw err
            res.send(resp)
        })
    })

     //getting records by ID from the table
     app.get('/createUser/:id',(req,res)=>{
         connection.query(`select * from company where id = '${req.params.id}'`,(err,resp)=>{
             if (err) throw err

             res.send(resp)
         })
     })


     /******************************** Post Request **************************************/
    //adding records into the table
    app.post('/createUser',(req,res)=>{
        
            if(req.body.phoneNumber != undefined || req.body.companyName != undefined || req.body.email != undefined){
            connection.query(`insert into company (user_id,categoryId,subCategoryNames,companyName,email,website,phoneNumber,description,state,city,longitude,latitude) 
            values ('${req.body.user_id}',
                '${req.body.categoryId}',
                '${req.body.subCategoryNames}',
                '${req.body.companyName}',
                '${req.body.email}',
                '${req.body.website}',
                '${req.body.phoneNumber}',
                '${req.body.description}',
                '${req.body.state}',
                '${req.body.city}',
                '${req.body.longitude}',
                '${req.body.latitude}'`,(err,resp)=>{
                    if(err)
                    {
                        res.status(400).send(err)
                    }
                    res.send(`User ${req.body.companyName} has been successfully registered`)
                })
            }
        
    })



}
module.exports = companyController