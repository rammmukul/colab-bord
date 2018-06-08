const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const path = require('path')
const ot = require('ot')

io.on('connection', function (socket) {
  socket.join(1)
  socket.on('join', function (name) {
    console.log('joined')
    socket.join(1)
  })

  let otServer = new ot.Server('// Start coding...\n  ')

  socket.on('operation', function (operation) {
    console.log(operation)
    socket.emit('operation', ot.Operation.formJSON(operation))
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
