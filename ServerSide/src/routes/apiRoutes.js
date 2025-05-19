const { app } = require("../app");
const express = require("express");

const { Router } = express;
const router = Router();

app.use("/api", router);

const signupRouter = Router();
router.use("/signup", signupRouter);

const loginRouter = Router();
router.use("/login", loginRouter);

const logoutRouter = Router();
router.use("/logout", logoutRouter);

const updateRouter = Router();
router.use("/update", updateRouter);

const readUser = Router();
router.use("/readuser", readUser);

// Message routing

const sideUsers = Router();
router.use("/sideusers", sideUsers);

const getMessages = Router();
router.use("/getmessages", getMessages);

const createMessage = Router();
router.use("/create/message", createMessage)

module.exports = {
  signupRouter,
  loginRouter,
  logoutRouter,
  updateRouter,
  readUser,
  sideUsers,
  getMessages,
  createMessage
};

