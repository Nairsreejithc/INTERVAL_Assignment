import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from 'dotenv/config'

function Admin(req,res,next){
    if (req.user.isAdmin ===true){
        next()
    }
    else{
        return res.status(403).send('assess denied')
    }
}
export default Admin