const express = require("express");
const apiRouter = express.Router();
const usersRouter = require("./Users/users");
const todosRouter = require("./Todos/todos");
const jwt = require("jsonwebtoken");
const { getUserbyUsername } = require("../db");
const JWT_SECRET = process.env.JWT_SECRET;

apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { username } = jwt.verify(token, JWT_SECRET);

      if (username) {
        req.user = await getUserbyUsername({ username });
        next();
      }
    } catch (error) {
      next(error);
    }
  } else {
    next({ message: "Authorization must start with Bearer" });
  }
});

apiRouter.use((req, res, next) => {
  if (req.user) {
    console.log("User is set!", req.user);
    next();
  } else {
    console.log("User is not set!");
    next();
  }
});

apiRouter.get("/", (req, res) => {
  res.send({ message: "Hey There!" });
});
apiRouter.use("/users", usersRouter);
apiRouter.use("/todos", todosRouter);

module.exports = apiRouter;
