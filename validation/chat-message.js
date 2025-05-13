import { Type } from "@sinclair/typebox";
import { createInsertSchema } from "drizzle-typebox";
import { chatMessage } from "../drizzle/schema/index.js";

export const ChatMessageSchema = createInsertSchema(chatMessage);

export const PostChatMessageSchema = Type.Omit(ChatMessageSchema, [
  "id",
  "timestamp",
  "userId",
  "groupId",
  "seen",
]);
