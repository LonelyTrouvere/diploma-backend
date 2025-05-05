import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid().primaryKey().notNull(),
  name: varchar("name", { length: 50 }).notNull(),
  email: varchar("email", { length: 50 }).notNull().unique(),
  hash: varchar("hash").notNull(),
});
