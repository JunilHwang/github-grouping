module.exports = server => {
  const io = require('socket.io')(server)
  let count = 0
  io.on('connection', socket => {
    socket.on('inter', () => { io.emit('inter', count) })
    socket.on('in', () => { io.emit('inter', ++count) })
    socket.on('out', () => { io.emit('inter', --count) })
    socket.on('chat', v => {
      io.emit('chat', v)
    })
  })
}