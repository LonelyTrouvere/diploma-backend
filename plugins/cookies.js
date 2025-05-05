"use strict";

import fp from "fastify-plugin";
import fCookie from '@fastify/cookie'
import dotenv from "dotenv";

dotenv.config({ path: ".env" });
export default fp(async function (fastify, opts) {
  fastify.register(fCookie, { secret: process.env.JWT_SECRET, hook: 'preHandler' });
});
