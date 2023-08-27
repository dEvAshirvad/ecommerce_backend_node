import { db } from "../../db/db.js";
import { roleEnum, users } from "../../db/schema/users.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const authController = {
	registerUser: async (req, res) => {
		const jwt_secret = process.env.jwt_secret;
		const payload = req.body;
		const timestamp = new Date().toISOString();
		console.log(payload);

		try {
			if (!payload) {
				return res.status(404).json({
					error: "Payload not found",
					status: false,
					timestamp,
				});
			}
			const new_user = await db
				.insert(users)
				.values({
					...payload,
				})
				.returning();

			const token_data = {
				...payload,
				role: new_user[0].role,
				timestamp,
			};

			const token = jwt.sign(token_data, jwt_secret);

			return res.status(200).json({
				data: new_user,
				token,
				status: true,
				timestamp,
			});
		} catch (error) {
			return res.status(500).json({
				error: error.message,
				status: false,
				timestamp,
			});
		}
	},
	getUser: (req, res) => {
		const jwt_secret = process.env.jwt_secret;
		const token = req.header("Authorization");
		const jwt_token = token.split(" ")[1];
		const timestamp = new Date().toISOString();

		try {
			const verified_user = jwt.verify(jwt_token, jwt_secret);
			console.log(verified_user);
			if (verified_user) {
				return res.status(200).json({
					data: verified_user,
					status: true,
					timestamp,
				});
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
	},
};

export default authController;
