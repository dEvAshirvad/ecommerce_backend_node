import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { users } from "../db/schema/users.js";
import { db } from "../db/db.js";
import { eq } from "drizzle-orm";
dotenv.config();

async function adminaccess(req, res, next) {
	const timestamp = new Date().toISOString();
	try {
		const apiKey = req.header("x-api-key");
		const jwt_secret = process.env.jwt_secret;
		const token = req.header("Authorization");
		const jwt_token = token.split(" ")[1];

		if (!apiKey || apiKey != process.env.xApiKey) {
			return res.status(401).json({
				error: "Invalid x-api-key",
				status: false,
				timestamp,
			});
		}

		const verified_user = jwt.verify(jwt_token, jwt_secret);

		const user = await db
			.select({ role: users.role })
			.from(users)
			.where(eq(users.email, verified_user.email));

		if (user[0].role === "admin") {
			req.user = verified_user;
		} else {
			return res.status(401).json({
				error: "Access Denied",
				status: false,
				timestamp,
			});
		}
	} catch (error) {
		return res.status(500).json({
			error: error.message,
			status: false,
			timestamp,
		});
	}
	next();
}

export default adminaccess;
