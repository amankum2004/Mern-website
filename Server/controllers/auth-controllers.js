const User = require("../models/user-model")
const bcrypt = require("bcrypt")

const home = async(req,res) => {
    try {
        res.status(200).send("Welcome to MERN stack development new again")
    } catch (error) {
        console.log(error)
    }
}

const register = async(req,res) => {
    try {
        const {username,email,phone,password} = req.body;
        const userExist = await User.findOne({email}) 
        if(userExist){
            return res.status(400).json({message: "Email already exists"})
        }

        const saltRound = 10;
        const hash_password = await bcrypt.hash(password,saltRound)
        const userCreated =  await User.create({
            username,
            email,
            phone,
            // password,
            password:hash_password,
        });

        console.log(req.body)
        res.status(201).json({
            message: "Registration successful",
            token: await userCreated.generateToken(),
            userId: userCreated._id
        })
        // res.status(200).send(req.body)
        // res.status(200).send("Welcome to registration page through Controllers new")
    } catch (error) {
        // res.status(404).json({message: "Page not found"})
        next(error)
    }
}

const login = async (req,res) =>{
    try {
        const {email,password} = req.body;
        const userExist = await User.findOne({email});
        if (!userExist) {
            return res.status(404).json({
                msg: "Invalid credentials"
            })
        }
        // const user = await bcrypt.compare(password,userExist.password);
        const user = await userExist.comparePassword(password)

        if (user) {
            res.status(201).json({
                message: "Login successful",
                token: await userExist.generateToken(),
                userId: userExist._id
            })
        }else{
            res.status(401).json({message: "Invalid email or password"})
        }
    } catch (error) {
        // res.status(500).json("Internal server error")
        next(error)
    }
};

// LOGIC TO SEND USER DATA IN CONTACT US FORM
const user = async(req,res) => {
    try {
        const userData = req.user;
        console.log(userData);
        return res.status(200).json({userData})
    } catch (error) {
        console.log(`Error from the user route: ${error}`);
    }
}


module.exports = {home,register,login,user};