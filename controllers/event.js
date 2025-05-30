import { and, eq, gte, lte, or } from "drizzle-orm";
import { db } from "../drizzle/db.js";
import { events } from "../drizzle/schema/index.js";

export async function createEvent(data, groupUser) {
  await db.insert(events).values({
    ...data,
    date: new Date(data.date),
    groupId: groupUser.groups.id,
  });
}

export async function getEventList(data, groupUser) {
  const eventList = await db
    .select()
    .from(events)
    .where(
      or(
        and(
          eq(events.groupId, groupUser.groups.id),
          data.topicId ? eq(events.topicId, data.topicId) : undefined
        ),
        and(
          eq(events.groupId, groupUser.groups.id),
          or(
            data.before ? lte(events.date, data.before) : undefined,
            data.after ? gte(events.date, data.after) : undefined,
            eq(events.recurring, true)
          )
        )
      )
    );

  return eventList;
}
