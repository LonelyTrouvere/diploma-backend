import { Type } from "@sinclair/typebox";
import { createInsertSchema } from "drizzle-typebox";
import { topics } from "../drizzle/schema/index.js";

export const TopicsSchema = createInsertSchema(topics);

export const PostTopicsSchema = Type.Omit(TopicsSchema, [
  "id",
  "groupId",
  "created",
]);
