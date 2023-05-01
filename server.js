const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const userRoutes = require("./routes/user.routes")
const todoRoutes = require("./routes/todo.routes")
const todoColumnRoutes = require("./routes/todoColumn.routes")

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use("/user", userRoutes);
app.use("/todo", todoRoutes);
app.use("/todocolumn", todoColumnRoutes);

module.exports = app