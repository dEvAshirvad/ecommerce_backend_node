import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import pg from "pg";

const { Pool } = pg;
 
export const pool = new Pool({
  connectionString: "postgres://root:root@localhost:5432/ecommerce",
});

export const db = drizzle(pool);
await migrate(db, { migrationsFolder: "drizzle" });
console.log("Migrated Successfully")
