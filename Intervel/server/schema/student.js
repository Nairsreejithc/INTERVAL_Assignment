import mongoose from "mongoose";
import Joi from 'joi'

const Student=mongoose.model('Student',new mongoose.Schema({
    stu_name:{
        type: String,
        required: true
    },
    stu_email:{
      type:String,
      required:true
    },
    Password:{
        type:String,
        required:true
    },
    Batch:{
        type:String,
        required:true
    },
    Dept:{
        type: String,
        required: true
    },
    Course:{
        type: String,
        required: true
    },
    Section:{  
        type: String,
        default:"A"
    },
    RegNo:{
      type: String,
      required: true,
      uppercase: true,
      unique: true
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
}));

const validateStudent= (value) => {
    const schema = Joi.object({
      stu_name: Joi.string().min(5),
      Batch:Joi.string().min(4).max(4),
      Dept:Joi.string(),
      Password:Joi.string().min(5),
      Course:Joi.string().min(2),
      Section:Joi.string(),
      RegNo:Joi.string(),
      stu_email:Joi.string(),
    });
    const result = schema.validate(value)
  
    return result  
  };

export default Student;

export {validateStudent}