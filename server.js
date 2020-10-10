const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
// express
app.use(express.static('public'));
// socket.io
const messages = [];
io.on('connection', (socket) => {
  console.log('Client connected');
  // Lähetä vanhat viestit yhdistäessä
  socket.emit('messages', messages);
  // Välitä käyttäjän lähettämät viestit muille
  socket.on('message', message => {
    messages.push(message);
    socket.broadcast.emit('message', message);
  });
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
http.listen(8080);