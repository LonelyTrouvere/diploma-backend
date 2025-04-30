import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const groups = pgTable("groups", {
  id: uuid().primaryKey().notNull(),
  name: varchar("name", { length: 50 }).notNull(),
});
