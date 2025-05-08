import { and, eq } from "drizzle-orm";
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
    joined: new Date(),
    status: "active",
  });

  return id;
}

export async function requestToJoin(data) {
  await db.insert(groupsToUsers).values({
    groupId: data.groupId,
    userId: data.userId,
    role: "participant",
    joined: new Date(),
    status: data.status,
  });
}

export async function getGroups(user) {
  return await db
    .select({
      id: groups.id,
      name: groups.name,
    })
    .from(groups)
    .innerJoin(groupsToUsers, eq(groupsToUsers.groupId, groups.id))
    .where(
      and(eq(groupsToUsers.userId, user.id), eq(groupsToUsers.status, "active"))
    );
}

export async function getLoginGroup(user, groupId) {
  return (
    await db
      .select()
      .from(groups)
      .innerJoin(groupsToUsers, eq(groupsToUsers.groupId, groups.id))
      .where(
        and(
          eq(groupsToUsers.userId, user.id),
          eq(groups.id, groupId),
          eq(groupsToUsers.status, "active")
        )
      )
  )[0];
}
