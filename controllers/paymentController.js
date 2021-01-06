var paymentController = (app) =>{
//Import required dependencies
var connection = require('../models/db.config');
const auth = require('./authController');
const jwt = require('jsonwebtoken');

/************************************** Get Request by ID ******************************************/
app.get('/payment/:id',auth.authenticate,(req,res)=>{
    if(req.data.data.roleId == 1){
    connection.query(`select userId,transactionId,payerName,amountPaid,bank,datePaid,
    purposeOfPayment,validity,receiptNo,transactionType,cardType from payment where userId = '${req.params.id}'`,
    (err,resp)=>{
        if (err) return err
        res.send(resp);
    })
}
else{
    res.status(403).send('Access Denied!')
}
})

/************************************** Get All Requests ******************************************/
app.get('/payment',auth.authenticate,(req,res)=>{
    if(req.data.data.roleId == 1){
    connection.query(`select userId,transactionId,payerName,amountPaid,bank,datePaid,
    purposeOfPayment,validity,receiptNo,transactionType,cardType from payment`,
    (err,resp)=>{
        if (err) return err
        res.send(resp);
    })
}
else{
    res.status(403).send('Access Denied!')
}
})

/************************************** Post Requests ******************************************/
app.post('/payment',auth.authenticate,(req,res)=>{
    if(req.data.data.roleId == 2) {
        
        connection.query(`insert into payment (transactionId,userId,payerName,amountPaid,bank,
            purposeOfPayment,validity,receiptNo,transactionType,cardType,isPaid) 
        values ('${req.body.transactionId}}',
            '${req.data.data.id}',
        '${req.body.payerName}',
        '${req.body.amountPaid}',
        '${req.body.bank}',
        '${req.body.purposeOfPayment}',
        '${req.body.validity}',
        '${req.body.receiptNo}',
        '${req.body.transactionType}',
        '${req.body.cardType}',
        'successful')`,(err,resp)=>{
            if(err) return res.send(err)
            res.send('Payment Successful!')
        })
    }
    else{
        res.status(403).send('Access Denied!')
    }
})

}

module.exports = paymentController;