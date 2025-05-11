"use strict";

import { Type } from "@sinclair/typebox";
import { createComment } from "../../../controllers/comments.js";
import { PostCommentsSchema } from "../../../validation/comments.js";

/**
 *
 * @param {import("fastify").FastifyInstance} fastify
 * @param {Object} opts
 */
export default async function (fastify, opts) {
  fastify.post(
    "/",
    {
      preHandler: [fastify.groupAuthenticate],
      schema: {
        body: PostCommentsSchema,
        response: { 200: Type.Object({ id: Type.Number() }) },
      },
    },
    async function (request, reply) {
      const id = await createComment(request.body, request.user);
      reply.send({ id });
    }
  );
}
