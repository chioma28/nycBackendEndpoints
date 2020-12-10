const { response } = require('express')

var categoryController = (app) =>{
var connection = require ('../models/db')
const jwt = require('jsonwebtoken')
const auth = require('../controllers/authController')
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


    app.post('/categories',(req,res)=>{
        connection.query(`insert into category (categoryName, description)
         values (${req.body.id},
                '${req.body.categoryName}',
                '${req.body.description}')`,(err,resp)=>{
            if (err) throw err
            res.send(` ${req.body.categoryName} category has been successfully added`)
        })
    })

    //getting records by id from the database

    
    app.get('/categories/:id',(req,res)=>{
        connection.query(`select * from category where id = '${req.params.id}'`,(err,resp)=>{
            if (err) throw err
            res.send(resp)
        })
    })
    app.delete('/categories/:id', (req,res)=>{
        connection.query(`delete * from categories where id= (${req.params.id})`, (err, response)=>{

                if (err){
                    res.status(401).send('unaurthorized access')
                }else{
                    res.send(response)
                }
        })


    })

  
}

module.exports =categoryController