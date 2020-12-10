var roleController = (app) => {
var connection = require('../models/db');
const auth = require('./authController');  
const jwt = require('jsonwebtoken');

    /************************* Get Request ******************************************/
    //getting everything in the database
    app.get('/roles',auth.authenticate,(req,res)=>{
        if(req.data.data.roleId == 1){
            connection.query(`select * from roles`,(err,resp)=>{
                if (err){
                    res.status(400).send('Cannot get data from the role database');
                }
                res.send(resp);
            })
        }
        else{
            res.status(401).send('Access Denied!')
        }
        
    })

    //getting data by id from the database
    app.get('/roles/:id',auth.authenticate,(req,res)=>{
        if(req.data.data.roleId == 1){
            connection.query(`select * from roles where role_id = '${req.params.id}'`,(err,resp)=>{
                if (err) return res.send(err);
                
                res.send(resp);
            })
        }
        else{
            res.status(401).send('Access Denied!')
        }
        
    })

    /******************************** Post Request **************************************/
    //adding records into the database
    app.post('/roles',auth.authenticate,(req,res)=>{
        
        if(req.body.description != undefined && req.data.data.roleId == 1){
        connection.query(`insert into roles (description) values ('${req.body.description}')`,(err,resp)=>{
            if (err){
                res.status(400).send(err);
            }
                res.status(200).send('role has been successfully added')
            
        })
    }
    else{
        res.status(401).send('Access Denied!')
    }
    })


}
module.exports =roleController;