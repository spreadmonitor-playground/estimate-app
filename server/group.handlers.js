const uuid = require("uuid/v4");

const { addUserToGroup, createNewGroup } = require("./group");

const { createEstimation, sendEstimation } = require("./estimation.handler");

let groups = [];

const sendGroups = socket => {
  console.log("Sending groups ...");
  console.log(groups);
  socket.emit("groups", groups);
};

const createGroup = socket => {
  return member => {
    console.log("Creating group ...");
    const newGroup = addUserToGroup(member, createNewGroup(uuid()));
    socket.on(`${newGroup.id}:sendEstimation`, createEstimation(socket));
    groups = [...groups, newGroup];
    sendGroups(socket);
  };
};

const enterGroup = socket => {
  return ({ userId, groupId }) => {
    console.log(`Entering ${userId} to group ${groupId}`);
    const groupIndex = groups.findIndex(({ id }) => id === groupId);
    if (groupIndex === -1) {
      console.error("Group ID was not found!");
      return;
    }
    const group = addUserToGroup(userId, groups[groupIndex]);
    groups = [
      ...groups.slice(0, groupIndex),
      group,
      ...groups.slice(groupIndex + 1, groups.length)
    ];
    sendGroups(socket);
  };
};

const leaveGroup = socket => {
  return ({ userId, groupId }) => {
    const groupIndex = groups.findIndex(({ id }) => id === groupId);

    if (groupIndex === -1) {
      console.error("Group ID was not found!");
      return;
    }

    const userIndex = groups[groupIndex].members.findIndex(
      ({ id }) => id === userId
    );

    console.log(userId);
    if (userIndex === -1) {
      console.error("User ID was not found!");
      return;
    }

    const members = groups[groupIndex].members.filter(
      ({ id }) => id !== userId
    );

    if (members.length) {
      groups = groups.filter(({ id }) => id !== groupId);
      console.log(`Group ${groupId} has been removed!`);
    } else {
      const newGroup = {
        ...groups[groupIndex],
        members
      };
      groups = [
        ...groups.slice(0, groupIndex),
        newGroup,
        ...groups.slice(groupIndex + 1, groups.length)
      ];
    }

    sendGroups(socket);
  };
};

module.exports = {
  sendGroups,
  createGroup,
  enterGroup,
  leaveGroup,
  groups
};
