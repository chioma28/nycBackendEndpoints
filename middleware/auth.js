

require('dotenv').config()

const jwt = require('jsonwebtoken')



function authenticate(req,res,next){
    const token = req.headers['authorization']

    if(token==null){
        return res.status(401).send('You have not been authenticated')
    }
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,data)=>{
        if (err) {
            return res.status(401).send(err)
        }
        req.data = data
        next()
    })
}


module.exports = authenticate