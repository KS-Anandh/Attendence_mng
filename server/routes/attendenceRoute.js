import express from 'express'
import moment from 'moment/moment.js';
import { auth,admin,room } from './authendication.js';
import DayWise from '../models/dayWiseModel.js';
import Login from '../models/loginModel.js';
import Student from '../models/studentModel.js';

const attendenceRoute=express.Router();
//ativate attendence from admin login
attendenceRoute.post('/active',async(req,res)=>{
    const date=moment(new Date()).format('DD-MM-YYYY');
    try{  
        const checkDate= await DayWise.findOne({date:date}); //cheking wether already permited or not
        if(!checkDate){
            const add=new DayWise({date:date});
            const result=add.save()
            if(result){ return res.status(200).json("Permission Granted..")}
         }  
        return res.status(200).json("Permission Already Granted..")
    }
    catch(err){res.status(500).json("Server Error")}
})

//list of presentees by date
attendenceRoute.get("/list/:date",async (req,res)=>{
    const {date}=req.params;
    try{
        const attend= await DayWise.findOne({date:date})
        const actual= attend.attendence
        const present_list=await Student.find({_id:{$in:actual}}).sort({studentRoom:1,studentId:1})
        res.status(200).json(present_list)
    }
    catch(err){
        res.status(500).json("Data is Not Present")
    }
})

//list of absentees by date
attendenceRoute.get("/list/absent/:date",async (req,res)=>{
    const {date}=req.params;
    try{
        const students= await Student.find({},'_id')
        const target=students.map(item=>item._id)
        const attend= await DayWise.findOne({date:date})
        const actual= attend.attendence
        const absents=target.filter(element=>!actual.includes(element))
        const absent_list=await Student.find({_id:{$in:absents}}).sort({studentRoom:1,studentId:1})
        res.status(200).json(absent_list)
    }
    catch(err){
        res.status(500).json("Data is Not Present")
    }
})
//mark attendence from client with help of admin
attendenceRoute.post('/',auth,room,async(req,res)=>{
    const date=moment(new Date()).format('DD-MM-YYYY');
    let user;
    try{
         user=await Login.findOne({username:req.user.user_username}); // checking room last-Atten. Updated
    }
    catch(err){return res.status(404).json("Error")}

    try{   
        if(user.updated===date) {
            return res.status(200).json("Today Attendence alreedy Submitted")
        }
        const checkDate= await DayWise.findOne({date:date});// cheking admin permited or not
        if(!checkDate){
            return res.status(200).json("Permission is Required From Admin to Mark Today Attendence")
         } 
         await Login.updateOne({username:req.user.user_username},{updated:date}) //updated login last atten. updated date
         await DayWise.updateOne({_id:checkDate._id},{$push:{attendence:req.body.attend}})// mark attendence from room
         return res.status(200).json("Attendence Submitted")
    }
    catch(err){res.status(500).json("server error")}
})


export default attendenceRoute;