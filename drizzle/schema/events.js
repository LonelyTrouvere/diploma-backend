import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { groups } from "./groups.js";
import { topics } from "./topic.js";

export const eventTypeEnum = pgEnum("type", ["meeting", "deadline"]);

export const events = pgTable("events", {
  id: serial().primaryKey().notNull(),
  description: varchar("description"),
  groupId: uuid("group_id")
    .notNull()
    .references(() => groups.id),
  recurring: boolean("recurring"),
  topicId: uuid("topic_id")
    .notNull()
    .references(() => topics.id),
  recurringRule: integer("recurring_rule"),
  date: timestamp("date").notNull(),
  type: eventTypeEnum().notNull(),
});
