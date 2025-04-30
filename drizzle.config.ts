import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config({ path: '.env' })

export default defineConfig({
  schema: "./drizzle/schema",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    database: process.env.POSTGRES_DB ?? "diploma",
    host: process.env.POSTGRES_HOST ?? "localhost",
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT ?? "3306"),
    user: process.env.POSTGRES_USER,
    ssl: false,
  },
  verbose: true,
  strict: true,
});
