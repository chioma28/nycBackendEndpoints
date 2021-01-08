
var faqController = (app) => {
    var connection = require('../models/db.config');
    const auth = require('./authController');  
    const jwt = require('jsonwebtoken');
    const auditManager = require('./trailController');

   
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
             if (err) {
                 res.status(402).send(err);
                 trail={
                    moduleId: "4",
                    actor: `${req.data.data.email}`,
                    action: `${req.data.data.email} failed to add a FAQ `,
                    status: "failed"
                }
                auditManager.logTrail(trail);
                 }
             res.send('Successfully added!');
             trail={
                moduleId: "4",
                actor: `${req.data.data.email}`,
                action: `${req.data.data.email} added a FAQ `,
                status: "success"
            }
            auditManager.logTrail(trail);
         })
        }
        else{
            res.status(401).send('Access Denied!');
            trail={
                moduleId: "4",
                actor: `${req.data.data.email}`,
                action: `${req.data.data.email} unauthorized to add FAQ `,
                status: "danger"
            }
            auditManager.logTrail(trail);
        }
         
     })
     /******************************** Updating a FAQ (PUT Request)****************************/
     app.put('/faq/:id',auth.authenticate,(req,res)=>{
        if(req.data.data.roleId == 1){
            connection.query(`update faq set question = '${req.body.question}', 
            answer = '${req.body.answer}',
             updatedBy = '1' where id = '${req.params.id}'`,(err,resp)=>{
                 if (err){ 
                     res.status(402).send(err);
                     trail={
                        moduleId: "4",
                        actor: `${req.data.data.email}`,
                        action: `${req.data.data.email} failed to update FAQ `,
                        status: "failed"
                    }
                    auditManager.logTrail(trail);
                    } 
                 res.send('Update Successful!');
                 trail={
                    moduleId: "4",
                    actor: `${req.data.data.email}`,
                    action: `${req.data.data.email} updated FAQ `,
                    status: "success"
                }
                auditManager.logTrail(trail);
             })
        }
        else{
            res.status(401).send('Access Denied!');
            trail={
                moduleId: "4",
                actor: `${req.data.data.email}`,
                action: `${req.data.data.email} unauthorized to update FAQ `,
                status: "danger"
            }
            auditManager.logTrail(trail);
        }

     })

 /******************************** Deleting FAQ's (DELETE Request)****************************/
 app.delete('/faq/:id',auth.authenticate,(req,res)=>{
    if(req.data.data.roleId == 1){
        connection.query(`delete from faq where id = '${req.params.id}'`,(err,resp)=>{
             if (err) {
                 res.status(402).send(err);
                 trail={
                    moduleId: "4",
                    actor: `${req.data.data.email}`,
                    action: `${req.data.data.email} failed to delete FAQ `,
                    status: "failed"
                }
                auditManager.logTrail(trail);
             }
             res.send('FAQ Successfully Deleted!');trail={
                moduleId: "4",
                actor: `${req.data.data.email}`,
                action: `${req.data.data.email} successfully deleted FAQ `,
                status: "success"
            }
            auditManager.logTrail(trail);
         })
    }
    else{
        res.status(401).send('Access Denied!');
        trail={
            moduleId: "4",
            actor: `${req.data.data.email}`,
            action: `${req.data.data.email} unauthorized to delete FAQ `,
            status: "danger"
        }
        auditManager.logTrail(trail);
    }

 })

}
module.exports = faqController;