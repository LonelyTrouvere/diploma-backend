import { db } from "../drizzle/db.js";
import { topics } from "../drizzle/schema/index.js";

export async function createTopic(data, groupUser) {
  const id = crypto.randomUUID();

  await db.insert(topics).values({
    ...data,
    id,
    created: new Date(),
    groupId: groupUser.groups.id,
  });

  return id;
}
