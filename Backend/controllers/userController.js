const User = require("../models/userModel");


const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(
        {
            success:true,
            Users: users,
            message:"All Users fetched successfully"
        }
      );
    } catch (error) {
      res.status(500).json({ message: "Error retrieving users", error });
    }
  };
  
  // Create a new user
  const createUser = async (req, res) => {
    const { username, age, hobbies } = req.body;
    if(!username || !age ){
        return res.status(404).json(
            {
                success:false,
                message:"Please Provide UserName and Age"
            }
        )
    }
    try {
      const newUser = await User.create({ username, age, hobbies });
      res.status(201).json(
        {
            success:true,
            newUser,
            message:"User created successfully"
        }
      );
    } catch (error) {
      res.status(400).json({ message: "Error creating user", error });
    }
  };
  
  // Update a user
  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const { username, age, hobbies } = req.body;
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { username, age, hobbies },
        { new: true, runValidators: true } // Return the updated user
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(
        {
            success:true,
            updatedUser,
            message:"User Updated successfully"
        }
      );
    } catch (error) {
      res.status(400).json({ message: "Error updating user", error });
    }
  };
  
  // Delete a user
  const deleteUser = async (req, res) => {
    const { userId } = req.params;
    try {
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(204).send(); // No content
    } catch (error) {
      res.status(400).json({ message: "Error deleting user", error });
    }
  };
  
  module.exports = { getAllUsers, createUser, updateUser, deleteUser };