const Todo = require("../models/Todo");
const {
  toPascalCase,
} = require("../utils/stringTreatment");

const registerTodo = async (req, res) => {
  const {
    content,
    state
  } = req.body.todo;

  const {
    _id
  } = req.body.user;

  try {
    const newTodo = new Todo({
      createdBy: _id,
      content,
      state
    });

    await newTodo.save();

    return res.status(200).json({
      ok: true,
      todo: {
        _id,
        content,
        state
      },
    });
  } catch (error) {
    return res.status(503).json({
      ok: false,
      msg: "Something happened...",
    });
  }
};

const getTodos = async (req, res) => {
  try {
    const userId = req.params.userId;
    const stateColumns = req.body.stateColumns;
    const todos = await Todo.find({
      createdBy: userId
    }).populate('createdBy');

    const todosFiltered = stateColumns.map((stateColumn) => {
       return todos.filter(todo => todo.state === stateColumn);
    })

    const todosFilteredByState = todosFiltered.reduce((acc, curr) => {
      curr.forEach(item => {
        const stateKey = `todos${toPascalCase(item.state)}`;
        if (!acc[stateKey]) {
          acc[stateKey] = [];
        }
        acc[stateKey].push(item);
      });
      return acc;
    }, {});

    return res.status(200).json({
      ok: true,
      todosFilteredByState
    })

  } catch (error) {
    return res.status(503).json({
      ok: false,
      msg: "Something happened...",
    });
  }
}

const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;

    const findTodoDb = await Todo.findOneAndDelete({
      _id: todoId
    });

    if (!findTodoDb) {
      return res.status(400).json({
        ok: false,
        msg: "There is something wrong with the database."
      });
    }

    return res.status(200).json({
      ok: true,
      deletedTodo: findTodoDb
    })

  } catch (error) {
    return res.status(503).json({
      ok: false,
      msg: "Something happened...",
    });
  }
}

const updateTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const {
      newContent
    } = req.body.todoEditContent;

    const findTodoDb = await Todo.findOne({
      _id: todoId
    });

    if (!findTodoDb) {
      return res.status(400).json({
        ok: false,
        msg: "There is something wrong with the database."
      });
    }

    const updateTodoDb = await Todo.findOneAndUpdate({
      _id: todoId
    }, {
      $set: {
        content: newContent
      }
    }, {
      returnOriginal: false
    });

    return res.status(200).json({
      ok: true,
      originalTodo: findTodoDb,
      updatedTodo: updateTodoDb
    })

  } catch (error) {
    return res.status(503).json({
      ok: false,
      msg: "Something happened...",
    });
  }
}

const changeStateTodo = async (req, res) => {
  try {
    const userId = req.body.userId;
    const todoId = req.params.todoId;
    const originalState = req.body.stateTodo;
    const directionOfChange = req.body.directionOfChange;
    let newState = "";

    if (directionOfChange === "right") {
      switch (originalState) {
        case "pending":
          newState = "inProgress";
          break;

        case "inProgress":
          newState = "finished";
          break;

        default:
          break;
      }
    } else if (directionOfChange === "left") {
      switch (originalState) {
        case "inProgress":
          newState = "pending";
          break;

        case "finished":
          newState = "inProgress";
          break;

        default:
          break;
      }
    }
    const findTodoDb = await Todo.findOne({
      _id: todoId
    });

    if (!findTodoDb) {
      return res.status(400).json({
        ok: false,
        msg: "There is something wrong with the database."
      });
    }

    const updateTodoDb = await Todo.findOneAndUpdate({
      _id: todoId
    }, {
      $set: {
        state: newState
      }
    }, {
      returnOriginal: false
    });

    const todos = await Todo.find({
      createdBy: userId
    }).populate('createdBy');

    const todosPending = todos.filter(todo => todo.state === "pending");
    const todosInProgress = todos.filter(todo => todo.state === "inProgress");
    const todosFinished = todos.filter(todo => todo.state === "finished");

    return res.status(200).json({
      ok: true,
      originalState: findTodoDb,
      newState: updateTodoDb,
      todosPending,
      todosInProgress,
      todosFinished
    })

  } catch (error) {
    return res.status(503).json({
      ok: false,
      msg: "Something happened...",
    });
  }
}

module.exports = {
  registerTodo,
  getTodos,
  deleteTodo,
  updateTodo,
  changeStateTodo
};