"use strict";
import { pipeline } from "stream";
import fs from "fs";
import util from "util";
import {
  createAttachments,
  getAttachment,
  getAttachments,
} from "../../../controllers/attachments.js";

const pump = util.promisify(pipeline);
const readFile = util.promisify(fs.readFile);

/**
 *
 * @param {import("fastify").FastifyInstance} fastify
 * @param {Object} opts
 */
export default async function (fastify, opts) {
  fastify.post(
    "/",
    {
      preHandler: [fastify.groupAuthenticate, fastify.checkRole],
    },
    async function (request, reply) {
      const parts = request.files();

      const ids = [];
      for await (const part of parts) {
        const extension = part.filename.match(/\.([0-9a-z]+)(?:[\?#]|$)/i)[1];
        const id = crypto.randomUUID();
        await pump(
          part.file,
          fs.createWriteStream(`./static/${id}.${extension}`)
        );
        ids.push(id);
      }
      reply.send(ids);
    }
  );

  fastify.post(
    "/attach",
    {
      preHandler: [fastify.groupAuthenticate, fastify.checkRole],
    },
    async function (request, reply) {
      await createAttachments(request.body);
      reply.send({});
    }
  );

  fastify.get(
    "/",
    {
      preHandler: [fastify.groupAuthenticate],
    },
    async function (request, reply) {
      const attachments = await getAttachments(request.query);
      reply.send(attachments);
    }
  );

  fastify.get(
    "/file",
    {
      preHandler: [fastify.groupAuthenticate],
    },
    async function (request, reply) {
      const attachment = await getAttachment(request.query);
      if (attachment) {
        const file = await readFile(
          `./static/${attachment.id}.${attachment.extension}`
        );
        reply.send(file);
      }
      reply.notFound();
    }
  );
}
