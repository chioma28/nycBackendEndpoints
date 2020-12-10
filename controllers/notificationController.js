var notificationController = (app) => {
var connection = require ('../models/db');
const auth = require('./authController');  
const jwt = require('jsonwebtoken');

/**************************** Getting The Notifications (GET Request)********************************/
app.get('/notification',auth.authenticate,(req,res)=>{
    connection.query(`select * from notification `,(err,resp)=>{
        if (err) return res.send(err)
        res.send(resp)
    })
})

/**************************** Sending Notifications (POST Request)********************************/

app.post('/notification',auth.authenticate,(req,res)=>{
    if(req.data.data.roleId == 1){
        connection.query(`insert into notification (subject,message) values ('${req.body.subject}', 
        '${req.body.message}')`,(err,resp)=>{
            if (err) return err 
            res.send('Message has been sent')
        })
    }
    else{
        res.status(401).send('Access Denied!')
    }
})

/**************************** Deleting Notifications (DELETE Request)********************************/
app.delete('/notification/:id',auth.authenticate,(req,res)=>{
    if(req.data.data.roleId != 1){
        connection.query(`delete from notification where id = '${req.params.id}'`,(err,resp)=>{
            if (err) return err 
            res.send('Message has been deleted')
        })
    }
    else{
        res.status(401).send('Access Denied!')
    }
})


}
module.exports = notificationController;