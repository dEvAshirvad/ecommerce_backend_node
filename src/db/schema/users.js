import { pgEnum, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["admin", "subscriber"]);

export const users = pgTable("users", {
	id: uuid("id").primaryKey().defaultRandom().unique(),
	name: varchar("full_name", { length: 256 }),
	role: roleEnum("role").default("subscriber"),
	email: varchar("email", { length: 256 }).unique(),
});
