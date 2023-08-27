import express from "express";
import userController from "../Controller/Users/userController.js";

const userRouter = express.Router();

userRouter.get("/", userController.getUsers);

export default userRouter;
