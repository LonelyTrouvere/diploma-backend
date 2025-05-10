"use strict";

import { Type } from "@sinclair/typebox";
import { PostTopicsSchema } from "../../validation/topics.js";
import { createTopic, getTopic, getTopics } from "../../controllers/topics.js";

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
        body: PostTopicsSchema,
        response: { 200: Type.Object({ id: Type.String({ format: "uuid" }) }) },
      },
    },
    async function (request, reply) {
      const id = await createTopic(request.body, request.user);
      reply.send({ id });
    }
  );

  fastify.get(
    "/list",
    { preHandler: [fastify.groupAuthenticate] },
    async (request, reply) => {
      const topics = await getTopics(request.user);
      reply.send(topics);
    }
  );

  fastify.get(
    "/",
    {
      preHandler: [fastify.groupAuthenticate],
      schema: {
        querystring: Type.Object({ id: Type.String({ format: "uuid" }) }),
      },
    },
    async (request, reply) => {
      const topics = await getTopic(request.query.id);
      reply.send(topics);
    }
  );
}
