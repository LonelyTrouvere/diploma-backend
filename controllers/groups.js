import { and, eq, or } from "drizzle-orm";
import { db } from "../drizzle/db.js";
import { groupsToUsers } from "../drizzle/schema/groups-to-users.js";
import { groups } from "../drizzle/schema/groups.js";
import { users } from "../drizzle/schema/users.js";

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

export async function updateGroup(data, groupUser) {
  await db.update(groups).set(data).where(eq(groups.id, groupUser.groups.id));
}

export async function updateGroupToUser(groupId, userId, data) {
  console.log(groupId)
  await db
    .update(groupsToUsers)
    .set(data)
    .where(
      and(eq(groupsToUsers.groupId, groupId), eq(groupsToUsers.userId, userId))
    );
}

export async function deleteGroupToUser(groupId, userId) {
  await db
    .delete(groupsToUsers)
    .where(
      and(eq(groupsToUsers.groupId, groupId), eq(groupsToUsers.userId, userId))
    );
}

export async function getJoinRequests(user) {
  const request = await db
    .select({
      joined: groupsToUsers.joined,
      id: users.id,
      name: users.name,
      email: users.email,
    })
    .from(groupsToUsers)
    .innerJoin(users, eq(users.id, groupsToUsers.userId))
    .where(
      and(
        eq(groupsToUsers.groupId, user.groups.id),
        or(
          eq(groupsToUsers.status, "request_from_user"),
          eq(groupsToUsers.status, "request_to_user")
        )
      )
    );

  return request;
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
