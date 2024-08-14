const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const {Server} = require("socket.io");

const app = express();
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*", // Allow your frontend origin
    methods: ["GET", "POST"]
  }
});

// // CORS 설정 (라우트 및 Socket.IO 핸들러보다 앞에 위치)
// app.use(cors({
//   origin: ['*'] // React 클라이언트가 실행되는 주소
// }));

// 기본 경로에 대해 간단한 응답
app.get('/', (req, res) => {
  res.send('WebRTC signaling server is running.');
});

// Socket.IO 이벤트 핸들링
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // 클라이언트에서 메시지 받기
  socket.on('offer', (data) => {
    socket.broadcast.emit('offer', data);
  });

  socket.on('answer', (data) => {
    socket.broadcast.emit('answer', data);
  });

  socket.on('candidate', (data) => {
    socket.broadcast.emit('candidate', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// 서버 시작
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
