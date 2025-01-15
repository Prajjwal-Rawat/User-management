const express = require("express");
const router = express.Router();

const { getAllUsers, createUser, updateUser, deleteUser } = require("../controllers/userController");

// Define routes
router.get("/getAllUsers", getAllUsers);
router.post("/createUser", createUser);
router.put("/updateUser/:userId", updateUser);
router.delete("/deleteUser/:userId", deleteUser);

module.exports = router;