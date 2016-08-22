var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var starX = 400;
var starY = 300;

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res,next){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('leftStatus', function(msg){
    if (msg = true) {
      starX -= 1;
    }
    console.log('Left button: ' + msg);
  });

  setInterval(function(){
    socket.emit('position', {'starPosX': starX, 'starPosY': starY});
    console.log(starX);
  }, 50);

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});