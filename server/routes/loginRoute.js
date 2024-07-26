import express from 'express'
import Login from '../models/loginModel.js';
import jwt from 'jsonwebtoken'
const loginRoute = express.Router();

loginRoute.get('/', async (req, res) => {
    try {
        const logins = await Login.find({});
        res.status(200).json(logins)
    }
    catch (err) { res.status(500).json(err) }
});
loginRoute.post("/verify", async (req, res) => {
    const { loginId,loginPass } = req.body;
    try {
        const verify = await Login.findOne({ loginId: loginId,loginPass:loginPass })
        if (verify) {
            const payload = {
                user_id: verify._id,
                user_username: verify.username,
                user_loginId: verify.loginId,
                user_status:verify.status,
                user_updated:verify.updated
            }
            jwt.sign(payload, "nandha1432@", { expiresIn: 60*60 }, (err, token) => {
                if (err) { res.status(500).json("error from sing{jwt}") }
                res.status(200).json({ token })
            })
        }
        else{
            res.status(500).json("invalid login")
            } 
    }
    catch (err) { res.status(500).json(err) }
})
loginRoute.post('/', async (req, res) => {
    try {
        const login = new Login(req.body)
        const status = await login.save()
        if (!status) {
            res.status(400).json("Error from login post route..")
        }
        return res.status(200).json("login added Successfully")
    }
    catch (err) { res.status(500).json(err) }
})
loginRoute.get('/info', async (req, res) => {
    const token=req.header(`x-token`);
    try {
        const decoded = jwt.verify(token,"nandha1432@");
        if(decoded){
            return res.status(200).json(decoded);
        }
    }
    catch (err) { res.status(500).json(err) }
})

export default loginRoute;