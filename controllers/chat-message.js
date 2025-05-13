import { and, asc, eq, or } from "drizzle-orm";
import { db } from "../drizzle/db.js";
import { chatMessage, users } from "../drizzle/schema/index.js";

export async function createChatMessage(data, groupUser) {
  const returning = await db
    .insert(chatMessage)
    .values({
      timestamp: new Date(),
      userId: groupUser.id,
      groupId: groupUser.groups.id,
      message: data.message,
      receiverId: data.receiverId,
      seen: false,
    })
    .returning();

  return returning[0];
}

export async function getChatMessages(data, groupUser) {
  const messages = await db
    .select({
        ...chatMessage,
        name: users.name,
    })
    .from(chatMessage)
    .innerJoin(users, eq(users.id, chatMessage.userId))
    .where(
      or(
        and(
          eq(chatMessage.userId, groupUser.id),
          eq(chatMessage.groupId, groupUser.groups.id),
          eq(chatMessage.receiverId, data.receiverId)
        ),
        and(
          eq(chatMessage.userId, data.receiverId),
          eq(chatMessage.groupId, groupUser.groups.id),
          eq(chatMessage.receiverId, groupUser.id)
        ),
        and(
          eq(chatMessage.groupId, data.receiverId),
          eq(chatMessage.receiverId, data.receiverId)
        )
      )
    )
    .orderBy(asc(chatMessage.timestamp));

  return messages;
}
