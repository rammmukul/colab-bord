const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const path = require('path')

io.on('connection', function (socket) {
  socket.join(1)
  socket.on('join', function (name) {
    console.log('joined')
    socket.join(1)
  })

  socket.on('change', function (change) {
    console.log(change)
    socket.broadcast.emit('change', change)
  })
})

app.use(express.static(path.join(__dirname, 'public')))

http.listen(8000, function () {
  console.log('listening on 8000')
})
