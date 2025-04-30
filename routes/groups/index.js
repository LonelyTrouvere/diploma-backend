"use strict";

import { createGroup, getGroups } from "../../controllers/groups.js";

/**
 *
 * @param {import("fastify").FastifyInstance} fastify
 * @param {Object} opts
 */
export default async function (fastify, opts) {
  fastify.post("/", {}, async function (request, reply) {
    await createGroup(request.body.name);
  });

  fastify.get("/", {}, async function (request, reply) {
    const res = await getGroups();
    reply.send(res);
  });
}
