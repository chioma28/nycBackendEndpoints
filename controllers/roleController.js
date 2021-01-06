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
                    trail={
                        moduleId: "9",
                        actor: `${req.data.data.email}`,
                        action: `${req.data.data.email} failed to view roles `,
                        status: "failed"
                    }
                    auditManager.logTrail(trail);
                }
                res.send(resp);
                trail={
                    moduleId: "9",
                    actor: `${req.data.data.email}`,
                    action: `${req.data.data.email} viewed roles `,
                    status: "success"
                }
            })
        }
        else{
            res.status(401).send('Access Denied!');
            trail={
                moduleId: "9",
                actor: `${req.data.data.email}`,
                action: `${req.data.data.email} unauthorized to view roles `,
                status: "danger"
            }
        }
        
    })

    //getting data by id from the database
    app.get('/roles/:id',auth.authenticate,(req,res)=>{
        if(req.data.data.roleId == 1){
            connection.query(`select * from roles where role_id = '${req.params.id}'`,(err,resp)=>{
                if (err) {
                    res.send(err);
                    trail={
                        moduleId: "9",
                        actor: `${req.data.data.email}`,
                        action: `${req.data.data.email} failed to view roles by Id`,
                        status: "failed"
                    }
                }
                
                res.send(resp);
                trail={
                    moduleId: "9",
                    actor: `${req.data.data.email}`,
                    action: `${req.data.data.email} viewed roles by Id `,
                    status: "success"
                }
            })
        }
        else{
            res.status(401).send('Access Denied!');
            trail={
                moduleId: "9",
                actor: `${req.data.data.email}`,
                action: `${req.data.data.email} unauthorized to view roles by Id`,
                status: "danger"
            }
        }
        
    })

    /******************************** Post Request **************************************/
    //adding records into the database
    app.post('/roles',auth.authenticate,(req,res)=>{
        
        if(req.body.description != undefined && req.data.data.roleId == 1){
        connection.query(`insert into roles (description) values ('${req.body.description}')`,(err,resp)=>{
            if (err){
                res.status(400).send(err);
                trail={
                    moduleId: "9",
                    actor: `${req.data.data.email}`,
                    action: `${req.data.data.email} failed to add new roles `,
                    status: "failed"
                }
            }
                res.status(200).send('role has been successfully added');
                trail={
                    moduleId: "9",
                    actor: `${req.data.data.email}`,
                    action: `${req.data.data.email} added new roles `,
                    status: "success"
                }
            
        })
    }
    else{
        res.status(401).send('Access Denied!');
        trail={
            moduleId: "9",
            actor: `${req.data.data.email}`,
            action: `${req.data.data.email} unauthorized to add new roles `,
            status: "danger"
        }
    }
    })


}
module.exports =roleController;