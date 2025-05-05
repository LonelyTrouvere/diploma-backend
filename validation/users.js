import { Type } from "@sinclair/typebox";
import { users } from "../drizzle/schema/index.js";
import { createSelectSchema } from "drizzle-typebox";

let UserSchema = createSelectSchema(users);
UserSchema = Type.Composite([
  Type.Omit(UserSchema, ["email"]),
  Type.Object({
    email: Type.String({ format: "email" }),
  }),
]);

export const PostUserSchema = Type.Composite([
  Type.Omit(UserSchema, ["id", "hash"]),
  Type.Object({
    password: Type.String({ minLength: 6 }),
  }),
]);
