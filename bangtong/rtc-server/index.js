const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

app.use(cors({
  origin: ['http://localhost:3000'], // React 클라이언트가 실행되는 주소
  methods: ["GET", "POST"], // 허용할 HTTP 메서드
  credentials: true // 자격 증명을 허용할지 여부
}));

const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000", // React 클라이언트의 주소
    methods: ["GET", "POST"], // 허용할 HTTP 메서드
    credentials: true // 자격 증명을 허용할지 여부
  }
});

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
