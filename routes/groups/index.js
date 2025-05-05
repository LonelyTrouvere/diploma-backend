"use strict";

import { Type } from "@sinclair/typebox";
import { createGroup, getGroups } from "../../controllers/groups.js";
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
      schema: {
        body: PostGroupSchema,
        response: {
          200: Type.Object({ id: Type.String({ format: "uuid" }) }),
        },
      },
    },
    async function (request, reply) {
      const id = await createGroup(request.body.name);
      reply.send({ id });
    }
  );

  fastify.get(
    "/",
    {
      schema: {
        response: {
          200: Type.Array(GroupSchema),
        },
      },
    },
    async function (request, reply) {
      const res = await getGroups();
      reply.send(res);
    }
  );
}
