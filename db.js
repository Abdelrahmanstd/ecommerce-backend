const mongoose=require('mongoose')

const connectDb=async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongodb Connected");
        
    } catch (err) {
        console.log('MongoDB Connection Failed ', err.message);
    }
}


module.exports=connectDb