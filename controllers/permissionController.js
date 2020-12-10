const permissionController = (app) => {
//importing all the necessary dependencies and modules    
var connection = require('../models/db');
const auth = require('./authController');  
const jwt = require('jsonwebtoken');


/****************************************** Getting All The Permissions****************************************/


//getting all the permissions in the table
app.get('/privileges',auth.authenticate,(req,res)=>{
if(req.data.data.roleId == 1){
    connection.query(`select * from permission`,(err,resp)=>{
        if(err) return res.send(err);
        res.send(resp);
    })
}  
else{
    res.status(401).send('Access Denied');
}  

})

//getting permissions based on roleId

//adding a new permission

app.post('/privileges',auth.authenticate,(req,res)=>{
    if(req.data.data.roleId == 1){
    connection.query(`insert into permission (permissionName,description) values 
    ('${req.body.permissionName}','${req.body.description}')`,(err,resp)=>{
        
        if (err) throw err;
        res.send(`permission has been successfully added.`);
    })
}
else{
    res.status(401).send('Access Denied!')
}

})



//
app.put('/privileges/:id',auth.authenticate,(req,res)=>{
    if(req.data.data.roleId == 1){
    connection.query(`update permission set permissionName ='${req.body.permissionName}' or
    description = '${req.body.description}' where id = '${req.params.id}'`,(err,resp)=>{
        if (err) return res.send(err);
        res.send(`record has been successfully updated.`);
    })
}
else{
    res.status(401).send('Access Denied!')
}
})

//deleting a permission based on id
app.delete('/privileges/:id',auth.authenticate,(req,res)=>{
    if(req.data.data.roleId == 1){
    connection.query(`delete from permission where id = '${req.params.id}'`,(err,resp)=>{
        if (err) return res.send(err);
        res.send(`The record has been successfully deleted.`);
    })
}
else{
    res.status(401).send('Access Denied!')
}
})



}
module.exports = permissionController;