"use strict";

import fp from "fastify-plugin";

export default fp(async function (fastify, opts) {
  fastify.decorate("checkRole", async (request, reply) => {
    const user = request.user;
    if (!user) {
      reply.forbidden('Token missing');
    }
    if(user?.groups_to_users.role === 'participant') {
        reply.forbidden('No rights');
    }
  });
});
