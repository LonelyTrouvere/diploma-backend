"use strict";

import fp from "fastify-plugin";

export default fp(async function (fastify, opts) {
  fastify.decorate("groupAuthenticate", async (request, reply) => {
    const token = request.cookies.token;
    if (!token) {
      reply.forbidden('Token missing');
    }
    const decoded = request.jwt.verify(token);
    if(!decoded.groups){
        reply.forbidden('Not group authenticated');
    }
    request.user = decoded;
  });
});
