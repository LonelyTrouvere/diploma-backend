import { eq } from "drizzle-orm";
import { db } from "../drizzle/db.js";
import { groupsToUsers } from "../drizzle/schema/groups-to-users.js";
import { groups } from "../drizzle/schema/groups.js";

export async function createGroup(name, user) {
  const id = crypto.randomUUID();

  await db.insert(groups).values({
    id,
    name,
  });
  await db.insert(groupsToUsers).values({
    groupId: id,
    userId: user.id,
    role: "owner",
  });

  return id;
}

export async function getGroups(user) {
  return await db
    .select({
      id: groups.id,
      name: groups.name,
    })
    .from(groups)
    .innerJoin(groupsToUsers, eq(groupsToUsers.groupId, groups.id))
    .where(eq(groupsToUsers.userId, user.id));
}
