// var roleController = (app) => {
//     var connection = require('../models/db')

//     /************************* Get Request ******************************************/
//     //getting everything in the database
//     app.get('/roles',(req,res)=>{
//         connection.query(`select * from roles`,(err,resp)=>{
//             if (err){
//                 res.status(400).send('Cannot get data from the role database')
//             }
//             res.send(resp)
//         })
//     })

//     //getting data by id from the database
//     app.get('/roles/:id',(req,res)=>{
//         connection.query(`select * from roles where role_id = '${req.params.id}'`,(err,resp)=>{
//             if (err){
//                 res.send(err)
//             }
//             res.send(resp)
//         })
//     })

//     //adding records into the database
//     app.post('/roles',(req,res)=>{
//         if(req.body.description != undefined || req.body.description != null){
//         connection.query(`insert into roles (description) values ('${req.body.description}')`,(err,resp)=>{
//             if (err){
//                 res.status(400).send(err)
//             }
            
//             if(resp){
//                 res.status(200).send('role has been succesfully added')
//             }
            
//         })
//     }
//     })


// }
// module.exports =roleController