const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, "public")));

function handleSocketConnection(socket) {
  console.log("A user connected");

  socket.on("clientMessage", (data) => {
    console.log("Message from client:", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
}

io.on("connection", handleSocketConnection);

const PORT = 80;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
