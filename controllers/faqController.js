var faqController = (app) => {
    var connection = require('../models/db');
    const auth = require('./authController');  
    const jwt = require('jsonwebtoken');

   
    /**************************** Getting The FAQ'S (GET Request)********************************/
    app.get('/faq',(req,res)=>{
        connection.query(`select * from faq`,(err,resp)=>{
            if (err) return res.status(500).send(err);
            res.status(200).send(resp);
        })
    })

     /******************************** Adding New FAQ'S (POST Request)****************************/
     app.post('/faq',auth.authenticate,(req,res)=>{
        if(req.data.data.roleId == 1){
            connection.query(`insert into faq (question,answer,createdBy) values ('${req.body.question}',
         '${req.body.answer}',
         1)`,(err,resp)=>{
             if (err) return err
             res.send('Successfully added!');
         })
        }
        else{
            res.status(401).send('Access Denied!');
        }
         
     })
     /******************************** Updating a FAQ (PUT Request)****************************/
     app.put('/faq/:id',auth.authenticate,(req,res)=>{
        if(req.data.data.roleId == 1){
            connection.query(`update faq set question = '${req.body.question}', 
            answer = '${req.body.answer}',
             updatedBy = '1' where id = '${req.params.id}'`,(err,resp)=>{
                 if (err) return err
                 res.send('Update Successful!');
             })
        }
        else{
            res.status(401).send('Access Denied!');
        }

     })

 /******************************** Deleting FAQ's (DELETE Request)****************************/
 app.delete('/faq/:id',auth.authenticate,(req,res)=>{
    if(req.data.data.roleId == 1){
        connection.query(`delete from faq where id = '${req.params.id}'`,(err,resp)=>{
             if (err) return err
             res.send('FAQ Successfully Deleted!');
         })
    }
    else{
        res.status(401).send('Access Denied!');
    }

 })

}
module.exports = faqController;