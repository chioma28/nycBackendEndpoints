const { response } = require('express');
var packageController = (app)=>{
    let connection = require ('../models/db.config');
    const auth = require('./authController');
    const auditManager = require('./trailController')


    app.route('/package')
        .get((req,res)=>{
            connection.query('select * from package',(err, response)=>{
                if(err){
                    res.status(404).send('package not found')
                }else{
                    res.send(response)
                }

            })

        })
        .post(auth.authenticate,(req,res)=>{
            if(req.data.data.roleId == 1){
            connection.query(`insert into package (packageName, description) 
            values 
            ('${req.body.packageName}', 
            '${req.body.description}')`, (err, response)=>{
                    if(err){
                        res.send(err);
                        trail={
                            moduleId: "6",
                            actor: `${req.data.data.email}`,
                            action: `${req.data.data.email} failed to add package `,
                            status: "failed"
                        }
                        auditManager.logTrail(trail);
                    }else{

                        res.send('Package successfully added');
                        trail={
                            moduleId: "6",
                            actor: `${req.data.data.email}`,
                            action: `${req.data.data.email} added a new package `,
                            status: "success"
                        }
                        auditManager.logTrail(trail);
                    }


            })
        }

        });

        module.exports = packageController







}