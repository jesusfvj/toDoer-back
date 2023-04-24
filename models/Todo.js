const { Schema, model } = require("mongoose");
const mongoose = require('mongoose');

const TodoSchema = Schema({
  content: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = model("Todo", TodoSchema);