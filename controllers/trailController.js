 connection = require('../models/db.config');


const auditTrail = () => {


}
auditTrail.logTrail =(trail) =>{
    connection.query(`insert into trail (moduleId,actor,action,status) values ('${trail.moduleId}',
    '${trail.actor}',
    '${trail.action}',
    '${trail.status}')`,(err,resp)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log('successful');
        }
        
        
    })
}
module.exports = auditTrail