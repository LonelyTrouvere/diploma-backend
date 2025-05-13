import {
  boolean,
  pgTable,
  serial,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./users.js";
import { groups } from "./groups.js";

export const chatMessage = pgTable("chat_message", {
  id: serial("id").primaryKey().notNull(),
  message: varchar("message").notNull(),
  timestamp: timestamp().notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  groupId: uuid("group_id")
    .notNull()
    .references(() => groups.id),
  receiverId: uuid("receiver_id").notNull(),
  seen: boolean("seen").notNull(),
});
