import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { groups } from "./groups.js";

export const topics = pgTable("topics", {
  id: uuid().primaryKey().notNull(),
  name: varchar("name").notNull(),
  description: varchar("description"),
  created: timestamp().notNull(),
  groupId: uuid("group_id").notNull().references(() => groups.id),
});
