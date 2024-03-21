const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const secret = require("../controllers/auth-config")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    phone:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    }
})

// SECURE THE PSW WITH BCRYPT
userSchema.pre('save',async function(next){
    // console.log("pre method",this)
    const user = this
    if (!user.isModified("password")) {
        next();
    }

    try {
        const saltRound = await bcrypt.genSalt(10)
        const hash_password = bcrypt.hash(user.password,saltRound)
        user.password = hash_password
    } catch (error) {
        next(error)
    }
})

// Compare the password
userSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password,this.password);
}

// JSON web tokens
userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email:this.email,
            isAdmin:this.isAdmin,
        },secret.secret,{expiresIn: "30d"});
    } catch (error) {
        console.error(error)
    }
};

const User = new mongoose.model("User",userSchema)

module.exports = User;
