const createNewGroup = groupId => {
  return {
    id: groupId,
    members: [],
    estimations: [],
  };
};

const addUserToGroup = (member, group) => {
  const members = [...group.members, member].filter(
    ({ id: userId }, idx, self) => self.findIndex(({ id }) => id === userId) === idx 
  );

  return {
    ...group,
    members,
  };
};

module.exports = {
  createNewGroup,
  addUserToGroup
};
