import { db } from "../drizzle/db.js";
import { groups } from "../drizzle/schema/groups.js";

export async function createGroup(name) {
  const id = crypto.randomUUID();
  await db.insert(groups).values({
    id,
    name,
  });

  return id;
}

export async function getGroups() {
  return await db.select().from(groups);
}
