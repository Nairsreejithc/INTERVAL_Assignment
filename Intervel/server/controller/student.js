import bcrypt from 'bcrypt' 
import jwt from 'jsonwebtoken'
import Student,{validateStudent} from '../schema/Student.js';

const Register=async(req,res)=>{
    const email = req.body.stu_email
    console.log(email);
    const {error}=validateStudent(req.body)
    if (error){
        return res.status(400).send(error.details[0].message);
    }

    const exuser=await Student.findOne({stu_email:email});
    if (exuser) {
        res.status(400).send("email is already takken");
    }else{
        try {
            console.log(req.body.stu_name);
            let hash=await bcrypt.hash(req.body.Password,10);

            let user=new Student({ 
                stu_name:req.body.stu_name,
                stu_email:req.body.stu_email.toLowerCase(),
                Password:hash,
                Batch:req.body.Batch,
                Dept:req.body.Dept,
                Course:req.body.Course,
                Section: req.body.Section,
                RegNo:req.body.RegNo,
            });
            let result=await user.save();
            res.status(200).send(result)
        } catch (error) {
            res.status(400).send(error.message)
        }}
}

const Login=async(req,res)=>{
    const email=req.body.stu_email.toLowerCase();
    const pwd=req.body.Password
    // console.log(pwd);
    try {
        const logUser=await Student.findOne({stu_email:email},{})//find all user using and condition
        // console.log(logUser.password);
        if (logUser) {
          const bhash=await  bcrypt.compare(pwd,logUser.Password).then(function(result) {
                if(result) {
                    const token= jwt.sign({logUser},'hidden')
                    return res.header('x-auth',token).send(token)
                }
                else{
                      res.send("incorrect password")
               }
            });
        }
        if(!logUser){
        res.send("email is not valid");
        }
        
    } catch (error) {
        console.log(error)
    }

}



const Update=async (req,res)=>{
   
    const data=req.body
    // console.log(data);
    try {
        if(!req.body.RegNo && !req.body.email){
            let update=await Student.findOneAndUpdate({_id:req.user.id},{$set:data},{new:true})
            if(update){
                try {
                    res.status(200).send(update)
                } catch (error) {
                    res.status(400).send(error.message)
                }
            }else{
                console.log(req.user.id);
                res.send("student not found")
            }
        }else{
            res.send("you did not edit emil (or) RegNo")
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
   
    
}
const ChangePassword=async(req,res)=>{
    try {
        let hash=await bcrypt.hash(req.body.password,10);

        let update=await Student.findOneAndUpdate({_id:req.user.id},{$set:{password:hash}},{new:true})
        res.status(200).send("updated Successfuly")
    } catch (error) {
        res.status(400).send(error.message)
    }
}
const getAll = async(req, res) => {
    let result=await Student.find().select('-password')
    res.send(result)
}
const profileView=async(req, res) => {
    let result=await Student.findById({_id:req.user.id})
    res.status(200).send(result)
}
export {Register,Login}