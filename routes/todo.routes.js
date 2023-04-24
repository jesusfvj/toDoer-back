const express = require("express");
const todoRouter = express.Router();
const { registerTodo, getTodos, deleteTodo, updateTodo, changeStateTodo } = require("../controllers/todoData");

todoRouter.post("/register", registerTodo);
todoRouter.get("/get/:userId", getTodos);
todoRouter.delete("/delete/:todoId", deleteTodo);
todoRouter.put("/update/:todoId", updateTodo);
todoRouter.put("/changestate/:todoId", changeStateTodo);

module.exports = todoRouter;