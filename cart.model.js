const mongoose=require('mongoose')


const cartSchema=new mongoose.Schema({

    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true,
        unique:true
    },
    items:[
        {
            product:{
                type:mongoose.Types.ObjectId,
                ref:'Product',
                required:true
            },
            quantity:{
                type:Number,
                required:true,
                default:1
            },
            price:{
                type:Number,
                required:true
            }
        }
    ],
   
},{timestamps:true})




module.exports=mongoose.model("Cart",cartSchema)