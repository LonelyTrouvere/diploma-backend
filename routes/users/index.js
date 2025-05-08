"use strict";

import { Type } from "@sinclair/typebox";
import { createUser, getUser, login } from "../../controllers/users.js";
import { LoginSchema, PostUserSchema } from "../../validation/users.js";

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
        body: PostUserSchema,
        response: { 200: Type.Object({ id: Type.String({ format: "uuid" }) }) },
      },
    },
    async function (request, reply) {
      const id = await createUser(request.body);
      reply.send({ id });
    }
  );

  fastify.post(
    "/login",
    {
      schema: {
        body: LoginSchema,
        response: { 200: Type.Object({ token: Type.String() }) },
      },
    },
    async function (request, reply) {
      try {
        const user = await login(request.body);
        delete user.hash;
        const token = request.jwt.sign(user);
        reply.setCookie("token", token, {
          path: "/",
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });
        reply.send({ token });
      } catch (e) {
        reply.badRequest(e.message);
      }
    }
  );

  fastify.post(
    "/logout",
    { preHandler: [fastify.authenticate] },
    async (request, reply) => {
      reply.clearCookie("token", {
        sameSite: 'none',
        secure: true,
        path: "/",
        httpOnly: true,
      });
      reply.send();
    }
  );

  fastify.get(
    "/",
    { preHandler: [fastify.authenticate] },
    async function (request, reply) {
      reply.send(request.user);
    }
  );
}
