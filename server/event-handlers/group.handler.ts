import * as uuid from "uuid/v4";
import { Member, Estimation } from '../interfaces';
import { Group } from '../group';
import { Socket } from 'socket.io';

export let groups: Group[] = [];

export function sendGroups(socket: Socket): void {
  console.log("Sending groups ...");
  console.log(groups);
  socket.emit("groups", groups.map(({ id, members, estimations }) => ({ id, members, estimations })));
}

export function createGroup(socket: Socket): (member: Member) => void {
  return (member: Member): void => {
    console.log("Creating group ...");
    const newGroup = new Group(uuid());
    newGroup.addMember(member);
    groups = [...groups, newGroup];
    sendGroups(socket);

    socket.on(`${newGroup.id}:sendEstimation`, (estimation: Estimation) => {
        console.log('Adding estimation ...');
        console.log(estimation);
        newGroup.addEstimation(estimation);

        console.log(`Sending estimations for group ${newGroup.id} ...`);
        console.log(newGroup.estimations);
        socket.emit(`${newGroup.id}:estimations`, newGroup.estimations);
    });
  };
}

export function enterGroup(socket: Socket): ({ member, groupId }: { member: Member, groupId: string }) => void {
    return ({ member, groupId }) => {
        console.log(`Entering ${member.name} - ${member.name} to group ${groupId} ...`);
        const group = groups.find(({ id }) => id === groupId);
        
        if (!group) {
            console.error(`Group was not found by ID: ${groupId}!`);
        }

        group.addMember(member)

        sendGroups(socket);
    }
}

export function leaveGroup(socket: Socket): ({ userId, groupId }: { userId: string, groupId: string }) => void {
    return ({ userId, groupId }) => {
        console.log(`${userId} is leaving group ${groupId} ...`);
        const group = groups.find(({ id }) => id === groupId);
        
        if (!group) {
            console.error(`Group was not found by ID: ${groupId}!`);
        }

        group.removeMember(userId);

        if (!group.members.length) {
            groups = groups.filter(({ id }) => id !== group.id)
        }

        sendGroups(socket);
    }
}
