import * as express from "express";
import { Server } from "http";
import * as socketIo from "socket.io";
import { cors } from "./cors";
import { startEstimation } from "./event-handlers/estimation.handler";
import {
  createGroup,
  enterGroup,
  leaveGroup,
  sendGroups
} from "./event-handlers/group.handler";

function main(): void {
  const app = express();
  const server = new Server(app);
  const io = socketIo(server);

  app.use(cors);

  server.listen(8080, "0.0.0.0");

  bindSocketEvents(io);
}

function bindSocketEvents(io: socketIo.Server): void {
  io.sockets.on("connection", (socket: socketIo.Socket) => {
    handleConnect(socket);

    socket.on("createGroup", createGroup(socket));

    socket.on("enterGroup", enterGroup(socket));

    socket.on("startEstimation", startEstimation(socket));

    socket.on("leaveGroup", leaveGroup(socket));

    socket.on("disconnect", handleDisconnect);
  });
}

function handleConnect(socket: socketIo.Socket): void {
  console.log("A user has been connected!");
  sendGroups(socket);
}

function handleDisconnect(socket: socketIo.Socket): void {
  console.log("A user has been disconnected!");
}

main();
