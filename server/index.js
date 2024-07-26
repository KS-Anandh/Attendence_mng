import express from 'express'
import mongoose from 'mongoose';
import route from './routes/studentRoute.js';
import loginRoute from './routes/loginRoute.js';
import attendenceRoute from './routes/attendenceRoute.js';
import cors from'cors'
const app=express();
app.use(express.json())
app.use(cors())
app.use('/student',route)
app.use('/login',loginRoute)
app.use('/attendence',attendenceRoute)
app.get("/",(req,res)=>{
    res.send("Calling From Api")
})

//mongodb+srv://anandh:<password>@cluster0.1wbtik2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
mongoose.connect("mongodb+srv://anandh:nandha1432@cluster0.1wbtik2.mongodb.net/attendence_mang?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    app.listen(9600,()=>{
        console.log("API Running in Port :9600")   
    })
    console.log("DataBase Connected Sucsessfully")
})
.catch((err)=>{
    console.log(err)
})