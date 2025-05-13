"use strict";

import { Type } from "@sinclair/typebox";
import {
  createChatMessage,
  getChatMessages,
} from "../../../controllers/chat-message.js";
import { PostChatMessageSchema } from "../../../validation/chat-message.js";

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
        body: PostChatMessageSchema,
      },
    },
    async function (request, reply) {
      const message = await createChatMessage(request.body, request.user);
      if (request.body.receiverId === request.user.groups.id) {
        fastify.io
          .to(request.user.groups.id)
          .emit("new-message", { ...message, name: request.user.name });
      } else {
        fastify.io
          .to(`${request.user.id}:${request.body.receiverId}`)
          .to(`${request.body.receiverId}:${request.user.id}`)
          .emit("new-message", { ...message, name: request.user.name });
      }
      reply.send(message);
    }
  );

  fastify.get(
    "/messages",
    {
      preHandler: [fastify.groupAuthenticate],
      schema: {
        querystring: Type.Object({
          receiverId: Type.String({ format: "uuid" }),
        }),
      },
    },
    async function (request, reply) {
      const messages = await getChatMessages(request.query, request.user);
      reply.send(messages);
    }
  );
}
