"use strict";

import { Type } from "@sinclair/typebox";
import { PostTopicsSchema } from "../../validation/topics.js";
import { createTopic } from "../../controllers/topics.js";

/**
 *
 * @param {import("fastify").FastifyInstance} fastify
 * @param {Object} opts
 */
export default async function (fastify, opts) {
  fastify.post(
    "/",
    {
      preHandler: [fastify.authenticate, fastify.checkRole],
      schema: {
        body: PostTopicsSchema,
        response: { 200: Type.Object({ id: Type.String({ format: "uuid" }) }) },
      },
    },
    async function (request, reply) {
      const id = await createTopic(request.body, request.user);
      reply.send({ id });
    }
  );
}
