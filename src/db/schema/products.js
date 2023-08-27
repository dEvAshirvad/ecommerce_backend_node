import {
	decimal,
	numeric,
	pgEnum,
	pgTable,
	text,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";
import { users } from "./users.js";
import { relations } from "drizzle-orm";

export const product_availabilityEnum = pgEnum("product_availabilityEnum", [
	"in stock",
	"out of stock",
	"pre order",
]);

export const products = pgTable("products", {
	product_id: uuid("product_id").primaryKey().defaultRandom().unique(),
	product_title: varchar("product_title", { length: 256 }).notNull(),
	product_description: text("product_description"),
	product_qty: varchar("product_qty", { length: 256 }).unique(),
	product_discount: numeric("product_discount").default(0),
	product_price: numeric("product_price").notNull(),
	SKU: uuid("SKU").defaultRandom().unique(),
	product_availability: product_availabilityEnum(
		"product_availability"
	).default("in stock"),
	product_power_category: text("product_power_category"),
	product_features: text("product_features"),
	product_backstory: text("product_backstory"),
	product_category_id: uuid("product_category"),
});

export const productRelations = relations(products, ({ many }) => ({
	product_reviews: many(product_reviews),
}));

export const product_category_relation = relations(products, ({ one }) => ({
	product_category: one(product_category, {
		fields: [products.product_category_id],
		references: [product_category.category_id],
	}),
}));

export const product_category = pgTable("product_category", {
	category_id: uuid("category_id").primaryKey().defaultRandom().unique(),
	category_name: varchar("category_name", { length: 256 }).unique().notNull(),
	parent_category: uuid("parent_category").default(null),
});

export const product_reviews = pgTable("product_reviews", {
	review_id: uuid("review_id").primaryKey().notNull().defaultRandom(),
	user_id: uuid("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	product_id: uuid("product_id")
		.notNull()
		.references(() => products.product_id, { onDelete: "cascade" }),
	review_text: text("review_text"),
	rating: decimal("rating").notNull(),
});

export const product_reviews_relation = relations(
	product_reviews,
	({ one }) => ({
		product: one(products, {
			fields: [product_reviews.product_id],
			references: [products.product_id],
		}),
		user: one(users, {
			fields: [product_reviews.user_id],
			references: [users.id],
		}),
	})
);
