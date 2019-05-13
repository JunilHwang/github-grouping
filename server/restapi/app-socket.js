module.exports = server => {
  const io = require('socket.io')(server)
  const userList = []
  io.on('connection', socket => {
    socket.on('chat', v => { io.emit('chat', v) })
    socket.on('inter.user', v => {
      userList.push(v);
      console.log('in: ', userList.map(v => v.name))
      io.emit('get.user', userList)
    })
    socket.on('out.user', id => {
      const idx = userList.findIndex(v => v.id === id)
      if (idx !== -1) {
       userList.splice(idx, 1)
      }
      io.emit('get.user', userList)
    })
  })
}