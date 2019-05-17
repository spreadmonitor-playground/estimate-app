const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const { cors } = require("./cors");
const {
  sendGroups,
  createGroup,
  enterGroup,
  leaveGroup
} = require("./group.handlers");
const { startEstimation } = require('./estimation.handler');

app.use(cors);

server.listen(8080, "0.0.0.0");

io.sockets.on("connection", socket => {
  handleConnect(socket);

  socket.on("createGroup", createGroup(socket));

  socket.on("enterGroup", enterGroup(socket));

  socket.on('startEstimation', startEstimation(socket))

  socket.on("leaveGroup", leaveGroup(socket));

  socket.on("disconnect", handleDisconnect);
});

const handleConnect = socket => {
  console.log("A user has been connected!");
  sendGroups(socket);
};

const handleDisconnect = () => {
  console.log("A user has been disconnected!");
};
