"use strict";

import { Type } from "@sinclair/typebox";
import {
  createGroup,
  getGroups,
  getLoginGroup,
  requestToJoin,
} from "../../controllers/groups.js";
import { GroupSchema, PostGroupSchema } from "../../validation/groups.js";

/**
 *
 * @param {import("fastify").FastifyInstance} fastify
 * @param {Object} opts
 */
export default async function (fastify, opts) {
  fastify.post(
    "/",
    {
      preHandler: [fastify.authenticate],
      schema: {
        body: PostGroupSchema,
        response: {
          200: Type.Object({ id: Type.String({ format: "uuid" }) }),
        },
      },
    },
    async function (request, reply) {
      const id = await createGroup(request.body.name, request.user);
      reply.send({ id });
    }
  );

  fastify.post(
    "/login",
    {
      preHandler: [fastify.authenticate],
      schema: {
        body: Type.Object({
          groupId: Type.String({ format: "uuid" }),
        }),
      },
    },
    async function (request, reply) {
      const group = await getLoginGroup(request.user, request.body.groupId);
      delete request.user.iat;
      const token = request.jwt.sign({ ...request.user, ...group });
      reply.clearCookie("token", {
        sameSite: "none",
        secure: true,
        path: "/",
        httpOnly: true,
      });
      reply.setCookie("token", token, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      reply.send({ token });
    }
  );

  fastify.post(
    "/request-from-user",
    {
      preHandler: [fastify.authenticate],
      schema: {
        body: Type.Object({
          groupId: Type.String({ format: "uuid" }),
        }),
      },
    },
    async function (request, reply) {
      await requestToJoin({
        groupId: request.body.groupId,
        userId: request.user.id,
        status: "request_from_user",
      });
      reply.send({});
    }
  );

  fastify.get(
    "/",
    {
      preHandler: [fastify.authenticate],
      schema: {
        response: {
          200: Type.Array(GroupSchema),
        },
      },
    },
    async function (request, reply) {
      const res = await getGroups(request.user);
      console.log(res);
      reply.send(res);
    }
  );
}
