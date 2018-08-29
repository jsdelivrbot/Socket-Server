let express = require('express');
let socket = require('socket.io');
let path = require('path');

//App setup
let app = express();

//create a server
let server = app.listen(process.env.PORT || 4000);

//socket set up
let io = socket(server); // takes a parameter to what server we wanna work with

io.on('connection', function (socket) {

    // 10 different clients // unique id - different worlds
    console.log("Made a new socket connection" + socket.id);

    socket.on('chat', function (data) {
        socket.broadcast.emit('chat', data); // to all sockets except client
    });

});

app.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname + '/views/index.html'));
});