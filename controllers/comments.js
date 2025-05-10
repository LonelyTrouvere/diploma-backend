import { db } from "../drizzle/db.js";
import { comments } from "../drizzle/schema/comments.js";

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
