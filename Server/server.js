const express = require("express")
const app = express();
const cors = require("cors")
const authRoute = require("../Server/router/auth-router")
const contactRoute = require("../Server/router/contact-router")
const serviceRoute = require("../Server/router/service-router")
const adminRoute = require("../Server/router/admin-router")
const connectDB = require("../Server/utils/db")
const errorMiddleware = require("../Server/middlewares/error-middleware")

// const PORT = import.meta.env.VITE_LOCAL_PORT;

// let's tackle cors 
const corsOptions={
    origin:"http://localhost:5173",
    methods:"GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials:true
}
app.use(cors(corsOptions))

app.use(express.json())
app.use("/api/auth",authRoute)
app.use("/api/form",contactRoute)
app.use("/api/data",serviceRoute)

// let's define admin route
app.use("/api/admin",adminRoute)


// app.get("/", (req,res)=>{
    //     res.status(200).send("Welcome to MERN stack development")
    // })
    
    // app.get("/register", (req,res)=>{
        //     res.status(200).send("Welcome to registration page")
        // })
        
app.use(errorMiddleware)

const PORT = 27017
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running at port: ${PORT}`)
    })
});