const { response } = require('express');
var packageController = (app)=>{
    let connection = require ('../models/db')

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
        .post((req,res)=>{
            connection.query(`insert into package (packageName, description) 
            values 
            ('${req.body.packageName}', 
            '${req.body.description}')`, (err, response)=>{
                    if(err){
                        console.log(err)
                    }else{

                        res.send(response)
                    }


            })


        });

        module.exports = packageController







}