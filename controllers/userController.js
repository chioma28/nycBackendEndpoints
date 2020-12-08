// var userController = (app) => {
//     var connection = require('../models/db')
//     require('dotenv').config()
//     const bcrypt = require('bcrypt')
//     const jwt = require('jsonwebtoken')
    
//     process.env.ACCESS_TOKEN_SECRET
    
//     /**
     
//     Generate Token
//     jwt.sign(data,secret)
    
    
//     Verify 
//     jwt.verify(data,secret)
    
//      */
    
    
        
//     /** GET REQUESTS  */
//         app.get('/',(req,res)=>{
//             res.send('Welcome To My First API')
//         })
    
//         app.get('/users',(req,res)=>{
//             connection.query('select * from city',(err,resp)=>{
//                 res.send(resp)
//             })
//         })
    
        
    
//         app.get('/users',(req,res)=>{
//             res.send('You will be redirected to your homepage soon...')
//         })
//         app.get('/users/:id',(req,res)=>{
//             connection.query(`select * from city where cityId= ${req.params.id}`,(err,resp)=>{
//                 res.send(resp)
//             })
            
//         })
//         app.get('/users/',(req,res)=>{
//             connection.query(`select * from city `,(err,resp)=>{
//                 res.send(resp)
//             })
            
//         })
    
//         /** POST REQUEST */
    
//         app.post('/users',(req,res)=>{
            
//             connection.query(`insert into city (cityName,zipCode) values ('${req.body.cityName}','${req.body.zipCode}')`,(err,resp)=>{
//                 if(err) throw err
    
//                 res.send('User successfully created')
//             })
       
//         })
    
//         app.get('/signup',authenticate,(req,res)=>{
            
//             connection.query(`select * from students`,(err,resp)=>{
//                 if (err){
//                     res.send('You are not authorized to view all users')
//                 }
//                 else{
//                     res.send(resp)
//                 }
               
//             })
//     })
    
//         app.get('/signup/:id',(req,res)=>{
//             connection.query(`select * from students where id=${req.params.id}`,(err,resp)=>{
//                 res.send(resp)
//             })
//         })
    
//         app.post('/login',(req,res)=>{
//             connection.query(`select * from students where email = '${req.body.email}'`,(err,resp)=>{
//                 if (err || resp.length < 1) {
//                     res.statusCode=401
//                     res.send("Invalid email or password")
//                 }
//                 else{
                    
//                      bcrypt.compare(req.body.password,resp[0].password,function(errh,result){
                         
                             
                         
//                          if (result === false) {
//                              res.statusCode = 401;
//                              res.send('Invalid username and password')
//                          }
//                          if(result === true){
//                             delete resp[0].password
    
//                             let data = { "data":resp[0]}
    
//                             let accessToken =  jwt.sign(data,process.env.ACCESS_TOKEN_SECRET)
//                             //  res.send(accessToken)
//                         //    let tokenData ={
//                         //        "data": resp[0],
//                         //        "Token":accessToken
//                         //    }
//                            res.send(accessToken)
    
//                          }
                       
                            
                       
//                      })
//                 }  
                
               
//             })
//         })
    
            
            
//         // }
    
        
    
    
//         app.post('/signup',(req,res)=>{
//             bcrypt.hash(req.body.password,10,(err,hash)=>{
//                 if (err) throw err
//                 connection.query(`insert into students (firstName,lastName,email,password) 
//                 values ('${req.body.firstName}',
//                 '${req.body.lastName}',
//                 '${req.body.email}',
//                 '${hash}')`,(errq,resp)=>{
//                     if(errq) {
//                         res.send(errq)
//                     }
        
//                     res.send('Signup successful')
//                 })
           
    
    
//             })
            
//         })
    
    
    
//             app.put('/users/:id', (req,res)=>{
//                 connection.query(`update city set cityName = '${req.body.cityName}' where cityId= ${req.params.id}`,(err,resp)=>{
//                     if (err) throw err
    
//                     res.send('Users record has been updated')
//             })
    
//         })
    
//             app.delete('/users/:id', (req,res)=>{
//                 connection.query(`delete from city where cityId= ${req.params.id}`,(err,resp)=>{
//                     if (err) throw err
    
//                     res.send('Users record has been deleted')
                
//             })
//         })
        
//         function authenticate(req,res,next){
//             const token = req.headers['authorization']
    
//             if(token==null){
//                 return res.status(401).send('You have not been authenticated')
//             }
//             jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,data)=>{
//                 if (err) {
//                     return res.status(401).send(err)
//                 }
//                 req.data = data
//                 next()
//             })
//         }
    
//     }
    
//     module.exports = userController