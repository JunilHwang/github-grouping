import io from 'socket.io-client'

const socket = io(process.env.NODE_ENV !== 'production' ? 'localhost:3000' : '183.99.229.179:3000')

export const socketOn = (name: string, callback: Function) => {
  socket.off(name)
  socket.on(name, callback)
}

export const socketEmit = (name: string, data: any = null) => {
  socket.emit(name, data)
}

export default { socketOn, socketEmit }