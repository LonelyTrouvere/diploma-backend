import { eq } from "drizzle-orm";
import { db } from "../drizzle/db.js";
import { topics } from "../drizzle/schema/index.js";
import { getComments } from "./comments.js";

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

export async function getTopics(groupUser) {
  const topicList = await db
    .select()
    .from(topics)
    .where(eq(topics.groupId, groupUser.groups.id));

  return topicList;
}

export async function getTopic(topicId) {
  const res = (await db.select().from(topics).where(eq(topics.id, topicId)))[0];
  const comments = await getComments(res.id);
  return {
    ...res,
    comments,
  };
}
