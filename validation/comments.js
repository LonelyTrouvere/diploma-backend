import { Type } from "@sinclair/typebox";
import { createInsertSchema } from "drizzle-typebox";
import { comments } from "../drizzle/schema/index.js";

export const CommentsSchema = createInsertSchema(comments);

export const PostCommentsSchema = Type.Omit(CommentsSchema, [
  "id",
  "timestamp",
  "userId"
]);
