const jwt = require('jsonwebtoken')
const JWT_SECRET = "qwertyuiop";

const fecthuser = (req, res , next)=>{
    // getting the user id from the jwt token
    const token = req.header('token');
    if(!token){
       return  res.status(401).send({error : 'please authenicate using a valid token'})
    } 

    try{
        const user = jwt.verify(token , JWT_SECRET) ;
        req.user = user;
        next();
    }catch(err){
        res.status(401).send({error : 'please authenicate using a valid token'})
    }
}
module.exports = fecthuser;