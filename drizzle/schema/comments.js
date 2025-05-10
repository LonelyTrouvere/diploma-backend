import { pgTable, serial, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./users.js";
import { topics } from "./topic.js";

export const comments = pgTable("comments", {
  id: serial("id").primaryKey().notNull(),
  content: varchar("content").notNull(),
  timestamp: timestamp().notNull(),
  topicId: uuid("topic_id")
    .notNull()
    .references(() => topics.id),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
});
