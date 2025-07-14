const express=require('express')
const dotenv=require('dotenv')
const connectDb=require('./config/db')
dotenv.config()
const app=express()

app.use(express.json())
connectDb()
const path=require('path')
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/user",require("./routes/user.route"))

app.use("/api/product",require('./routes/product.route'))

app.use("/api/brand",require('./routes/brand.route'))

app.use("/api/category",require("./routes/category.route"))

app.use("/api/subCategory",require("./routes/subCategory.route"))

app.use("/api/cart",require('./routes/cart.route'))

app.use("/api/orders", require('./routes/order.route'))

app.listen(process.env.PORT|4000,()=>{
    console.log(`Server Started at ${process.env.PORT}`)
})


