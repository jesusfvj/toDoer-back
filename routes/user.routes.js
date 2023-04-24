const express = require("express");
const userRouter = express.Router();
const { registerUser, logInUser, deleteUser } = require("../controllers/userData");

userRouter.post("/register", registerUser);
userRouter.post("/login", logInUser);
userRouter.delete("/delete", deleteUser);

module.exports = userRouter;