const io = require("socket.io")(3000, {
    cors: {
      origin: "*",
    },
  });

const users = {}

//sending message to client(s)
io.on('connection', socket => {

    socket.on('user-name', username =>{
      users[socket.id] = username
      socket.broadcast.emit('new-connect', username)
    })
    
    socket.on('send-message', message =>{
      //appending senders user name to message using source socket ID
      const senderName = users[socket.id]
      const fullMessage = senderName + message
      socket.broadcast.emit('sent-message', fullMessage) //excludes original sender
    })

    
})

