module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log("User Connected");
        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
        socket.on('message',(msg) => {
            console.log(msg);
            socket.broadcast.emit('message-broadcast', msg);
        });
    });
}