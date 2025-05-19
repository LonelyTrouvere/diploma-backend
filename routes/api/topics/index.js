"use strict";

import { Type } from "@sinclair/typebox";
import { PostTopicsSchema } from "../../../validation/topics.js";
import {
  createTopic,
  deleteTopic,
  getTopic,
  getTopics,
  updateTopic,
} from "../../../controllers/topics.js";
import { createEvent, getEventList } from "../../../controllers/event.js";

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
      if(request.body.deadline) {
        await createEvent({
          description: request.body.name,
          date: new Date(request.body.deadline),
          type: 'deadline',
          topicId: id,
          recurring: false,
        }, request.user)
      }
      reply.send({ id });
    }
  );

  fastify.post(
    "/delete",
    {
      preHandler: [fastify.groupAuthenticate, fastify.checkRole],
      schema: {
        body: Type.Object({ topicId: Type.String({ format: "uuid" }) }),
      },
    },
    async function (request, reply) {
      await deleteTopic(request.body.topicId);
      reply.send({});
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
      const eventList = await getEventList(
        { topicId: request.query.id },
        request.user
      );
      reply.send({ ...topics, events: eventList });
    }
  );

  fastify.post(
    "/update",
    {
      preHandler: [fastify.groupAuthenticate, fastify.checkRole],
      schema: {
        body: Type.Object({
          id: Type.String({ format: "uuid" }),
          name: Type.Optional(Type.String()),
          description: Type.Optional(Type.String()),
          meeting: Type.Optional(Type.String({ format: "uuid" })),
        }),
      },
    },
    async function (request, reply) {
      await updateTopic(request.body);
      reply.send({});
    }
  );
}
