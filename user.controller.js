const User=require('../models/user.model')
const jwt=require('jsonwebtoken')


const generateToken=(user)=>{
    // expiresIn عايز أشوف دى مستخدمة فى اى
    return jwt.sign(
        {id:user._id,role:user.role},
        process.env.JWT_SECRET,
        {expiresIn:'7d'})

}


exports.registerUser=async (req,res)=>{

    const {name,email,password}=req.body
    const userExists=await User.findOne({email})

    if(userExists) return res.status(400).json({message:"User Already Exists"})

    const user=await User.create({name,email,password})
    

    return res.status(200).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        token:generateToken(user)
    })
}


exports.loginUser=async (req,res)=>{
    const {email,password}=req.body
    const user=await User.findOne({email})

    if(!user ||!(await user.matchPassword(password))) return res.status(400).json({message:"invalid email or password"})

    return res.status(200).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        token:generateToken(user)
    })  
}