import { Type } from "@sinclair/typebox";
import { createInsertSchema } from "drizzle-typebox";
import { events } from "../drizzle/schema/index.js";

export const EventsSchema = createInsertSchema(events);

export const PostEventsSchema = Type.Composite([
  Type.Omit(EventsSchema, ["id", "groupId", "date"]),
  Type.Object({ date: Type.String() }),
]);
