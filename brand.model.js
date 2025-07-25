const mongoose=require('mongoose')


const brandSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,

    },
    image: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    isDeleted:{
      type:Boolean,
      default:false
    }
},{timestamps:true})


module.exports=mongoose.model("Brand",brandSchema)