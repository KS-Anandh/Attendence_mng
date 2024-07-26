import mongoose from "mongoose";
import moment from "moment";
const loginSchema=mongoose.Schema(
    {
        username:{
            type:String,
            required:true
        },
        loginId:{
            type:String,
            required:true
        },
        loginPass:{
            type:String, 
            required:true
        },
        status:{
            type:String,
            default:"user"
        },
        updated:{
            type:String,
            default:moment(new Date()).format("DD-MM-YYYY"),
        }
    }
)
const Login=mongoose.model("login",loginSchema)

export default Login;
