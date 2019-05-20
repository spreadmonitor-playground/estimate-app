import * as express from "express";
import { Server } from "http";
import * as socketIo from "socket.io";
import { Socket } from "socket.io";
import { cors } from "./cors";

const {
  sendGroups,
  createGroup,
  enterGroup,
  leaveGroup
} = require("./group.handlers");
const { startEstimation } = require("./estimation.handler");

function main(): void {

  const app = express();
  const server = new Server(app);
  const io = socketIo(server);

  app.use(cors);

  server.listen(8080, "0.0.0.0");

  bindSocketEvents(io);

}

function bindSocketEvents(io: socketIo.Server): void {

  io.sockets.on("connection", (socket: Socket) => {
    handleConnect(socket);
  
    socket.on("createGroup", createGroup(socket));
  
    socket.on("enterGroup", enterGroup(socket));
  
    socket.on("startEstimation", startEstimation(socket));
  
    socket.on("leaveGroup", leaveGroup(socket));
  
    socket.on("disconnect", handleDisconnect);
  });

}

function handleConnect(socket: Socket): void {
  console.log("A user has been connected!");
  sendGroups(socket);
}

function handleDisconnect(socket: Socket): void {
  console.log("A user has been disconnected!");
}

main();
