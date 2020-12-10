const { response } = require('express');
const sendMail = require('../middleware/mail');
const { connect } = require('../models/db');
/* ******************************* Contact controller ********************** */
let contactController = (app)=>{
    var connection = require('../models/db');

/* ******************************* Contact router ********************** */
    app.route('/contact')
/******** GET ROUTE ********/
        .get((req, res)=>{

            connection.query(`select * from contact`, (err, response)=>{
                if (err){
                    console.log(err)
                } else{
                    res.send(response)
                }

            })

        })
        /******** POST ROUTE ********/
        .post((req,res)=>{
            const { fullName, email, title, message } = req.body;
            connection.query(`insert into contact (fullName,email,title,message) 
            values (
                    '${fullName}',
                     '${email}', 
                    '${title}', 
                    '${message}')`), sendMail(fullName,email,title,message, (err, data)=>{

                        if(err){
                            res.status(500).json({ message: 'Internal Error' });
                        } else{
                            res.status({ message: 'Email sent!!!' });
                        }

                    })

        })
        // .post((req, res)=>{
        //     connection.query(`insert into contact (id,fullName,email,title,message) 
        //     values ('${req.body.id}',
        //             '${req.body.fullName}',
        //              '${req.body.email}', 
        //             '${req.body.title}', 
        //             '${req.body.message}')`,
                    
        //             (err, response)=>{
        //                 if(err){
        //                     console.log(err)
        //                 }else{
        //                     res.send("Your Message has been sent succesfully")
        //                 }
               
        //     })



        // })
/******** CONTACT WITH ID ROUTE ********/
        app.route('/contact/:id')
        /******** GET WITH ID ROUTE ********/
        .get((req, res)=>{

            connection.query(`select * from contact where id= ${req.params.id}`, (err, response)=>{
                if(err){
                    console.log(err)
                } else{
                    res.send(response)
                }

            })

        })
        /******** DELETE WITH ID ROUTE ********/
        .delete((req, res)=>{
                connection.query(`ALTER TABLE contact DROP message`, (err, response)=>{
                        if(err){
                            res.send(err)
                        } else{
                      
                        res.send("message succesfully deleted")
                        }

                })

        })
      



}
module.exports = contactController