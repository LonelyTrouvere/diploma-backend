import { users } from "../drizzle/schema/index.js";
import { db } from "../drizzle/db.js";
import bcrypt from "bcrypt";
import { and, eq } from "drizzle-orm";
import { groupsToUsers } from "../drizzle/schema/groups-to-users.js";

export async function createUser(userData) {
  const id = crypto.randomUUID();
  const hash = await bcrypt.hash(userData.password, 10);

  await db.insert(users).values({
    id,
    name: userData.name,
    email: userData.email,
    hash,
  });

  return id;
}

export async function getUser(data) {
  const user = (
    await db
      .select()
      .from(users)
      .where(
        and(
          data.email ? eq(users.email, data.email) : undefined,
          data.id ? eq(users.id, data.id) : undefined
        )
      )
  )[0];

  return user;
}

export async function getParticipants(groupUser) {
  const participants = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: groupsToUsers.role,
      joined: groupsToUsers.joined,
    })
    .from(users)
    .innerJoin(groupsToUsers, eq(groupsToUsers.userId, users.id))
    .where(
      and(
        eq(groupsToUsers.groupId, groupUser.groups.id),
        eq(groupsToUsers.status, "active")
      )
    );

  return participants;
}

export async function login(userData) {
  const user = await getUser(userData.email);
  const isMatch = user && (await bcrypt.compare(userData.password, user.hash));

  if (!user || !isMatch) {
    throw new Error("Invalid email or password");
  }

  return user;
}
