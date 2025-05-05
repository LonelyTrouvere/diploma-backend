"use strict";

import { Type } from "@sinclair/typebox";
import { createUser } from "../../controllers/users.js";
import { PostUserSchema } from "../../validation/users.js";

/**
 *
 * @param {import("fastify").FastifyInstance} fastify
 * @param {Object} opts
 */
export default async function (fastify, opts) {
  fastify.post(
    "/",
    {
      schema: {
        body: PostUserSchema,
        response: { 200: Type.Object({ id: Type.String({ format: "uuid" }) }) },
      },
    },
    async function (request, reply) {
      const id = await createUser(request.body);
      reply.send({ id });
    }
  );
}
