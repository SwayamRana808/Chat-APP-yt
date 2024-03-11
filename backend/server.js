import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'

import connectToMongoDB from './db/connectToMongoDB.js'
dotenv.config()

const app=express();
app.use(express.json()) //this line should be above routes as it is a middleware which will parse the incoming request with JSON payloads(from req.body)
const PORT=process.env.PORT || 5000;
app.use(cookieParser()) // to access the cookies
app.use('/api/auth',authRoutes)
app.use('/api/messages',messageRoutes)
app.use('/api/users',userRoutes)

// app.get('/',(req,res)=>{
//     res.send("hello")
// })


app.listen(PORT,()=>{
    connectToMongoDB()
    console.log(`server running on port ${PORT}`)
})