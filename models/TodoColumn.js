const { Schema, model } = require("mongoose");
const mongoose = require('mongoose');

const TodoColumnSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  stateTodo: {
    type: String,
    required: true,
  },
  filteredTodos: {
    type: String,
    required: true,
  },
  createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = model("TodoColumn", TodoColumnSchema);