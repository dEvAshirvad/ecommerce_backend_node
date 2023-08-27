import { eq, sql } from "drizzle-orm";
import { db } from "../../db/db.js";
import {
	product_category,
	product_reviews,
	products,
} from "../../db/schema/products.js";
import { users } from "../../db/schema/users.js";

const productController = {
	createCategory: async (req, res) => {
		const timestamp = new Date().toISOString();
		const payload = req.body;
		console.log(payload);
		try {
			if (!payload || JSON.stringify(payload) === "{}") {
				return res.status(400).json({
					error: "Payload Unavailable",
					status: false,
					timestamp,
				});
			}

			const new_category = await db
				.insert(product_category)
				.values(payload)
				.returning();

			return res.status(200).json({
				data: new_category,
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
	listCategory: async (req, res) => {
		const timestamp = new Date().toISOString();
		try {
			const categories = await db.select().from(product_category);

			return res.status(200).json({
				data: categories,
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
	createProduct: async (req, res) => {
		const timestamp = new Date().toISOString();
		const payload = req.body;
		try {
			if (!payload || JSON.stringify(payload) === "{}") {
				return res.status(400).json({
					error: "Payload Unavailable",
					status: false,
					timestamp,
				});
			}

			const new_products = await db
				.insert(products)
				.values(payload.products)
				.returning();

			return res.status(200).json({
				data: new_products,
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
	getProducts: async (req, res) => {
		const timestamp = new Date().toISOString();
		try {
			const listofProducts = await db
				.select({
					category: product_category.category_name,
					products: products,
				})
				.from(products)
				.leftJoin(
					product_category,
					eq(products.product_category_id, product_category.category_id)
				);

			const groupByproducts = listofProducts.reduce((acc, row) => {
				const category = row.category;
				const product = row.products;

				if (!acc[category.id]) {
					acc[category.id] = { category, products: [] };
				}

				if (product) {
					acc[category.id].products.push(product);
				}

				return acc;
			}, {});

			console.log(groupByproducts.undefined);

			return res.status(200).json({
				data: groupByproducts.undefined,
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
	updateProducts: async (req, res) => {
		const timestamp = new Date().toISOString();
		const payload = req.body;
		try {
			if (!payload || JSON.stringify(payload) === "{}") {
				return res.status(400).json({
					error: "Payload Unavailable",
					status: false,
					timestamp,
				});
			}

			const updated_products = await db
				.update(products)
				.set(payload.product)
				.where(eq(products.product_id, payload.productId))
				.returning();

			return res.status(200).json({
				data: updated_products,
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
	createReviews: async (req, res) => {
		const timestamp = new Date().toISOString();
		const payload = req.body;
		console.log(payload);
		try {
			if (!payload || JSON.stringify(payload) === "{}") {
				return res.status(400).json({
					error: "Payload Unavailable",
					status: false,
					timestamp,
				});
			}

			const new_review = await db
				.insert(product_reviews)
				.values(payload)
				.returning();

			return res.status(200).json({
				data: new_review,
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
	getReviews: async (req, res) => {
		const timestamp = new Date().toISOString();
		try {
			const listofReviews = await db
				.select({
					review: product_reviews,
					user: users,
				})
				.from(product_reviews)
				.leftJoin(users, eq(product_reviews.user_id, users.id));

			return res.status(200).json({
				data: listofReviews,
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
};

export default productController;
