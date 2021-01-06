




var uploadDocumentController = (app)=>{
    const { connect } = require('../models/db.config');
    const { response } = require('express');
    const connection = require('../models/db.config');
    const auth = require('./authController');
    const fileUpload = require('../middleware/fileupload');


    
   
    var docUpload = fileUpload.fields([{ name: 'doc_one', maxCount: 1 }, 
                                       { name: 'doc_two', maxCount: 1 }, 
                                       { name: 'doc_three', maxCount: 1 },
                                       { name: 'doc_four', maxCount: 1 },
                                       { name: 'cac', maxCount: 1 }])


    
    app.post('/upload',auth.authenticate,docUpload,(req,res)=>{

        const {title,description} = req.body

        const doc_one = req.files['doc_one'][0].path.replace(/\\/g,"/")
        
        const doc_two = req.files['doc_two'][0].path.replace(/\\/g,"/")
        
        const doc_three = req.files['doc_three'][0].path.replace(/\\/g,"/")

        const doc_four = req.files['doc_four'][0].path.replace(/\\/g,"/")

        const cac = req.files['cac'][0].path.replace(/\\/g,"/")

        
        var result =[title, description,doc_one, doc_two, doc_three, doc_four, cac]
        


       
        connection.query(`insert into documents (title, description, doc_one, doc_two, doc_three, doc_four, cac) 
         values
         ('${title}', 
         '${description}',
         '${doc_one}', 
         '${doc_two}', 
         '${doc_three}',
         '${doc_four}',
         '${cac}')`,(err, response)=>{
            if(err){
                console.log(err)
            }else{

                res.send(response)
            }




         })
         
    
         res.send(result)

       

    })

    app.get('/upload', (req,res)=>{
        connection.query('select * from documents', (err, response)=>{
            if(err){
                res.sendStatus(200)

            }else{
                res.send(response)

            }



        })




     })


     app.get('/upload/:id', (req, res)=>{
       
        connection.query(`select * from documents where id= ${req.params.id}`, (err, response)=>{
            if(err){
                res.send(err)

            }else{

                res.send(response)
            }



        })



     })

     app.delete('/upload/:id', auth.authenticate, (req, res)=>{
        if(req.data.data.roleId == 1){
            connection.query(`delete from documents where id = ${req.params}`, (err, response)=>{
                if(err){
                    res.send(err)
                }else{

                    res.send(response)


                }



            })


        }



     })


}

module.exports = uploadDocumentController


