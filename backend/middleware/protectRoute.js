import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';
const protectRoute=async(req,res,next)=>{
    try {
        const token=req.cookies.jwt; // to run this import coolie parser middle ware first 
        if(!token){
            return res.status(401).json({error:"Unauthorised-no token provided"})
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET)

        if(!decoded){
            return res.status(401).json({error:"Unauthorised- Invalid Token"})
        }

        const user =await User.findById(decoded.userId).select("-password") // jwt token contained userId field when created
        
        if(!user){
            return res.status(404).json({error:"User not found"})
        }

        req.user=user
        next()
    } catch (error) {
        console.log("Error in protectRoute middleware",error.message)
        res.status(500).json({error:"internal server error"})
    }
}
export default protectRoute;