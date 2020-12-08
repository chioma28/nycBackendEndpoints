// var categoryController = (app) =>{
// var connection = require ('../models/db')

// /************************* Get Request ******************************************/
//     //getting everything in the database
//     app.get('/categories',(req,res)=>{
//         connection.query(`select * from category`,(err,resp)=>{
//             if (err){
//                 res.send(err)
//             }
//             res.send(resp)
//         })
//     })

//     //getting records by id from the database
//     app.get('/categories/:id',(req,res)=>{
//         connection.query(`select * from category where id = '${req.params.id}'`,(err,resp)=>{
//             if (err) throw err
//             res.send(resp)
//         })
//     })

//     /******************************** Post Request **************************************/
//     //adding records into the database
//     app.post('/categories',(req,res)=>{
//         connection.query(`insert into category (categoryName) values ('${req.body.categoryName}')`,(err,resp)=>{
//             if (err) throw err
//             res.send(` ${req.body.categoryName} category has been successfully added`)
//         })
//     })
// }

// module.exports =categoryController