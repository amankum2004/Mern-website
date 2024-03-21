const User = require("../models/user-model");
const Contact = require("../models/contact-model")

// LOGIC TO GET ALL USERS IN ADMIN
const getAllUsers = async(req,res) => {
    try {
        const users = await User.find({},{password:0});
        console.log(users);
        if(!users || users.length===0){
            return res.status(404).json({message:"No users found"});
        }
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

// LOGIC TO GET SINGLE USER DATA USING ADMIN USERS    
const getUserById = async(req,res) => {
    try {
        const id = req.params.id;
        const data = await User.findOne({_id: id}, {password: 0});
        return res.status(200).json(data);
        // return res.status(200).json({message:"User updated successfully"});
    } catch (error) {
        next(error)
    }
}

// USER UPDATE LOGIC 
const updateUserById = async(req,res) => {
    try {
        const id = req.params.id;
        const updatedUserData = req.body;
        const updatedData = await User.updateOne({_id:id},{$set: updatedUserData});
        return res.status(200).json(updatedData);
    } catch (error) {
        next(error);
    }
}

// LOGIC TO DELETE USER FROM ADMIN USERS    
const deleteUserById = async(req,res) => {
    try {
        const id = req.params.id;
        await User.deleteOne({_id:id});
        return res.status(200).json({message:"User deleted successfully"});
    } catch (error) {
        next(error)
    }
}

// LOGIC TO GET ALL CONTACTS IN ADMIN
const getAllContacts = async(req,res) => {
    try {
        const contacts = await Contact.find();
        if(!contacts || contacts.length===0){
            return res.status(404).json({message:"No Contacts found"});
        }
        return res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
}

// LOGIC TO DELETE CONTACT USING ADMIN    
const deleteContactById = async(req,res) => {
    try {
        const id = req.params.id;
        await Contact.deleteOne({_id:id});
        return res.status(200).json({message:"Contact deleted successfully"});
    } catch (error) {
        next(error)
    }
}

module.exports = {getAllUsers,getAllContacts,deleteUserById,getUserById,updateUserById,deleteContactById};
