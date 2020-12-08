const { response } = require('express');

let contactController = (app)=>{
    var connection = require('../models/db');


    app.route('/contact')

        .get((req, res)=>{

            connection.query(`select * from contact`, (err, response)=>{
                if (err){
                    console.log(err)
                } else{
                    res.send(response)
                }

            })

        });
        app.route('/contact/:id')
        .get((req, res)=>{

            connection.query(`select * from contact where id= ${req.params.id}`, (err, response)=>{
                if(err){
                    console.log(err)
                } else{
                    res.send(response)
                }

            })

        })

        .post((req, res)=>{
            connection.query(`insert into contact (id,fullName,email,title,message) 
            values ('${req.body.id}',
                    '${req.body.fullName}',
                     '${req.body.email}', 
                    '${req.body.title}', 
                    '${req.body.message}')`,
                    
                    (err, response)=>{
                        if(err){
                            console.log(err)
                        }else{
                            res.send(response)
                        }
               
            })



        })




}
module.exports = contactController