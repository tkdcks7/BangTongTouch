const express = require("express");
const http = require("http");
const SocketIO = require("socket.io");

const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000", // 클라이언트의 출처를 명시적으로 허용
  methods: ["GET", "POST"],
  credentials: true, // 인증된 요청을 허용합니다.
};

app.use(cors(corsOptions));

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer, {
  cors: {
    origin: "http://localhost:3000", // 클라이언트의 출처를 명시적으로 허용
    methods: ["GET", "POST"],
    credentials: true,
  },
});

wsServer.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("join_room", (roomName) => {
    console.log("join", roomName);
    socket.join(roomName);
    socket.to(roomName).emit("welcome");
  });
  socket.on("offer", (offer, roomName) => {
    console.log("offer event received with roomName:", roomName);
    console.log("offer:", offer);
    socket.to(roomName).emit("offer", offer);
  });

  socket.on("answer", (answer, roomName) => {
    console.log("answer event received with roomName:", roomName);
    console.log("answer:", answer);
    socket.to(roomName).emit("answer", answer);
  });

  socket.on("ice", (ice, roomName) => {
    console.log("ice event received with roomName:", roomName);
    console.log("ice:", ice);
    socket.to(roomName).emit("ice", ice);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const handleListen = () => console.log(`Listening on http://localhost:4000`);
httpServer.listen(4000, handleListen);
