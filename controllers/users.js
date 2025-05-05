import { users } from "../drizzle/schema/index.js";
import { db } from "../drizzle/db.js";
import bcrypt from 'bcrypt'

export async function createUser(userData) {
  const id = crypto.randomUUID();
  const hash = await bcrypt.hash(userData.password, 10);

  await db.insert(users).values({
    id,
    name: userData.name,
    email: userData.email,
    hash,
  });

  return id;
}
