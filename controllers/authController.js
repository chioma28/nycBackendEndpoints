//import dependencies
const jwt = require('jsonwebtoken')
require('dotenv').config()

process.env.ACCESS_TOKEN_SECRET

/************************************ Verify Token***************************************/

function authenticate(req,res,next){
    const token = req.headers['authorization']

    if(token==null){
        return res.status(401).send('You have not been authenticated')
    }
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decodedData)=>{
        if (err) {
            return res.status(401).send(err)
        }
        req.data = decodedData
        next()
    })
}

function forgotPassword(req,res,next){
    const token = req.headers['authorization']

    if(token==null){
        return res.status(401).send('You have not been authenticated')
    }
    jwt.verify(token,process.env.FORGOT_TOKEN_SECRET,(err,decodedData)=>{
        if (err) {
            return res.status(401).send(err)
        }
        req.data = decodedData
        next()
    })
}

module.exports.authenticate = authenticate
module.exports.forgotPassword = forgotPassword