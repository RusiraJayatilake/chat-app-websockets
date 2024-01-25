const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const appRoutes = require('./src/routes/routes');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT;

app.use('/service/', appRoutes);

const io = socketIO(server); 

io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`)

    socket.on('chat message', (message) => {
        io.emit('chat message', message)
    });

    socket.on('disconnect', () => {
        console.log(`Client got disconnected: ${socket.id}`)
    });
});


server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/`)
});
