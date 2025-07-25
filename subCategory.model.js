const mongoose = require('mongoose')

const subCategorySchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:'Category',
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true})



module.exports=mongoose.model('SubCategory',subCategorySchema)
