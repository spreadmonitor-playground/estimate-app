import { Socket } from "socket.io";
import { groups } from "./group.handler";
import { Estimation } from "../interfaces";

export function sendEstimations(socket: Socket, groupId: string) {
  console.log("Sending estimations ...");
  const group = groups.find(({ id }) => id === groupId);

  if (!group) {
    console.error(`Group was not found by ID: ${groupId}!`);
  }

  socket.emit(`${groupId}:estimations`, group.estimations);
}

export function startEstimation(
  socket: Socket
): ({ groupId }: { groupId: string }) => void {
  return ({ groupId }) => {
    console.log(`Starting estimation in group ${groupId} ...`);
    const group = groups.find(({ id }) => id === groupId);

    if (!group) {
      console.error(`Group was not found by ID: ${groupId}!`);
    }

    group.resetEstimation();

    sendEstimations(socket, group.id);
  };
}
