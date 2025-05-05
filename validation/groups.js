import { createSelectSchema } from "drizzle-typebox";
import { groups } from "../drizzle/schema/index.js";
import { Type } from "@sinclair/typebox";

export const GroupSchema = createSelectSchema(groups);

export const PostGroupSchema = Type.Omit(GroupSchema, ["id"]);
