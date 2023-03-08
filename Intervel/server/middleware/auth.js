import jwt from "jsonwebtoken";
import env from 'dotenv/config';
import bcrypt from 'bcrypt';

function auth(req,res,next){
    const token=req.header('x-auth')
   
    if(!token)return res.status(401).send('access not denied')
    try {
        
        const decode=jwt.verify(token,'hidden')
        console.log(decode);
        req.user=decode
        next();
    } catch (error) {
        console.log(error.message);
        res.status(400).send("invalid token"+error.message)
    }
}

export default auth