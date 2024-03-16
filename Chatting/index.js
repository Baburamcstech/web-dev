const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
const { Server } = require('socket.io');

app.use(require('express-status-monitor')());
const server = http.createServer(app);
const io = new Server(server);

// Socket.io
io.on("connection", (socket) => {
    socket.on('user-message', (message) => {
        io.emit("message",message);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
});

app.use(express.static(path.resolve(__dirname, "public"))); // Use path.resolve to get the absolute path
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "index.html")); // Provide the correct absolute path to the HTML file
});

const port = 9000;
server.listen(port, () => {
    console.log(`listening at port ${port}`);
});
