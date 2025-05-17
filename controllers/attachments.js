import { eq } from "drizzle-orm";
import { db } from "../drizzle/db.js";
import { attachments } from "../drizzle/schema/index.js";

export async function createAttachments(data) {
  await db.insert(attachments).values(data);
}

export async function getAttachments(data) {
  const attachmentList = await db
    .select()
    .from(attachments)
    .where(eq(attachments.topicId, data.topicId));
  return attachmentList;
}
