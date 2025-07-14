const jwt=require('jsonwebtoken')
const User=require('../models/user.model')


const protect=async(req,res,next)=>{

    let token;
    if(req.headers.authorization?.startsWith('Bearer'))
    {
        try {
            token = req.headers.authorization.split(' ')[1]

            const decode=jwt.verify(token,process.env.JWT_SECRET)

            req.user=await User.findById(decode.id).select('-password')
            
            next()

        } catch (err) {
            return res.status(401).json({message:"Not authorized, token failed"})
        }
    }else{

        return res.status(401).json({message:"Not authorized, token failed"})
    }

}



module.exports=protect
