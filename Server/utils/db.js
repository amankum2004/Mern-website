const mongoose = require("mongoose")

const URI =  "mongodb://127.0.0.1:27017/mern_admin";
// mongoose.connect(URI)
const connectDB = async()=>{
    try {
        await mongoose.connect(URI)
        console.log("Connection Successful to db")
    } catch (error) {
        console.error("db connection failed")
        process.exit(0)
    }
}

module.exports = connectDB;

