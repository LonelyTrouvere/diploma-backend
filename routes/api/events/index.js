"use strict";

import { Type } from "@sinclair/typebox";
import { createEvent, getEventList } from "../../../controllers/event.js";
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
      reply.send({});
    }
  );

  fastify.get(
    "/",
    {
      preHandler: [fastify.groupAuthenticate],
      schema: {
        querystring: Type.Partial(
          Type.Object({
            topicId: Type.String({ format: "uuid" }),
            before: Type.String(),
            after: Type.String(),
          })
        ),
      },
    },
    async function (request, reply) {
      const eventList = await getEventList(
        {
          topicId: request.query.topicId,
          before: new Date(request.query.before),
          after: new Date(request.query.after),
        },
        request.user
      );
      reply.send(eventList);
    }
  );
}
