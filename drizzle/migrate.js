import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { client } from "./db.js";

dotenv.config({ path: '.env' })
async function main() {
  console.log(process.env.POSTGRES_DB)
  await migrate(drizzle(client), {
    migrationsFolder: "./drizzle/migrations",
  });

  await client.end();
}

main();
