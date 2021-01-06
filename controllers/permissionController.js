const permissionController = (app) => {
//importing all the necessary dependencies and modules    
var connection = require('../models/db.config');
const auth = require('./authController');  
const jwt = require('jsonwebtoken');


/****************************************** Getting All The Permissions****************************************/


//getting all the permissions in the table
app.get('/privileges',auth.authenticate,(req,res)=>{
if(req.data.data.roleId == 1){
    connection.query(`select * from permission`,(err,resp)=>{
        if(err) return res.send(err);
        res.send(resp);
        trail={
            moduleId: "8",
            actor: `${req.data.data.email}`,
            action: `${req.data.data.email} viewed permissions `,
            status: "success"
        }
        auditManager.logTrail(trail);
    })
}  
else{
    res.status(401).send('Access Denied');
    trail={
        moduleId: "8",
        actor: `${req.data.data.email}`,
        action: `${req.data.data.email} unauthorized to view permissions `,
        status: "danger"
    }
    auditManager.logTrail(trail);
}  

})

//getting permissions based on roleId

//adding a new permission

app.post('/privileges',auth.authenticate,(req,res)=>{
    if(req.data.data.roleId == 1){
    connection.query(`insert into permission (permissionName,description) values 
    ('${req.body.permissionName}','${req.body.description}')`,(err,resp)=>{
        
        if (err) {
            res.status(402).send(err); 
            trail={
                moduleId: "8",
                actor: `${req.data.data.email}`,
                action: `${req.data.data.email} failed to add permissions `,
                status: "failed"
            }
            auditManager.logTrail(trail);       
        }
        res.send(`permission has been successfully added.`);
        trail={
            moduleId: "8",
            actor: `${req.data.data.email}`,
            action: `${req.data.data.email} added a permission `,
            status: "success"
        }
        auditManager.logTrail(trail);
    })
}
else{
    res.status(401).send('Access Denied!')
    trail={
        moduleId: "8",
        actor: `${req.data.data.email}`,
        action: `${req.data.data.email} unauthorized to add permissions `,
        status: "danger"
    }
    auditManager.logTrail(trail);
}

})



//
app.put('/privileges/:id',auth.authenticate,(req,res)=>{
    if(req.data.data.roleId == 1){
    connection.query(`update permission set permissionName ='${req.body.permissionName}' or
    description = '${req.body.description}' where id = '${req.params.id}'`,(err,resp)=>{
        if (err){
            res.status(402).send(err);
            trail={
                moduleId: "8",
                actor: `${req.data.data.email}`,
                action: `${req.data.data.email} failed to update permissions `,
                status: "failed"
            }
            auditManager.logTrail(trail);
        } 
        res.send(`record has been successfully updated.`);
        trail={
            moduleId: "8",
            actor: `${req.data.data.email}`,
            action: `${req.data.data.email} successfully updated permissions `,
            status: "success"
        }
        auditManager.logTrail(trail);
    })
}
else{
    res.status(401).send('Access Denied!')
    trail={
        moduleId: "8",
        actor: `${req.data.data.email}`,
        action: `${req.data.data.email} unauthorized to update permissions `,
        status: "danger"
    }
    auditManager.logTrail(trail);
}
})

//deleting a permission based on id
app.delete('/privileges/:id',auth.authenticate,(req,res)=>{
    if(req.data.data.roleId == 1){
    connection.query(`delete from permission where id = '${req.params.id}'`,(err,resp)=>{
        if (err) {
            res.status(402).send(err);
            trail={
                moduleId: "8",
                actor: `${req.data.data.email}`,
                action: `${req.data.data.email} failed to delete permissions `,
                status: "failed"
            }
            auditManager.logTrail(trail);
        }
        res.send(`The record has been successfully deleted.`);
        trail={
            moduleId: "8",
            actor: `${req.data.data.email}`,
            action: `${req.data.data.email} successfully deleted permissions `,
            status: "success"
        }
        auditManager.logTrail(trail);
    })
}
else{
    res.status(401).send('Access Denied!');
    trail={
        moduleId: "8",
        actor: `${req.data.data.email}`,
        action: `${req.data.data.email} unauthorized to delete permissions `,
        status: "danger"
    }
    auditManager.logTrail(trail);
}
})


}
module.exports = permissionController;