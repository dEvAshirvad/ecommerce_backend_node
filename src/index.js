import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./Routes/userRoutes.js";
import authRouter from "./Routes/authRoutes.js";
import authenticator from "./middleware/authenticator.js";
import xapiValidator from "./middleware/xapiValidator.js";
import { pool } from "./db/db.js";
import productRoutes from "./Routes/productRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.listen(PORT, async () => {
	await pool.connect();
	console.log("Database Connected");
	console.log(`Server is listening at http://localhost:${PORT}`);
});

// Authentication
app.use(xapiValidator);
app.use("/auth/v1", authRouter);
app.use("/api/v1", authenticator);

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRoutes);
