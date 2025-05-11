"use strict";

import fp from "fastify-plugin";

export default fp(async function (fastify, opts) {
  fastify.addHook("onSend", (request, reply, payload, done) => {
    const err = null;
    if (request.url.includes("api")) {
      const success = reply.statusCode >= 200 && reply.statusCode < 300;
      try {
        done(
          err,
          JSON.stringify({
            success,
            data: payload ? JSON.parse(payload) : undefined,
          })
        );
      } catch (e) {
        done(err, payload);
      }
    } else {
      done(err, payload);
    }
  });
});
