"use strict";

import dotenv from "dotenv";
import { Type } from "@sinclair/typebox";
import {
  createUser,
  getParticipants,
  getUser,
  login,
} from "../../../controllers/users.js";
import { LoginSchema, PostUserSchema } from "../../../validation/users.js";
import { StreamClient } from "@stream-io/node-sdk";

dotenv.config({ path: ".env" });

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
        sameSite: "none",
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
      const token = request.cookies.token;
      reply.send({ ...request.user, token });
    }
  );

  fastify.get(
    "/generate-stream-token",
    { preHandler: [fastify.authenticate] },
    async function (request, reply) {
      const streamKey = process.env.PUBLIC_STREAM_KEY;
      const streamSecret = process.env.STREAM_SECRET;
      const streamClient = new StreamClient(streamKey, streamSecret);
      const exp = Math.floor(Date.now() / 1000) + 60 * 60;
      const iat = Math.floor(Date.now() / 1000) - 60;
      const token = streamClient.generateUserToken({
        user_id: request.user.id,
        exp,
        iat,
      });
      reply.send({ token });
    }
  );

  fastify.get(
    "/participants",
    { preHandler: [fastify.groupAuthenticate] },
    async function (request, reply) {
      const participants = await getParticipants(request.user);
      reply.send(participants);
    }
  );
}
