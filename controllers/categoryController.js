const { response } = require('express')

var categoryController = (app) =>{
var connection = require ('../models/db.config');
const jwt = require('jsonwebtoken');
const auth = require('../controllers/authController');
const auditManager = ('./trailController.js');
require('dotenv').config()

    //instantiating the .env file
    process.env.ACCESS_TOKEN_SECRET


/************************* Get Request *******************/
    //getting everything in the database


    app.get('/categories',(req,res)=>{
        connection.query(`select * from category`,(err,resp)=>{
            if (err){
                res.send(err)
            }
            res.send(resp)
        })
    })
     /******************************** Post Request ****************************/
    //adding records into the database


    app.post('/categories',auth.authenticate,(req,res)=>{
        if(req.data.data.roleId == 1){
        connection.query(`insert into category (categoryName, description)
         values (${req.body.id},
                '${req.body.categoryName}',
                '${req.body.description}')`,(err,resp)=>{
            if (err){ 
                res.send(err);
                trail={
                    moduleId: "2",
                    actor: `${req.data.data.email}`,
                    action: `${req.data.data.email} failed to add a category `,
                    status: "failed"
                }
                auditManager.logTrail(trail);
            }
            res.send(` ${req.body.categoryName} category has been successfully added`);
            trail={
                moduleId: "2",
                actor: `${req.data.data.email}`,
                action: `${req.data.data.email} added a category `,
                status: "success"
            }
            auditManager.logTrail(trail);
            
        })
    }
    })

    //getting records by id from the database

    
    app.get('/categories/:id',auth.authenticate,(req,res)=>{
        if(req.data.data.roleId == 1){
        connection.query(`select * from category where id = '${req.params.id}'`,(err,resp)=>{
            if (err) {
                res.send(err);
                trail={
                    moduleId: "2",
                    actor: `${req.data.data.email}`,
                    action: `${req.data.data.email} could not view category by Id `,
                    status: "failed"
                }
                auditManager.logTrail(trail);
            }
            res.send(resp);
            trail={
                moduleId: "2",
                actor: `${req.data.data.email}`,
                action: `${req.data.data.email} viewed category by Id `,
                status: "success"
            }
            auditManager.logTrail(trail);
        })
    }
    })
    app.delete('/categories/:id', (req,res)=>{
        connection.query(`delete * from categories where id= (${req.params.id})`, (err, response)=>{

                if (err){
                    res.status(401).send('unauthorized access');
                    trail={
                        moduleId: "2",
                        actor: `${req.data.data.email}`,
                        action: `${req.data.data.email} could not delete a category `,
                        status: "failed"
                    }
                    auditManager.logTrail(trail);
                }else{
                    res.send(response);
                    trail={
                        moduleId: "2",
                        actor: `${req.data.data.email}`,
                        action: `${req.data.data.email} deleted a category `,
                        status: "success"
                    }
                    auditManager.logTrail(trail);
                }
        })


    })

  
}

module.exports =categoryController