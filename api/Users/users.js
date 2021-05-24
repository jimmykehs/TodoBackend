const express = require("express");
const { createUser, loginUser, getUserbyUsername } = require("../../db");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

usersRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      next({ message: "Please supply both a username and password!" });
    }

    const existingUser = await getUserbyUsername({ username });
    if (existingUser) {
      next({ message: "Username already exists!" });
    }

    const user = await createUser({ username, password });
    if (user) {
      const token = jwt.sign(user, JWT_SECRET);
      res.send({ message: "Thanks for signing up!", user, token });
    } else {
      next({ message: "Error signing up!" });
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      next({ message: "Please supply both username and password!" });
    }
    const user = await getUserbyUsername({ username });

    if (user && user.password === password) {
      const token = jwt.sign(user, JWT_SECRET);
      res.send({ message: "Thanks for logging in!", user, token });
    } else {
      next({ message: "Incorrect credentials!" });
    }
  } catch (error) {
    throw error;
  }
});

module.exports = usersRouter;
