const mongoose=require('mongoose')


const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    brand:{
        type:mongoose.Types.ObjectId,
        ref:'Brand',
        required:true
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref: 'Category',
        required:true
    },
    subCategory:{
        type:mongoose.Types.ObjectId,
        ref:'SubCategory',
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true})


module.exports=mongoose.model("Product",productSchema)