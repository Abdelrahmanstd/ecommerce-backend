const mongoose=require('mongoose')


const orderSchema=new mongoose.Schema({

    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
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
    totalPrice:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true})




module.exports=mongoose.model("Order",orderSchema)