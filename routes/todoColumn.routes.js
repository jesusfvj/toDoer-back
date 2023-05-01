const express = require("express");
const todoColumnRoutes = express.Router();
const { registerTodoColumn, getTodoColumns, deleteTodoColumn, updateTodoColumn } = require("../controllers/todoColumnData");
const checkJWT = require("../middlewares/checkJWT");

todoColumnRoutes.post("/register/:userId", checkJWT, registerTodoColumn);
todoColumnRoutes.get("/get/:userId", checkJWT, getTodoColumns);
todoColumnRoutes.delete("/delete/:todoColumnId", checkJWT, deleteTodoColumn);
todoColumnRoutes.put("/delete/:todoColumnId", checkJWT, updateTodoColumn);

module.exports = todoColumnRoutes;