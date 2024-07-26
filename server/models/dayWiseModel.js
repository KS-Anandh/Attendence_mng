import mongoose from "mongoose";

const DayWiseSchema=mongoose.Schema(
    {
        date:{
            type:String,
            required:true
        },
        attendence:{
            type:[String]
        }
    }
)

const DayWise=mongoose.model("daywise",DayWiseSchema)
export default DayWise;