const TodoColumn = require("../models/TodoColumn");
const {
  toCamelCase,
  toPascalCase
} = require("../utils/stringTreatment");

const registerTodoColumn = async (req, res) => {
  const {
    titleNewColumn
  } = req.body;
  const userId = req.params.userId;

  const camelCaseString = toCamelCase(titleNewColumn);
  const pascalCaseString = toPascalCase(titleNewColumn);

  try {
    const newTodoColumn = new TodoColumn({
      createdBy: userId,
      title: titleNewColumn,
      stateTodo: camelCaseString,
      filteredTodos: `todos${pascalCaseString}`
    });

    await newTodoColumn.save();

    return res.status(200).json({
      ok: true,
      TodoColumn: {
        _id: newTodoColumn._id,
        title: titleNewColumn,
        stateTodo: camelCaseString,
        filteredTodos: `todos${pascalCaseString}`
      },
    });
  } catch (error) {
    return res.status(503).json({
      ok: false,
      msg: "Something happened...",
    });
  }
};

const getTodoColumns = async (req, res) => {
  const userId = req.params.userId;
  try {

    const collections = await TodoColumn.find({
      createdBy: userId
    }).exec();

    if (!collections.length) {
      const FirstBasicTodoColumn = new TodoColumn({
        createdBy: userId,
        title: "Pending",
        stateTodo: "pending",
        filteredTodos: "todosPending"
      });

      const SecondBasicTodoColumn = new TodoColumn({
        createdBy: userId,
        title: "In progress",
        stateTodo: "inProgress",
        filteredTodos: "todosInProgress"
      });

      const ThirdBasicTodoColumn = new TodoColumn({
        createdBy: userId,
        title: "Finished",
        stateTodo: "finished",
        filteredTodos: "todosFinished"
      });

      await FirstBasicTodoColumn.save();
      await SecondBasicTodoColumn.save();
      await ThirdBasicTodoColumn.save();
    }

    return res.status(200).json({
      ok: true,
      todoColumns: collections
    });

  } catch (error) {
    return res.status(503).json({
      ok: false,
      msg: "Something happened...",
    });
  }
}

const deleteTodoColumn = async (req, res) => {
  try {
    const todoColumnId = req.params.todoColumnId;

    const findTodoColumnDb = await TodoColumn.findOneAndDelete({
      _id: todoColumnId
    });

    if (!findTodoColumnDb) {
      return res.status(400).json({
        ok: false,
        msg: "There is something wrong with the database."
      });
    }

    return res.status(200).json({
      ok: true,
      deletedTodoColumn: findTodoColumnDb
    })

  } catch (error) {
    return res.status(503).json({
      ok: false,
      msg: "Something happened...",
    });
  }
}

const updateTodoColumn = async (req, res) => {
  try {
    const todoColumnId = req.params.todoColumnId;
    const {
      newTitleColumn
    } = req.body.newTitleColumn;

    const findTodoColumnDb = await TodoColumn.findOne({
      _id: todoColumnId
    });

    if (!findTodoColumnDb) {
      return res.status(400).json({
        ok: false,
        msg: "There is something wrong with the database."
      });
    }

    const updateTodoColumnDb = await TodoColumn.findOneAndUpdate({
      _id: todoColumnId
    }, {
      $set: {
        title: newTitleColumn
      }
    }, {
      returnOriginal: false
    });

    return res.status(200).json({
      ok: true,
      originalTodoColumn: findTodoColumnDb,
      updatedTodoColum: updateTodoColumnDb
    })

  } catch (error) {
    return res.status(503).json({
      ok: false,
      msg: "Something happened...",
    });
  }
}

module.exports = {
  registerTodoColumn,
  getTodoColumns,
  deleteTodoColumn,
  updateTodoColumn
};