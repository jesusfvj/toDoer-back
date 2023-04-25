const express = require("express");
const todoRouter = express.Router();
const { registerTodo, getTodos, deleteTodo, updateTodo, changeStateTodo } = require("../controllers/todoData");
const checkJWT = require("../middlewares/checkJWT");

todoRouter.post("/register", checkJWT, registerTodo);
todoRouter.get("/get/:userId", checkJWT, getTodos);
todoRouter.delete("/delete/:todoId", checkJWT, deleteTodo);
todoRouter.put("/update/:todoId", checkJWT, updateTodo);
todoRouter.put("/changestate/:todoId", checkJWT, changeStateTodo);

module.exports = todoRouter;