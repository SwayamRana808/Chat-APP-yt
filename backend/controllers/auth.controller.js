import User from "../models/user.model.js";

export const signup=async(req,res)=>{
    
    try{
        const {fullName,username,password,confirmPassword,gender}=req.body;
        console.log(req.body)
        if(password!==confirmPassword){
            return res.status(400).json({error:"password donot match"})
        }
        const user =await User.findOne({username})
        if(user){
            return res.status(400).json({error:"username already exits"})
        }
        //hash password here 
        // https://avatar-placeholder.iran.liara.run/
        const boyProfilePic=`https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic=`https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser =await User({
            fullName,   // fullName(model schema file): fullName (this file )
            username,
            password,
            gender,
            profilePic:gender == 'male'?boyProfilePic:girlProfilePic,
        })
        await newUser.save();
        res.status(201).json({
            _id:newUser._id,
            fullName:newUser.fullName,
            username:newUser.username,
            profilePic:newUser.profilePic
        })
    }catch(error){
    console.log("error in signup controller",error.message)
     res.status(500).json({error:"internal server error"})
    }
    console.log('signup user')
}


export const login=(req,res)=>{
    console.log('login user')
}
export const logout=(req,res)=>{
    console.log('logout user ')
}
