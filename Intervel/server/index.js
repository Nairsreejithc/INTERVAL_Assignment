import express from 'express'
import Bodyparser  from 'body-parser';
import mongoose from 'mongoose';
import cors from "cors";
//login&Register
import stud from "./router/student.js"
//post access article
import article from "./router/article.js"


const app= express()
app.use(cors())
app.use(Bodyparser.json())
app.use(Bodyparser.text())
app.use(express.json())
app.use(Bodyparser.urlencoded({extended:true}))


app.use("/api/student",stud)
app.use('/api/Add',article)


mongoose.connect('mongodb://localhost:27017/INterval')
.then(()=>console.log('db is connected'))
.catch(()=>console.log('cannot connect db'))


app.listen(2050,()=>{
    console.log("server is running on 2050");
})
