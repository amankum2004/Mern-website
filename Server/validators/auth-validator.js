const {z} = require("zod")

const loginSchema = z.object({
    email:z
    .string({required_error:"Email is required"})
    .trim()
    .email({message:"Invalid email address"})
    .min(3,{message: "Email must be of atleast 3 characters" })
    .max(50,{message:"Email must not have more than 50 characters"}),

    password:z
    .string({required_error:"Password is required"})
    .min(6,{message: "password must be of atleast 6 characters" })
    .max(50,{message:"Password must not have more than 50 characters"})

})

// Creating an object Schema
const signupSchema = loginSchema.extend({
    username:z
    .string({required_error:"Name is required"})
    .trim()
    .min(3,{message: "Name must be of atleast 3 characters" })
    .max(50,{message:"Name must not have more than 50 characters"}),
    
    phone:z
    .string({required_error:"Phone is required"})
    .trim()
    .min(10,{message: "phone must be of atleast 10 characters" })
    .max(12,{message:"phone must not have more than 50 characters"})
    
})

module.exports = {signupSchema,loginSchema}

