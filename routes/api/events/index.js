"use strict";

import { createEvent } from "../../../controllers/event.js";
import { PostEventsSchema } from "../../../validation/events.js";

/**
 *
 * @param {import("fastify").FastifyInstance} fastify
 * @param {Object} opts
 */
export default async function (fastify, opts) {
  fastify.post(
    "/",
    {
      preHandler: [fastify.groupAuthenticate, fastify.checkRole],
      schema: {
        body: PostEventsSchema,
      },
    },
    async function (request, reply) {
      const id = await createEvent(request.body, request.user);
      reply.send({ });
    }
  );
}
