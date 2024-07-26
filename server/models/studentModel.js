import mongoose from "mongoose";

const studentModel=mongoose.Schema(
    {
        studentId:{
            type:Number,
            required:true
        },
        studentName:{
            type:String,
            required:true
        },
        studentRoom:{
            type:Number, 
            required:true
        }
    }
)
const Student=mongoose.model("student",studentModel)
export default Student;
