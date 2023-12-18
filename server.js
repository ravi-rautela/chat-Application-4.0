const express = require("express")
const { createServer } = require('http')
const path = require('path')
const { Server } = require('socket.io')

const app = express();
const server = createServer(app);
const io = new Server(server);


app.use(express.static(path.join(__dirname + "/client")))

io.on('connection', (socket) => {
    // User Entry
    socket.on("newuser", function (username) {
        socket.broadcast.emit("update", username + " join the chat room")
    })
    socket.on("exituser", function (username) {
        socket.broadcast.emit("update", username + " left the chat room")
    })
    socket.on("chat", function (message) {
        socket.broadcast.emit("chat", message);
    })
});


server.listen(3000, (req, res) => {
    console.log(`Server listening at port http://localhost:3000`);
})