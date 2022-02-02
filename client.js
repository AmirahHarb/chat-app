
const socket = io('http://localhost:3000')
const sendForm = document.getElementById('send-form')
const sendInput = document.getElementById('message-text')
const messageContainer = document.getElementById('message-cont')

//receiving message from server
socket.on('sent-message', message => {
    console.log(message)
    displayMessage(message, "recipient")
})

//sending message to server
sendForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = sendInput.value
    
    socket.emit('send-message', message)

    //displaying message to sender
    displayMessage(message, "sender")
    sendInput.value = ''
})

function displayMessage(message, recipient){
    const messageElement = document.createElement('div')
    

    messageElement.style.maxWidth = "60%"
    messageElement.innerText = message
    messageElement.style.fontFamily = "sans-serif"
    messageElement.style.padding = "2px 10px 2px 10px"
    messageElement.style.marginBottom = "10px"

    if(recipient == 'sender'){
        messageElement.style.marginLeft = "auto"
        messageElement.style.backgroundColor = "#9795BC"
        messageElement.style.borderRadius = "10px 3px 10px 10px "
        messageElement.style.marginRight = "10px"
    }

    if(recipient == 'recipient'){
        messageElement.style.marginRight = "auto"
        messageElement.style.backgroundColor = "#e0e1dd"
        messageElement.style.borderRadius = "3px 10px 10px 10px"
        messageElement.style.marginLeft = "10px"
    }

    messageContainer.append(messageElement)
}






