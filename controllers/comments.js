import { asc, eq } from "drizzle-orm";
import { db } from "../drizzle/db.js";
import { comments } from "../drizzle/schema/comments.js";
import { users } from "../drizzle/schema/users.js";

export async function createComment(data, groupUser) {
  const returning = await db
    .insert(comments)
    .values({
      ...data,
      timestamp: new Date(),
      userId: groupUser.id,
    })
    .returning({ id: comments.id });

  return returning[0].id;
}

export async function getComments(topicId) {
  const commentList = await db
    .select({
      ...comments,
      name: users.name,
      email: users.email,
    })
    .from(comments)
    .innerJoin(users, eq(users.id, comments.userId))
    .where(eq(comments.topicId, topicId))
    .orderBy(asc(comments.timestamp));

  return commentList;
}
