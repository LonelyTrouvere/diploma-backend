"use strict";

import fp from "fastify-plugin";
import fjwt from "@fastify/jwt";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });
export default fp(async function (fastify, opts) {
  fastify.register(fjwt, { secret: process.env.JWT_SECRET });

  fastify.addHook("preHandler", (request, reply, done) => {
    request.jwt = fastify.jwt;
    return done();
  });
});
