"use strict";

import fp from "fastify-plugin";
import cors from "@fastify/cors";

export default fp(async function (fastify, opts) {
  fastify.register(cors, {
    credentials: true,
    origin: [
      "http://localhost:8080",
      "http://127.0.0.1:8080",
      "http://localhost:3000",
      "http://127.0.0.1:3000",
    ],
  });
});
