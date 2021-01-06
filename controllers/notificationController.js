var notificationController = (app) => {
var connection = require ('../models/db');
const auth = require('./authController');  
const jwt = require('jsonwebtoken');

/**************************** Getting The Notifications (GET Request)********************************/
app.get('/notification',auth.authenticate,(req,res)=>{
    connection.query(`select * from notification `,(err,resp)=>{
        if (err) return res.send(err)
        res.send(resp)
        trail={
            moduleId: "5",
            actor: `${req.data.data.email}`,
            action: `${req.data.data.email} viewed notifications `,
            status: "success"
        }
        auditManager.logTrail(trail);
    })
})

/**************************** Sending Notifications (POST Request)********************************/

app.post('/notification',auth.authenticate,(req,res)=>{
    if(req.data.data.roleId == 1){
        connection.query(`insert into notification (subject,message) values ('${req.body.subject}', 
        '${req.body.message}')`,(err,resp)=>{
            if (err) return err 
            res.send('Message has been sent')
            trail={
                moduleId: "5",
                actor: `${req.data.data.email}`,
                action: `${req.data.data.email} sent a notification `,
                status: "success"
            }
            auditManager.logTrail(trail);
        })
    }
    else{
        res.status(401).send('Access Denied!')
        trail={
            moduleId: "5",
            actor: `${req.data.data.email}`,
            action: `${req.data.data.email} unauthorized to send notification `,
            status: "danger"
        }
        auditManager.logTrail(trail);
    }
})

/**************************** Deleting Notifications (DELETE Request)********************************/
app.delete('/notification/:id',auth.authenticate,(req,res)=>{
    if(req.data.data.roleId != 1){
        connection.query(`delete from notification where id = '${req.params.id}'`,(err,resp)=>{
            if (err) return err 
            res.send('Message has been deleted')
            trail={
                moduleId: "5",
                actor: `${req.data.data.email}`,
                action: `${req.data.data.email} deleted notifications `,
                status: "success"
            }
            auditManager.logTrail(trail);
        })
    }
    else{
        res.status(401).send('Access Denied!')
        trail={
            moduleId: "5",
            actor: `${req.data.data.email}`,
            action: `${req.data.data.email} unable to delete notifications `,
            status: "danger"
        }
        auditManager.logTrail(trail);
    }
})


/**************************** SENDING BULK MESSAGES TO REGISTERED USERS********************************/
app.post('/notification/broadcast',auth.authenticate,(req,res)=>{
    if(req.data.data.roleId == 1){
        connection.query(`select email from users`,(err,resp)=>{
            
        })
    }
})

}
module.exports = notificationController;