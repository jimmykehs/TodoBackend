const express = require("express");
const todosRouter = express.Router();
const requireUser = require("../utils/utils");
const { createTodo } = require("../../db/index");

todosRouter.post("/create", requireUser, async (req, res, next) => {
  try {
    const { title, body } = req.body;
    const { id } = req.user;
    console.log(id);
    const todo = await createTodo({ id, title, body });
    res.send(todo);
  } catch (error) {
    next(error);
  }
});

todosRouter.get("/", requireUser, async (req, res, next) => {
  try {
    const todos = await getTodos(req.user);
    res.send(todos);
  } catch (error) {
    next(error);
  }
});
module.exports = todosRouter;
