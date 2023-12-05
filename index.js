const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html')

})

app.use(express.static(__dirname + '/static'))

io.on('connection', (socket) => {
    console.log('Користувач підключився');
 
    socket.on('chat message', (data) => {
        io.emit('chat message', {
            message: data.message,
            name: data.name
        }
        );
    });
});

http.listen(3002, () => {
    console.log('Сервер стартує на порті 3002');
});