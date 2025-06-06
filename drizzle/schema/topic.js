import { boolean, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { groups } from "./groups.js";

export const topics = pgTable("topics", {
  id: uuid().primaryKey().notNull(),
  name: varchar("name", { length: 50 }).notNull(),
  description: varchar("description"),
  created: timestamp().notNull(),
  groupId: uuid("group_id").notNull().references(() => groups.id),
  meetingId: uuid("meeting_id"),
});
