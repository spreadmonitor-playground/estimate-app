const { createNewEstimation } = require('./estimation');
const { groups } = require('./group.handlers');

const sendEstimations = (socket, groupId) => {
  console.log("Sending estimations ...");
  const { estimations } = groups.find(({ id }) => id === groupId);
  socket.emit(`${groupId}:estimations`, estimations);
};

const createEstimation = socket => {
  return ({ complexity, effort, userId }) => {
    estimations = [
      ...estimations,
      createNewEstimation(complexity, effort, userId)
    ];
    sendEstimations(socket, groupId);
  };
};

const startEstimation = socket => {
    return ({ groupId }) => {
        const group = groups.find(({ id }) => id === groupId);
        group.estimations = [];
        sendEstimations(socket, groupId);
    }
}

module.exports = { sendEstimations, createEstimation, startEstimation };
