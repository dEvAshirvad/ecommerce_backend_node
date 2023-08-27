import express from "express";
import authController from "../Controller/Auth/authController.js";

const authRouter = express.Router();

authRouter.post("/register", authController.registerUser);
authRouter.get("/user/me", authController.getUser);

export default authRouter;
