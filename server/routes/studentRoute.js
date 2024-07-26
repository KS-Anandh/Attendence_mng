import express from 'express'
import Student from '../models/studentModel.js';
import {admin, auth,room} from './authendication.js';
const route=express.Router();

route.get('/',auth,room,async(req,res)=>{
     const room=req.user.user_username.slice(4,5);
    try{
        if(req.user.user_status==="admin"){
            const students= await Student.find({}).sort({studentRoom:1,studentId:1});
            res.status(200).json(students)    
        }
        else if(req.user.user_status==="room"){
            const students= await Student.find({studentRoom:room}).sort({studentId:1});
            res.status(200).json(students) }
        else{
            res.status(301).json("un-authirized")
        }  }
    catch(err){res.status(500).json(err)}
})

route.post('/',auth,admin,async(req,res)=>{
    const {studentId}=req.body;
    try{
        const existsName=await Student.findOne({studentId:studentId})
        if(!existsName){
            const student=new Student(req.body);
            const result= await student.save();     
            if(!result){
                res.status(500).json("Student Post Route Error")
            }
           res.status(201).json("Data Added Successfully")
        }
        else{res.status(200).json("Student already exist")}
    }
    catch(err){  res.status(500).json(err)}
})
route.delete('/delete/:id',auth,admin,async(req,res)=>{
    const {id}=req.params;
    try{
           const status=await Student.findByIdAndDelete({_id:id});
           if(status){
            return res.status(200).json("Deleted Successfully")
           }
           res.status(500).json("Data not Deleted")
    }
    catch(err){res.status(500).json("error from server")}
})

route.put('/update/:id',auth,admin,async(req,res)=>{
    const {id}=req.params;
    try{
           const status=await Student.findByIdAndUpdate({_id:id},req.body);
           if(status){
            return res.status(200).json("updated Successfully")
           }
           res.status(500).json("Data not Updated")
    }
    catch(err){res.status(500).json("error from server")}
})
route.get('/id/:id',async(req,res)=>{
    const {id}=req.params;
    try{
           const status=await Student.findOne({_id:id});
           if(status){
            return res.status(200).json(status)
           }
           res.status(500).json("error from GET")
    }
    catch(err){res.status(500).json("error from server")}
})
route.post('/list',async(req,res)=>{
    const {list}=req.body;
    try{
        const listOfStudents=await Student.find({_id:{$in:list}});
        return res.status(200).json(listOfStudents)
      }
    catch(err){  res.status(500).json(err)}
})

route.post('/list/ab',async(req,res)=>{
    const {list}=req.body;
    try{
        const listOfStudents=await Student.find({_id:{$nin:list}});
        return res.status(200).json(listOfStudents)
      }
    catch(err){  res.status(500).json(err)}
})
export default route;