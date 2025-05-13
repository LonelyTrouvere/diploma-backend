"use strict";

import fp from "fastify-plugin";
import { Server } from "socket.io";

export default fp(async function (fastify, opts) {
  const io = new Server(fastify.server, { cors: { origin: "*" } });
  fastify.decorate("io", io);

  io.on("connection", (socket) => {
    socket.on("choose-chat", (data) => {
      for (const room of socket.rooms) {
        if (room !== socket.id) {
          socket.leave(room);
        }
      }
      socket.join(`${data.id}:${data.receiverId}`);
    });

    socket.on("choose-group-chat", (data) => {
      for (const room of socket.rooms) {
        if (room !== socket.id) {
          socket.leave(room);
        }
      }
      socket.join(data.groups.id);
    });
  });
});
