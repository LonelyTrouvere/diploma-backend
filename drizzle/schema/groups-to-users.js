import { pgEnum, pgTable, serial, uuid, varchar } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum('role', ['owner', 'admin', 'participant']);

export const groupsToUsers = pgTable("groups_to_users", {
  id: serial("id").primaryKey().notNull(),
  userId: uuid("user_id").notNull(),
  groupId: uuid("group_id").notNull(),
  role: roleEnum().notNull(),
});
