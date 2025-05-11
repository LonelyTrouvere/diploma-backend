"use strict";

import fp from "fastify-plugin";
import fastifySwagger from "@fastify/swagger";

export default fp(async function (fastify, opts) {
  fastify.register(fastifySwagger, {
    openapi: {
      openapi: "3.1.0",
      info: {
        title: "Diploma backend",
        description: "Diploma backend public API",
        version: "1.0",
      },
      servers: [
        {
          url: "http://localhost:3000",
          description: "Development server",
        },
      ],
      tags: [
        { name: "user", description: "User related end-points" },
        { name: "code", description: "Code related end-points" },
      ],
      components: {
        securitySchemes: {
          myCookieAuth: {
            type: "apiKey",
            in: "cookie",
            name: "my_cookie_name",
            description: "My Cookie based Authentication",
          },
        },
      },
    },
  });
});
