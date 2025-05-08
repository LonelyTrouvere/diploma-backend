import { pgEnum, pgTable, serial, timestamp, uuid } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum('role', ['owner', 'admin', 'participant']);
export const userInGroupStatus = pgEnum('users_status', ['request_to_user', 'request_from_user', 'active', 'blocked'])

export const groupsToUsers = pgTable("groups_to_users", {
  id: serial("id").primaryKey().notNull(),
  userId: uuid("user_id").notNull(),
  groupId: uuid("group_id").notNull(),
  role: roleEnum().notNull(),
  joined: timestamp(),
  status: userInGroupStatus().notNull(),
});
