const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    role: {
       type: String,
       enum: ['user', 'admin'],
       default: 'user'
    }
},{timestamps:true})


userSchema.pre("save",async function(next){
    // سطر رقم 30 عايز أفهمه
     if (!this.isModified('password')) return next(); 
    this.password=await bcrypt.hash(this.password,10)
    next()

})



userSchema.methods.matchPassword=async function(enteredPassword){

    return await bcrypt.compare(enteredPassword,this.password)

}



module.exports=mongoose.model("User",userSchema)