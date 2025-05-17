import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { topics } from "./topic.js";

export const attachments = pgTable("attachments", {
  id: uuid().primaryKey().notNull(),
  name: varchar("name").notNull(),
  extension: varchar("extension").notNull(),
  topicId: uuid('topic_id').notNull().references(() => topics.id),
});
