import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({ msg:token });
    }
    try {
        const decoded = jwt.verify(token, "nandha1432@");
        req.user = decoded;
        next();
    } catch (err) {
        if(err.name==="TokenExpiredError"){
            return res.status(400).json("Session Timeout Re-Login Required");
        }
         res.status(401).json("Authendication Fail");
    }
};
const room=(req,res,next)=>{
    if(req.user.user_status==="room" || req.user.user_status==="admin"){
        next();
    }
    else{
        res.status(401).json("access declined")
    }
}
const admin=(req,res,next)=>{
    if(req.user.user_status==="admin"){
        next();
    }
    else{
        res.status(401).json("access declined")
    }
}
export  {auth,room,admin};
