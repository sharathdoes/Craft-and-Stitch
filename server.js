const express = require('express');
require('dotenv').config();
const connectDb = require('./db/dbconnect');
const { createServer } = require('http');
const socketio = require('./socket');

const app = express();
const server = createServer(app);
const io = socketio.init(server);
const adIo = socketio.initAdIo(server, '/socket/adpage');

// Body parser
app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});


// Default route
app.get('/', (req, res, next) => {
  res.send('Server running');
});

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/user', require('./routes/user'));
app.use('/ad', require('./routes/ad'));
app.use('/bid', require('./routes/bid'));
app.use('/room', require('./routes/room'));
app.use('/auction', require('./routes/auction'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Socket.io setup
const PORT = process.env.PORT || 5000;
io.on('connection', (socket) => {
  // console.log('### Socket IO client connected');
  socket.on('disconnect', (reason) => {
    // console.log('### Socket IO client disconnected');
  });
  socket.on('leaveHome', () => {
    socket.disconnect();
  });
});
adIo.on('connect', (socket) => {
  // socket.join('testroom')
  socket.on('joinAd', ({ ad }) => {
    socket.join(ad.toString());
    // console.log(`User joined room ${ad}`);
  });
  socket.on('leaveAd', ({ ad }) => {
    socket.leave(ad.toString());
    // console.log(`Left room ${ad}`);
  });
  socket.on('disconnect', () => {
    // console.log('User has disconnect from ad');
  });
});
// Connect DB and Initialize server
connectDb();
server.listen(PORT, () => {
  console.log(`### Server running on port ${PORT}`);
});
